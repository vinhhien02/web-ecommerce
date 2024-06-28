import axios from "../axios";
export const apiGetAllCategories = () =>
  axios({
    url: "/category/get-all",
    method: "get",
  });
export const apiCreateCategories = (data) =>
  axios({
    url: "/category/create",
    method: "post",
    data,
  });
export const apiDeleteCategories = (_id) =>
  axios({
    url: `/category/delete/${_id}`,
    method: "delete",
  });
export const apiEditCategories = (_id) =>
  axios({
    url: `/category/update/${_id}`,
    method: "put",
  });
export const apigetDetailCategories = (id) =>
  axios({
    url: `/category/getdetail/${id}`,
    method: "get",
  });
