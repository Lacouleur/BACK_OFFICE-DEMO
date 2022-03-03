import { isValidToken } from "../../../services/client/refreshToken";
import { setUpdatedAt, showErrorModal } from "../actionBarActions";
import {
  contentLoaded,
  pageLoaded,
  setErrorPosting,
  setErrorSpecial,
  setPosted,
} from "../commonsActions";
import {
  pageSetErrorSlug,
  pageSetErrorTitle,
  pageSetId,
  pageSetModified,
  pageSetStatus,
} from "../pageEditor/pageMainInformationsActions";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";

import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import {
  getPage,
  postPage,
  updatePage,
} from "../../../services/client/pagesClient";

// eslint-disable-next-line import/prefer-default-export
export function pageCheckAndSend(type = "save", pageId = null) {
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { pageMainInformationReducer, pageSeoReducer } = getState();
      const { title: mainTitle, slug, lang } = pageMainInformationReducer;
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

      if (type === "update") {
        values = {
          title: mainTitle,
          slug,
        };
        console.log("VALUES.TAG ==>", values.tags);
      } else {
        values = {
          title: mainTitle,
          slug,
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
          dispatch(pageLoaded(response.data));
          dispatch(setUpdatedAt(response.data.updatedAt));
          /*  dispatch(setPublishedAt(response.data.publishedAt));
          dispatch(setIsScheduled(response.data.publishScheduledAt || "")); */
          dispatch(pageSetStatus(response.data.state));
        }

        return null;
      } catch (error) {
        console.log("%cerror =>", `${consoleError}`, error);
        console.log("%cerror =>", `${consoleError}`, error?.response?.data);

        return null;
      }
    }
    return null;
  };
}
