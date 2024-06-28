import React, { useState } from "react";
import icons from "../../ultils/icon";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { Button } from "../../component";
import { apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const { AiOutlineClose, MdOutlineEmail } = icons;

  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate(`/${path.LOGIN}`);
  };

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.status === false) {
      Swal.fire({
        title: "Lỗi!",
        text: response.message,
        icon: "error",
      }).then(() => {
        navigate(`/${path.FRESETPASSWORD}`);
      });
    }
    if (response.status === true) {
      Swal.fire({
        title: "Thành công",
        text: response.message,
        icon: "success",
      }).then(() => {
        navigate(`/${path.FRESETPASSWORD}`);
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
            <AiOutlineClose
              onClick={closeModal}
              className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
            />
            <div className="my-8 text-center">
              <h4 className="text-2xl text-[#333] font-semibold">Nhập Email</h4>
              <p className="text-sm text-gray-500 mb-4">
                Vui lòng nhập email để nhận mã xác thực
              </p>
              <div className="relative ">
                <span className="absolute inset-y-0 text-gray-400 left-5 flex items-center pointer-events-none ">
                  <MdOutlineEmail />
                </span>
                <input
                  type="text"
                  placeholder="nhập email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-10 py-2.5 text-sm text-black rounded-2xl bg-white border w-full outline-[#007bff]"
                />
              </div>
            </div>
            <Button name="Gửi Email" handleOnclick={handleForgotPassword} />
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
