import axios from "../axios";
export const apiSignup = (data) =>
  axios({
    url: "/user/sign-up",
    method: "post",
    withCredentials: true,
    data,
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/sign-in",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",

    data,
  });
export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",

    data,
  });
export const apiGetDetailUser = () =>
  axios({
    url: "/user/get-detail",
    method: "get",
  });
export const apiUpdateUser = (data) =>
  axios({
    url: "/user/update",
    method: "put",
    data,
  });
export const apiUpdateAvatar = (data) =>
  axios({
    url: "/user/upload-avatar",
    method: "put",
    data,
  });
export const apiGetAllUser = (query) =>
  axios({
    url: `/user/getuser?email=${query}`,
    method: "get",
  });
export const apiGetDetailUserById = (_id) =>
  axios({
    url: `/user/get-detail/${_id}`,
    method: "get",
  });
export const apiUpdateByAdmin = (_id, data) =>
  axios({
    url: `/user/update/${_id}`,
    method: "put",
    data,
  });

export const apiDeleteUser = (_id) =>
  axios({
    url: `/user/delete/${_id}`,
    method: "delete",
  });
