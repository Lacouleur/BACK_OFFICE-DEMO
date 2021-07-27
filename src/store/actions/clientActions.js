import { deleteToken, setToken } from "../../services/client/tokenStuff";
import { isValidToken } from "../../services/client/refreshToken";
import {
  sendAuth,
  saveComponent,
  updateComponent,
  deleteComponent,
  getCategories,
  getContent,
  getManifesto,
  getContentList,
  postContent,
  publishManager,
  deleteContent,
  uploadImage,
  postManifesto,
  updateContent,
  updateManifesto,
  duplicateContent,
  translateContent,
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
import {
  setManifestoId,
  setManifestolang,
  setManifestoStatus,
} from "./manifestoActions";
import { closeModule, setImageUuid, setModulePosted } from "./moduleActions";
import {
  setUpdatedAt,
  setProgrammedAt,
  setPublishedAt,
  showErrorModal,
} from "./actionBarActions";
import { alreadyTranslated, nameSpaceError } from "../../helper/errorMessages";
import { setHomeImageUuid, setNavImageUuid } from "./homeNavigationActions";
import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../helper/consoleStyles";

export function checkAndSend(type = "save", articleId = null) {
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const {
        seoReducer,
        mainInformationReducer,
        homeNavigationReducer,
      } = getState();
      const {
        title: mainTitle,
        slug,
        category,
        lang,
        colorStyle,
      } = mainInformationReducer;
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

      let theme = colorStyle;

      if (typeof colorStyle === "string") {
        theme = parseInt(colorStyle, 10);
      }

      if (type === "update") {
        values = {
          title: mainTitle,
          slug,
          category: !category ? null : category,
          theme,
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
          theme: colorStyle,
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
          console.log("%cSAVING CONTENT", `${consoleTitle}`);
          try {
            const response = await postContent(values, lang);
            if (response.status < 300 && response.status > 199) {
              dispatch(setArticleId(response.data));
              dispatch(setPosted(true));
              dispatch(setUpdatedAt("create"));
              dispatch(setModified(true));
              console.log("%cContent saved", `${consoleSucces}`);
            }
          } catch (error) {
            if (error.response.status === 409) {
              dispatch(setErrorPosting(true));
              dispatch(setPosted(false));
            } else {
              console.log(
                "%cError =>",
                `${consoleError}`,
                error?.response?.data
              );
              dispatch(showErrorModal(true));
            }
          }
        }

        // update
        if (type === "update") {
          console.log("%cUPDATING CONTENT", `${consoleTitle}`);
          try {
            const result = await updateContent(values, articleId, lang);

            if (result.status < 300 && result.status > 199) {
              dispatch(setErrorSpecial(false));
              dispatch(setPosted(true));
              dispatch(setUpdatedAt("create"));
              dispatch(setModified(true));
              console.log("%cContent updated", `${consoleSucces}`);
            }

            return null;
          } catch (error) {
            if (error.response.status === 409) {
              dispatch(setErrorPosting(true));
              dispatch(setPosted(false));
            } else {
              console.log(
                "%cError =>",
                `${consoleError}`,
                error?.response?.data
              );
              dispatch(showErrorModal(true));
              dispatch(setPosted(false));
            }
            return null;
          }
        }
      }
      return null;
    }
    return null;
  };
}

export function saveManifesto(lang) {
  console.log("%cSAVING MANIFESTO", `${consoleTitle}`, lang);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { mainInformationReducer } = getState();
      const { title: mainTitle, colorStyle } = mainInformationReducer;

      const titleError = !mainTitle;

      if (titleError) {
        dispatch(setErrorTitle(true));
      }

      let values = {};
      let theme = colorStyle;

      if (typeof colorStyle === "string") {
        theme = parseInt(colorStyle, 10);
      }

      values = {
        title: mainTitle,
        theme,
      };

      if (!titleError && lang) {
        try {
          const response = await postManifesto(values, lang);
          if (response.status < 300 && response.status > 199) {
            dispatch(setManifestoId(response.data));
            dispatch(setPosted(true));
            dispatch(setManifestoStatus("UNPUBLISHED"));

            console.log(
              `%cPosted manifesto`,
              `${consoleSucces}`,
              response.data
            );
          }
        } catch (error) {
          dispatch(showErrorModal(true));
          console.log("%cError =>", `${consoleError}`, error?.response?.data);
        }
      }
    }
    return null;
  };
}

