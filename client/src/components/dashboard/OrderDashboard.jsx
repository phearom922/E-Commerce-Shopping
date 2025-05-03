import React from "react";
import moment from "moment";
import { OctagonAlert, CheckCheck, CircleX, Truck } from 'lucide-react';
import CountUp from "react-countup"



const OrdersDashboard = ({ orders }) => {
    // คำนวณข้อมูลสำหรับ Dashboard จาก orders
    const today = moment().startOf('day');

    // คำสั่งซื้อวันนี้
    const todayOrders = orders.filter(order =>
        moment(order.createdAt).isSame(today, 'day')
    );

    // คำสั่งซื้อเดือนนี้
    const thisMonthOrders = orders.filter(order =>
        moment(order.createdAt).isSame(moment(), 'month')
    );

    // สถิติต่างๆ
    const stats = {
        totalOrdersToday: todayOrders.length,
        totalExpenseToday: todayOrders.reduce((sum, order) => sum + order.cartTotal, 0),
        totalExpense: orders.reduce((sum, order) => sum + order.cartTotal, 0),
        completeOrders: todayOrders.filter(o => o.orderStatus === 'Complete').length,
        notProcessOrders: todayOrders.filter(o => o.orderStatus === 'Not Process').length,
        onProcessOrders: todayOrders.filter(o => o.orderStatus === 'On Processing...').length,
        cancelOrders: todayOrders.filter(o => o.orderStatus === 'Cancel').length,
    };

    // คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง (ตัวอย่างเท่านั้น)
    const trends = {
        ordersTrend: '+80%', // ในทางปฏิบัติควรคำนวณจากข้อมูลเปรียบเทียบ
        expenseTrend: '+10%',
        completeTrend: '+50%',
        notProcessTrend: '+25%',
        onProcessTrend: '+15%',
        cancelTrend: '+15%',
    };

    // เรียงลำดับธุรกรรมล่าสุด
    const recentTransactions = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="p-6">
            {/* ส่วนหัว Dashboard */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Orders Dashboard</h1>
                <p className="text-gray-600">Overview of your orders and performance</p>
            </div>

            {/* สถิติแบบ Card */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {/* Card 1: Total Orders */}
                <div className="rounded-lg bg-green-100 p-6 shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Orders | Today</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-800">
                                <CountUp start={0} end={stats.totalOrdersToday} delay={0}></CountUp> Orders
                            </p>
                        </div>
                        <div className="rounded-full bg-green-300 px-3 py-1 text-sm font-medium text-green-800">
                            {trends.ordersTrend}
                        </div>
                    </div>
                </div>

                {/* Card 2: Total Expense Today */}
                <div className="rounded-lg bg-red-100 p-6 shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Expense | Today</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-800">
                                $<CountUp start={0} end={stats.totalExpenseToday.toFixed(2)} delay={0}></CountUp>

                            </p>
                        </div>
                        <div className="rounded-full bg-red-300 px-3 py-1 text-sm font-medium text-red-800">
                            {trends.expenseTrend}
                        </div>
                    </div>
                </div>

                {/* Card 3: Total Expense */}
                <div className="rounded-lg bg-blue-200 p-6 shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Expense | Monthly</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-800">
                                
                                $<CountUp start={0} end={stats.totalExpense.toFixed(2)} delay={0}></CountUp>
                            </p>
                        </div>
                        <div className="rounded-full bg-blue-300 px-3 py-1 text-sm font-medium text-green-800">
                            {trends.expenseTrend}
                        </div>
                    </div>
                </div>
                {/* Card 4: Total Expense */}
                <div className="rounded-lg bg-blue-800 p-6 shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">Total Orders | Monthly</p>
                            <p className="mt-1 text-2xl font-semibold text-white">
                               
                                <CountUp start={0} end={orders.length} delay={0}></CountUp> <span className="text-xl">Orders</span>
                            </p>
                        </div>
                        <div className="rounded-full bg-blue-200 px-3 py-1 text-sm font-medium text-green-800">
                            {trends.expenseTrend}
                        </div>
                    </div>
                </div>

                {/* Card 4: Achievement */}
                {/* <div className="rounded-lg bg-indigo-50 p-6 shadow">
                    <p className="text-sm font-medium text-indigo-800">What a great achievement!</p>
                    <p className="mt-1 text-indigo-700">
                        {stats.totalExpense > 10000
                            ? "Your income this month has exceeded the target"
                            : "Keep going! You're on the right track"}
                    </p>
                    <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        See more
                    </button>
                </div> */}
            </div>

            {/* สถิติสถานะคำสั่งซื้อ */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 mb-8">
                {[
                    { status: "Complete", count: stats.completeOrders, trend: trends.completeTrend, icon: <CheckCheck />, bg: "green" },
                    { status: "Not Process", count: stats.notProcessOrders, trend: trends.notProcessTrend, icon: <OctagonAlert />, bg: "red" },
                    { status: "On Process", count: stats.onProcessOrders, trend: trends.onProcessTrend, icon: <Truck />, bg: "yellow" },
                    { status: "Cancel", count: stats.cancelOrders, trend: trends.cancelTrend, icon: <CircleX />, bg: "red" },

                ].map((item) => (
                    <div key={item.status} className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{item.status} | <br /> Today</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-800">{item.count}</p>
                            </div>
                            <div className={`rounded-full bg-${item.bg}-100 px-3 py-3 text-sm font-medium text-${item.bg}-800`}>
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ตารางธุรกรรมล่าสุด */}
            <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Transaction</h2>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        See All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Orders ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Total Prices
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {recentTransactions.map((order) => (
                                <tr key={order._id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600" />
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {order._id.slice(-12)} {/* แสดงเฉพาะส่วนท้ายของ ID */}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-500">
                                            {moment(order.createdAt).format("MMM D, YYYY")}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            ${order.cartTotal.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${order.orderStatus === "Complete"
                                            ? "bg-green-100 text-green-800"
                                            : order.orderStatus === "Not Process"
                                                ? "bg-red-100 text-red-800"
                                                : order.orderStatus === "On Processing..."
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersDashboard;