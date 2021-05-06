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

export function update(values, articleId, lang) {
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

export async function deleteComponent(id, uuid) {
  return axios.delete(`${BASE_URL}/contents/${id}/components/${uuid}`, {
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

export async function updateComponent(articleId, values, uuid) {
  return axios({
    method: "put",
    url: `${BASE_URL}/contents/${articleId}/components/${uuid}`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function saveComponent(articleId, values) {
  return axios({
    method: "post",
    url: `${BASE_URL}/contents/${articleId}/components`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function publishManager(articleId, action) {
  return axios({
    method: "put",
    url: `${BASE_URL}/contents/${articleId}/${action}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
