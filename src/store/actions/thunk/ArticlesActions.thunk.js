import {
  deleteContent,
  getAuthors,
  getCategories,
  getContent,
  getContentList,
  getContentListResearch,
  getTags,
  getUsers,
  postContent,
  postTag,
  updateContent,
} from "../../../services/client/contentClient";

import {
  setIsScheduled,
  setPublishedAt,
  setPublishScheduleFailed,
  setPublishScheduleFailData,
  setUpdatedAt,
} from "../actionBarActions";
import {
  contentLoaded,
  setArticleId,
  setErrorPosting,
  setErrorSpecial,
  setPosted,
  setCategoriesList,
  setTagsList,
  setStatus,
  setModified,
  pageLoaded,
} from "../commonsActions";
import {
  setErrorSlug,
  setErrorTitle,
  setUsers,
  setNewTag,
  setTags,
  setAuthorsList,
} from "../mainInformationActions";

import { deleteToken } from "../../../services/client/tokenStuff";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import {
  setContentsList,
  setPagination,
  setSearchedList,
} from "../contentListActions";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { dispatchElementsId } from "../../../helper/fieldsHelper";
import { getPage } from "../../../services/client/pagesClient";
import {
  setCollectionPagination,
  setCumulatedContentsList,
  setFetchedCustomList,
} from "../moduleActions";

// This file is an action file for Articles using redux-thunk

export function checkAndSend(type = "save", articleId = null) {
  return async (dispatch, getState) => {
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
      shortDescription,
      transparentImgUuid,
      transparentImgAlt,
      socialImgUuid,
      socialImgAlt,
      backgroundColor,
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

    // UPDATE ARTICLE
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
              excerpt: shortDescription || undefined,
              type: "header",
              image: homeImgUuid
                ? {
                    uuid: homeImgUuid || undefined,
                    alt: homeImgAlt || undefined,
                    source: "FTV-internal",
                  }
                : undefined,
              transparentImage: transparentImgUuid
                ? {
                    uuid: transparentImgUuid || undefined,
                    alt: transparentImgAlt || undefined,
                    source: "FTV-internal",
                  }
                : undefined,
              backgroundColor,
              snImage: socialImgUuid
                ? {
                    uuid: socialImgUuid || undefined,
                    alt: socialImgAlt || undefined,
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
        authors: authors || [],
        tags: tags || [],
      };

      // SAVE ARTICLE
    } else {
      values = {
        title: mainTitle,
        slug,
        category: !category ? null : category,
        theme: colorStyle || "1",
        authors: authors || [],
        tags: tags || [],
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
          if (error?.response?.data === "Invalid token") {
            deleteToken();
          }
          if (error.response?.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
            ErrorCaseClient(dispatch, error?.response?.data);
          } else {
            ErrorCaseClient(dispatch, error.response.data);
          }
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
        if (error?.response?.data === "Invalid token") {
          deleteToken();
        }
        if (error.response.status === 409) {
          dispatch(setErrorPosting(true));
          dispatch(setPosted(false));
          ErrorCaseClient(dispatch, error?.response?.data);
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
        return null;
      }
    }

    return null;
  };
}

