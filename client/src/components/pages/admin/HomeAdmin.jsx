import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../layout/SideBarAdmin";
import { useSelector } from "react-redux";
import OrdersDashboardAdmin from "../../dashboard/OrderDashboardAdmin";
//Function
import { getAllOrder } from "../../functions/admin";


//=================Create Category===================
const HomeAdmin = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  // Load orders data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllOrder(user.token).then((res) => {
      setOrders(res.data);
    });
  };


console.log(orders)

  return (
    <>
      <div className="flex w-full">
        <div className="fixed my-14">
          <SideBarAdmin />
        </div>
        {/* content in sidebar */}

        <div className="my-14 w-full pl-72">
          <div className="flex flex-col">
            <div className="mx-5 flex items-center gap-x-5">
              <div className="flex gap-x-5">
                <h1 className="py-4 font-bold text-gray-700">
                  <OrdersDashboardAdmin orders={orders} />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
