import {
  deleteContent,
  getCategories,
  getContent,
  getContentList,
  getTags,
  getUsers,
  postContent,
  postTag,
  updateContent,
} from "../../../services/client/contentClient";
import { isValidToken } from "../../../services/client/refreshToken";
import {
  setIsScheduled,
  setPublishedAt,
  setPublishScheduleFailed,
  setPublishScheduleFailData,
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
  setStatus,
  setUsers,
  setTagsList,
} from "../mainInformationActions";
import { deleteToken } from "../../../services/client/tokenStuff";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { setContentsList, setPagination } from "../contentListActions";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";

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
        caption,
        authors,
        tags,
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
          partnership: caption,
          authors,
          tags,
        };
      } else {
        values = {
          title: mainTitle,
          slug,
          category: !category ? null : category,
          theme: colorStyle || "1",
          authors,
          tags,
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
              ErrorCaseClient(dispatch, error.response.data);
            }
            console.log("%cError =>", `${consoleError}`, error?.response?.data);
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
            ErrorCaseClient(dispatch, error?.response?.data);
          }
          return null;
        }
      }
    }
    return null;
  };
}

export function getStatus(id) {
  console.log("%cFETCHING STATUS =>", `${consoleTitle}`, id);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getContent(id);
        if (response.status < 300 && response.status > 199) {
          console.log(
            "%cFetched Status =>",
            `${consoleInfo}`,
            response.data.state
          );
          dispatch(setStatus(response.data.state));
        }
        return null;
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
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
          dispatch(setIsScheduled(response.data.publishScheduledAt || ""));
          dispatch(setStatus(response.data.state));
          dispatch(
            setPublishScheduleFailed(response.data.publishScheduleFailed)
          );
          dispatch(
            setPublishScheduleFailData(response.data.publishScheduleFailData)
          );
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
        ErrorCaseClient(dispatch, error?.response?.data);
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

export function fetchUsers() {
  console.log("%cFETCH USERS=>", `${consoleTitle}`);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getUsers();
        if (response.status < 300 && response.status > 199) {
          console.log("%cFetched Users =>", `${consoleInfo}`, response.data);
          dispatch(setUsers(response.data));
        }
        return null;
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
    }
    return null;
  };
}

export function fetchTags(lang) {
  console.log("%cFETCH TAGS=>", `${consoleTitle}`);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getTags(lang);
        if (response.status < 300 && response.status > 199) {
          console.log("%cFetched Tags =>", `${consoleInfo}`, response.data);
          dispatch(setTagsList(response.data));
        }
        return null;
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
    }
    return null;
  };
}

export function createTag(label, lang, setNewTag) {
  console.log("%cCREATING TAG=>", `${consoleTitle}`, label);
  return async (dispatch, getState) => {
    const { mainInformationReducer } = getState();
    const { tagsList } = mainInformationReducer;
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await postTag(label, lang);
        if (response.status < 300 && response.status > 199) {
          console.log("%cTag Created=>", `${consoleInfo}`, response.data);
          setNewTag({ label, _id: response.data });
          dispatch(setTagsList([...tagsList, { label, _id: response.data }]));
        }
        return null;
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        return null;
      }
    }
    return null;
  };
}
