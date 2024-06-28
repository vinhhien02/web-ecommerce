import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

// Thêm  bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:web/user");
    if (localStorageData && typeof localStorageData === "string") {
      try {
        localStorageData = JSON.parse(localStorageData);
        const accessToken = JSON.parse(localStorageData?.token);
        if (accessToken) {
          config.headers = { authorization: `Bearer ${accessToken}` };
        }
      } catch (error) {
        console.error("Error parsing localStorageData:", error);
      }
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data;
  }
);
export default instance;
