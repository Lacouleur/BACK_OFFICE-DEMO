import { SET_CONTENTS_LIST, SET_PAGINATION } from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  contentsList: [],
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
      const isNextPage = data.nextPage || 1;
      const isPreviousPage = data.previousPage || 1;
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
