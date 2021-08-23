import {
  SET_UPDATED_AT,
  SET_PUBLISHED,
  SET_PROGRAMMED,
  SET_IS_OPEN_PUBLISH_MODAL,
  SHOW_ERROR_MODAL,
  SET_IS_OPEN_ARCHIVE_MODAL,
  SHOW_HIDE_MODAL,
} from "../constants";

export const setUpdatedAt = (payload) => ({
  type: SET_UPDATED_AT,
  payload,
});

export const setPublishedAt = (payload) => ({
  type: SET_PUBLISHED,
  payload,
});

export const setProgrammedAt = (payload) => ({
  type: SET_PROGRAMMED,
  payload,
});

export const setIsOpenPublishModal = (payload) => ({
  type: SET_IS_OPEN_PUBLISH_MODAL,
  payload,
});

export const showErrorModal = (payload) => ({
  type: SHOW_ERROR_MODAL,
  payload,
});

export const setIsOpenArchiveModal = (payload) => ({
  type: SET_IS_OPEN_ARCHIVE_MODAL,
  payload,
});

export const showHideModal = (payload) => ({
  type: SHOW_HIDE_MODAL,
  payload,
});
