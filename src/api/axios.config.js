import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://dev-api.greenbook.site/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Credentials"] = "true";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, DELETE, PATCH, OPTIONS";
    const access_token = Cookies.get("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
      config.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response ? error.response.status : null;
    const navigate = useNavigate();
    if (statusCode === 401) {
      Cookies.set("LOGGED", false);
      alert("Phiên đã hết hạn, vui lòng đăng nhập lại!") &&
        navigate("/auth/sign-in");
    } else {
      throw error;
    }
  }
);

export default instance;
