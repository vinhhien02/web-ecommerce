import React, { useContext, useEffect, useState } from "react";
import icons from "../ultils/icon";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { getCurrent } from "../store/user/asynAction";
import { logout, clearMessage } from "../store/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import avatar from "../assets/image/avatar.jpg";
import { ProductContext } from "../hook/ProductContex";
import { getFavorite } from "../store/favorite/asynAction";
import { Report, Notifi } from "./index";
import { apiGetAllInterested } from "../apis/product";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, token, message } = useSelector(
    (state) => state.user
  );
  const favorites = useSelector((state) => state.favorite.favorite);
  const favoriteCount = favorites?.length;
  const [isOpen, setIsOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showInterested, setShowInterested] = useState(false);
  const [interesteds, setInterested] = useState([]);
  const fetchReports = async () => {
    if (current && current._id) {
      const rs = await apiGetAllInterested(current._id);
      setInterested(rs.getInterested);
    }
  };

  useEffect(() => {
    if (isLoggedIn && current?._id) {
      fetchReports();
    }
  }, [isLoggedIn, current]);
  const handleReportClick = () => {
    setShowReport(true);
  };
  const viewedinterestedsCount = interesteds.filter(
    (interested) => interested.view === false
  ).length;
  
  const handleInterestedClick = () => {
    setShowInterested(!showInterested);
  };

  const {
    CiEdit,
    FaRegUser,
    BsChevronDown,
    FiHeart,
    FiAlertCircle,
    IoMdNotificationsOutline,
  } = icons;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [query, setQuery] = useState("");
  const { setSearchQuery } = useContext(ProductContext);

  const handleSearch = () => {
   
    setSearchQuery(query);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  useEffect(() => {
    if (isLoggedIn && token) dispatch(getCurrent());
    dispatch(getFavorite());
  }, [dispatch, isLoggedIn]);
  //
  const handleClickWriteProduct = async () => {
    if (!isLoggedIn && current?.email) {
      await Swal.fire({
        title: "Thông báo",
        text: "Vui lòng đăng nhập để tiếp tục ",
        icon: "error",
      });
      navigate(`/${path.LOGIN}`);
      return;
    }

    if (!current?.phone || !current?.address || !current?.imageUser) {
      await Swal.fire({
        title: "Thông báo",
        text: "Vui lòng nhập đủ thông tin như địa chỉ, số điện thoại, ảnh đại diện để tiếp tục",
        icon: "error",
      });
      navigate(`/${path.PROFILE}`);
      return;
    }

    navigate(`/${path.CREATEPRODUCT}`);

    if (current?.status === "pending") {
      await Swal.fire({
        title: "Thông báo",
        text: "Tài khoản của bạn đã bị khóa do phi phạm 1 số tiêu chuẩn ",
        icon: "error",
      });
      navigate(`/${path.HOME}`);
      return;
    }
  };

  useEffect(() => {
    if (message)
      Swal.fire("Thông Báo", message, "info ").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  });

  return (
    <div class="flex shadow-sm bg-white font-main min-h-[70px]  w-full  justify-center">
      <div class="flex flex-wrap items-center justify-between sm:px-6  py-3 relative  gap-y-2 gap-x-2 w-main">
        <div
          onClick={() => navigate(`/${path.HOME}`)}
          class="lg:flex cursor-pointer lg:flex-col lg:items-center  "
        >
          <h1 className="text-2xl font-bold text-main italic">
            LH MarketPlace
          </h1>
          <p className="text-xxs text-black">CHỢ SINH VIÊN LH</p>
        </div>

        <div class="bg-gray-100 flex border-2  max-md:order-1 border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-4 rounded-sm h-11 lg:w-2/7 max-md:w-full">
          <form className="flex items-center" onSubmit={handleSearch}>
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                class="fill-gray-400 mr-4 rotate-90"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full outline-none bg-transparent text-[#333] text-sm"
            />
          </form>
        </div>

        <div class="flex items-center space-x-8 max-md:ml-auto">
          <button
            onClick={handleClickWriteProduct}
            type="button"
            class="px-5 flex items-center py-2.5 rounded-lg text-sm tracking-wider font-medium border border-blue-500 outline-none bg-transparent hover:text-main  transition-all duration-300"
          >
            <CiEdit /> Đăng Tin
          </button>
          <svg
            onClick={() => navigate(path.HOME)}
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            class="cursor-pointer  hover:fill-[#077bff]"
            viewBox="0 0 511 511.999"
          >
            <path
              d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
              data-original="#000000"
            />
          </svg>
          {isLoggedIn && current ? (
            <div
              onClick={() => navigate(path.FAVORITE)}
              className="relative inline-block"
            >
              <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-sm text-white">
                {favoriteCount}
              </div>
              <div>
                <FiHeart className="w-6 h-6 cursor-pointer hover:fill-[#f21717]" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate(`/${path.LOGIN}`)}
              className="relative inline-block"
            >
              <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-sm text-white">
                0
              </div>
              <div>
                <FiHeart className="w-6 h-6 cursor-pointer hover:fill-[#f21717]" />
              </div>
            </div>
          )}

          <div
            onClick={handleInterestedClick}
            className="relative inline-block"
          >
            <div className="absolute top-[-10px] right-[-10px] w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-sm text-white">
             {viewedinterestedsCount}
            </div>
            <div>
              <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer hover:fill-[#f21717]" />
            </div>
          </div>
          {showInterested && (
            <Notifi
              id={current?._id}
              showReport={showInterested}
              setShowReport={setShowInterested}
            />
          )}

          {isLoggedIn && current ? (
            <div className="relative ">
              <div
                onClick={toggleDropdown}
                class="flex flex-wrap items-center justify-center gap-5 cursor-pointer"
              >
                {current?.imageUser ? (
                  <img
                    src={current?.imageUser}
                    class="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                ) : (
                  <img src={avatar} class="w-12 h-12 rounded-full" alt="" />
                )}
                <div>
                  <p class="text-[15px] text-[#333] font-bold">
                    {current?.userName}
                  </p>
                  <p class="text-xs text-gray-500 mt-0.5">{current?.email}</p>
                </div>
                <BsChevronDown />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                  {(isLoggedIn && current?.role === "admin") ||
                  (isLoggedIn && current?.role === "manager") ? (
                    <div>
                      {" "}
                      <Link
                        to={`/${path.HOMEMEMBER}`}
                        onClick={toggleDropdown}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Quản lí tài khoản
                      </Link>
                      <Link
                        to={`admin/${path.MANAGERUSER}`}
                        onClick={toggleDropdown}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Quản trị trang web
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={`/${path.HOMEMEMBER}`}
                      onClick={toggleDropdown}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Quản lí tài khoản
                    </Link>
                  )}
                  <div
                    onClick={() => dispatch(logout())}
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="cursor-pointer flex items-center fill-[#333] hover:fill-[#077bff]">
              <FaRegUser className="size-5 pr-1" />
              <div
                onClick={() => navigate(`/${path.LOGIN}`)}
                className="flex items-center"
              >
                Đăng nhập|Đăng kí
              </div>
            </div>
          )}
        </div>
        <div>
          {current?.role === "user" && (
            <div
              onClick={handleReportClick}
              class="relative w-max group mx-auto cursor-pointer "
            >
              <span>
                <FiAlertCircle color="red" size="20px" />
              </span>
              <div class="absolute shadow-lg hidden group-hover:block border border-red-500 text-red-500 font-semibold px-3 py-[6px] text-[10px] italic right-[10px] left-0 mx-auto w-max -top-[30px] rounded before:w-4 before:h-4 before:rotate-45 before:bg-[#333] before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-[10px] before:mx-auto">
                Hỗ trợ !
              </div>
              {showReport && (
                <Report
                  showReport={showReport}
                  setShowReport={setShowReport}
                  support={true}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
