/* eslint-disable no-param-reassign */
import axiosConfig from "../config/axiosConfig";
import { getToken } from "./tokenStuff";

/* const headers = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }
 */
export const sendAuth = (data) => {
  return axiosConfig({
    method: "post",
    url: `/auth/login`,
    data,
  });
};

export function getContentList(page = 1, limit = 20) {
  return axiosConfig.get(`/contents?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getContent(id) {
  return axiosConfig.get(`/contents/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getManifesto(lang) {
  return axiosConfig.get(`/manifest?lang=${lang}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function postManifesto(values, lang) {
  let string = "";
  if (lang) {
    string = `?language=${lang}`;
  }
  return axiosConfig({
    method: "post",
    url: `/manifest${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function postContent(values, lang) {
  let string = "";
  if (lang) {
    string = `?language=${lang}`;
  }
  return axiosConfig({
    method: "post",
    url: `/contents${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updateManifesto(values, manifestoId) {
  return axiosConfig({
    method: "put",
    url: `/manifest/${manifestoId}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updateContent(values, articleId, lang) {
  let string = "";
  if (lang) {
    string = `?language=${lang}`;
  }
  return axiosConfig({
    method: "put",
    url: `/contents/${articleId}${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function getCategories() {
  return axiosConfig.get(`/categories`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function deleteComponent(id, uuid, manifesto = false) {
  const url = manifesto
    ? `/manifest/${id}/components/${uuid}`
    : `/contents/${id}/components/${uuid}`;

  return axiosConfig.delete(`${url}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function deleteContent(id) {
  return axiosConfig({
    method: "put",
    url: `/contents/${id}/archive`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function updateComponent(id, values, uuid, manifesto = false) {
  const url = manifesto
    ? `/manifest/${id}/components/${uuid}`
    : `/contents/${id}/components/${uuid}`;

  return axiosConfig({
    method: "put",
    url: `${url}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function saveComponent(articleId, values, manifesto = false) {
  const url = manifesto
    ? `/manifest/${articleId}/components`
    : `/contents/${articleId}/components`;

  return axiosConfig({
    method: "post",
    url: `${url}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function publishManager(id, action, manifesto) {
  const url = manifesto
    ? `/manifest/${id}/${action}`
    : `/contents/${id}/${action}`;

  return axiosConfig({
    method: "put",
    url: `${url}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// eslint-disable-next-line no-unused-vars
export async function uploadImage(data) {
  return axiosConfig({
    method: "post",
    url: `/images`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data,
  });
}

export async function duplicateContent(articleId) {
  return axiosConfig({
    method: "post",
    url: `/contents/${articleId}/duplicate`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function translateContent(articleId, lang) {
  return axiosConfig({
    method: "post",
    url: `/contents/${articleId}/translations/${lang}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
