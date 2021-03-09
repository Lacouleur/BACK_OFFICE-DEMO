import {
  SET_NEW_MODULE,
  SET_MODULE_LIST,
  DELETE_MODULE,
  SET_VALUE_TEXTMODULE,
} from "../constants";

export const setNewModule = (payload) => ({
  type: SET_NEW_MODULE,
  payload,
});

export const setModuleList = (payload) => ({
  type: SET_MODULE_LIST,
  payload,
});

export const deleteModule = (payload) => ({
  type: DELETE_MODULE,
  payload,
});

export const setValueTextModule = (payload) => ({
  type: SET_VALUE_TEXTMODULE,
  payload,
});
