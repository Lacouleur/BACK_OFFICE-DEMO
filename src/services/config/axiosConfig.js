/* eslint-disable no-underscore-dangle */
import axios from "axios";
import { consoleError, consoleSucces } from "../../helper/consoleStyles";
import {
  deleteToken,
  getRefreshToken,
  getToken,
  parseJwt,
  setToken,
} from "../client/tokenStuff";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

axiosConfig.interceptors.request.use(async (request) => {
  const token = getToken();
  const refreshToken = getRefreshToken();

  if (!token || !refreshToken || request.url === "/auth/login") {
    return request;
  }

  const tokenExpire = parseJwt(token).exp * 1000;
  const refreshTokenExpire = parseJwt(refreshToken).exp * 1000;
  const currentTimeInSeconds = Date.now();

  if (
    currentTimeInSeconds > tokenExpire &&
    currentTimeInSeconds < refreshTokenExpire
  ) {
    try {
      const response = await axios({
        method: "put",
        url: `${BASE_URL}/auth/refresh-token`,
        data: { refreshToken: getRefreshToken() },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status < 300 && response.status > 199) {
        setToken(response.data);
        console.log("%cToken refreshed", `${consoleSucces}`);
      }
    } catch (error) {
      deleteToken();
      console.log(
        "%cRefreshToken fail, error =>",
        `${consoleError}`,
        error?.response?.data
      );
    }
  }
  request.headers.Authorization = `Bearer ${getToken()}`;
  return request;
});

export default axiosConfig;
