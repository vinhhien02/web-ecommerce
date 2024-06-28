import React, { useEffect, useRef, useState } from "react";
import { apiEditCategories, apigetDetailCategories } from "../../apis/app";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../ultils/path";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const fileInputRef = useRef(null);
  const [data, setData] = useState({});
  const fetchCategory = async (id) => {
    const response = await apigetDetailCategories(id);
    setData({
      categoryname: response?.data?.categoryname,
      description: response?.data?.description,
      img: response?.data?.image,
    });
  };
  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  const handleUpdateCategory = async (id) => {
    const formData = new FormData();
    formData.append("name", data.categoryname);
    formData.append("description", data.description);
    formData.append("image", data.img);

    const response = await apiEditCategories(id, formData);
    if (response)
      Swal.fire({
        title: response.status === true ? "thành công!" : "thất bại!",
        text: response.message,
        icon: response.status ? "success" : "error",
      });
    setData({
      categoryname: "",
      description: "",
      img: null,
    });
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
          Cập nhật danh mục
        </h2>
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
              onClick={handleUpdateCategory}
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

export default EditCategory;