export function actulalizeManifesto(manifestoId) {
  console.log("%cUPDATING MANIFESTO", `${consoleTitle}`, manifestoId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const {
        seoReducer,
        mainInformationReducer,
        homeNavigationReducer,
      } = getState();
      const { title: mainTitle, colorStyle } = mainInformationReducer;
      const { description, title: seoTitle } = seoReducer;

      const {
        homeTitle,
        readingTime,
        homeImgUuid,
        homeImgAlt,
        navImgUuid,
        navImgAlt,
      } = homeNavigationReducer;
      let theme = colorStyle;

      if (typeof colorStyle === "string") {
        theme = parseInt(colorStyle, 10);
      }

      let values = {};

      values = {
        title: mainTitle,
        theme,
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

      try {
        const response = await updateManifesto(values, manifestoId);
        if (response.status < 300 && response.status > 199) {
          dispatch(setErrorSpecial(false));
          dispatch(setPosted(true));
          dispatch(setModified(true));
          dispatch(setManifestoStatus("UNPUBLISHED"));
          console.log(
            `%cUpdated Manifesto =>`,
            `${consoleSucces}`,
            response.data
          );
        }
      } catch (error) {
        console.log(
          "%cError while updating",
          `${consoleError}`,
          error?.response?.data
        );
        if (error.response.status === 409) {
          dispatch(setErrorPosting(true));
          dispatch(setPosted(false));
        } else {
          dispatch(showErrorModal(true));
          dispatch(setPosted(false));
        }
        return null;
      }
      return null;
    }
    return null;
  };
}

export function fetchContent(id) {
  console.log("%cFETCHING CONTENT =>", `${consoleTitle}`, id);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getContent(id);
        if (response.status < 300 && response.status > 199) {
          console.log("%cFetched content =>", `${consoleInfo}`, response.data);
          dispatch(contentLoaded(response.data));
          dispatch(setUpdatedAt(response.data.updatedAt));
          dispatch(setPublishedAt(response.data.publishedAt));
          dispatch(setProgrammedAt(response.data.publishScheduledAt));
        }

        return null;
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log("%cError =>", `${consoleError}`, error?.response?.data);
          deleteToken(dispatch);
        }
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
    }
    return null;
  };
}

export function fetchManifesto(lang) {
  console.log("%cFETCHING MANIFESTO", `${consoleTitle}`, lang);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      if (lang) {
        try {
          const response = await getManifesto(lang);
          if (response.status < 300 && response.status > 199) {
            const fetchedLang =
              response.data[0].language === "german" ? "de" : "fr";

            console.log(
              "%cManifesto fetched =>",
              `${consoleInfo}`,
              response.data
            );

            if (fetchedLang === lang) {
              dispatch(setManifestoStatus("PUBLISHED"));
              dispatch(setManifestolang(fetchedLang));
              dispatch(contentLoaded(response.data[0]));
            } else {
              dispatch(setManifestoId(""));
            }
          }
          return null;
        } catch (error) {
          if (error?.response?.status === 401) {
            console.log("%cError =>", `${consoleError}`, error?.response?.data);
            deleteToken(dispatch);
          }
          console.log("%cError =>", `${consoleError}`, error?.response?.data);
          return null;
        }
      }
      return null;
    }
    return null;
  };
}

export function fetchContentsList(page) {
  console.log("%cFETCHING CONTENT LIST", `${consoleTitle}`);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getContentList(page);
        if (response.status < 300 && response.status > 199) {
          dispatch(setContentsList(response.data.contents));
          dispatch(setPagination(response.data));
        }
        console.log(
          "%c Fetched content list =>",
          `${consoleInfo}`,
          response.data
        );

        return null;
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
    }
    return null;
  };
}

