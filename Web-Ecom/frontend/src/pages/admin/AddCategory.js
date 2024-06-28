import React, { useRef, useState } from "react";
import { apiCreateCategories } from "../../apis/app";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { toast } from "react-toastify";

const AddCategory = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    categoryname: "",
    description: "",
    img: null,
  });

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("name", data.categoryname);
    formData.append("description", data.description);
    formData.append("image", data.img);

    const response = await apiCreateCategories(formData);

    if (response?.status === true) {
      toast.success("Tạo danh mục thành công");
      setData({
        categoryname: "",
        description: "",
        img: null,
      });
    } else {
      toast.error("Tạo danh mục thất bại");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("gfdgf", data.img);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      img: file,
    }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-4 pb-2 pl-4 pr-6">
        <h2 className="text-title font-bold flex gap-4 items-center text-2xl">
          Danh mục sản phẩm
          <button
            type="button"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full border-none outline-none bg-purple-600 hover:bg-purple-700 active:bg-purple-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              fill="#fff"
              className="inline"
              viewBox="0 0 512 512"
            >
              <path
                d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                data-original="#000000"
              />
            </svg>
          </button>
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium">Dashboard /</a>
            </li>
            <li className="text-primary">Calendar</li>
          </ol>
        </nav>
      </div>
      <main>
        <div className="flex flex-col mx-auto px-4 space-y-6 font-[sans-serif] text-[#333]">
          <div>
            <label className="mb-2 text-base block">Tên danh mục</label>
            <input
              name="categoryname"
              value={data.categoryname}
              onChange={handleInputChange}
              type="text"
              placeholder="Tên danh mục"
              className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 text-base block">Mô tả</label>
            <input
              name="description"
              value={data.description}
              onChange={handleInputChange}
              type="text"
              placeholder="Mô tả"
              className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 text-base block">Hình ảnh</label>
            <input
              name="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              placeholder="Hình ảnh"
              className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={handleCreateCategory}
              className="px-5 py-2.5 rounded-lg w-1/6 text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-700 hover:bg-green-800 active:bg-green-700"
            >
              Lưu
            </button>
            <button
              onClick={() => navigate(`/admin/${path.MANAGERCATEGORY}`)}
              type="button"
              className="px-5 py-2.5 rounded-lg w-1/6 text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-800 active:bg-red-700"
            >
              Hủy
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCategory;
