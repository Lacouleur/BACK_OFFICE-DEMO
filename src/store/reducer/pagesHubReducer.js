import { SET_PAGES_LIST } from "../constants";

const initialState = {
  pagesList: [],
};

const pagesHubReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_PAGES_LIST: {
      console.log(action.payload);
      return {
        ...oldState,
        pagesList: action.payload.pages,
        currentPage: action.payload.currentPage,
        lastPage: action.payload.lastPage,
        nextPage: action.payload.nextPage,
      };
    }

    default:
      return state;
  }
};

export default pagesHubReducer;
