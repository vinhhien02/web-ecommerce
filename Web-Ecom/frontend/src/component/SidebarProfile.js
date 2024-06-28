import React, { useRef, useState } from "react";
import icons from "../ultils/icon";
import { logout } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import path from "../ultils/path";
import { useNavigate, NavLink } from "react-router-dom";
import avatar from "../assets/image/avatar.jpg";
import { apiUpdateAvatar } from "../apis/user";
import Swal from "sweetalert2";
import { getCurrent } from "../store/user/asynAction";
import { toast } from "react-toastify";
const SidebarProfile = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const {
    BsChevronDown,
    CiEdit,
    AiOutlineLogout,
    FaRegUser,
    CiCamera,
    CiHeart,
    BsFileRuled,
  } = icons;
  const [isOpen, setIsOpen] = useState(false);
  const [imageUser, setImageUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate(`${path.HOME}`);
  };
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseClick = () => {
    setIsZoomed(false);
  };

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        title: "thất bại!",
        text: "Chưa có ảnh nào được chọn.",
        icon: "error",
      });
      return;
    }

    setImageUser(file);

    let formdata = new FormData();
    formdata.append("imageUser", file);
    const response = await apiUpdateAvatar(formdata);
    if (response === true) {
      toast.success("Cập nhật ảnh thành công");
      dispatch(getCurrent());
    }
  };

  return (
    <div class="bg-[#121e31]    rounded-md  py-6  font-[sans-serif] tracking-wide overflow-auto">
      <div class="relative  flex flex-col items-center gap-4 cursor-pointer">
        {imageUser ? (
          <img
            src={URL.createObjectURL(imageUser)}
            class="size-24 rounded-full object-cover   border-2 border-sky-600"
            alt=""
          />
        ) : (
          <img
            src={(current && current.imageUser) || avatar}
            class="size-24 object-cover rounded-full  border-2 border-sky-600 "
            alt=""
            onClick={handleImageClick}
          />
        )}
        {isZoomed && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <span
              className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
              onClick={handleCloseClick}
            >
              &times;
            </span>
            <img
              src={(current && current.imageUser) || avatar}
              alt="Zoomed"
              className="max-w-60% max-h-60% object-cover   "
            />
          </div>
        )}
        <span
          className="absolute bottom-0 "
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
          <div className="bg-blue-500 h-6 w-6 flex  items-center justify-center rounded-full">
            <CiCamera color="white" />
          </div>
        </span>
      </div>
      <div className="flex items-center flex-col justify-center pt-2">
        <p class="text-sm text-white">{current.userName}</p>
        <p class="text-xs text-gray-300 mt-0.5">{current.email}</p>
      </div>
      <hr class="my-6 border-gray-400" />
      <ul class="space-y-3">
        <li>
          <NavLink to={`${path.PROFILE}`}>
            <span class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <FaRegUser className=" mr-4" />
              Thông tin cá Nhân
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${path.HOMEMEMBER}`}>
            <span class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <BsFileRuled className=" mr-4" />
              Bài Đăng của bạn
            </span>
          </NavLink>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class=" text-white text-sm flex items-centerrounded px-4 py-3  transition-all"
          >
            <div className="relative w-full h-full ">
              <button
                onClick={() => handlOpen()}
                className="flex items-center gap-1   "
              >
                <CiEdit className="w-5 h-5 mr-3" /> Đăng Tin <BsChevronDown />
              </button>
              {isOpen && (
                <ul class="relative  flex-col  text-white text-sm flex  rounded px-4 py-3 transition-all">
                  <div
                    onClick={() => navigate(path.CREATEPRODUCT)}
                    class="py-2.5 px-5 text-white text-sm  hover:bg-gray-700 border-b border-white-500 cursor-pointer"
                  >
                    Tin bán
                  </div>
                  <div class="py-2.5 px-5 text-white  hover:bg-gray-700 text-sm cursor-pointer">
                    Tin mua
                  </div>
                </ul>
              )}
            </div>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
          >
            <span className="w-4 h-4 mr-3">
              <CiHeart size={"20px"} />
            </span>
            <button onClick={() => navigate(path.FAVORITE)}>Tin đã lưu </button>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
          >
            <span className="w-4 h-4 mr-3">
              <AiOutlineLogout />
            </span>
            <button onClick={() => handleLogout()}>Đăng Xuất</button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarProfile;
