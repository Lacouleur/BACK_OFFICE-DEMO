import {
  SET_CONTENTS_LIST,
  SET_PAGINATION,
  SET_RESEARCH_ARTICLE,
  SET_SEARCHED_LIST,
} from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  contentsList: [],
  fetchedCustomList: [],
  searchedList: [],
  currentPage: null,
  nextPage: null,
  previousPage: null,
  lastPage: null,
  searchedArticle: "",
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

    case SET_PAGINATION: {
      const data = action.payload;
      const isNextPage = data.nextPage;
      const isPreviousPage = data.previousPage;
      return {
        ...oldState,
        currentPage: data.currentPage,
        nextPage: isNextPage,
        previousPage: isPreviousPage,
        lastPage: data.lastPage,
      };
    }

    default:
      return state;
  }
};

export default contentListReducer;
