import axios from "axios";

const axiosConfig = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default axiosConfig;
