import {
  SET_ERROR_TITLE,
  SET_ERROR_SLUG,
  ADD_SLUG,
  ADD_CATEGORY,
  SET_CATEGORIES_LIST,
  ADD_TITLE,
  SET_UPDATED_AT,
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

export const setUpdatedAt = (payload) => ({
  type: SET_UPDATED_AT,
  payload,
});
