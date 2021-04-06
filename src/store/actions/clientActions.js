/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  deleteToken,
  sendAuth,
  setToken,
} from "../../services/client/authClient";
import {
  saveComponent,
  updateComponent,
  deleteComponent,
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
  setIsEditing,
  setArticleId,
} from "./commonsActions";
import { setContentsList, setPagination } from "./contentListActions";

import { setErrorAuth } from "./authActions";
import {
  setCategoriesList,
  setErrorSlug,
  setErrorTitle,
} from "./homeScreenActions";
import { closeModule, setModulePosted } from "./moduleActions";
import {
  setUpdatedAt,
  setProgrammedAt,
  setPublishedAt,
} from "./actionBarActions";

export const CONTENT_LOADED = "CONTENT_LOADED";

export function checkAndSend(type = "save", articleId = null) {
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
      if (type === "save") {
        console.log("SAVING");
        try {
          const response = await postContent(values);
          if (response.status < 300 && response.status > 199) {
            dispatch(setArticleId(response.data));
            dispatch(setPosted(true));
            dispatch(setIsEditing(true));
            dispatch(setUpdatedAt("create"));
          }
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
            dispatch(setIsEditing(false));
          } else {
            console.log(error);
          }
        }
      }

      // update
      if (type === "update") {
        console.log("UPDATING");
        try {
          const result = await update(values, articleId);

          if (result.status < 300 && result.status > 199) {
            dispatch(setErrorSpecial(false));
            dispatch(setPosted(true));
            dispatch(setUpdatedAt("create"));
          }

          return null;
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
          } else {
            console.log(error);
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
        dispatch(setUpdatedAt(response.data.updatedAt));
        dispatch(setPublishedAt(response.data.publishedAt));
        dispatch(setProgrammedAt(response.data.publishScheduledAt));
      }

      return null;
    } catch (error) {
      console.log(error);
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

export function deleteModule(articleId, moduleId) {
  console.warn("DELETE", moduleId);
  return async (dispatch, getState) => {
    const { homeScreenReducer } = getState();
    const { isEditing } = homeScreenReducer;

    try {
      const response = await deleteComponent(articleId, moduleId);
      if (response.status < 300 && response.status > 199) {
        dispatch(closeModule(moduleId));
        console.log(
          `Patrick, i've deleted the module id:${moduleId} and the server return =>`,
          response
        );
      }
    } catch (error) {
      console.error(
        `Patrick, i've fail deleting the module id:${moduleId} and the server return =>`,
        error
      );
    }
  };
}

export function saveModule(uuid, request = "save") {
  return async (dispatch, getState) => {
    const { homeScreenReducer, modulesReducer } = getState();
    const { articleId, isEditing } = homeScreenReducer;
    const { modulesList } = modulesReducer;
    let values = {};

    if (request === "save") {
      console.warn("SAVING MODULE");
      modulesList.find((module) => {
        if (module.uuid === uuid) {
          values = {
            type: module.type,
            text: module.text,
            order: module.order,
            uuid,
          };
        }
        return null;
      });

      console.log(
        `Patrick, values to SAVE for the ${values.type}-module are=>`,
        values
      );

      try {
        const response = await saveComponent(articleId, values);
        if (response.status < 300 && response.status > 199) {
          dispatch(setModulePosted(uuid));
          console.log(
            `Patrick, i've SAVED the ${values.type}-module (id:${uuid}) with succes. The API return =>`,
            response
          );
        }
      } catch (error) {
        console.log(
          `Patrick, i've try to SAVE the ${values.type}-module (id:${uuid})but i get an ERROR. The error is=>`,
          error
        );
      }
    }

    if (request === "update") {
      console.warn("UPDATING MODULE");

      modulesList.find((module) => {
        if (module.uuid === uuid) {
          values = {
            type: module.type,
            text: module.text,
            order: module.order,
          };
        }
        return null;
      });
      console.log(
        `Patrick, values to UPDATE of the ${values.type}-module (id:${uuid}) are=>`,
        values
      );
      try {
        const response = await updateComponent(articleId, values, uuid);
        if (response.status < 300 && response.status > 199) {
          dispatch(setUpdatedAt("create"));
          dispatch(setModulePosted(uuid));
          console.log(
            `Patrick, i've updated the ${values.type}-module (id:${uuid}) with succes. The API return =>`,
            response
          );
        }
      } catch (error) {
        console.error(
          `Patrick, i've try to update the ${values.type}-module (id:${uuid})but i get an ERROR. The error is=>`,
          error
        );
      }
    }
  };
}
