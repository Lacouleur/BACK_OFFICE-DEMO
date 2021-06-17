import axios from "axios";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

axiosConfig.defaults.withCredentials = true;

export default axiosConfig;
