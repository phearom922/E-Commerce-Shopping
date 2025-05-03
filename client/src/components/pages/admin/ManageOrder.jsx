import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../layout/SideBarAdmin";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// React Icons
import { BsFillBoxSeamFill } from "react-icons/bs";
import { Heart, Layers, Trash2 } from "lucide-react";

// react-toastify
import { toast } from "react-toastify";

// ant design
import { Switch, Select, Modal } from "antd";

// function
import { updateStatusOrder, getAllOrder } from "../../functions/admin";

const STATUS_OPTIONS = ["Not Process", "On Processing...", "Complete", "Cancel"];
const TAB_OPTIONS = ["All", ...STATUS_OPTIONS];

const ManageOrder = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);


  // สถานะสำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // แสดงทีละ 5 ออเดอร์


  // กรองออเดอร์ตามสถานะ
  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter((item) => item.orderStatus === activeTab);

  // เรียงวันที่ล่าสุดขึ้นก่อน
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // คำนวณ Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // ฟังก์ชันเปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAllOrder(user.token);
      setOrders(res.data);
      setCurrentPage(1); // รีเซ็ตไปหน้าที่ 1 เมื่อโหลดข้อมูลใหม่
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (orderId, orderStatus) => {
    try {
      const res = await updateStatusOrder(user.token, orderId, orderStatus);
      toast.success(`Updated to ${res.data.orderStatus} successfully!`);
      loadData();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };

  const renderStatusOption = (status) => {
    const colorMap = {
      "Complete": "text-green-600",
      "Not Process": "text-red-600",
      "On Processing...": "text-yellow-600",
      "Cancel": "text-red-600"
    };

    return (
      <span className={colorMap[status] || "text-gray-600"}>
        {status}
      </span>
    );
  };

  const renderProductItem = (product) => {
    const discountedPrice = product.product?.discount
      ? (product.price - (product.price * product.product.discount) / 100).toFixed(2)
      : product.price.toFixed(2);

    return (
      <div key={product._id} className="flex gap-5 text-sm text-gray-600">
        <p className="min-w-30">{product?.product?.title || "N/A"}</p>
        <div className="min-w-15">${discountedPrice}</div>
        <p>{product.count} {product.count === 1 ? "Piece" : "Pieces"}</p>
      </div>
    );
  };

  const renderAddress = (address) => (
    <div className="max-w-65 gap-2">
      <p className="max-w-40 text-sm font-semibold text-gray-700">
        {address?.fullName || "N/A"}
      </p>
      <div className="text-xs text-gray-500">
        {address?.phoneNumber && <span>0{address.phoneNumber}, </span>}
        {address?.area && <span>{address.area}, </span>}
        {address?.pincode && <span>{address.pincode} </span>}
        {address?.state && <span>{address.state}</span>}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="py-12 text-center">
      <Layers className="mx-auto mb-4 h-16 w-16 text-indigo-200" />
      <h3 className="mb-2 text-xl font-medium">Your Order list is empty</h3>
      <p className="mb-6 text-indigo-600">
        Select the products you are interested in and add them to your favorites.
      </p>
      <button
        onClick={() => navigate("/shop")}
        className="cursor-pointer rounded-md bg-indigo-700 p-4 text-white hover:bg-indigo-800"
      >
        Shop Now!!
      </button>
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="fixed my-14">
        <SideBarAdmin />
      </div>

      <div className="my-14 w-full pl-72">
        <div className="flex flex-col">
          <div className="mx-5 flex items-center justify-between space-x-4">
            <div className="flex items-center gap-4 py-4 text-xl font-bold text-gray-700">
              <h1>Manage Order List</h1>
              <div className="flex gap-4">
                {TAB_OPTIONS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab)
                      setCurrentPage(1); // รีเซ็ตไปหน้าที่ 1 เมื่อเปลี่ยนแท็บ
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer ${activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <h1 className="py-4 text-xl font-bold text-gray-700">
              Total Order : {sortedOrders.length}
            </h1>
          </div>

          <div className="mx-5">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
              </div>
            ) : sortedOrders.length > 0 ? (
              <div className="space-y-6 rounded-2xl border border-gray-200 p-8">
                {currentOrders.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 border-b border-indigo-100 pb-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded border-[0.5px] border-indigo-300 bg-indigo-50">
                          <div className="flex h-16 w-16 items-center justify-center object-contain">
                            <BsFillBoxSeamFill
                              size={45}
                              className="text-indigo-600"
                            />
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          {item.products.map(renderProductItem)}
                        </div>
                      </div>

                      <div className="flex justify-between gap-4">
                        {renderAddress(item.shippingAddress)}

                        <div className="relative flex flex-col space-y-3 text-sm">
                          <div className="text-gray-500">
                            <span className="mr-1">Status:</span>
                            <Select
                              onChange={(value) => handleChangeStatus(item._id, value)}
                              className="w-35"
                              value={item.orderStatus}
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <Select.Option value={status} key={status}>
                                  {renderStatusOption(status)}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                          <div className="text-gray-500">
                            <span className="text-gray-700">
                              Order Date :{" "}
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-gray-500">
                          {item.products.length === 1 ? "Item" : "Items"} :{" "}
                          {item.products.length}
                        </p>
                        <span className="text-gray-500">
                          OrderBy :{" "}
                          <span className="font-semibold">
                            {item.orderBy?.username || "N/A"}
                          </span>
                        </span>
                      </div>
                      <p className="text-md font-semibold text-gray-500">
                        Total : ${item.cartTotal?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                ))}

                {/* ส่วน Pagination */}
                {sortedOrders.length > ordersPerPage && (
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-500">
                      Showing {indexOfFirstOrder + 1} to{" "}
                      {Math.min(indexOfLastOrder, sortedOrders.length)} of{" "}
                      {sortedOrders.length} orders
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          }`}
                      >
                        Previous
                      </button>

                      {/* แสดงปุ่มหมายเลขหน้า */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded-md ${currentPage === number
                              ? "bg-indigo-600 text-white"
                              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                              }`}
                          >
                            {number}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;