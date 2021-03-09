/* eslint-disable consistent-return */
import {
  ADD_SEO_TITLE,
  CONTENT_LOADED,
  ADD_SEO_DESCRIPTION,
  CLEAN_CONTENT_STATE,
} from "../constants";

const initialState = {
  isEditing: false,
};

const seoReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case ADD_SEO_TITLE: {
      if (action.payload.length > 0) {
        return {
          ...oldState,
          title: action.payload,
        };
      }
      if (
        oldState.title &&
        (oldState.title === "" || action.payload.length === 0)
      ) {
        delete oldState.title;
        return {
          ...oldState,
        };
      }
      return {
        ...oldState,
      };
    }

    case ADD_SEO_DESCRIPTION: {
      if (action.payload.length > 0) {
        return {
          ...oldState,
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
        };
      }
      return {
        ...oldState,
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
        isEditing: true,
      };
    }

    case CLEAN_CONTENT_STATE: {
      return {
        isEditing: false,
      };
    }

    default:
      return state;
  }
};

export default seoReducer;
