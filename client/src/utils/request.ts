import axios from "axios";

const URL = "http://localhost:4000/";

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
