import { SET_CONTENTS_LIST, SET_PAGINATION } from "../constants";

export const setContentsList = (payload) => ({
  type: SET_CONTENTS_LIST,
  payload,
});

export const setPagination = (payload) => ({
  type: SET_PAGINATION,
  payload,
});
