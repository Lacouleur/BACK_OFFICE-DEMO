import {
  PAGE_SET_TITLE,
  PAGE_SET_SLUG,
  PAGE_SET_LANG,
  PAGE_SET_ID,
  PAGE_SET_MODIFIED,
  PAGE_SET_ERROR_TITLE,
  PAGE_SET_ERROR_SLUG,
  PAGE_SET_STATUS,
  SET_IS_PAGE,
} from "../../constants";

export const pageSetTitle = (payload) => ({
  type: PAGE_SET_TITLE,
  payload,
});

export const pageSetSlug = (payload) => ({
  type: PAGE_SET_SLUG,
  payload,
});

export const pageSetlang = (payload) => ({
  type: PAGE_SET_LANG,
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

export const pageSetStatus = (payload) => ({
  type: PAGE_SET_STATUS,
  payload,
});

export const setIsPage = (payload) => ({
  type: SET_IS_PAGE,
  payload,
});
