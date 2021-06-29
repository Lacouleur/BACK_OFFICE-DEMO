import { cleanAuthState } from "../../store/actions/authActions";
import axiosConfig from "../config/axiosConfig";
import {
  deleteToken,
  getRefreshToken,
  getToken,
  parseJwt,
  setToken,
} from "./tokenStuff";

export const isValidToken = async (dispatch) => {
  const token = getToken();
  const refreshToken = getRefreshToken();

  const refreshMyToken = () => {
    return axiosConfig({
      method: "put",
      url: `/auth/refresh-token`,
      data: { refreshToken: getRefreshToken() },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

  if (refreshToken) {
    const tokenExpire = parseJwt(token).exp * 1000;
    const refreshTokenExpire = parseJwt(refreshToken).exp * 1000;
    const currentTimeInSeconds = Date.now();

    if (
      currentTimeInSeconds > tokenExpire &&
      currentTimeInSeconds < refreshTokenExpire
    ) {
      console.warn("YpassParLà");
      try {
        const response = await refreshMyToken();
        if (response.status < 300 && response.status > 199) {
          setToken(response.data);
          console.warn("Token refreshed");
          return true;
        }
      } catch (error) {
        console.log("RefreshToken fail, error =>", error?.response?.data);
        deleteToken(dispatch);
        return false;
      }
    } else if (currentTimeInSeconds > refreshTokenExpire) {
      console.log({ currentTimeInSeconds });
      console.log({ refreshTokenExpire });
      console.log("Refresh token has expired, please relog");
      deleteToken(dispatch);
      return false;
    } else {
      console.log("TOKEN STILL VALID");
      return true;
    }
  } else {
    console.log("missing token, please relog");
    deleteToken(dispatch);
    dispatch(cleanAuthState());
    return false;
  }
};

export default isValidToken;
