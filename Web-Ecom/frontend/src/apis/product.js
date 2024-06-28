import axios from "../axios";
export const apiCreateproduct = (data) =>
  axios({
    url: "/product/create",
    method: "post",
    data,
  });
export const apiGetAllproduct = (query) =>
  axios({
    url: `/product/get-all?query=${query}`,
    method: "get",
  });
export const apiDetailproduct = (slug) =>
  axios({
    url: `/product/get-detail/${slug}`,
    method: "get",  
  });
export const apiGetProductCategory = (slug) =>
  axios({
    url: `/product/get-all/product/${slug}`,
    method: "get",
  });
export const apiGetProductUser = (_id) =>
  axios({
    url: `/product/get/user-product/${_id}`,
    method: "get",
  });
export const apiGetProductCurrent = (query) =>
  axios({
    url: `/product/get/current-product?query=${query}`,
    method: "get",
  });
export const apiDeleteProduct = (id) =>
  axios({
    url: `/product/delete/${id}`,
    method: "delete",
  });
export const apiUpdateProduct = (slug, data) =>
  axios({
    url: `/product/update/${slug}`,
    method: "put",
    data,
  });
export const apiUpdateStatusProduct = (_id, data) =>
  axios({
    url: `/product/updatestatus/${_id}`,
    method: "put",
    data,
  });
export const apiGetAllProductByAdmin = (query) =>
  axios({
    url: `/product/get-all/byadmin?query=${query}`,
    method: "get",
  });
export const apiReportProduct = (data) =>
  axios({
    url: `/report/create`,
    method: "post",
    data,
  });
export const apiGetAllReport = () =>
  axios({
    url: `/report/getall`,
    method: "get",
  });
export const apiUpdateReport = (id, data) =>
  axios({
    url: `/report/update/${id}`,
    method: "put",
    data,
  });
export const apiInterestedProduct = (data) =>
  axios({
    url: `/report/createinterested`,
    method: "post",
    data,
  });
export const apiGetAllInterested = (id) =>
  axios({
    url: `/report/getallinterested/${id}`,
    method: "get",
  });
export const apiUpdateInterested = (id, data) =>
  axios({
    url: `/report/updateinterested/${id}`,
    method: "put",
    data,
  });
