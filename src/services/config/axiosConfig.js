import axios from "axios";

//axios.defaults.withCredentials = true;

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

export default axiosConfig;
