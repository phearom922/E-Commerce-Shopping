import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    // console.log(e.target.value)
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?" + text);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg bg-white">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch
              className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
              size={20}
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default Search;
