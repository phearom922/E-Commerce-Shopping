import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import SideBarAdmin from "../../../layout/SideBarAdmin";
import { Link } from "react-router-dom";

//Tost
import { toast } from "react-toastify";

//Function
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

//ant design
import { Alert, Flex, Spin } from "antd";

const initialState = {
  title: "",
  description: "",
  price: "",
  images: [],
  categories: [],
  category: "",
  productCode: "",
  quantity: "",
  discount: "",
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) loadData();
  }, [params.id]);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        //
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        //
        console.log(err);
      });

    listCategory(user.token)
      .then((res) => {
        //
        setCategory(res.data);
      })
      .catch((err) => {
        //
        console.log(err);
      });
  };

  // const [loading, setLoading] = useState(false);
  // const [clearImage, setClearImage] = useState(false);
  // const [upload, setUploading] = useState(false);

  //ant design

  //ant design

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!values._id) {
      toast.error("Invalid product ID");
      return;
    }

    updateProduct(user.token, values._id, values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.info("Updated: " + res.data.title);
        navigate("/admin/all-product");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response?.data || "Update failed");
      });
  };

  return (
    <div className="flex w-full">
      <div className="fixed my-14">
        <SideBarAdmin />
      </div>
      {/* content in sidebar */}

      <div className="relative mx-auto flex h-screen w-full items-center justify-center">
        <form className="absolute z-[60] rounded border bg-white pb-6">
          <div className="mx-5">
            <h1 className="py-4 text-xl font-bold text-gray-700">
              Update Product
            </h1>
            <div className="space-y-5">
              <label className="text-sm text-gray-700">Product Images</label>
              {/* ================Product Image================= */}
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
                loading={loading}
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
                    rows={5}
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
                    value={values.category ? values.category._id : ""}
                  >
                    <option>Choose a category</option>
                    {category.length > 0 &&
                      category.map((item) => (
                        <option value={item._id} key={item._id}>
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

              <div className="space-x-2">
                <Link to="/admin/all-product">
                  <button
                    type="primary"
                    className="mt-2 cursor-pointer rounded-xs bg-red-600 px-6 py-2 font-semibold text-white opacity-100"
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  type="primary"
                  onClick={handleSubmit}
                  className="mt-2 cursor-pointer rounded-xs bg-blue-700 px-6 py-2 font-semibold text-white opacity-100"
                >
                  {loading ? "Update..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="z-[55] inline-block h-screen w-full bg-black opacity-70"></div>

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

export default UpdateProduct;
