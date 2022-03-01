import { SET_PAGES_LIST } from "../constants";

const initialState = {
  pagesList: [],
};

const userReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_PAGES_LIST: {
      console.log("PL", action.payload.pages);
      return {
        ...oldState,
        pagesList: action.payload.pages,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
