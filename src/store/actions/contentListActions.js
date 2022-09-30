import {
  SET_CONTENTS_LIST,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
  SET_SEARCHED_LIST,
} from "../constants";

export const setContentsList = (payload) => ({
  type: SET_CONTENTS_LIST,
  payload,
});

export const setPagination = (payload) => ({
  type: SET_PAGINATION,
  payload,
});

export const setResearchArticle = (payload) => ({
  type: SET_RESEARCH_ARTICLE,
  payload,
});

export const setSearchedList = (payload) => ({
  type: SET_SEARCHED_LIST,
  payload,
});
