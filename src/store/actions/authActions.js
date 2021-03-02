import { SET_PASSWORD, SET_MAIL, SET_ERROR_AUTH } from "../constants";

export const setPassword = (payload) => ({
  type: SET_PASSWORD,
  payload,
});

export const setMail = (payload) => ({
  type: SET_MAIL,
  payload,
});

export const setErrorAuth = (payload) => ({
  type: SET_ERROR_AUTH,
  payload,
});
