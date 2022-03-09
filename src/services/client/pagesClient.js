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

export function postPage(values, lang) {
  let string = "";
  if (lang) {
    string = `?language=${lang}`;
  }
  return axiosConfig({
    method: "post",
    url: `/pages/${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getPage(id) {
  return axiosConfig.get(`/pages/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updatePage(values, pageId, lang) {
  let string = "";
  if (lang) {
    string = `?language=${lang}`;
  }
  return axiosConfig({
    method: "put",
    url: `/pages/${pageId}${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function savePageComponent(pageId, values) {
  const url = `/pages/${pageId}/sections`;

  return axiosConfig({
    method: "post",
    url: `${url}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function updatePageComponent(id, values, uuid) {
  const url = `/pages/${id}/sections/${uuid}`;

  return axiosConfig({
    method: "put",
    url: `${url}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function deletePageComponent(id, uuid) {
  const url = `/pages/${id}/sections/${uuid}`;

  return axiosConfig.delete(`${url}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
