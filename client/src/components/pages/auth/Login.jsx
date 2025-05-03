import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// Firebase
import { auth, googleProvider } from "../../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { login } from "../../functions/auth";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // ล็อกอินด้วย username/password ปกติ
  const handleLogin = (e) => {
    e.preventDefault();
    login(values)
      .then((res) => {
        toast.success("Login Success");

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.data.token);
          console.log("Token stored after normal login:", localStorage.getItem("token"));
        }

        let intended = location.state;
        if (intended) {
          navigate("../" + intended);
        } else {
          if (res.data.payload.user.role === "admin") {
            navigate("/admin/index");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error(err.response?.data?.error || "Login failed");
      });
  };

  // ล็อกอินด้วย Google ด้วย signInWithPopup
  const handleGoogleLogin = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT", payload: null });

      const result = await signInWithPopup(auth, googleProvider);
      console.log("Popup result:", result);
      const user = result.user;

      // ดึง ID token จาก Firebase
      const idToken = await user.getIdToken();
      console.log("Firebase ID token:", idToken);

      // ส่ง ID token ไปยังเซิร์ฟเวอร์เพื่อตรวจสอบและสร้าง JWT
      const response = await axios.post(
        `${import.meta.env.REACT_APP_KEY}/google-login`,
        { idToken }
      );

      // รับ JWT และข้อมูลผู้ใช้จากเซิร์ฟเวอร์
      const { token, payload } = response.data;
      console.log("Server response:", response.data);

      // อัปเดต Redux state
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          username: payload.user.username,
          role: payload.user.role,
        },
      });

      // เก็บ token ใน localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        console.log("Token stored after Google login:", localStorage.getItem("token"));
      }

      toast.success("Google Login Success");

      // Redirect
      let intended = location.state;
      if (intended) {
        navigate("../" + intended);
      } else {
        if (payload.user.role === "admin") {
          navigate("/admin/index");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
              value={values.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={handleShowPassword}
              className="absolute cursor-pointer right-4 bottom-2 text-gray-500 text-xl"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 cursor-pointer text-white hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* ปุ่มล็อกอินด้วย Google */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;