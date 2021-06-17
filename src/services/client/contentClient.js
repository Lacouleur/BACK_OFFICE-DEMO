/* eslint-disable no-param-reassign */
import axios from "axios";
import { getToken } from "./authClient";

export function getContentList(page = 1, limit = 20) {
  return axios.get(`${BASE_URL}/contents?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getContent(id) {
  return axios.get(`${BASE_URL}/contents/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getManifesto(lang) {
  return axios.get(`${BASE_URL}/manifest?lang=${lang}`, {
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
  return axios({
    method: "post",
    url: `${BASE_URL}/manifest${string}`,
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
  return axios({
    method: "post",
    url: `${BASE_URL}/contents${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updateManifesto(values, manifestoId) {
  return axios({
    method: "put",
    url: `${BASE_URL}/manifest/${manifestoId}`,
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
  return axios({
    method: "put",
    url: `${BASE_URL}/contents/${articleId}${string}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function getCategories() {
  return axios.get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function deleteComponent(id, uuid, manifesto = false) {
  const url = manifesto
    ? `${BASE_URL}/manifest/${id}/components/${uuid}`
    : `${BASE_URL}/contents/${id}/components/${uuid}`;

  return axios.delete(`${url}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function deleteContent(id) {
  return axios({
    method: "put",
    url: `${BASE_URL}/contents/${id}/archive`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function updateComponent(id, values, uuid, manifesto = false) {
  const url = manifesto
    ? `${BASE_URL}/manifest/${id}/components/${uuid}`
    : `${BASE_URL}/contents/${id}/components/${uuid}`;

  return axios({
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
    ? `${BASE_URL}/manifest/${articleId}/components`
    : `${BASE_URL}/contents/${articleId}/components`;

  return axios({
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
    ? `${BASE_URL}/manifest/${id}/${action}`
    : `${BASE_URL}/contents/${id}/${action}`;

  return axios({
    method: "put",
    url: `${url}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// eslint-disable-next-line no-unused-vars
export async function uploadImage(data) {
  /*   return `${uuidv4()}`; */
  return axios({
    method: "post",
    url: `${BASE_URL}/images`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    data,
  });
}
