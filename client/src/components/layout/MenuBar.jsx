import React from "react";
import brandLogo from "../../../public/Brand_Logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Search from "../shop/Search";
import { LogOut } from "lucide-react";
//Ant
import { Avatar, Badge, Space } from "antd";
import { toast } from "react-toastify";
//Icon
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import UserDropdown from "./UserDropdown";

//Redux
import { useSelector, useDispatch } from "react-redux";


const MenuBar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/shop",
      name: "Shop",
    },
    {
      path: "/contact",
      name: "Contact",
    },
    // {
    //   path: "/order",
    //   name: "Telegram",
    // },
    // {
    //   path: "/cart",
    //   name: (
    //     <Badge count={cart.length} size="middle" offset={[9,0]}>
    //       <IoCartOutline className="text-xl" />
    //     </Badge>
    //   ),
    // },
  ];
// កូដដើ==============
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user, cart } = useSelector((state) => ({ ...state }));

  // const handleLogout = () => {
  //   dispatch({
  //     type: "LOGOUT",
  //     payload: null,
  //   });
  //   navigate("/");
  // };
  

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch({ type: "LOGOUT", payload: null });
      toast.success("Logged out successfully!");
      navigate("/");
    };


  return (
    <div className="fixed top-0 z-40 w-full bg-white px-4 py-2 shadow">
      <ul
        className={
          user?.role === "admin" ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        }
      >
        <li className="flex justify-between">
          <div className="flex items-center justify-center space-x-2">
            <Link to="/" className="font-semibold text-gray-700" href="/">
              <img className="w-36 pl-2" src={brandLogo} alt="logo" />
            </Link>
          </div>

          {/* =======Navbar========= */}
          <div id="menu" className="flex items-center justify-center gap-1">
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="rounded-full px-3 py-2 text-sm transition-all duration-200 hover:bg-gray-100 hover:text-indigo-600"
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/cart" className="flex rounded-xl bg-gray-200 p-2">
              <Badge count={cart.length} size="middle" offset={[5, 0]}>
                <IoCartOutline size={19} />
              </Badge>
            </Link>
          </div>
          {/* =======Navbar========= */}

          {/* ================not login================= */}

          <div className="flex space-x-2">
            <div>
              {/* <FilterProducts /> */}
              <Search />
            </div>
            {!user.token  && (
              <div className="space-x-2 py-2">
                <Link
                  to="/login"
                  className="rounded-sm px-5 py-2 font-semibold text-gray-700 transition-all hover:bg-indigo-100 hover:shadow"
                  href="/"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-sm px-10 py-2 font-semibold ring-1 ring-gray-400 transition-all hover:border-0 hover:bg-indigo-700 hover:text-white"
                  href="/"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <div>
              {user?.role === "admin" ? (
                <>
                  <div
                    className="group relative flex cursor-pointer items-center  rounded px-8 py-2 font-medium transition-all duration-300 "
                    href="/"
                  >
                    <FaUserCircle className="mx-1 rounded-full p-[1px] text-2xl text-gray-700 ring-1" />{" "}
                    {user.username}
                    <IoMdArrowDropdown />
                    <div className="absolute top-[100%] right-10 w-full rounded-md border hidden border-gray-100  bg-white leading-none shadow-xl transition-all group-hover:block">
                      {/* <Link to="/admin/index">

                        <div className="py-1 text-center text-sm text-gray-700">

                          Username : {user.username} <br />
                          <p className="text-xs font-light text-green-600">
                            {user.role}
                          </p>
                        </div>
                      </Link> */}
                      <Link to="/admin/index">
                        <div className="text-sm text-center rounded-md hover:bg-indigo-100 hover:text-indigo-600 m-2  py-2 ">
                          My Dashboard
                        </div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 border-t border-gray-300 py-4  hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : user?.role === "user" ? (
                <>
                  <UserDropdown user={user} logout={handleLogout} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
