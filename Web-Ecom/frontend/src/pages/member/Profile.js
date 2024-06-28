import React, { useState } from "react";
import { Button, InputProfile } from "../../component";
import icons from "../../ultils/icon";
import { useSelector } from "react-redux";
import { apiUpdateUser } from "../../apis/user";
import Swal from "sweetalert2";

const Profile = () => {
  const { current } = useSelector((state) => state.user);

  const {
    FaRegUser,
    MdOutlineEmail,
    FaPhoneVolume,
    FiMapPin,
    IoTransgenderOutline,
  } = icons;
  const [payload, setPayload] = useState({
    userName: current?.userName || "",
    phone: current?.phone || "",
    email: current?.email || "",
    address: current?.address || "",
    gender: current?.gender || "",
  });

  const handleGenderChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };
  const handleAddressChange = (e) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      address: e.target.value,
    }));
  };
  const handleUpdateUser = async () => {
    const response = await apiUpdateUser(payload);
    Swal.fire({
      title: response.status === true ? "thành công!" : "thất bại!",
      text: response.message,
      icon: response.status ? "success" : "error",
    });
  };
  return (
    <div className="px-4 bg-white h-screen">
      <div class="font-[sans-serif] max-w-4xl mx-auto">
        <div class="mb-6 flex flex-col w-full  right-0 gap-3 border-b  sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-title font-bold flex p-4 gap-4 items-center text-2xl">
            Thông tin cá nhân
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 gap-6 mb-6 mt-4 ">
          <InputProfile
            value={payload.userName}
            setValue={setPayload}
            placeholder={current ? current.userName : "Nhập tên"}
            namekey="userName"
            rightIcon={<FaRegUser />}
          />

          <div className="relative flex items-center">
            <select
              name="gender"
              value={payload.gender}
              onChange={handleGenderChange}
              className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#007bff] outline-none appearance-none"
            >
              {current && current.gender ? (
                <option className="text-sm font-main " disabled selected hidden>
                  {current.gender}
                </option>
              ) : (
                <option className="text-sm font-main  text-gray-400 ">
                  Nhập giới tính
                </option>
              )}
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            <span className="w-[18px] h-[18px] absolute right-2 cursor-pointer">
              <IoTransgenderOutline />
            </span>
          </div>

          <InputProfile
            value={payload.phone}
            setValue={setPayload}
            placeholder={
              current && current.phone ? current.phone : "Nhập số điện thoại "
            }
            namekey="phone"
            rightIcon={<FaPhoneVolume />}
          />

          <InputProfile
            value={payload.email}
            setValue={setPayload}
            placeholder={
              current && current.email ? current.email : "Nhập gmail"
            }
            namekey="email"
            rightIcon={<MdOutlineEmail />}
          />

          <div class="relative flex items-center sm:col-span-2">
            <input
              value={payload.address}
              onChange={handleAddressChange}
              type="text"
              placeholder={
                current && current.address ? current.address : "Nhập địa chỉ"
              }
              class="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
            />
            <span className="w-[18px] h-[18px] absolute right-2 cursor-pointer">
              <FiMapPin />
            </span>
          </div>
        </div>
        <Button
          name={"Cập nhật "}
          handleOnclick={handleUpdateUser}
          type="button"
          class="mt-10 px-6 py-2.5 w-full text-sm bg-[#007bff] text-white hover:bg-[#006bff] rounded-sm"
        />
      </div>
    </div>
  );
};

export default Profile;
