import React from "react";
import Header from "../../component/admin/Header";
import Sidebar from "../../component/admin/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../ultils/path";

const Admin = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (
    !isLoggedIn ||
    !current ||
    !current.role === "admin" ||
    !current.role === "manager"
  )
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      <div className="fixed top-0 left-0 right-0">
        <Header />
      </div>
      <div className="w-full flex gap-6 mt-20">
        <div className="w-1/5 fixed lg:mt-[20px] ">
          <Sidebar />
        </div>
        <div className="w-4/5 lg:ml-[300px] my-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
