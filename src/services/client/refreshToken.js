import { cleanAuthState } from "../../store/actions/authActions";
import axiosConfig from "../config/axiosConfig";
import {
  deleteToken,
  getRefreshToken,
  getToken,
  parseJwt,
  setToken,
} from "./tokenStuff";
import {
  consoleError,
  consoleSucces,
  consoleTitle,
} from "../../helper/consoleStyles";

export const refreshMyToken = async (dispatch) => {
  console.log("%cREFRESHING TOKEN", `${consoleTitle}`);
  try {
    const response = await axiosConfig({
      method: "put",
      url: `/auth/refresh-token`,
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
    console.log(
      "%cRefreshToken fail, error =>",
      `${consoleError}`,
      error?.response?.data
    );
    deleteToken(dispatch);
  }
  return null;
};

export const isValidToken = async (dispatch, refresh = true) => {
  const token = getToken();
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const tokenExpire = parseJwt(token).exp * 1000;
    const refreshTokenExpire = parseJwt(refreshToken).exp * 1000;
    const currentTimeInSeconds = Date.now();
    if (
      currentTimeInSeconds > tokenExpire &&
      currentTimeInSeconds < refreshTokenExpire
    ) {
      try {
        if (refresh) {
          await refreshMyToken(dispatch);
        }
        return true;
      } catch (error) {
        return false;
      }
    }
    if (currentTimeInSeconds > refreshTokenExpire) {
      console.log(
        "%cRefresh token has expired, please relog",
        `${consoleError}`
      );
      deleteToken(dispatch);
      return false;
    }
    return true;
  }
  console.log("%cMissing token, please relog", `${consoleError}`);
  deleteToken(dispatch);
  dispatch(cleanAuthState());
  return false;
};

export default isValidToken;
