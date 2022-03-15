import {
  SET_POSTED,
  SET_ERROR_SPECIAL,
  SET_ERROR_POSTING,
  CONTENT_LOADED,
  PAGE_LOADED,
  CLEAN_CONTENT_STATE,
  CLEAN_PAGE_STATE,
  SET_ARTICLE_ID,
  SET_CATEGORIES_LIST,
} from "../constants";

export const setPosted = (payload) => ({
  type: SET_POSTED,
  payload,
});

export const setErrorSpecial = (payload) => ({
  type: SET_ERROR_SPECIAL,
  payload,
});

export const setErrorPosting = (payload) => ({
  type: SET_ERROR_POSTING,
  payload,
});

export const contentLoaded = (payload) => ({
  type: CONTENT_LOADED,
  payload,
});

export const pageLoaded = (payload) => ({
  type: PAGE_LOADED,
  payload,
});

export const cleanContentState = (payload) => ({
  type: CLEAN_CONTENT_STATE,
  payload,
});

export const cleanPageState = (payload) => ({
  type: CLEAN_PAGE_STATE,
  payload,
});

export const setArticleId = (payload) => ({
  type: SET_ARTICLE_ID,
  payload,
});

export const setCategoriesList = (payload) => ({
  type: SET_CATEGORIES_LIST,
  payload,
});
