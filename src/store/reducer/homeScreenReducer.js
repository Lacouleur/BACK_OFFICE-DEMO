import { verifySlug } from "../../helper/auth/verifyFields";
import {
  ADD_TITLE,
  ADD_SLUG,
  ADD_CATEGORY,
  SET_CATEGORIES_LIST,
  SET_POSTED,
  SET_ERROR_SPECIAL,
  SET_ERROR_TITLE,
  SET_ERROR_SLUG,
  CONTENT_LOADED,
  SET_ERROR_POSTING,
} from "../constants";

import {} from "../actions/commonsActions";

const initialState = {
  title: "",
  slug: "",
  categoriesList: [],
  category: "",
  titleError: false,
  slugError: false,
  regexSlugError: false,
  postingError: false,
  isPosted: false,
  isEditing: false,
  options: [],
};

const homeScreenReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case ADD_TITLE: {
      if (action.payload && action.payload.length > 0) {
        oldState.titleError = false;
      }
      return { ...oldState, title: action.payload };
    }

    case ADD_SLUG: {
      oldState.postingError = false;
      if (action.payload && action.payload.length > 0) {
        oldState.slugError = false;
        oldState.slugError = false;
      }
      if (verifySlug(action.payload)) {
        oldState.regexSlugError = false;
      } else if (action.payload.length > 0 && !verifySlug(action.payload)) {
        oldState.regexSlugError = true;
      } else {
        oldState.regexSlugError = false;
      }

      return { ...oldState, slug: action.payload };
    }

    case ADD_CATEGORY: {
      return { ...oldState, category: action.payload };
    }

    case SET_CATEGORIES_LIST: {
      const list = [];
      // eslint-disable-next-line no-unused-vars
      Object.entries(action.payload).map(([key, value]) => {
        list.push({ label: value.label, value: value._id });
        return null;
      });
      return { ...oldState, categoriesList: list };
    }

    case SET_POSTED: {
      return {
        ...oldState,
        isPosted: action.payload,
      };
    }

    case SET_ERROR_SPECIAL:
      return {
        ...oldState,
        regexSlugError: action.payload,
      };

    case SET_ERROR_TITLE:
      return {
        ...oldState,
        titleError: action.payload,
      };

    case SET_ERROR_SLUG:
      return {
        ...oldState,
        slugError: action.payload,
      };

    case SET_ERROR_POSTING: {
      return {
        ...oldState,
        postingError: action.payload,
      };
    }

    case CONTENT_LOADED:
      return {
        ...oldState,
        isEditing: true,
        title: action.payload?.title ?? "",
        slug: action.payload?.slug ?? "",
        category: action.payload?.category._id ?? "",
      };

    default:
      return state;
  }
};

export default homeScreenReducer;