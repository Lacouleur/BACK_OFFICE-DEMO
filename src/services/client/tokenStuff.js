import { refreshMyToken } from "./contentClient";

export const setToken = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const getToken = () => localStorage.getItem("token");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const isValidToken = async () => {
  const token = getToken();
  const refreshToken = getRefreshToken();

  if (token && refreshToken) {
    const tokenExpire = parseJwt(token).exp;
    const refreshTokenExpire = parseJwt(refreshToken).exp;
    const currentTimeInSeconds = ((Date.now() % 60000) / 1000).toFixed(0);

    if (
      currentTimeInSeconds > tokenExpire &&
      currentTimeInSeconds < refreshTokenExpire
    ) {
      try {
        const response = await refreshMyToken();
        if (response.status < 300 && response.status > 199) {
          setToken(response.data);
          console.log("Token refreshed");
          return true;
        }
      } catch (error) {
        console.log("error =>", error?.response?.data);
        deleteToken();
        return false;
      }
    } else if (currentTimeInSeconds > refreshTokenExpire) {
      console.log({ currentTimeInSeconds });
      console.log({ refreshTokenExpire });
      deleteToken();
      console.log("Refresh token has expired, please relog");
      return false;
    } else {
      console.log("Tokens still valuable");
      return true;
    }
  }
  console.log("missing token, please relog");
  deleteToken();
  return false;
};
