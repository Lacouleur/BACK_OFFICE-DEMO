import {
  ADD_SEO_TITLE,
  CONTENT_LOADED,
  ADD_SEO_DESCRIPTION,
  CLEAN_CONTENT_STATE,
  SET_POSTED,
} from "../constants";

const initialState = {
  isChanged: false,
};

const seoReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case ADD_SEO_TITLE: {
      if (action.payload.length > 0) {
        return {
          ...oldState,
          title: action.payload,
          isChanged: true,
        };
      }
      if (
        oldState.title &&
        (oldState.title === "" || action.payload.length === 0)
      ) {
        delete oldState.title;
        return {
          isChanged: true,
          ...oldState,
        };
      }
      return {
        isChanged: true,
        ...oldState,
      };
    }

    case ADD_SEO_DESCRIPTION: {
      if (action.payload.length > 0) {
        return {
          ...oldState,
          isChanged: true,
          description: action.payload,
        };
      }
      if (
        oldState.description &&
        (oldState.description === "" || action.payload.length === 0)
      ) {
        delete oldState.description;
        return {
          ...oldState,
          isChanged: true,
        };
      }
      return {
        ...oldState,
        isChanged: true,
      };
    }

    case SET_POSTED: {
      return {
        ...oldState,
        isChanged: false,
      };
    }

    case CONTENT_LOADED: {
      const { seo } = action.payload;

      if (seo?.title) {
        oldState.title = seo.title;
      }
      if (seo?.description) {
        oldState.description = seo.description;
      }
      return {
        ...oldState,
        isChanged: false,
      };
    }

    case CLEAN_CONTENT_STATE: {
      return {
        isChanged: false,
      };
    }

    default:
      return state;
  }
};

export default seoReducer;
