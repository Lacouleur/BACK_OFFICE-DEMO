/* eslint-disable import/prefer-default-export */
import { SET_ASKED_PAGE, SET_PAGES_LIST } from "../constants";

export const setPagesList = (payload) => ({
  type: SET_PAGES_LIST,
  payload,
});

export const setAskedPagePagination = (payload) => ({
  type: SET_ASKED_PAGE,
  payload,
});
