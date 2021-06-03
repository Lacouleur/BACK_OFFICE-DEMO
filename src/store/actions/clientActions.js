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
  publishManager,
  deleteContent,
  uploadImage,
} from "../../services/client/contentClient";
import {
  setErrorPosting,
  setPosted,
  setErrorSpecial,
  contentLoaded,
  setArticleId,
} from "./commonsActions";
import { setContentsList, setPagination } from "./contentListActions";

import { setErrorAuth } from "./authActions";
import {
  setCategoriesList,
  setErrorSlug,
  setErrorTitle,
  setModified,
  setStatus,
} from "./mainInformationActions";
import { closeModule, setImageUuid, setModulePosted } from "./moduleActions";
import {
  setUpdatedAt,
  setProgrammedAt,
  setPublishedAt,
  showErrorModal,
} from "./actionBarActions";
import { nameSpaceError } from "../../helper/errorMessages";
import { setHomeImageUuid, setNavImageUuid } from "./homeNavigationActions";

export const CONTENT_LOADED = "CONTENT_LOADED";

export function checkAndSend(type = "save", articleId = null) {
  return async (dispatch, getState) => {
    const {
      seoReducer,
      mainInformationReducer,
      homeNavigationReducer,
    } = getState();
    const { title: mainTitle, slug, category, lang } = mainInformationReducer;
    const { description, title: seoTitle } = seoReducer;

    const {
      homeTitle,
      readingTime,
      homeImgUuid,
      homeImgAlt,
      navImgUuid,
      navImgAlt,
    } = homeNavigationReducer;

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
        category: !category ? null : category,
        header: homeTitle
          ? {
              readingTime: readingTime || undefined,
              title: homeTitle || undefined,
              type: "header",
              image: homeImgUuid
                ? {
                    uuid: homeImgUuid || undefined,
                    alt: homeImgAlt || undefined,
                    source: "FTV-internal",
                  }
                : undefined,
            }
          : undefined,
        thumbnail: navImgUuid
          ? {
              uuid: navImgUuid || undefined,
              alt: navImgAlt || undefined,
              source: "FTV-internal",
            }
          : undefined,
      };
    } else {
      values = {
        title: mainTitle,
        slug,
        category: !category ? null : category,
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
          const response = await postContent(values, lang);
          if (response.status < 300 && response.status > 199) {
            dispatch(setArticleId(response.data));
            dispatch(setPosted(true));
            dispatch(setUpdatedAt("create"));
            dispatch(setModified(true));
          }
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
          } else {
            console.log("error =>", error?.response?.data);
            dispatch(showErrorModal(true));
          }
        }
      }

      // update
      if (type === "update") {
        console.log("UPDATING", values);
        try {
          const result = await update(values, articleId, lang);

          if (result.status < 300 && result.status > 199) {
            dispatch(setErrorSpecial(false));
            dispatch(setPosted(true));
            dispatch(setUpdatedAt("create"));
            dispatch(setModified(true));
          }

          return null;
        } catch (error) {
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
          } else {
            console.log("error =>", error?.response?.data);
            dispatch(showErrorModal(true));
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
        console.log(response.data);
        dispatch(contentLoaded(response.data));
        dispatch(setUpdatedAt(response.data.updatedAt));
        dispatch(setPublishedAt(response.data.publishedAt));
        dispatch(setProgrammedAt(response.data.publishScheduledAt));
      }

      return null;
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log("error =>", error?.response?.data);
        deleteToken();
      }
      console.log("error =>", error?.response?.data);
      return null;
    }
  };
}

export function archiveContent(articleId, redirectTo) {
  console.warn("DELETE", articleId);
  return async (dispatch) => {
    try {
      const response = await deleteContent(articleId);
      if (response.status < 300 && response.status > 199) {
        redirectTo("/dashboard");
        console.log(
          `Article Deleted, id:${articleId} and the server return =>`,
          response
        );
      }
    } catch (error) {
      dispatch(showErrorModal(true));
      console.error(
        `Delete fail, id:${articleId} and the server return =>`,
        error?.response?.data
      );
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
      console.log("error =>", error?.response?.data);
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
      console.log("error =>", error?.response?.data);
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
      return null;
    }
  };
}

export function deleteModule(articleId, moduleId) {
  console.warn("DELETE", moduleId);
  return async (dispatch) => {
    try {
      const response = await deleteComponent(articleId, moduleId);
      if (response.status < 300 && response.status > 199) {
        dispatch(setUpdatedAt("create"));
        dispatch(closeModule(moduleId));
        dispatch(setModified(true));
        console.log(
          `Patrick, i've deleted the module id:${moduleId} and the server return =>`,
          response
        );
      }
    } catch (error) {
      dispatch(showErrorModal(true));
      console.error(
        `Patrick, i've fail deleting the module id:${moduleId} and the server return =>`,
        error.response.data
      );
    }
  };
}

