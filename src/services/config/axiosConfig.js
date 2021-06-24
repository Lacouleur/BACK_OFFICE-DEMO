import axios from "axios";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

export default axiosConfig;
