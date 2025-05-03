import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../../layout/SideBarAdmin";
import moment from "moment";

//Redux
import { useSelector } from "react-redux";

//react-toastify
import { toast } from "react-toastify";

//ant design
import { Modal } from "antd";

//Function
import {
  createCategory,
  listCategory,
  deleteCategory,
  editCategory,
} from "../../../functions/category";


//=================Create Category===================
const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    name: "",
  });

  const handleChangeCategory = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.length < 1) {
      toast.error("Please Input Category Name");
    } else {
      createCategory(user.token, values)
        .then((res) => {
          console.log(res);
          setValues({ name: "" });
          loadData(user.token);
          toast.success("Create Category : " + res.data.name + " successful");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //=================List Category===================
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (token) => {
    listCategory(token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=================Delete Category===================
  const handleRemove = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("Delete Category : " + res.data.name + " successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=================Update Category===================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
  });

  const showModal = (id) => {
    setIsModalOpen(true);
    setNewCategory({ ...newCategory, id: id });
  };

  const handleUpdateCategory = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (newCategory.name.length < 1) {
      toast.error("Please Input New Category");
    } else {
      editCategory(user.token, newCategory.id, { newCategory })
        .then((res) => {
          // console.log(res);
          toast.update("Update Category : " + res.data.name + " successful");
          setNewCategory({ name: "" });
          loadData(user.token);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full">
      <div className="fixed my-14">
        <SideBarAdmin />
      </div>
      {/* content in sidebar */}
      <div className="my-14 w-full pl-72">
        <div className="flex flex-col">
          <div className="mx-5 flex items-center gap-x-5">
            <div className="flex gap-x-5">
              <h1 className="py-4 text-xl font-bold text-gray-700">
                Manage Category
              </h1>
              <input
                onChange={handleChangeCategory}
                className="my-2 w-65 rounded bg-gray-100 px-4 py-2 outline-none"
                placeholder="Add Category"
                type="text"
                name="name"
                value={`${values.name}`}
              />
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className={`my-2 rounded-xs bg-blue-600 px-6 py-2 text-white ${
                  values.name.length < 1
                    ? "cursor-not-allowed opacity-50 disabled:cursor-not-allowed"
                    : "cursor-pointer opacity-100"
                }`}
              >
                Add
              </button>
            </div>
          </div>

          {/* =======================Table ===================*/}
          <div className="overflow">
            <div className="inline-block min-w-full">
              <div className="mx-5 overflow-hidden rounded border-1 border-gray-200">
                <table className="text-surface min-w-full overflow-hidden rounded text-left text-sm font-light shadow ">
                  <thead className="dark:bg-body-dark border-b border-neutral-200 bg-white font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Category Name
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Updated
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-neutral-200 bg-black/[0.02] hover:bg-gray-200 "
                      >
                        <td className="px-6 py-3 font-medium whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          {item.name}
                        </td>

                        <td className="px-6 py-3 whitespace-nowrap">
                          {moment(item.createdAt).format(
                            "DD/MM/YYYY, h:mm:ss a",
                          )}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          {moment(item.updatedAt)
                            .startOf(item.updatedAt)
                            .fromNow()}
                        </td>
                        <td className="flex gap-2 px-6 py-3 whitespace-nowrap">
                          <svg
                            // ==============Edit Category=================
                            onClick={() => showModal(item._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7 cursor-pointer rounded-xs bg-blue-500 p-1.5 text-white hover:bg-blue-600"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>

                          <svg
                            onClick={() => handleRemove(item._id)}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal
                  title="Change Category Name"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div className="flex w-70 flex-col">
                    {/* <label>New Password :</label> */}
                    <input
                      onChange={handleUpdateCategory}
                      type="text"
                      name="name"
                      placeholder="New Category Name"
                      className="rounded bg-gray-100 px-4 py-2 focus:outline-none"
                      value={`${newCategory.name}`}
                    />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
