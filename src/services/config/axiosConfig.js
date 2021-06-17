import axios from "axios";
import { baseUrl, hostUrl } from "./clientConfig";

const axiosConfig = axios.create({
  baseURL: baseUrl,
  hostUrl,
});

axiosConfig.defaults.withCredentials = true;

export default axiosConfig;
