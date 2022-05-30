import {
  SET_ERROR_TITLE,
  SET_ERROR_SLUG,
  ADD_SLUG,
  ADD_CATEGORY,
  ADD_TITLE,
  ADD_LANG,
  SET_COLOR_STYLE,
  SET_CAPTION,
  SET_USERS,
  SET_AUTHORS,
  SET_TAGS,
  SET_NEW_TAG,
  SET_CONTENT_IS_MOVED_TO_TOP,
  SET_CONTENT_CAN_MOVE_TO_TOP,
  SET_CONTENT_ORIGINAL_DATE,
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

export const setNewTag = (payload) => ({
  type: SET_NEW_TAG,
  payload,
});

export const setContentIsMovedToTop = (payload) => ({
  type: SET_CONTENT_IS_MOVED_TO_TOP,
  payload,
});

export const setContentCanUndoMoveToTop = (payload) => ({
  type: SET_CONTENT_CAN_MOVE_TO_TOP,
  payload,
});

export const setContentOriginalDate = (payload) => ({
  type: SET_CONTENT_ORIGINAL_DATE,
  payload,
});
