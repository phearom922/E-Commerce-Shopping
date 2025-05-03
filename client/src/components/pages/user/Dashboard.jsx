import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OrdersDashboard from "../../dashboard/OrderDashboard";
//Function
import { getOrders } from "../../functions/users";


export default function Dashboard() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  // Load orders data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };


console.log(user)
  return (
    <div>
      <OrdersDashboard orders={orders} />
    </div>
  )
}
