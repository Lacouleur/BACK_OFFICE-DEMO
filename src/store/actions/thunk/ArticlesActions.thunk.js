import {
  deleteContent,
  getCategories,
  getContent,
  getContentList,
  postContent,
  updateContent,
} from "../../../services/client/contentClient";
import { isValidToken } from "../../../services/client/refreshToken";
import {
  setProgrammedAt,
  setPublishedAt,
  setUpdatedAt,
  showErrorModal,
} from "../actionBarActions";
import {
  contentLoaded,
  setArticleId,
  setErrorPosting,
  setErrorSpecial,
  setPosted,
} from "../commonsActions";
import {
  setCategoriesList,
  setErrorSlug,
  setErrorTitle,
  setModified,
} from "../mainInformationActions";
import { deleteToken } from "../../../services/client/tokenStuff";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { setContentsList, setPagination } from "../contentListActions";

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