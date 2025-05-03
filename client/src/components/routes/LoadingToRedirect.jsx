import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";


const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    // redirect once count is equal to 0
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center">
      <FaLock className="text-4xl" />
      <h1 className="text-3xl font-bold">Access to this page is restricted </h1>
      <h1 className="text-xl">
        Redirecting you in{" "} <span className="font-semibold text-red-700">{count}</span> seconds
      </h1>
    </div>
  );
};

export default LoadingToRedirect;
