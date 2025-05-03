import React, { useEffect, useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Slider, Checkbox } from "antd";

//Function
import { listCategory } from "../functions/category";

const FilterProducts = ({ fetchDataFilter, loadData }) => {
  //filter Category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  useEffect(() => {
    listCategory().then((res) => setCategory(res.data));
  }, []);

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    setCategorySelect(prev => {
      const newSelection = [...prev];
      const findCheck = newSelection.indexOf(inCheck);
      
      if (findCheck === -1) {
        newSelection.push(inCheck);
      } else {
        newSelection.splice(findCheck, 1);
      }
      
      fetchDataFilter({ category: newSelection });
      
      if (newSelection.length < 1) {
        setTimeout(() => {
          loadData();
        }, 300);
      }
      
      return newSelection;
    });
  };

  // Price filter
  const [price, setPrice] = useState([0, 100]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDataFilter({ price });
  }, [search]);

  const handleSliderChange = (value) => {
    setPrice(value);
    setTimeout(() => {
      setSearch(!search);
    }, 500);
  };

  const handleInputChange = (index, value) => {
    const newPrice = [...price];
    newPrice[index] = Number(value);
    setPrice(newPrice);
  };

  return (
    <div className="relative bg-white">
      {/* Search / Filter Toggle */}
      <div className="relative">
        <button
          className={`absolute ${isFiltersOpen && "bg-gray-200"} top-1/2 right-3 z-20 flex -translate-y-1/2 transform cursor-pointer items-center justify-center gap-3 rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filter Products
          <LuSlidersHorizontal size={20} />
        </button>
      </div>

      {/* Filters Panel */}
      <div
        className={`-top-7 right-1 space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isFiltersOpen
            ? "absolute block w-md rounded-lg border border-gray-200 bg-white/80 p-4 backdrop-blur-sm"
            : "absolute h-0 w-0 rounded-lg border border-gray-200 bg-white/80 opacity-0 backdrop-blur-sm"
        }`}
      >
        {/* Price Range */}
        <div>
          <h3 className="mb-5 text-sm font-medium text-gray-700">
            Price Range
          </h3>
          <Slider
            range
            min={0}
            max={100}
            onChange={handleSliderChange}
            value={price}
          />
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              value={price[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="w-24 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              max="100"
              value={price[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="w-24 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <h3 className="mt-5 border-t-1 border-gray-300 py-2 text-sm font-medium text-gray-700">
              Filter by Category
            </h3>
            <div className="grid grid-cols-3">
              {category.map((item) => (
                <Checkbox 
                  key={item._id}
                  value={item._id}
                  checked={categorySelect.includes(item._id)}
                  onChange={handleCheck}
                >
                  {item.name}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;