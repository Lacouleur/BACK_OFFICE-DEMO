import {
  PAGE_SET_TITLE,
  PAGE_SET_SLUG,
  PAGE_SET_LANG,
  PAGE_SET_ID,
  PAGE_SET_MODIFIED,
  PAGE_SET_ERROR_TITLE,
  PAGE_SET_ERROR_SLUG,
  SET_ERROR_POSTING,
  SET_POSTED,
} from "../../constants";
import { verifySlug } from "../../../helper/auth/verifyFields";

const initialState = {
  pageId: "",
  title: "",
  slug: "",
  lang: "",
  regexSlugError: false,
  slugError: false,
  titleError: false,
  postingError: false,
  isPosted: false,
  isChanged: false,
};

const mainInformationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case PAGE_SET_TITLE: {
      if (action.payload && action.payload.length > 0) {
        oldState.titleError = false;
      } else {
        oldState.titleError = true;
      }
      return { ...oldState, title: action.payload, isChanged: true };
    }

    case PAGE_SET_SLUG: {
      oldState.postingError = false;
      if (action.payload && action.payload.length > 0) {
        oldState.slugError = false;
      } else {
        oldState.slugError = true;
      }
      if (verifySlug(action.payload)) {
        oldState.regexSlugError = false;
      } else if (action.payload.length > 0 && !verifySlug(action.payload)) {
        oldState.regexSlugError = true;
      } else {
        oldState.regexSlugError = false;
      }

      return { ...oldState, slug: action.payload, isChanged: true };
    }

    case PAGE_SET_LANG: {
      return { ...oldState, lang: action.payload, isChanged: true };
    }

    case PAGE_SET_ID: {
      return {
        ...oldState,
        articleId: action.payload,
      };
    }

    case PAGE_SET_MODIFIED: {
      return {
        ...oldState,
        modified: action.payload,
      };
    }

    case PAGE_SET_ERROR_TITLE:
      return {
        ...oldState,
        titleError: action.payload,
      };

    case PAGE_SET_ERROR_SLUG:
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

    case SET_POSTED: {
      return {
        ...oldState,
        isPosted: action.payload,
        isChanged: false,
      };
    }

    default:
      return state;
  }
};

export default mainInformationReducer;
