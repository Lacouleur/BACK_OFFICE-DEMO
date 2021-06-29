import {
  SET_ERROR_TITLE,
  SET_ERROR_SLUG,
  ADD_SLUG,
  ADD_CATEGORY,
  SET_CATEGORIES_LIST,
  ADD_TITLE,
  SET_STATUS,
  SET_MODIFIED,
  ADD_LANG,
  SET_COLOR_STYLE,
} from "../constants";

export const addTitle = (payload) => ({
  type: ADD_TITLE,
  payload,
});

export const addSlug = (payload) => ({
  type: ADD_SLUG,
  payload,
});

export const setErrorTitle = (payload) => ({
  type: SET_ERROR_TITLE,
  payload,
});

export const setErrorSlug = (payload) => ({
  type: SET_ERROR_SLUG,
  payload,
});

export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload,
});

export const setCategoriesList = (payload) => ({
  type: SET_CATEGORIES_LIST,
  payload,
});

export const setStatus = (payload) => ({
  type: SET_STATUS,
  payload,
});

export const setModified = (payload) => ({
  type: SET_MODIFIED,
  payload,
});

export const addLang = (payload) => ({
  type: ADD_LANG,
  payload,
});

export const setColorStyle = (payload) => ({
  type: SET_COLOR_STYLE,
  payload,
});
