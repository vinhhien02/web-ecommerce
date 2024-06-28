import React, { useState } from "react";
import icons from "../../ultils/icon";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { Button } from "../../component";
import { apiResetPassword } from "../../apis/user";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { AiOutlineClose, RiLockPasswordLine } = icons;

  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  console.log("check input", password, token, confirmPassword);
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate(`/${path.LOGIN}`);
  };

  const handleResetPassword = async () => {
    const response = await apiResetPassword({
      password,
      confirmPassword,
      token,
    });
    if (response.status === false) {
      Swal.fire({
        title: "Lỗi!",
        text: response.message,
        icon: "error",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    if (response.status === true) {
      Swal.fire({
        title: "Thành công!",
        text: response.message,
        icon: "success",
      }).then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
            <AiOutlineClose
              onClick={closeModal}
              className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
            />
            <div class="my-8 text-center ">
              <h4 class="text-2xl text-[#333] font-semibold mb-4">
                Đổi Mật Khẩu
              </h4>

              <div className="gap-5 flex flex-col">
                <div className="relative ">
                  <span className="absolute inset-y-0 text-gray-400 left-5 flex items-center pointer-events-none ">
                    <RiLockPasswordLine />
                  </span>
                  <input
                    type="text"
                    placeholder="mật khẩu"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-10 py-2.5 text-sm text-black rounded-2xl bg-white border w-full outline-[#007bff]"
                  />
                </div>
                <div className="relative ">
                  <span className="absolute inset-y-0 text-gray-400 left-5 flex items-center pointer-events-none ">
                    <RiLockPasswordLine />
                  </span>
                  <input
                    type="text"
                    placeholder="nhập lại mật khẩu"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-10 py-2.5 text-sm text-black rounded-2xl bg-white border w-full outline-[#007bff]"
                  />
                </div>
              </div>
            </div>
            <Button name="Đổi Mật Khẩu" handleOnclick={handleResetPassword} />
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
