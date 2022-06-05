import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV == "development" ? "//xxxxx/api/v1" : "/ooxxx/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
  return res.data;
});

export default axios;
