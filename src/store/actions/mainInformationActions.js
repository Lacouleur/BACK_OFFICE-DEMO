import {
  SET_ERROR_TITLE,
  SET_ERROR_SLUG,
  ADD_SLUG,
  ADD_CATEGORY,
  ADD_TITLE,
  SET_STATUS,
  SET_MODIFIED,
  ADD_LANG,
  SET_COLOR_STYLE,
  SET_CAPTION,
  SET_USERS,
  SET_AUTHORS,
  SET_TAGS,
  SET_TAGS_LIST,
  SET_NEW_TAG,
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

export const setCaption = (payload) => ({
  type: SET_CAPTION,
  payload,
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const setAuthors = (payload) => ({
  type: SET_AUTHORS,
  payload,
});

export const setTags = (payload) => ({
  type: SET_TAGS,
  payload,
});

export const setTagsList = (payload) => ({
  type: SET_TAGS_LIST,
  payload,
});

export const setNewTag = (payload) => ({
  type: SET_NEW_TAG,
  payload,
});
