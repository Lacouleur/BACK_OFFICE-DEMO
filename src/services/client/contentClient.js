import axios from "axios";
import { getToken, deleteToken } from "./authClient";

export async function getContentList(page = 1, limit = 20) {
  try {
    const res = await axios.get(
      `${BASE_URL}/contents?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (res.status < 300 && res.status > 199) {
      return { data: res.data };
    }

    return null;
  } catch {
    deleteToken();
    window.location.assign(`${HOST_URL}/`);
    return null;
  }
}

export async function getContent(id) {
  try {
    const res = await axios.get(`${BASE_URL}/contents/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status < 300 && res.status > 199) {
      return { data: res.data };
    }

    return null;
  } catch {
    deleteToken();
    window.location.assign(`${HOST_URL}/`);
    return null;
  }
}

export async function postContent(
  values,
  setValues,
  form,
  setPosted,
  setSpecialError,
  setPostingError
) {
  try {
    const res = await axios({
      method: "post",
      url: `${BASE_URL}/contents`,
      data: values,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status < 300 && res.status > 199) {
      setValues({});
      form?.reset();
      setSpecialError(false);
      setPosted(true);
    }

    return null;
  } catch (error) {
    if (error.response.status === 409) {
      setPostingError({
        isError: true,
        text: error.response.data,
      });
      setPosted(false);
    } else {
      deleteToken();
      window.location.assign(`${HOST_URL}/`);
    }
    return null;
  }
}

export async function updateContent(
  values,
  setPosted,
  setSpecialError,
  setPostingError,
  articleId
) {
  try {
    const res = await axios({
      method: "put",
      url: `${BASE_URL}/contents/${articleId}`,
      data: values,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status < 300 && res.status > 199) {
      setSpecialError(false);
      setPosted(true);
    }

    return null;
  } catch (error) {
    if (error.response.status === 409) {
      setPostingError({
        isError: true,
        text: error.response.data,
      });
      setPosted(false);
    } else {
      deleteToken();
      window.location.assign(`${HOST_URL}/`);
    }
    return null;
  }
}

export async function getCategories() {
  try {
    const res = await axios.get(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status < 300 && res.status > 199) {
      return res.data;
    }

    return null;
  } catch {
    deleteToken();
    window.location.assign(`${HOST_URL}/`);
    return null;
  }
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
