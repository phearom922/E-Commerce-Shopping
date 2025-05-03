//react-toastify
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
//icon
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import React, { useState } from "react";
//function
import { register } from "../../functions/auth";

const Register = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "",
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (value.password !== value.password1) {
      toast.error("Password not match");
    } else if (value.username.length < 1) {
      toast.error("Please Type Username");
    } else if (value.password.length < 6) {
      toast.error("Password must be at least 6 digits.");
    } else {
      register(value)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
              htmlFor="username"
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="flex flex-col mb-6 relative">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Password
            </label>

            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              // placeholder="Username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <span
              onClick={handleShowPassword}
              className="absolute cursor-pointer right-4 bottom-2 text-gray-500 text-xl "
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div className="flex flex-col mb-6 relative">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Password
            </label>

            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password1"
              // placeholder="Username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <span
              onClick={handleShowPassword}
              className="absolute cursor-pointer right-4 bottom-2 text-gray-500 text-xl "
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <button
            id='button'
            className={`relative bg-blue-600 mt-2 py-3 w-full  px-6 rounded-md font-semibold text-white ${value.password.length < 6
              ? "cursor-not-allowed disabled:cursor-not-allowed opacity-50"
              : "cursor-pointer opacity-100"
              }`}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
