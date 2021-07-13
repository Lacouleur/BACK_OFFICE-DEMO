import {
  SET_CONTENTS_LIST,
  SET_PAGINATION,
  SET_IS_OPEN_DUPLICATE_MODAL,
} from "../constants";

export const setContentsList = (payload) => ({
  type: SET_CONTENTS_LIST,
  payload,
});

export const setPagination = (payload) => ({
  type: SET_PAGINATION,
  payload,
});

export const setIsOpenDuplicateModal = (payload) => ({
  type: SET_IS_OPEN_DUPLICATE_MODAL,
  payload,
});
