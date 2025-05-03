import React from "react";


const ProductTable = ({ product }) => {
  const { images, title, productCode, price, quantity, index } = product;

  return (
    <div className="flex w-full">
      {/* content in sidebar */}
      <div className="my-14 w-full pl-72">
        <div className="flex flex-col">
          {/* =======================Table ===================*/}

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
                    <tr className="border-b border-neutral-200 bg-black/[0.02] hover:bg-gray-200 dark:border-white/10">
                      <td className="px-6 py-3 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 font-medium whitespace-nowrap">
                        <img
                          src={images && images.length ? images[0].url : ""}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {productCode}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">{title}</td>
                      <td className="px-6 py-3 whitespace-nowrap"></td>
                      <td className="px-6 py-3 whitespace-nowrap">{price}</td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {quantity}
                      </td>

                      <td className="flex gap-2 px-6 py-3 whitespace-nowrap">
                        <svg
                          // ==============Edit Category=================

                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-7 cursor-pointer rounded-xs bg-blue-500 p-1.5 text-white hover:bg-blue-600"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>

                        <svg
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =======================Table ===================*/}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