export function archiveContent(articleId, redirectTo, fromList = false) {
  console.log("%cDELETING", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await deleteContent(articleId);
        if (response.status < 300 && response.status > 199) {
          if (!fromList) {
            redirectTo("/dashboard");
            console.log(
              `%cArticle Deleted, id:${articleId} =>`,
              `${consoleSucces}`,
              response
            );
          }
          if (fromList) {
            dispatch(fetchContentsList());
            console.log(
              `%cArticle Deleted, id:${articleId} =>`,
              `${consoleSucces}`,
              response
            );
          }
        }
      } catch (error) {
        dispatch(showErrorModal(true));
        console.log(
          `%cError while deleting id:${articleId} =>`,
          `${consoleError}`,
          error?.response?.data
        );
      }
    }
    return null;
  };
}

export function logUser(redirectTo) {
  console.log("%cLOGING USER", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const { authReducer } = getState();
    const data = {
      email: authReducer.mail,
      password: authReducer.password,
    };
    try {
      const response = await sendAuth(data);
      if (response.status < 300 && response.status > 199) {
        console.log("%cUser logged=>", `${consoleSucces}`);
        setToken(response.data);
        redirectTo("/dashboard");
      }
      dispatch(setErrorAuth(true));
      return false;
    } catch (error) {
      dispatch(setErrorAuth(true));
      console.log("%cerror =>", `${consoleError}`, error?.response?.data);
      return false;
    }
  };
}

export function fetchCategoriesList() {
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getCategories();
        if (response.status < 300 && response.status > 199) {
          dispatch(setCategoriesList(response.data));
        }
        return null;
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log("%cError =>", `${consoleError}`, error?.response?.data);
          deleteToken(dispatch);
        }
        return null;
      }
    }
    return null;
  };
}

export function deleteModule(articleId, moduleId) {
  console.log("%cDELETING MODULE", `${consoleTitle}`, moduleId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { isManifesto, manifestoId } = manifestoReducer;
      try {
        let response = null;

        if (isManifesto) {
          response = await deleteComponent(manifestoId, moduleId, isManifesto);
        } else {
          response = await deleteComponent(articleId, moduleId);
        }

        if (response.status < 300 && response.status > 199) {
          dispatch(setUpdatedAt("create"));
          dispatch(closeModule(moduleId));
          dispatch(setModified(true));
          if (isManifesto) {
            dispatch(setManifestoStatus("UNPUBLISHED"));
          }
          console.log(
            `%cDeleted module id:${moduleId} =>`,
            `${consoleSucces}`,
            response
          );
        }
      } catch (error) {
        dispatch(showErrorModal(true));
        console.log(
          `%cError, fail deleting the module id:${moduleId} =>`,
          `${consoleError}`,
          error?.response?.data
        );
      }
    }
    return null;
  };
}