export function getStatus(id) {
  console.log("%cFETCHING STATUS =>", `${consoleTitle}`, id);
  return async (dispatch, getState) => {
    const { pageMainInformationReducer } = getState();
    const { isPage } = pageMainInformationReducer;

    try {
      const response = isPage ? await getPage(id) : await getContent(id);
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
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}

export function fetchContent(id) {
  console.log("%cFETCHING CONTENT =>", `${consoleTitle}`, id);
  return async (dispatch) => {
    try {
      const response = await getContent(id);
      if (response.status < 300 && response.status > 199) {
        console.log("%cFetched content =>", `${consoleInfo}`, response.data);
        dispatch(contentLoaded(response.data));
        dispatch(pageLoaded(response.data));
        dispatch(setUpdatedAt(response.data.updatedAt));
        dispatch(setPublishedAt(response.data.publishedAt));
        dispatch(setIsScheduled(response.data.publishScheduledAt || ""));
        dispatch(setStatus(response.data.state));
        dispatch(setPublishScheduleFailed(response.data.publishScheduleFailed));
        dispatch(
          setPublishScheduleFailData(response.data.publishScheduleFailData)
        );
      }

      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.log("%cerror =>", `${consoleError}`, error?.response?.data);

      return null;
    }
  };
}

export function fetchContentsList(
  page = 1,
  uuid,
  contentType,
  lang,
  limit = 15,
  ids
) {
  return async (dispatch) => {
    try {
      const response = await getContentList(
        page,
        contentType,
        lang,
        limit,
        ids
      );
      if (response.status < 300 && response.status > 199) {
        if (uuid) {
          if (ids) {
            dispatch(
              setFetchedCustomList({
                id: uuid,
                value: response.data.contents,
              })
            );
          }

          if (!ids) {
            dispatch(
              setCumulatedContentsList({
                id: uuid,
                value: response.data.contents,
              })
            );
          }
          if (response.data.currentPage) {
            dispatch(
              setCollectionPagination({
                id: uuid,
                currentPage: response.data.currentPage,
                lastPage: response.data.lastPage,
                nextPage: response.data.nextPage,
              })
            );
          }
        }

        if (!ids && !uuid) {
          dispatch(setContentsList(response.data.contents));
          dispatch(setPagination(response.data));
        }
      }
      console.log(
        "%c Fetched content list =>",
        `${consoleInfo}`,
        response.data
      );

      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}

export function fetchResearchedContentsList(
  searched,
  lang,
  langOfResearch,
  page = 1,
  isCaseSensitive = false,
  limit = 15
) {
  return async (dispatch) => {
    try {
      const response = await getContentListResearch(
        searched,
        lang,
        langOfResearch,
        page,
        isCaseSensitive,
        limit
      );
      if (response.status < 300 && response.status > 199) {
        dispatch(setSearchedList(response.data.contents));
        dispatch(setPagination(response.data));
      }
      console.log(
        "%c Fetched searched list =>",
        `${consoleInfo}`,
        response.data
      );

      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}

export function archiveContent(articleId, redirectTo, fromList = false) {
  console.log("%cDELETING", `${consoleTitle}`, articleId);
  return async (dispatch) => {
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
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      ErrorCaseClient(dispatch, error?.response?.data);
    }

    return null;
  };
}

export function fetchCategoriesList(lang = "fr") {
  return async (dispatch) => {
    try {
      const response = await getCategories(lang);
      if (response.status < 300 && response.status > 199) {
        dispatch(setCategoriesList(response.data));
      }
      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      if (error?.response?.status === 401) {
        console.error("%cError =>", `${consoleError}`, error?.response?.data);
        deleteToken(dispatch);
      }
      return null;
    }
  };
}

export function fetchAuthorsList(lang = "fr") {
  return async (dispatch) => {
    try {
      const response = await getAuthors(lang);
      if (response.status < 300 && response.status > 199) {
        dispatch(setAuthorsList(response.data));
      }
      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      if (error?.response?.status === 401) {
        console.error("%cError =>", `${consoleError}`, error?.response?.data);
        deleteToken(dispatch);
      }
      return null;
    }
  };
}

export function fetchUsers() {
  console.log("%cFETCH USERS", `${consoleTitle}`);
  return async (dispatch) => {
    try {
      const response = await getUsers();
      if (response.status < 300 && response.status > 199) {
        console.log("%cFetched Users =>", `${consoleInfo}`, response.data);
        dispatch(setUsers(response.data));
      }
      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}

export function fetchTags(lang) {
  console.log("%cFETCH TAGS", `${consoleTitle}`);
  return async (dispatch) => {
    try {
      const response = await getTags(lang);
      if (response.status < 300 && response.status > 199) {
        console.log("%cFetched Tags =>", `${consoleInfo}`, response.data);
        dispatch(setTagsList(response.data));
      }
      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}

export function createTag(label, lang, setSelectedTags, selectedTags) {
  console.log("%cCREATING TAG =>", `${consoleTitle}`, label);
  return async (dispatch, getState) => {
    const { mainInformationReducer } = getState();
    const { tagsList } = mainInformationReducer;

    try {
      const response = await postTag(label, lang);
      if (response.status < 300 && response.status > 199) {
        console.log("%cTag Created=>", `${consoleInfo}`, response.data);
        const newTag = { label, _id: response.data };
        dispatch(setNewTag(newTag));
        dispatch(setTagsList([...tagsList, { label, _id: response.data }]));

        const newSelectedTags =
          !selectedTags && selectedTags?.length === 0
            ? [newTag]
            : [...selectedTags, newTag];

        dispatch(setTags(dispatchElementsId(newSelectedTags)));
        setSelectedTags(newSelectedTags);
      }
      return null;
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      console.error("%cError =>", `${consoleError}`, error?.response?.data);
      return null;
    }
  };
}
