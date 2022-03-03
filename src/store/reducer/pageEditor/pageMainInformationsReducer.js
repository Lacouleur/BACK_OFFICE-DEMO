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
  PAGE_SET_STATUS,
  CLEAN_PAGE_STATE,
  PAGE_LOADED,
} from "../../constants";
import { verifySlug } from "../../../helper/auth/verifyFields";

const initialState = {
  // string
  pageId: "",
  title: "",
  slug: "",
  lang: "",
  status: "",

  // bool
  regexSlugError: false,
  slugError: false,
  titleError: false,
  postingError: false,
  isPosted: false,
  isChanged: false,
  modified: false,
};

const mainInformationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };
  switch (action.type) {
    case PAGE_LOADED: {
      let lang = "fr";
      if (action.payload.language === "german") {
        lang = "de";
      }
      return {
        ...oldState,
        title: action.payload?.title ?? "",
        slug: action.payload?.slug ?? "",
        lang: lang || "",
        status: action.payload?.state ?? "",
        modified: action.payload?.modified ?? null,
      };
    }

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
        pageId: action.payload,
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

    case PAGE_SET_STATUS: {
      return {
        ...oldState,
        status: action.payload,
      };
    }

    case CLEAN_PAGE_STATE: {
      return {
        state,
      };
    }

    default:
      return state;
  }
};

export default mainInformationReducer;
