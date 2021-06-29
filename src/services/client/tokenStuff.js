import { cleanAuthState } from "../../store/actions/authActions";

export const setToken = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const getToken = () => localStorage.getItem("token");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const deleteToken = (dispatch) => {
  dispatch(cleanAuthState());
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.assign("/");
};

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
