import {
  setIsScheduled,
  setPublishedAt,
  setPublishScheduleFailData,
  setPublishScheduleFailed,
  setUpdatedAt,
  showErrorModal,
} from "../actionBarActions";
import {
  pageLoaded,
  setErrorPosting,
  setErrorSpecial,
  setPosted,
  setStatus,
} from "../commonsActions";
import {
  pageSetErrorSlug,
  pageSetErrorTitle,
  pageSetId,
  pageSetModified,
} from "../pageEditor/pageMainInformationsActions";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";

import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import {
  deletePage,
  getPage,
  postPage,
  updatePage,
} from "../../../services/client/pagesClient";
import { fetchPages } from "./PagesHubActions.thunk";

// eslint-disable-next-line import/prefer-default-export
export function pageCheckAndSend(type = "save", pageId = null) {
  return async (dispatch, getState) => {
    const { pageMainInformationReducer, pageSeoReducer } = getState();
    const {
      title: mainTitle,
      slug,
      lang,
      subtitle,
      displayTitle,
    } = pageMainInformationReducer;
    const { title: seoTitle, description } = pageSeoReducer;

    const slugError = !slug;
    const titleError = !mainTitle;

    if (slugError) {
      dispatch(pageSetErrorSlug(true));
    }

    if (titleError) {
      dispatch(pageSetErrorTitle(true));
    }

    let values = {};

    values = {
      title: mainTitle,
      slug,
    };

    values = {
      title: mainTitle,
      subtitle: subtitle || undefined,
      displayTitle,
      slug,
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

    if (!slugError && !titleError) {
      // post
      if (type === "save") {
        console.log("%cSAVING PAGE", `${consoleTitle}`);
        try {
          const response = await postPage(values, lang);
          if (response.status < 300 && response.status > 199) {
            dispatch(pageSetId(response.data));
            dispatch(setPosted(true));
            dispatch(setUpdatedAt("create"));
            dispatch(pageSetModified(true));
            console.log("%cContent saved", `${consoleSucces}`);
          }
        } catch (error) {
          if (error?.response?.data === "Invalid token") {
            deleteToken();
          }
          if (error.response.status === 409) {
            dispatch(setErrorPosting(true));
            dispatch(setPosted(false));
            console.log("%cError =>", `${consoleError}`, error?.response?.data);
            ErrorCaseClient(dispatch, error?.response?.data);
          } else {
            ErrorCaseClient(dispatch, error.response.data);
          }

          dispatch(showErrorModal(true));
        }
      }
    }

    // update
    if (type === "update") {
      console.log("%cUPDATING PAGE", `${consoleTitle}`);
      try {
        const result = await updatePage(values, pageId, lang);

        if (result.status < 300 && result.status > 199) {
          dispatch(setErrorSpecial(false));
          dispatch(setPosted(true));
          dispatch(pageSetModified(true));
          console.log("%cPage updated", `${consoleSucces}`);
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

export function fetchPage(id) {
  console.log("%cFETCHING PAGE =>", `${consoleTitle}`, id);
  return async (dispatch) => {
    try {
      const response = await getPage(id);
      if (response.status < 300 && response.status > 199) {
        console.log("%cFetched page =>", `${consoleInfo}`, response.data);
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
      console.log("%cerror =>", `${consoleError}`, error);
      console.log("%cerror =>", `${consoleError}`, error?.response?.data);

      return null;
    }

    return null;
  };
}

export function archivePage(articleId, redirectTo, fromList = false) {
  console.log("%cDELETING", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    try {
      const response = await deletePage(articleId);
      if (response.status < 300 && response.status > 199) {
        if (!fromList) {
          redirectTo("/pages");
          console.log(
            `%cPage Deleted, id:${articleId} =>`,
            `${consoleSucces}`,
            response
          );
        }
        if (fromList) {
          dispatch(fetchPages());
          console.log(
            `%cPage Deleted, id:${articleId} =>`,
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
