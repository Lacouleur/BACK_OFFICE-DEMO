import {
  PAGE_SET_TITLE,
  PAGE_SET_SLUG,
  PAGE_SET_ID,
  PAGE_SET_MODIFIED,
  PAGE_SET_ERROR_TITLE,
  PAGE_SET_ERROR_SLUG,
  SET_IS_PAGE,
  PAGE_SET_DISPLAY_TITLE,
  PAGE_SET_SUBTITLE,
  SET_FEEDBACK_RESULTS,
  SET_AUTHORS_LIST,
} from "../../constants";

export const pageSetTitle = (payload) => ({
  type: PAGE_SET_TITLE,
  payload,
});

export const pageSetDisplayTitle = (payload) => ({
  type: PAGE_SET_DISPLAY_TITLE,
  payload,
});

export const pageSetSubtitle = (payload) => ({
  type: PAGE_SET_SUBTITLE,
  payload,
});

export const pageSetSlug = (payload) => ({
  type: PAGE_SET_SLUG,
  payload,
});

export const pageSetId = (payload) => ({
  type: PAGE_SET_ID,
  payload,
});

export const pageSetModified = (payload) => ({
  type: PAGE_SET_MODIFIED,
  payload,
});

export const pageSetErrorTitle = (payload) => ({
  type: PAGE_SET_ERROR_TITLE,
  payload,
});

export const pageSetErrorSlug = (payload) => ({
  type: PAGE_SET_ERROR_SLUG,
  payload,
});

export const setIsPage = (payload) => ({
  type: SET_IS_PAGE,
  payload,
});

export const setFeedbackResults = (payload) => ({
  type: SET_FEEDBACK_RESULTS,
  payload,
});

export const setAuthorsList = (payload) => ({
  type: SET_AUTHORS_LIST,
  payload,
});
