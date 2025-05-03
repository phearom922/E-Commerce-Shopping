import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

//Ant-Design
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFileUpload = values.images;

      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "PNG",
          100,
          0,
          (uri) => {
            axios
              .post(
                import.meta.env.REACT_APP_KEY + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    Authorization : `Bearer ${user.token}`,
                  },
                },
              )
              .then((res) => {
                setLoading(false);
                allFileUpload.push(res.data);

                setValues({ ...values, images: allFileUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64",
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    const { images } = values;
    axios
      .post(
        import.meta.env.REACT_APP_KEY + "/removeimages",
        { public_id },
        {
          headers: {
            Authorization : `Bearer ${user.token}`,
          },
        },
      )
      .then((res) => {
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-2xl gap-2">
      <label
        className="relative flex h-30 w-30 cursor-pointer flex-col items-center justify-center rounded-xs border border-dashed border-gray-400 bg-gray-100 hover:border-blue-800 hover:bg-gray-300"
        // onChange={handleUploadImage}
      >
        {loading ? (
          <Flex className="absolute" align="center" gap="middle">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 70 }} spin />}
            />
          </Flex>
        ) : (
          ""
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-sm text-gray-400 select-none">{`${loading ? "Uploading..." : "add picture"}`}</span>
        <input
          onChange={handleChangeFile}
          className="hidden"
          multiple
          type="file"
          alt="image"
          accept="image/*"
        />
      </label>

      {values.images && values.images.map((item) => (
        <div
          key={item.public_id}
          className="group relative h-30 w-30 items-center overflow-hidden rounded-xs border-gray-500 shadow"
        >
          <svg
            onClick={() => handleRemove(item.public_id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute top-11 left-11 z-50 hidden size-8 cursor-pointer rounded-full bg-gray-800 p-1.5 text-white opacity-80 transition-all duration-300 group-hover:block"
          >
            <path
              fillRule="evenodd"
              d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
              clipRule="evenodd"
            />
          </svg>
            <span>
            <img
              className="w-fll object-cover"
              src={item.url}
              alt="product-image"
            />
            </span>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
