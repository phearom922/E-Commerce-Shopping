import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../../layout/SideBarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FileUpload from "./FileUpload";

//ant design
import { Alert, Flex, Spin } from "antd";

//Function
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  images: [],
  categories: [],
  category: "",
  productCode: "",
  quantity: "",
  discount: 0,
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [clearImage, setClearImage] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (token) => {
    listCategory(token)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("Add : " + res.data.title + " Success!!");
        window.location.reload();
        setValues(initialState);
        // setClearImage(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };


  


  return (
    <div className="flex w-full">
      <div className="fixed z-20 my-14">
        <SideBarAdmin />
      </div>
      {/* content in sidebar */}

      <div className="relative my-14 pl-72">
        <form>
          <div className="mx-5">
            <h1 className="py-4 text-xl font-bold text-gray-700">
              Create Product
            </h1>
            <div className="space-y-5">
              <label className="text-sm text-gray-700">Product Images</label>
              {/* ================Product Image================= */}
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
                loading={loading}
                // clearImage={clearImage}
                // setClearImage={setClearImage}
              />

              {/* ======================= */}
              <div className="flex w-2xl gap-2">
                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">Product Name</label>
                  <input
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    placeholder="Type here"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">Price</label>
                  <input
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    placeholder="Type here"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">Discount</label>
                  <input
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    placeholder="Ex. 10% "
                    type="number"
                    name="discount"
                    value={values.discount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ================Box template================= */}

              <div className="flex w-2xl flex-col space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700">
                    Product Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ================Box template================= */}
              <div className="flex w-2xl gap-2">
                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">Category Name</label>
                  <select
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    name="category"
                    onChange={handleChange}
                  >
                    <option>Choose a category</option>
                    {values.categories.length > 0 &&
                      values.categories.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">Product Code</label>
                  <input
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    placeholder="Type here"
                    type="text"
                    name="productCode"
                    value={values.productCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex w-full flex-col space-y-1">
                  <label className="text-sm text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    className="w-full rounded-xs bg-gray-100 px-4 py-2 outline-none"
                    placeholder="Type here"
                    type="number"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="primary"
                onClick={handleSubmit}
                className="mt-2 cursor-pointer rounded-xs bg-cyan-600 px-6 py-2 font-semibold text-white opacity-100"
              >
                ADD
              </button>
            </div>
          </div>
        </form>

        {/*========= Uploading ==============*/}

        {/* {upload ? (
          <div className="absolute top-0 left-40 z-30 flex h-screen w-full items-center justify-center">
            <Flex gap="middle" vertical>
              <Flex gap="middle">
                <Spin tip="Uploading..." size="large">
                  Uploading...
                </Spin>
              </Flex>
            </Flex>
            <div className="absolute h-full w-4xl bg-gray-100 opacity-80"></div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default CreateProduct;
