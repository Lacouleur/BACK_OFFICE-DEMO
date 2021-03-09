import {
  deleteToken,
  sendAuth,
  setToken,
} from "../../services/client/authClient";
import {
  getCategories,
  getContent,
  getContentList,
  postContent,
  update,
} from "../../services/client/contentClient";
import {
  setErrorPosting,
  setPosted,
  setErrorSpecial,
  contentLoaded,
} from "./commonsActions";
import { setContentsList, setPagination } from "./contentListActions";

import { setErrorAuth } from "./authActions";
import {
  setCategoriesList,
  setErrorSlug,
  setErrorTitle,
} from "./homeScreenActions";

export const CONTENT_LOADED = "CONTENT_LOADED";

export function checkAndSend(type = null, articleId = null) {
  return async (dispatch, getState) => {
    const { seoReducer, homeScreenReducer, modulesReducer } = getState();
    const { title: mainTitle, slug, category } = homeScreenReducer;
    const { description, title: seoTitle } = seoReducer;
    const { modulesList } = modulesReducer;

    const slugError = !slug;
    const titleError = !mainTitle;

    if (slugError) {
      dispatch(setErrorSlug(true));
    }

    if (titleError) {
      dispatch(setErrorTitle(true));
    }

    let values = {};

    if (type === "update") {
      values = {
        title: mainTitle,
        slug,
        category: category ?? null,
      };
    } else {
      values = {
        title: mainTitle,
        slug,
        category: category ?? null,
        components: modulesList,
      };
    }

    if (seoTitle || description) {
      values.seo = {};
      const { seo } = values;
      if (seoTitle) {
        seo.title = seoTitle;
      }
      if (description) {
        seo.description = description;
      }
    }

    if (!slugError && !titleError) {
      // post
      if (!type) {
        try {
          const response = await postContent(values);
          if (response.status < 300 && response.status > 199) {
            dispatch(setPosted(true));
          }
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
          } else {
            console.log(error);
            console.log(values);
          }
        }
      }

      // update
      if (type === "update") {
        try {
          const result = await update(values, articleId);

          if (result.status < 300 && result.status > 199) {
            dispatch(setErrorSpecial(false));
            dispatch(setPosted(true));
          }

          return null;
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
          } else {
            dispatch(setPosted(false));
          }
          return null;
        }
      }
    }
    return null;
  };
}

export function fetchContent(id) {
  return async (dispatch) => {
    try {
      const response = await getContent(id);
      if (response.status < 300 && response.status > 199) {
        dispatch(contentLoaded(response.data));
      }

      return null;
    } catch (error) {
      console.log(error);
      /*   deleteToken();
      window.location.assign(`${HOST_URL}/`); */
      return null;
    }
  };
}

export function fetchContentsList(page) {
  return async (dispatch) => {
    try {
      const response = await getContentList(page);
      if (response.status < 300 && response.status > 199) {
        dispatch(setContentsList(response.data.contents));
        dispatch(setPagination(response.data));
      }

      return null;
    } catch (error) {
      return null;
    }
  };
}

export function logUser(redirectTo) {
  return async (dispatch, getState) => {
    const { authReducer } = getState();
    const data = {
      email: authReducer.mail,
      password: authReducer.password,
    };
    try {
      const response = await sendAuth(data);
      if (response.status < 300 && response.status > 199) {
        setToken(response.data.token);
        redirectTo("/dashboard");
      }
      dispatch(setErrorAuth(true));
      return false;
    } catch (error) {
      dispatch(setErrorAuth(true));
      return false;
    }
  };
}

export function fetchCategoriesList() {
  return async (dispatch) => {
    try {
      const response = await getCategories();
      if (response.status < 300 && response.status > 199) {
        dispatch(setCategoriesList(response.data));
      }
      return null;
    } catch (error) {
      deleteToken();
      return null;
    }
  };
}
