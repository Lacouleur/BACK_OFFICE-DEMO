import { isValidToken } from "../../../services/client/refreshToken";
import { setUpdatedAt, showErrorModal } from "../actionBarActions";
import {
  contentLoaded,
  setArticleId,
  setErrorPosting,
  setPosted,
} from "../commonsActions";
import {
  pageSetErrorSlug,
  pageSetErrorTitle,
  pageSetId,
  pageSetModified,
  pageSetStatus,
  setErrorTitle,
  setModified,
} from "../pageEditor/pageMainInformationsActions";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";

import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { getPage, postPage } from "../../../services/client/pagesClient";

// eslint-disable-next-line import/prefer-default-export
export function pageCheckAndSend(type = "save", pageId = null) {
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { pageMainInformationReducer } = getState();
      const { title: mainTitle, slug, lang } = pageMainInformationReducer;

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
            if (error.response.status === 409) {
              dispatch(setErrorPosting(true));
              dispatch(setPosted(false));
              console.log(
                "%cError =>",
                `${consoleError}`,
                error?.response?.data
              );
              ErrorCaseClient(dispatch, error?.response?.data);
            } else {
              ErrorCaseClient(dispatch, error.response.data);
            }

            dispatch(showErrorModal(true));
          }
        }
      }
    }
    return null;
  };
}

export function fetchPage(id) {
  console.log("%cFETCHING PAGE =>", `${consoleTitle}`, id);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getPage(id);
        if (response.status < 300 && response.status > 199) {
          console.log("%cFetched page =>", `${consoleInfo}`, response.data);
          dispatch(contentLoaded(response.data));
          dispatch(setUpdatedAt(response.data.updatedAt));
          /*  dispatch(setPublishedAt(response.data.publishedAt));
          dispatch(setIsScheduled(response.data.publishScheduledAt || "")); */
          dispatch(pageSetStatus(response.data.state));
        }

        return null;
      } catch (error) {
        console.log("%cerror =>", `${consoleError}`, error?.response?.data);

        return null;
      }
    }
    return null;
  };
}
