import {
  SET_CONTENTS_LIST,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
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
