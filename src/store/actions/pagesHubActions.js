/* eslint-disable import/prefer-default-export */
import { SET_PAGES_LIST } from "../constants";

export const setPagesList = (payload) => ({
  type: SET_PAGES_LIST,
  payload,
});
