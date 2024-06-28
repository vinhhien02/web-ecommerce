import React from "react";
import { SidebarProfile, Header, Navigation } from "../../component";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../ultils/path";
import Swal from "sweetalert2";
const Member = () => {
  const navigate = useNavigate();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || !current.role === "user")
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  if (isLoggedIn && current?.status === "pending") {
    Swal.fire({
      title: "Thông báo",
      text: "Tài khoản của bạn đã bị khóa do phi phạm một số tiêu chuẩn liên hệ với admin để được hỗ trợ ",
      icon: "error",
    });
    navigate(`/${path.HOME}`);
  }

  return (
    <div className="w-full flex flex-col bg-gray-100 h-screen  items-center">
      <div className="fixed top-0 left-0 z-50  right-0">
        <Header />
      </div>

      <div className="w-main flex gap-8  mt-4">
        <div className="w-1/5 sticky  max-h-[600px] mt-[84px]  ">
          <SidebarProfile />
        </div>
        <div className="w-4/5  mt-[82px] shadow-md rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Member;
