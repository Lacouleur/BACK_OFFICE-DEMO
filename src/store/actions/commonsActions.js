import {
  SET_POSTED,
  SET_ERROR_SPECIAL,
  SET_ERROR_POSTING,
  CONTENT_LOADED,
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