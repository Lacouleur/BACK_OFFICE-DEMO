/* eslint-disable no-param-reassign */
import axiosConfig from "../config/axiosConfig";
import { getToken } from "./tokenStuff";

export const sendAuth = (data) => {
  return axiosConfig({
    method: "post",
    url: `/auth/login`,
    data,
  });
};

export function getContentList(page = 1, contentType, lang, limit = 15, ids) {
  let string = "";
  const langString = lang ? `&lang=${lang}` : "";
  if (!ids) {
    if (contentType === "title") {
      string = `/contents?page=${page}&limit=${limit}&fields=title${langString}`;
    } else {
      string = `/contents?limit=${limit}&page=${page}${langString}`;
    }
  } else if (contentType === "title") {
    string = `/contents?page=${page}&fields=title&ids=${ids}${langString}`;
  }
  return axiosConfig.get(`${string}`, {
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

export function getUser(id) {
  return axiosConfig.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getUsers() {
  return axiosConfig.get(`/users`, {
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

export function postTag(label, lang) {
  return axiosConfig({
    method: "post",
    url: `/tags?language=${lang}`,
    data: { label },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getTags(lang) {
  return axiosConfig.get(`/tags?lang=${lang}`, {
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

export function postUser(values, userId) {
  return axiosConfig({
    method: "put",
    url: `/users/${userId}`,
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

export async function getCategories(lang) {
  return axiosConfig.get(`/categories?lang=${lang}`, {
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

export async function publishManager(
  id,
  action,
  manifesto,
  isMovedToTop,
  canUndoMoveToTop,
  undoMoveToTop
) {
  let url = "";

  if (manifesto) {
    url = `/manifest/${id}/${action}`;
  }
  if (!manifesto) {
    if (isMovedToTop && !undoMoveToTop) {
      url = `/contents/${id}/${action}?putForward=${isMovedToTop}&undoPutForward=false`;
    }
    if (undoMoveToTop && canUndoMoveToTop) {
      url = `/contents/${id}/${action}?putForward=false&undoPutForward=true`;
    }
    if (!isMovedToTop && !undoMoveToTop) {
      url = `/contents/${id}/${action}`;
    }
  }

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

export async function scheduleContentPublication(articleId, date) {
  return axiosConfig({
    method: "put",
    url: `/contents/${articleId}/publish/schedule`,
    data: { publicationDate: date },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function cancelContentPublication(id) {
  return axiosConfig({
    method: "delete",
    url: `/contents/${id}/publish/schedule`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getFeedBackResults(articleId) {
  console.log(`/feedbacks?resourceType=content&resourceId=${articleId}`);
  return axiosConfig.get(
    `/feedbacks?resourceType=content&resourceId=${articleId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}
