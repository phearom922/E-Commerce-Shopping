import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiShoppingBag } from "react-icons/hi2";
import { CheckCircle } from "lucide-react";
import { sendTelegramMessage } from "../functions/sendTelegram";
import PopupTelegramHelp from "../popupTelegramHelp/PopupTelegramHelp";

//An-design
import { Button, Flex, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiSolidCopy } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";


const CheckOut = () => {
  //Show Popup==============
  const [open, setOpen] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [copy, setCopy] = useState(false)
  const handleSetCopy = () => {
    setCopy(true)
    const timer = setTimeout(() => {
      setCopy(false)
    }, 1500);
    return () => clearTimeout(timer);
  }
  //Show Popup==============
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [addressSave, setAddressSave] = useState(false);
  const [showFormAddress, setShowFormAddress] = useState(false);
  const [notificationUpdate, setNotificationUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
    // ลบ usernameTelegram ออก
  });

  const isFormComplete = Object.entries(address).every(
    ([_, value]) => value.trim() !== ""
  );

  useEffect(() => {
    if (!user.token) {
      toast.error("Please login before checkout");
      navigate("/login");
      return;
    }
    getUserCart(user.token)
      .then((res) => {
        console.log("Cart data:", res.data);
        setProducts(res.data.products || []);
        setTotal(res.data.cartTotal || 0);
        setDiscountTotal(res.data.discountTotal || 0);

        if (res.data.address && res.data.address.fullName) {
          setAddress(res.data.address);
          setAddressSave(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        toast.error(err.message || "Failed to load cart");
      });
  }, [user.token, navigate]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    saveAddress(user.token, address).then((res) => {
      console.log(res.data);
      if (res.data.ok) {
        if (notificationUpdate) {
          toast.success("Update Address");
        } else {
          toast.success("Address Saved");
        }

        setAddressSave(true);
        setShowFormAddress(false);
      }
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setShowFormAddress(!showFormAddress);
    setNotificationUpdate(true);
  };

  const handleCreateOrder = () => {
    try {
      if (!user.token) {
        toast.error("Please login before checkout");
        navigate("/login");
        return;
      }
      if (!addressSave) {
        toast.error("Please save an address before ordering");
        return;
      }
      if (!products.length) {
        toast.error("Your cart is empty");
        return;
      }
      setLoading(true);
      saveOrder(user.token)
        .then(async (res) => {
          // ตรวจสอบโครงสร้าง res.data
          let orderId;
          if (res.data.order && res.data.order._id) {
            orderId = res.data.order._id; // กรณี { order: { _id: "some_id" } }
          } else if (res.data._id) {
            orderId = res.data._id; // กรณี { _id: "some_id" }
          } else if (res.data.orderId) {
            orderId = res.data.orderId; // กรณี { orderId: "some_id" }
          } else {
            console.error("Order ID not found in response:", res.data);
            toast.warn("Order placed successfully, but Telegram bill could not be sent due to missing order ID.");
          }

          // ส่งข้อความไปยัง Telegram ถ้ามี orderId
          let telegramSent = false;
          if (orderId) {
            const telegramResponse = await sendTelegramMessage(orderId); // ไม่ต้องส่ง user.token เพราะจัดการใน sendTelegramMessage แล้ว
            telegramSent = telegramResponse.telegramSent;
            if (
              !telegramSent &&
              telegramResponse.message ===
              "Telegram user not found. Please send /start <your_system_username> to link your account."
            ) {
              toast.info(
                <div>
                  Telegram bill could not be sent. Please interact with the bot first at{" "}
                  <a
                    href="https://t.me/sendinvoice_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    @sendinvoice_bot
                  </a>
                </div>,
                { autoClose: 8000 }
              );
            } else if (!telegramSent) {
              toast.info("Telegram bill could not be sent. Please ensure your Telegram account is linked.");
            }
          } else {
            toast.info("Telegram bill could not be sent due to missing order ID.");
          }

          // แจ้งเตือนผลลัพธ์
          if (telegramSent) {
            toast.success(
              <div>
                Order placed successfully! Bill sent to Telegram.
                <br />
                <a
                  href="https://t.me/sendinvoice_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Open Telegram
                </a>
              </div>,
              { autoClose: 8000 }
            );
          } else {
            toast.success("Order placed successfully!");
          }

          // ล้างตะกร้า
          emptyCart(user.token)
            .then(() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: [],
              });
              if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
              }
              navigate("/user/my-order");
            })
            .catch((err) => {
              console.error("Error emptying cart:", err);
              toast.error("Order placed but failed to clear cart");
              navigate("/user/my-order");
            });
        })
        .catch((err) => {
          console.error("Error creating order:", err);
          toast.error(err.message || "Failed to place order");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error in handleCreateOrder:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <>
      <div>
        <div
          className={
            showFormAddress
              ? "absolute inline-flex h-screen w-full items-center justify-center px-4"
              : "hidden"
          }
        >
          <form className="absolute z-50 rounded bg-white p-10">
            <p className="text-2xl text-gray-500 md:text-3xl">
              Add <span className="font-semibold text-pink-700">Shipping Address</span>
            </p>
            <div className="mt-5 max-w-sm space-y-3">
              <input
                className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
                value={address.fullName}
              />
              <input
                className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) =>
                  setAddress({ ...address, phoneNumber: e.target.value })
                }
                value={address.phoneNumber}
              />
              <input
                className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                value={address.pincode}
              />
              <textarea
                className="w-full resize-none rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                type="text"
                name="area"
                rows={4}
                placeholder="Area (Street, Village)"
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
                value={address.area}
              ></textarea>
              <div className="flex space-x-3">
                <input
                  className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                  type="text"
                  name="city"
                  placeholder="City/District"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  value={address.city}
                />
                <input
                  className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  value={address.state}
                />
              </div>
            </div>
            {/* ลบส่วนของ Telegram Username และปุ่ม Telegram */}
            <div className="flex gap-8">
              <button
                onClick={handleAddAddress}
                className="mt-6 w-full max-w-sm cursor-pointer rounded border border-gray-400 uppercase hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={!isFormComplete}
                onClick={handleSaveAddress}
                type="submit"
                className={`${address.state &&
                  address.city &&
                  address.area &&
                  address.pincode &&
                  address.phoneNumber &&
                  address.fullName
                  ? "mt-6 w-full cursor-pointer hover:bg-indigo-800"
                  : "mt-6 w-full cursor-not-allowed opacity-50"
                  } max-w-sm rounded bg-indigo-700 py-3 text-white uppercase`}
              >
                {addressSave ? "Update" : "Save address"}
              </button>
            </div>
          </form>
          <div className="absolute z-40 mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-black opacity-85"></div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-4">
        <div className="w-full px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 mt-17">
              <div className="mx-5 flex items-center justify-between border-b-1 border-b-neutral-300 py-5">
                <h1 className="text-2xl font-semibold text-[#4b5563]">
                  Shopping <span className="text-pink-700">Cart</span>
                </h1>
                <p className="text-xl font-semibold text-[#4b5563]">
                  {products.length} Items
                </p>
              </div>
              <div>
                <table className="text-surface min-w-full overflow-hidden text-left text-sm font-light">
                  <thead className="font-medium text-[#4b5563]">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Product Details
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr
                        key={index}
                        className="border-neutral-2 text-[#4b5563]"
                      >
                        <td className="flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap">
                          <Link to={`/product-detail/${item.product._id}`}>
                            <div className="h-14 w-14 rounded-md bg-gray-100">
                              <img
                                src={item.product.images[0]?.url || "/placeholder.jpg"}
                                alt={item.product.title}
                                className="w-full object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex flex-col">
                            {item.product.title} <br />
                            <span className="text-xs text-gray-400">
                              {item.product.productCode || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-[16px] font-medium whitespace-nowrap">
                          $
                          {item.discount
                            ? (
                              item.price -
                              (item.price * item.discount) / 100
                            ).toFixed(2)
                            : item.price.toFixed(2)}
                        </td>
                        <td className="items-center gap-1 px-6 py-3 text-[16px] font-medium">
                          {item.count}
                        </td>
                        <td className="px-6 py-3 text-[16px] font-medium whitespace-nowrap">
                          $
                          {item.discount
                            ? (
                              (item.price -
                                (item.price * item.discount) / 100) *
                              item.count
                            ).toFixed(2)
                            : (item.count * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sticky top-16 col-span-1 mt-18 h-auto rounded-md bg-gray-100 p-6">
              <h1 className="mb-2 flex items-center gap-2 border-b-1 border-b-neutral-300 pb-5 text-2xl font-semibold text-[#4b5563]">
                <HiShoppingBag size={30} /> Order Summary
              </h1>
              <div className="mb-2">
                <h3 className="py-2 text-base font-medium text-gray-600 uppercase">
                  Shipping Address
                </h3>
                {addressSave ? (
                  <div className="flex gap-2 rounded-md border border-green-200 bg-green-50 p-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-gray-700 uppercase">
                          {address.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address.phoneNumber}, {address.area}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address.city}, {address.state}, {address.pincode}
                        </p>
                      </div>
                      <button
                        onClick={handleAddAddress}
                        className="h-auto cursor-pointer rounded border border-green-500 px-2 py-1 text-sm text-green-500 hover:bg-green-100"
                      >
                        Change Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={handleAddAddress}
                    className="group-focus cursor-pointer rounded-md border border-red-300 bg-gray-50 p-4 text-center hover:bg-red-100"
                  >
                    <p className="mb-2 text-red-500">
                      No shipping address added
                    </p>
                    <button className="w-full text-red-500">
                      + Add Address
                    </button>
                  </div>
                )}
              </div>
              <div className="space relative">
                <div className="space-y-2 py-5">
                  <div className="flex justify-between text-[#4b5563]">
                    <h1>Subtotal</h1>
                    <h1 className="font-semibold">
                      ${(total + discountTotal).toFixed(2)}
                    </h1>
                  </div>
                  <div className="flex justify-between text-[#4b5563]">
                    <h1>Shipping</h1>
                    <h1 className="font-semibold">Free</h1>
                  </div>
                  <div className="flex justify-between text-[#4b5563]">
                    <h1>Tax (2%)</h1>
                    <h1 className="font-semibold">$0.00</h1>
                  </div>
                  <div className="flex justify-between text-[#4b5563]">
                    <h1>Discount</h1>
                    <h1 className="font-semibold text-red-600">
                      ${discountTotal.toFixed(2)}
                    </h1>
                  </div>
                </div>
                <div className="mb-6 space-y-1">
                  <p className="font-kantumruy font-medium text-gray-600">ករណីលោកអ្នកត្រូវការទទួលវិក្ក័យបត្រតាមរយៈតេឡេក្រាម</p>
                  <Button type="primary" onClick={() => setOpen(true)}>
                    <p id="khmerFont" className="font-medium">ចុចនៅទីនេះ!!</p>
                  </Button>
                </div>
                <div>
                  <div className="flex justify-between border-t-1 border-gray-300 py-4">
                    <h1 className="text-2xl font-semibold text-[#4b5563]">
                      Total
                    </h1>
                    <h1 className="text-2xl font-semibold text-[#4b5563]">
                      ${total.toFixed(2)}
                    </h1>
                  </div>
                  <button
                    disabled={!addressSave || !products.length || loading}
                    onClick={handleCreateOrder}
                    className={`w-full rounded py-4 text-white uppercase ${!addressSave || !products.length || loading
                      ? "cursor-not-allowed bg-indigo-500 opacity-50"
                      : "cursor-pointer bg-indigo-700 hover:bg-indigo-800"
                      }`}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Flex vertical gap="middle" align="flex-start">
          {/* Basic */}

          <Modal
            title={<p className="font-kantumruy text-gray-600">តើលោកអ្នកត្រូវការទទួលវិក័យបត្រតាមរយៈតេឡេក្រាមរបស់អ្នកទេ?</p>}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={500}
            
          >
            <p id="khmerFont">វិធីក្នុងការទទួលទទួលវិក័យបត្រដោយស្វ័យប្រវត្តិរាល់ពេលបញ្ជាទិញ</p>
            
            <div className='flex items-center gap-2 '>
              <p id="khmerFont">1. ចម្លងឈ្មោះនៅក្នុងប្រព័ន្ធរបស់អ្នក <span className={` ${copy && "text-blue-600"}  font-semibold  px-1 py-0.5`}>/start {user.username} </span></p>
              <div>
                <CopyToClipboard text={`/start ${user.username}`}
                >
                  {copy ? <TiTick size={25}
                    className="cursor-pointer text-blue-600 bg-blue-200 w-full p-1 rounded" />
                    :
                    <BiSolidCopy onClick={handleSetCopy} size={25} className="cursor-pointer text-gray-600 hover:bg-blue-200 hover:text-blue-600  w-full bg-gray-200 p-1 rounded" />}
                </CopyToClipboard>
              </div>
            </div>
            <div id="khmerFont">2. <a target="_blank" href="https://t.me/sendinvoice_bot"><span className="font-medium">ចុចនៅទីនេះ!!</span></a>  ដើម្បីភ្ជាប់ជាមួយប្រព័ន្ធយើងខ្ញុំ</div>

            <p id="khmerFont">3. ដាក់បញ្ជូល (past) ទៅក្នុង Chat Bot របស់យើងខ្ញុំហើយចុចបញ្ជូនជាការស្រេច</p>
            <p id="khmerFont">នោះលោកអ្នកនឹងទទួលបានវិក័យបត្រ រាល់ពេលដែលលោកអ្នកធ្វើការបញ្ជាទិញ</p>
            <p id="khmerFont">សូមអរគុណ!! </p>


          </Modal>
        </Flex>
      </div>
    </>
  );
};

export default CheckOut;