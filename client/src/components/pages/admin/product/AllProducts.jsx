import SideBarAdmin from "../../../layout/SideBarAdmin";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//Toast
import { toast } from "react-toastify";

//Redux
import { useSelector } from "react-redux";

//ant design
import { Flex, Spin, Select } from "antd";

//Function
import { productList, removeProduct } from "../../../functions/product";

const AllProducts = () => {
  //=================Search User
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);

  //=================Search User
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const result = product.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.productCode.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(search.toLowerCase()), // Safe access using optional chaining
    );
    setFilterProduct(result);
  }, [search, product]); // Depend on search input changes and product updates

  const loadData = (count) => {
    // setLoading(true);
    productList(count)
      .then((res) => {
        setProduct(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
      });
  };

  const handleRemoveProduct = (id) => {
    // console.log(id)
    if (window.confirm("Are you sure to delete ?")) {
      removeProduct(user.token, id)
        .then((res) => {
          toast.success("Delete " + res.data.title + " Success!!");
          loadData(10);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex w-full">
        <div className="fixed my-14">
          <SideBarAdmin />
        </div>
        {/* content in sidebar */}

        <div className="my-14 w-full pl-72">
          <div className="flex flex-col">
            <div className="mx-5 flex items-center justify-between space-x-4">
              <h1 className="py-4 text-xl font-bold text-gray-700">
                All Product List
              </h1>
              <div className="flex gap-2">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-45 rounded bg-gray-100 px-4 py-2 outline-none"
                  placeholder="Product Name..."
                  type="text"
                />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-45 rounded bg-gray-100 px-4 py-2 outline-none"
                  placeholder="Product Code..."
                  type="text"
                />
                <Select
                  style={{ width: 120, height: 40 }}
                  defaultValue="all"
                  onChange={(e) => setSearch(e)} // Convert to lowercase
                >
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="Nutrinal">Nutrinal</Select.Option>
                  <Select.Option value="Smart Creative">Creative</Select.Option>
                  <Select.Option value="Neatly Home">Neatly Home</Select.Option>
                  <Select.Option value="S Mone">S Mone</Select.Option>
                </Select>
              </div>
            </div>

            {/*=================== Table */}

            <div className="overflow">
              <div className="inline-block min-w-full">
                <div className="mx-5 overflow-hidden rounded border-1 border-gray-200">
                  <table className="text-surface min-w-full overflow-hidden rounded text-left text-sm font-light shadow">
                    <thead className="border-b border-neutral-200 bg-white font-light">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Pic
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Product Code
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Product Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Stock Quantity
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {/* //Data */}

                    <tbody>
                      {filterProduct.map((item, index) => (
                        <tr
                          key={item._id}
                          className="border-b border-neutral-200 bg-black/[0.02] text-gray-600 hover:bg-gray-200"
                        >
                          <td className="px-6 py-3 font-medium whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-1 font-medium whitespace-nowrap">
                            {item.images?.length > 0 && item.images[0]?.url ? (
                              <div className="relative min-w-14">
                                <img
                                  className="h-14 w-14 overflow-hidden rounded object-cover shadow"
                                  src={item.images[0].url}
                                  alt="Product Image"
                                />
                                <div className="absolute top-0 left-0 h-3 w-3 p-0.5 flex items-center justify-center text-[8px] rounded-full bg-gray-300">
                                  {item.images.length}
                                </div>
                              </div>
                            ) : (
                              <div className="flex h-15 w-15 items-center justify-center rounded text-center text-xs text-gray-400 shadow">
                                No <br />
                                Image
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {item.productCode}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {item.title}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {item.category ? (
                              item.category.name
                            ) : (
                              <span className="text-red-700">no category</span>
                            )}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {item.price.toFixed(2)} usd
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            {item.quantity}
                          </td>

                          <td className="px-6 py-3">
                            <div className="flex gap-2">
                              <Link to={"/admin/update-product/" + item._id}>
                                <svg
                                  // ==============Edit Category=================

                                  // onClick={() => showModal(item._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-7 cursor-pointer rounded-xs bg-blue-500 p-1.5 text-white hover:bg-blue-600"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                              </Link>

                              <svg
                                onClick={() => handleRemoveProduct(item._id)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-7 cursor-pointer rounded-xs bg-red-500 p-1.5 text-white hover:bg-red-700"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Loading...     */}
                    {loading ? (
                      <tfoot>
                        <tr className="border-b border-neutral-200 bg-black/[0.02] hover:bg-gray-200 dark:border-white/10">
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-6 font-medium whitespace-nowrap">
                            <Flex gap="middle">
                              <Spin tip="Loading..." size="small">
                                Loading Data...
                              </Spin>
                            </Flex>
                          </td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                        </tr>
                      </tfoot>
                    ) : product.length ? (
                      ""
                    ) : (
                      <tfoot>
                        <tr className="border-b border-neutral-200 bg-black/[0.02] hover:bg-gray-200 dark:border-white/10">
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-6 font-medium whitespace-nowrap">
                            No Data
                          </td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                          <td className="px-6 py-3 font-medium whitespace-nowrap"></td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
