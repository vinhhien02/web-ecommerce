import axios from "../axios";
export const apiAddFavorite = (data) =>
  axios({
    url: "/favorite/create",
    method: "post",
    data,
  });
export const apiGetFavorite = () =>
  axios({
    url: "/favorite/getall",
    method: "get",
  });
export const apiDeleteFavorite = (_id) =>
  axios({
    url: `/favorite/delete/${_id}`,
    method: "delete",
  });
