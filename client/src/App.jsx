import MenuBar from "./components/layout/MenuBar";
import React, { useState, useEffect } from "react";
import { Routes, Router, Route, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import Shop from "./components/pages/Shop";
import ProductDetail from "./components/pages/ProductDetail";
import Cart from "./components/pages/Cart";
// import SendTelegram from "./components/pages/user/SendTelegram"
//react-toastify
import { ToastContainer } from "react-toastify";

//page admin
import HomeAdmin from "./components/pages/admin/HomeAdmin";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import AllProducts from "./components/pages/admin/product/AllProducts";
import ManageOrder from "./components/pages/admin/ManageOrder";

//page user
import CheckOut from "./components/pages/CheckOut";
import Dashboard from "./components/pages/user/Dashboard";
import Profile from "./components/pages/user/Profile";
import Wishlist from "./components/pages/user/Wishlist";
import MyOrder from "./components/pages/user/MyOrder";
import Settings from "./components/pages/user/Settings";
import ContactUs from "./components/pages/ContactUs";

//Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import RootLayoutUser from "./components/layout/RootLayoutUser";

//functions
import { currentUser } from "./components/functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      currentUser(token)
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: {
              token,
              username: res.data.username,
              role: res.data.role,
            },
          });
          setIsInitialLoad(false);
        })
        .catch((err) => {
          console.error("Error verifying token:", err);
          if (err.response?.status === 401 || err.response?.status === 404) {
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT", payload: null });
            navigate("/login");
          } else {
          
            // ใช้ข้อมูลจาก state ปัจจุบันถ้ามี
            dispatch({
              type: "LOGIN",
              payload: {
                token,
                username: user?.username || null,
                role: user?.role || null,
              },
            });
          }
          setIsInitialLoad(false);
          localStorage.removeItem("token");
        });
    } else {
     
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT", payload: null });
      if (isInitialLoad) {
        // navigate("/login");
        setIsInitialLoad(false);
      }
    }
  }, [dispatch, isInitialLoad]);




  return (
    <div>
      <ToastContainer theme="colored" />
      <MenuBar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        {/* <Route path="/order" element={<SendTelegram />} /> */}

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/all-product"
          element={
            <AdminRoute>
              <AllProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-order"
          element={
            <AdminRoute>
              <ManageOrder />
            </AdminRoute>
          }
        />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <RootLayoutUser>
                <Profile />
              </RootLayoutUser>
            </UserRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <RootLayoutUser>
                <Dashboard />
              </RootLayoutUser>
            </UserRoute>
          }
        />

        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <RootLayoutUser>
                <Wishlist />
              </RootLayoutUser>
            </UserRoute>
          }
        />

        <Route
          path="/user/my-order"
          element={
            <UserRoute>
              <RootLayoutUser>
                <MyOrder />
              </RootLayoutUser>
            </UserRoute>
          }
        />

        <Route
          path="/user/settings"
          element={
            <UserRoute>
              <RootLayoutUser>
                <Settings />
              </RootLayoutUser>
            </UserRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
