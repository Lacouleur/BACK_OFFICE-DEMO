import {
  SET_NEW_MODULE,
  SET_MODULE_POSTED,
  CLOSE_MODULE,
  SET_VALUE_TEXTMODULE,
  SHOW_CLOSE_MODAL,
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
