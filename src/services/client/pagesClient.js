/* eslint-disable import/prefer-default-export */
import axiosConfig from "../config/axiosConfig";
import { getToken } from "./tokenStuff";

export function getPagesList(page = 1, limit = 20) {
  return axiosConfig.get(`/pages?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
