import axiosConfig from "../config/axiosConfig";

export const sendAuth = (data) => {
  return axiosConfig({
    method: "post",
    url: `${BASE_URL}/auth/login`,
    data,
  });
};

export const setToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const deleteToken = () => localStorage.removeItem("token");

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
