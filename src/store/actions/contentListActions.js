import {
  SET_CONTENTS_LIST,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
  SET_SEARCHED_LIST,
  SET_LANG_OF_RESEARCH,
  SET_FILTER_LANG,
  SET_ASKED_PAGE,
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

export const setLangOfResearch = (payload) => ({
  type: SET_LANG_OF_RESEARCH,
  payload,
});

export const setFilterLang = (payload) => ({
  type: SET_FILTER_LANG,
  payload,
});

export const setAskedPage = (payload) => ({
  type: SET_ASKED_PAGE,
  payload,
});
