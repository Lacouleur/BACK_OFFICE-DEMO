/* eslint-disable no-unused-vars */
import axios from "axios";
import { getToken, deleteToken } from "./authClient";

export const getContentList = (page = 1, limit = 20) =>
  axios
    .get(`${BASE_URL}/contents?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => {
      return { data: res.data };
    })
    .catch(() => {
      deleteToken();
      window.location.assign(`${HOST_URL}/`);
    });

export const postContent = (
  values,
  setValues,
  form,
  setPosted,
  setSpecialError,
  setPostingError
) =>
  axios({
    method: "post",
    url: `${BASE_URL}/contents`,
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
    .catch((e) => {
      if (e.response.status === 409) {
        setPostingError({
          isError: true,
          text: e.response.data,
        });
        setPosted(false);
      } else {
        deleteToken();
        window.location.assign(`${HOST_URL}/`);
      }
    });

export const getCategories = () =>
  axios
    .get(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      deleteToken();
      window.location.assign(`${HOST_URL}/`);
    });