export function saveModule(uuid, request = "save") {
  return async (dispatch, getState) => {
    const { mainInformationReducer, modulesReducer } = getState();
    const { articleId } = mainInformationReducer;
    const { modulesList } = modulesReducer;
    let values = {};
    let isNewModule = false;

    if (request === "save") {
      console.log("SAVING MODULE");
      modulesList.find((module) => {
        if (module.uuid === uuid && module.isNewModule) {
          switch (module.type) {
            case "text": {
              const { type, text, order } = module;
              values = {
                uuid,
                type,
                text,
                order,
              };
              isNewModule = true;
              break;
            }
            case "image": {
              const { type, image, order } = module;
              values = {
                uuid,
                type,
                image: {
                  alt: image.alt,
                  source: image.source || "FTV intenal",
                  uuid: image.uuid,
                },
                order,
              };
              isNewModule = true;

              break;
            }
            case "opinion": {
              const {
                type,
                answers,
                showPercentage,
                order,
                showResponse,
                showRight,
                explanation,
                question,
              } = module;

              values = {
                uuid,
                type,
                explanation: explanation || null,
                question,
                showPercentage,
                showResponse,
                showRight,
                answers,
                order,
              };
              isNewModule = true;

              break;
            }

            default:
              return null;
          }
        }
        return null;
      });

      if (isNewModule) {
        try {
          const response = await saveComponent(articleId, values);
          if (response.status < 300 && response.status > 199) {
            dispatch(setModulePosted(uuid));
            dispatch(setModified(true));
            console.log(
              `Patrick, i've SAVED the ${values.type}-module (id:${uuid}) with succes. The API return =>`,
              response
            );
          }
        } catch (error) {
          dispatch(showErrorModal(true));
          console.log(
            `Patrick, i've try to SAVE the ${values.type}-module (id:${uuid})but i get an ERROR. The error is=>`,
            error.response.data
          );
        }
      }
    }

    if (request === "update") {
      console.warn("UPDATING MODULE");
      let isChanged = false;

      modulesList.find((module) => {
        if (module.uuid === uuid && module.isChanged) {
          switch (module.type) {
            case "text": {
              const { type, text, order } = module;
              values = {
                type,
                text,
                order,
              };
              isChanged = true;
              break;
            }
            case "image": {
              const { type, image, order } = module;
              values = {
                type,
                image: {
                  alt: image.alt,
                  source: image.source,
                  uuid: image.uuid,
                },
                order,
              };
              isChanged = true;

              break;
            }
            case "opinion": {
              const {
                type,
                answers,
                showPercentage,
                order,
                showResponse,
                showRight,
                explanation,
                question,
              } = module;

              const formatedAnswers = [];
              answers.map((answer) => {
                formatedAnswers.push({
                  right: answer.right,
                  text: answer.text,
                  uuid: answer.uuid,
                });
                return null;
              });

              values = {
                type,
                explanation: explanation || null,
                question,
                showPercentage,
                showResponse,
                showRight,
                answers: formatedAnswers,
                order,
              };
              isChanged = true;

              break;
            }

            default:
              return null;
          }
        }
        return null;
      });

      if (isChanged) {
        try {
          const response = await updateComponent(articleId, values, uuid);
          if (response.status < 300 && response.status > 199) {
            dispatch(setUpdatedAt("create"));
            dispatch(setModulePosted(uuid));
            dispatch(setModified(true));
            console.log(
              `Patrick, i've updated the ${values.type}-module (id:${uuid}) with succes. The API return =>`,
              response
            );
          }
        } catch (error) {
          dispatch(showErrorModal(true));
          console.error(
            `Patrick, i've try to update the ${values.type}-module (id:${uuid})but i get an ERROR. The error is=>`,
            error.response.data
          );
        }
      }
    }
  };
}

export function publishAction(articleId, mode) {
  return async (dispatch) => {
    let actionName = "";
    if (mode === "UPDATE") {
      actionName = "PUBLISH";
    } else {
      actionName = mode;
    }
    try {
      const response = await publishManager(articleId, actionName);
      if (response.status < 300 && response.status > 199) {
        if (actionName === "PUBLISH") {
          dispatch(setStatus("PUBLISHED"));
          dispatch(setModified(false));
        }
        if (actionName === "UNPUBLISH") {
          dispatch(setStatus("UNPUBLISHED"));
        }
      }
    } catch (error) {
      dispatch(showErrorModal(true));
      console.log(error.response.data);
    }
  };
}

export function saveImage(name, image, moduleId) {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await uploadImage(formData);
      if (response.status < 300 && response.status > 199) {
        if (name === "image") {
          console.log("RESPONSE", response.data);
          dispatch(setImageUuid({ id: moduleId, value: response.data }));
        }
        if (name === "homeImage") {
          dispatch(setHomeImageUuid(response.data));
        }
        if (name === "navImage") {
          dispatch(setNavImageUuid(response.data));
        }
      }
    } catch (error) {
      if (error?.response.status === 400) {
        dispatch(showErrorModal(nameSpaceError()));
      }
      showErrorModal(true);
    }
  };
}
