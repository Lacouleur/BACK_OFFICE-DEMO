import { SET_PAGES_LIST } from "../constants";

const initialState = {
  pagesList: [],
};

const pagesHubReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_PAGES_LIST: {
      return {
        ...oldState,
        pagesList: action.payload.pages,
      };
    }

    default:
      return state;
  }
};

export default pagesHubReducer;