export function saveModule(uuid, request = "save") {
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const {
        mainInformationReducer,
        modulesReducer,
        manifestoReducer,
      } = getState();
      const { articleId } = mainInformationReducer;
      const { modulesList } = modulesReducer;
      const { isManifesto, manifestoId } = manifestoReducer;
      let values = {};
      let isNewModule = false;

      if (request === "save") {
        console.log("%cSAVING MODULE", `${consoleTitle}`, uuid);
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
                    source: "FTV intenal",
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
            let response = null;

            if (isManifesto) {
              response = await saveComponent(manifestoId, values, isManifesto);
            } else {
              response = await saveComponent(articleId, values);
            }

            if (response.status < 300 && response.status > 199) {
              dispatch(setModulePosted(uuid));
              dispatch(setModified(true));
              if (isManifesto) {
                dispatch(setManifestoStatus("UNPUBLISHED"));
              }

              console.log(
                `%cSAVED, ${values.type}-module (id:${uuid}) =>`,
                `${consoleSucces}`,
                response
              );
            }
          } catch (error) {
            dispatch(showErrorModal(true));
            console.log(
              `%cError, ${values.type}-module (id:${uuid})=>`,
              `${consoleError}`,
              error?.response?.data
            );
          }
        }
      }

      if (request === "update") {
        console.log("%cUPDATING MODULE", `${consoleTitle}`, uuid);
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
                    source: "FTV-internal",
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
            let response = null;

            if (isManifesto) {
              response = await updateComponent(
                manifestoId,
                values,
                uuid,
                isManifesto
              );
            } else {
              response = await updateComponent(articleId, values, uuid);
            }

            if (response.status < 300 && response.status > 199) {
              dispatch(setUpdatedAt("create"));
              dispatch(setModulePosted(uuid));
              dispatch(setModified(true));
              if (isManifesto) {
                dispatch(setManifestoStatus("UNPUBLISHED"));
              }

              console.log(
                `%cUpdated, ${values.type}-module (id:${uuid}) =>`,
                `${consoleSucces}`,
                response
              );
            }
          } catch (error) {
            dispatch(showErrorModal(true));
            console.log(
              `%cError, ${values.type}-module (id:${uuid}) =>`,
              `${consoleError}`,
              error?.response?.data
            );
          }
        }
      }
    }
    return null;
  };
}

export function publishAction(articleId, mode) {
  console.log("%cPUBLISHING", `${consoleTitle}`, articleId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { isManifesto, manifestoId } = manifestoReducer;

      let actionName = "";
      if (mode === "UPDATE") {
        actionName = "PUBLISH";
      } else {
        actionName = mode;
      }
      try {
        const response = await publishManager(
          isManifesto ? manifestoId : articleId,
          actionName,
          isManifesto
        );
        if (response.status < 300 && response.status > 199) {
          if (!isManifesto) {
            if (actionName === "PUBLISH") {
              dispatch(setStatus("PUBLISHED"));
              dispatch(setModified(false));
            }
            if (actionName === "UNPUBLISH") {
              dispatch(setStatus("UNPUBLISHED"));
            }
          }
          if (isManifesto) {
            if (actionName === "PUBLISH") {
              dispatch(setManifestoStatus("PUBLISHED"));
              dispatch(setModified(false));
            }
          }
        }
      } catch (error) {
        dispatch(showErrorModal(true));
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
      }
    }
    return null;
  };
}

export function saveImage(name, image, moduleId) {
  console.log("%cSAVING IMAGE", `${consoleTitle}`, moduleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await uploadImage(formData);
        if (response.status < 300 && response.status > 199) {
          if (name === "image") {
            console.log("%cRESPONSE", `${consoleInfo}`, response.data);
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
        console.log(`%cError =>`, `${consoleError}`, error?.response?.data);
        if (error?.response.status === 400) {
          dispatch(showErrorModal({ value: true, message: nameSpaceError() }));
        }
        showErrorModal(true);
      }
    }
    return null;
  };
}

export function duplicateArticle(articleId) {
  console.log("%cDUPLICATION", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await duplicateContent(articleId);
        if (response.status < 300 && response.status > 199) {
          dispatch(fetchContentsList());
          console.log("%cContent Duplicated", `${consoleSucces}`);
        }
      } catch (error) {
        console.log(`%cError =>`, `${consoleError}`, error?.response?.data);
        dispatch(
          showErrorModal({ value: true, message: error?.response?.data })
        );
      }
    }
    return null;
  };
}

export function translateArticle(articleId, lang, history) {
  console.log("%cTRANSLATING ARTICLE", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await translateContent(articleId, lang);
        if (response.status < 300 && response.status > 199) {
          console.log(
            "%cContent Duplicated for translation",
            `${consoleSucces}`
          );
          dispatch(fetchContentsList());
        }
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        if (error?.response?.status === 409) {
          dispatch(
            showErrorModal({
              value: true,
              message: alreadyTranslated(
                error?.response?.data,
                articleId,
                history,
                dispatch
              ),
            })
          );
        }
      }
    }
    return null;
  };
}
