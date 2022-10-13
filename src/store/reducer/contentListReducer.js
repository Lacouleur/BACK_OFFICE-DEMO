import {
  SET_CONTENTS_LIST,
  SET_LANG_OF_RESEARCH,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
  SET_SEARCHED_LIST,
  SET_FILTER_LANG,
  SET_ASKED_PAGE,
} from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  contentsList: [],
  fetchedCustomList: [],

  langOfResearch: { value: "en", label: "En 🇬🇧" },

  searchedList: null,
  nextPage: null,
  previousPage: null,
  lastPage: null,

  searchedArticle: "",
  filterLang: "",

  askedPage: 1,
  currentPage: 1,
};

const contentListReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_CONTENTS_LIST: {
      return {
        ...oldState,
        contentsList: [...action.payload],
      };
    }

    case SET_RESEARCH_ARTICLE: {
      return {
        ...oldState,
        searchedArticle: action.payload,
      };
    }

    case SET_SEARCHED_LIST: {
      return {
        ...oldState,
        searchedList: action.payload,
      };
    }

    case SET_LANG_OF_RESEARCH: {
      return {
        ...oldState,
        langOfResearch: action.payload,
      };
    }

    case SET_FILTER_LANG: {
      return {
        ...oldState,
        filterLang: action.payload,
      };
    }

    case SET_ASKED_PAGE: {
      return {
        ...oldState,
        askedPage: action.payload,
      };
    }

    case SET_PAGINATION: {
      const data = action.payload;
      return {
        ...oldState,
        currentPage: data.currentPage,
        nextPage: data.nextPage || data.currentPage,
        previousPage: data.previousPage || "",
        lastPage: data.lastPage || data.currentPage,
      };
    }

    default:
      return state;
  }
};

export default contentListReducer;
