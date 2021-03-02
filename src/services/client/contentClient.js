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

export function postContent(values) {
  return axios({
    method: "post",
    url: `${BASE_URL}/contents`,
    data: values,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function update(values, articleId) {
  return axios({
    method: "put",
    url: `${BASE_URL}/contents/${articleId}`,
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

export async function deleteContent(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/contents/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status < 300 && res.status > 199) {
      console.log("Deleted");
      return true;
    }
    return null;
  } catch (error) {
    console.log(error);
    /*    deleteToken();
    window.location.assign(`${HOST_URL}/`); */
    return null;
  }
}
