import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const axiosAuthorized = axios.create({
  baseURL: "http://localhost:3001",
  headers: { Authorization: `Bearer ${token}` },
});

export default axiosInstance;
