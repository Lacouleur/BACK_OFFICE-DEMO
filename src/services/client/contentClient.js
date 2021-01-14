import axios from "axios";
import { baseUrl, hostUrl } from "../config/clientConfig";
import { getToken, deleteToken } from "./authClient";

export const getContentList = (page = 1, limit = 20) =>
  axios
    .get(`${baseUrl}/contents?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => {
      return { data: res.data };
    })
    .catch(() => {
      deleteToken();
      window.location.assign(`${hostUrl}/`);
    });

export const postContent = (
  values,
  setValues,
  form,
  setPosted,
  setSpecialError
) =>
  axios({
    method: "post",
    url: `${baseUrl}/contents`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then(() => {
      setValues({});
      form?.reset();
      setSpecialError(false);
      setPosted(true);
    })
    .catch(() => {
      setPosted(false);
      deleteToken();
      window.location.assign(`${hostUrl}/`);
    });

export const getCategories = () =>
  axios
    .get(`${baseUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      deleteToken();
      window.location.assign(`${hostUrl}/`);
    });
