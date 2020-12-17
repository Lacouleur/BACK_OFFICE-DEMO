/* eslint-disable import/prefer-default-export */
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
