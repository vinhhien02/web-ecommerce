import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { InputForm, Button } from "../../component/index";
import icons from "../../ultils/icon";
import { apiSignup, apiLogin } from "../../apis";
import Swal from "sweetalert2";
import { login } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../ultils/helpers";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [invalid, setInvalid] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    AiOutlineClose,
    FaRegUser,
    RiLockPasswordLine,
    MdOutlineEmail,
    BsEyeFill,
    BsEyeSlashFill,
  } = icons;
  const [payload, setPayload] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate(`/${path.HOME}`);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //api
  const resetPayload = () => {
    setPayload({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  useEffect(() => {
    resetPayload();
  }, [signup]);
  const handleSubmit = useCallback(async () => {
    const { userName, confirmPassword, ...data } = payload;

    const invalid = signup
      ? validate(payload, setInvalid)
      : validate(data, setInvalid);
    if (invalid === 0) {
      if (signup) {
        const response = await apiSignup(payload);

        Swal.fire({
          title: response.status === true ? "thành công!" : "thất bại!",
          text: response.message,
          icon: response.status ? "success" : "error",
        });
        if (response.status === true) {
          setSignup(false);
        }
      } else {
        const rs = await apiLogin(data);

        Swal.fire({
          title:
            rs.status === true
              ? "Đăng nhập thành công!"
              : "Đăng nhập thất bại!",
          text: rs.message,
          icon: rs.status ? "success" : "error",
        });
        if (current?.status === "pending") {
          Swal.fire({
            title: "Thông báo",
            text: "Tại khoản của bạn đang bị khóa do vi phạm tiêu chuẩn cộng đồng, vui lòng liên hệ quản trị viên để được hỗ trợ!",
            icon: "error",
          });
          navigate(`/${path.HOME}`);
        }

        if (rs.status === true) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );

          navigate(`/${path.HOME}`);
        }
      }
    }
  }, [payload, signup, dispatch, navigate]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <AiOutlineClose
              onClick={closeModal}
              className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
            />
            <div className="my-6 text-center">
              <h4 className="text-3xl text-[#333] font-main">
                {signup ? "Đăng Ký" : "Đăng Nhập"}
              </h4>
              {!signup && (
                <p className="text-sm text-gray-400 mt-4">
                  Vui lòng đăng nhập để tiếp tục
                </p>
              )}
            </div>
            <form className="space-y-4">
              {signup && (
                <InputForm
                  value={payload.userName}
                  setValue={setPayload}
                  namekey="userName"
                  placeholder="Nhập Tên"
                  invalid={invalid}
                  setInvalid={setInvalid}
                  leftIcon={<FaRegUser />}
                />
              )}

              <InputForm
                value={payload.email}
                setValue={setPayload}
                namekey="email"
                placeholder="Nhập email"
                invalid={invalid}
                setInvalid={setInvalid}
                leftIcon={<MdOutlineEmail />}
              />

              <InputForm
                type={showPassword ? "text" : "password"}
                value={payload.password}
                setValue={setPayload}
                namekey="password"
                placeholder="Nhập mật khẩu ít nhất 8 kí tự gồm chữ +số"
                invalid={invalid}
                setInvalid={setInvalid}
                leftIcon={<RiLockPasswordLine />}
                rightIcon={{
                  onClick: togglePasswordVisibility,
                  icon: showPassword ? <BsEyeFill /> : <BsEyeSlashFill />,
                }}
              />

              {signup && (
                <InputForm
                  type={showPassword ? "text" : "password"}
                  value={payload.confirmPassword}
                  setValue={setPayload}
                  namekey="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  invalid={invalid}
                  setInvalid={setInvalid}
                  leftIcon={<RiLockPasswordLine />}
                  rightIcon={{
                    onClick: togglePasswordVisibility,
                    icon: showPassword ? <BsEyeFill /> : <BsEyeSlashFill />,
                  }}
                />
              )}

              <div className="flex justify-center">
                <Button
                  type="button"
                  name={signup ? "Đăng Ký" : "Đăng Nhập"}
                  handleOnclick={handleSubmit}
                />
              </div>
            </form>
            {!signup && (
              <Link
                to={`/${path.FORGOTPASSWORD}`}
                className="text-sm text-blue-600 font-semibold  mt-4
              block"
              >
                Quên mật khẩu
              </Link>
            )}
            <hr className="my-6" />
            {!signup && (
              <p className="text-sm text-center text-[#333]">
                Bạn chưa có tài khoản?
                <div
                  onClick={() => setSignup(true)}
                  className="text-sm text-blue-600 font-main cursor-pointer"
                >
                  Đăng Ký
                </div>
              </p>
            )}
            {signup && (
              <p className="text-sm text-center text-[#333]">
                Bạn có tài khoản?
                <div
                  onClick={() => setSignup(false)}
                  className="text-sm text-blue-600 font-main cursor-pointer"
                >
                  Đăng Nhập
                </div>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
