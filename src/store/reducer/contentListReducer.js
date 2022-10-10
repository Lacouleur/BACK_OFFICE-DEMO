import {
  SET_CONTENTS_LIST,
  SET_LANG_OF_RESEARCH,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
  SET_SEARCHED_LIST,
} from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  contentsList: [],
  fetchedCustomList: [],
  searchedList: null,
  currentPage: null,
  nextPage: null,
  previousPage: null,
  lastPage: null,
  searchedArticle: "",
  langOfResearch: [{ value: "", label: "En 🇬🇧" }],
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
        LangOfResearch: action.payload,
      };
    }

    case SET_PAGINATION: {
      const data = action.payload;
      return {
        ...oldState,
        currentPage: data.currentPage,
        nextPage: data.nextPage || "",
        previousPage: data.previousPage || "",
        lastPage: data.lastPage,
      };
    }

    default:
      return state;
  }
};

export default contentListReducer;
