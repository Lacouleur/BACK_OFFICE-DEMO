/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { baseUrl, hostUrl } from "../config/clientConfig";
import { getToken, deleteToken } from "./authClient";

export const getContentList = () =>
  axios
    .get(`${baseUrl}/contents`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => ({ data: res.data }))
    .catch(() => {
      deleteToken();
      window.location.assign(`${hostUrl}/`);
    });
