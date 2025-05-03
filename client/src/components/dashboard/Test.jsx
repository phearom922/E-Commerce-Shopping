import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Heart, Layers, Trash2 } from "lucide-react";
import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaBuffer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../order/Invoice";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { getOrders } from "../../functions/users";

const MyOrder = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
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
            {/* ส่วน Dashboard ที่เพิ่มเข้ามา (ถ้ามี) */}

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
                        {/* แสดงเฉพาะออเดอร์ในหน้าปัจจุบัน */}
                        {currentOrders.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-4 border-b border-indigo-100 pb-6"
                            >
                                {/* ส่วนแสดงรายละเอียดออเดอร์ (โค้ดเดิม) */}
                                <div className="flex items-center justify-between gap-2">
                                    {/* ...โค้ดเดิม... */}
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