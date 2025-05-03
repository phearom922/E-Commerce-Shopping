import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Heart, Layers, Trash2 } from "lucide-react";
import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaBuffer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//===============SavePDF==============
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../order/Invoice";

//===============SavePDF==============
//React Icons
import { BsFillBoxSeamFill } from "react-icons/bs";

//Function
import { getOrders } from "../../functions/users";

const MyOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  // เพิ่ม state ใหม่
  const [activeTab, setActiveTab] = useState("All");

  // สถานะสำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // แสดงทีละ 5 ออเดอร์

  // ฟังก์ชันกรองออเดอร์ตามสถานะ
  const filteredOrders =
    activeTab === "All"
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

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
        setCurrentPage(1); // รีเซ็ตไปหน้าที่ 1 เมื่อโหลดข้อมูลใหม่
      });
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between text-xl font-semibold text-gray-600">
          <div className="flex items-center gap-2 py-5 text-2xl font-semibold text-gray-600">
            Orders History : <div>({sortedOrders?.length})</div>
          </div>
          <div className="flex gap-4 px-5">
            {[
              "All",
              "Not Process",
              "On Processing...",
              "Complete",
              "Cancel",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // รีเซ็ตไปหน้าที่ 1 เมื่อเปลี่ยนแท็บ
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium ${activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {sortedOrders?.length > 0 ? (
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
                    {/* =========Title ============*/}
                    <div className="text-center sm:text-left">
                      {item.products.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-5 text-sm text-gray-600"
                        >
                          <p className="min-w-30">{item?.product?.title}</p>
                          <div className="min-w-15">
                            {item?.product?.discount ? (
                              <span>
                                $
                                {(
                                  item.price -
                                  (item.price * item.product.discount) / 100
                                ).toFixed(2)}
                              </span>
                            ) : (
                              <span>${item.price.toFixed(2)}</span>
                            )}
                          </div>

                          <p>
                            {item.count <= 1
                              ? item.count + " Piece"
                              : item.count + " Pieces"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* =========Address ============*/}
                  <div className="flex justify-between gap-4">
                    <div className="max-w-65 gap-2">
                      <p className="max-w-40 text-sm font-semibold text-gray-700">
                        {item.shippingAddress.fullName}
                      </p>
                      <div className="text-xs text-gray-500">
                        <span>0{item.shippingAddress.phoneNumber}, </span>
                        <span>
                          {item.shippingAddress.area},{" "}
                          {item.shippingAddress.pincode}{" "}
                        </span>
                        <span>{item.shippingAddress.state}</span>
                      </div>
                    </div>

                    {/* =========Date ============*/}

                    <div className="relative flex flex-col text-sm">
                      <p className="text-gray-500">
                        Status :
                        {item.orderStatus === "Complete" ? (
                          <span className="ml-1 text-green-600">
                            {item.orderStatus}
                          </span>
                        ) : item.orderStatus === "Not Process" ? (
                          <span className="ml-1 text-red-600">
                            {item.orderStatus}
                          </span>
                        ) : item.orderStatus === "On Processing..." ? (
                          <span className="ml-1 text-yellow-600">
                            {item.orderStatus}
                          </span>
                        ) : (
                          <span className="ml-1 text-red-600">
                            {item.orderStatus}
                          </span>
                        )}
                      </p>

                      <p className="text-gray-500">
                        Order Date :{" "}
                        <span className="text-gray-700">
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </span>
                      </p>

                      {/*=======save pdf======== */}
                      <div className="mt-2 flex items-center justify-end">
                        <div>
                          <PDFDownloadLink
                            document={<Invoice order={item} />}
                            className="cursor-pointer rounded-xs bg-indigo-700 p-1.5 text-xs text-gray-50"
                            fileName={`${item.shippingAddress.fullName} ${item.createdAt + "_Invoice.pdf"}`}
                          >
                            Download PDF
                          </PDFDownloadLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {item.products.length <= 1 ? "Item" : "Items"} :{" "}
                    {item.products.length}
                  </p>
                  <p className="text-md font-semibold text-gray-500">
                    Total : ${item.cartTotal.toFixed(2)}
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
          <div className="py-12 text-center">
            <Layers className="mx-auto mb-4 h-16 w-16 text-indigo-200" />
            <h3 className="mb-2 text-xl font-medium">
              Your Order list is empty
            </h3>
            <p className="mb-6 text-indigo-600">
              Select the products you are interested in and add them to your
              favorites.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="cursor-pointer rounded-md bg-indigo-700 p-4 text-white hover:bg-indigo-800"
            >
              Shop Now!!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyOrder;
