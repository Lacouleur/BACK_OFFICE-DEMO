import { SET_CONTENTS_LIST, SET_PAGINATION } from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  contentsList: [],
  fetchedCustomList: [],
  currentPage: null,
  nextPage: null,
  previousPage: null,
  lastPage: null,
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
