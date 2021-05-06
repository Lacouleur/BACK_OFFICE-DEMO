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
  CLEAN_CONTENT_STATE,
  SET_IS_EDITING,
  SET_ARTICLE_ID,
  SET_STATUS,
  SET_MODIFIED,
  ADD_LANG,
} from "../constants";

const initialState = {
  articleId: "",
  title: "",
  slug: "",
  lang: "",
  status: "",
  modified: null,
  categoriesList: [],
  category: null,
  titleError: false,
  slugError: false,
  regexSlugError: false,
  postingError: false,
  isPosted: false,
  isEditing: false,
  isChanged: false,
  options: [],
};

const mainInformationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case ADD_TITLE: {
      if (action.payload && action.payload.length > 0) {
        oldState.titleError = false;
      }
      return { ...oldState, title: action.payload, isChanged: true };
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

      return { ...oldState, slug: action.payload, isChanged: true };
    }

    case ADD_CATEGORY: {
      return { ...oldState, category: action.payload, isChanged: true };
    }

    case ADD_LANG: {
      return { ...oldState, lang: action.payload, isChanged: true };
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

    case SET_STATUS: {
      return {
        ...oldState,
        status: action.payload,
      };
    }

    case SET_POSTED: {
      return {
        ...oldState,
        isPosted: action.payload,
        isChanged: false,
      };
    }

    case SET_IS_EDITING: {
      return {
        ...oldState,
        isEditing: action.payload,
      };
    }

    case SET_MODIFIED: {
      return {
        ...oldState,
        modified: action.payload,
      };
    }

    case SET_ARTICLE_ID: {
      return {
        ...oldState,
        articleId: action.payload,
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

    case CONTENT_LOADED: {
      let lang = "fr";
      if (action.payload.language === "german") {
        lang = "de";
      }

      return {
        ...oldState,
        isEditing: true,
        title: action.payload?.title ?? "",
        slug: action.payload?.slug ?? "",
        lang: lang || "",
        category: action.payload?.category?._id ?? "",
        updatedAt: action.payload?.updatedAt ?? "",
        status: action.payload?.state ?? "",
        modified: action.payload?.modified ?? null,
      };
    }

    case CLEAN_CONTENT_STATE:
      return {
        articleId: "",
        title: "",
        slug: "",
        lang: "",
        status: "",
        categoriesList: [],
        category: null,
        titleError: false,
        slugError: false,
        regexSlugError: false,
        postingError: false,
        isPosted: false,
        isEditing: false,
        isChanged: false,
        options: [],
      };

    default:
      return state;
  }
};

export default mainInformationReducer;
