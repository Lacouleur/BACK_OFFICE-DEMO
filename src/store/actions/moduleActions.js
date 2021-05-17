import {
  SET_NEW_MODULE,
  SET_MODULE_POSTED,
  CLOSE_MODULE,
  SET_VALUE_TEXTMODULE,
  SHOW_CLOSE_MODAL,
  SET_IMAGE_UUID,
  SET_ALT_IMAGE,
} from "../constants";

export const setNewModule = (payload) => ({
  type: SET_NEW_MODULE,
  payload,
});

export const closeModule = (payload) => ({
  type: CLOSE_MODULE,
  payload,
});

export const setValueTextModule = (payload) => ({
  type: SET_VALUE_TEXTMODULE,
  payload,
});

export const showCloseModal = (payload) => ({
  type: SHOW_CLOSE_MODAL,
  payload,
});

export const setModulePosted = (payload) => ({
  type: SET_MODULE_POSTED,
  payload,
});

export const setImageUuid = (payload) => ({
  type: SET_IMAGE_UUID,
  payload,
});

export const setAltImage = (payload) => ({
  type: SET_ALT_IMAGE,
  payload,
});
