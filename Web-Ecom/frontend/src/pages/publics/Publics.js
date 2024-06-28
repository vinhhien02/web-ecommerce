import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Footer } from "../../component/index";

const Publics = () => {
  return (
    <div className="w-full flex flex-col bg-gray-100 items-center">
      <div className="fixed z-50 w-full">
        <Header />
        <Navigation />
      </div>
      <div>
        <div className="w-main flex flex-col justify-center mb-4 mt-[117px] ">
          <Outlet />
        </div>
        <div className="w-main">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Publics;
