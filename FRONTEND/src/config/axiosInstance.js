import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token !== null) {
    config.headers = Object.assign(
      {
        Authorization: "Bearer " + token,
      },
      config.headers
    );
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    const token = localStorage.getItem("token");
    if (
      error?.response?.status === 401 &&
      window.location?.pathname !== "/login"
    ) {
      localStorage.clear();
      window.location.reload();
    } else if (error?.response?.status === 422) {
      alert("Harap lengkapi data!");
    } else if (window.location.pathname !== "/login") {
      alert(`Terjadi kesalahan : ${error?.response?.statusText}`);
      console.log(error.response);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
