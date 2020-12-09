import axios from "axios";
import { baseUrl } from "../config/clientConfig";

export const sendAuth = (data) =>
  axios({
    method: "post",
    url: `${baseUrl}/auth/login`,
    data,
  })
    .then((token) => {
      return token.data;
    })
    .catch(() => {});

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
