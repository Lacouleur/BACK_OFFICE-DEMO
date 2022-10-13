import { SET_ASKED_PAGE, SET_PAGES_LIST } from "../constants";

const initialState = {
  pagesList: [],
  askedPage: 1,
};

const pagesHubReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_PAGES_LIST: {
      return {
        ...oldState,
        pagesList: action.payload.pages,
        currentPage: action.payload.currentPage,
        lastPage: action.payload.lastPage,
        nextPage: action.payload.nextPage,
      };
    }

    case SET_ASKED_PAGE: {
      return {
        ...oldState,
        askedPage: action.payload,
      };
    }

    default:
      return state;
  }
};

export default pagesHubReducer;
