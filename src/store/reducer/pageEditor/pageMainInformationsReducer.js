import {
  PAGE_SET_TITLE,
  PAGE_SET_SLUG,
  ADD_LANG,
  PAGE_SET_ID,
  PAGE_SET_MODIFIED,
  PAGE_SET_ERROR_TITLE,
  PAGE_SET_ERROR_SLUG,
  SET_ERROR_POSTING,
  SET_POSTED,
  SET_STATUS,
  CLEAN_PAGE_STATE,
  PAGE_LOADED,
  SET_IS_PAGE,
  SET_CATEGORIES_LIST,
  SET_TAGS_LIST,
  SET_MODIFIED,
  PAGE_SET_DISPLAY_TITLE,
  PAGE_SET_SUBTITLE,
  SET_FEEDBACK_RESULTS,
  SET_AUTHORS_LIST,
} from "../../constants";
import { verifySlug } from "../../../helper/auth/verifyFields";
import { harmonizeLang } from "../../../helper/fieldsHelper";

const initialState = {
  // string
  pageId: "",
  title: "",
  subtitle: undefined,
  slug: "",
  lang: "",
  status: "",

  // Array
  categoriesList: [],
  tagsList: [],
  authorsList: [],
  feedBackResults: [],

  // bool
  displayTitle: false,
  regexSlugError: false,
  slugError: false,
  titleError: false,
  postingError: false,
  isPosted: false,
  isChanged: false,
  modified: false,
  isPage: false,
};

const pageMainInformationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };
  switch (action.type) {
    case PAGE_LOADED: {
      return {
        ...oldState,
        title: action.payload?.title ?? "",
        subtitle: action.payload.subtitle ?? undefined,
        displayTitle: action.payload.displayTitle ?? false,
        slug: action.payload?.slug ?? "",
        lang: harmonizeLang(action.payload.language),
        status: action.payload?.state ?? "",
        modified: action.payload?.modified ?? null,
        categories: action.payload.categories,
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

    case PAGE_SET_DISPLAY_TITLE: {
      return {
        ...oldState,
        displayTitle: action.payload,
        isChanged: true,
      };
    }

    case PAGE_SET_SUBTITLE: {
      return {
        ...oldState,
        subtitle: action.payload,
        isChanged: true,
      };
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

    case ADD_LANG: {
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

    case SET_STATUS: {
      return {
        ...oldState,
        status: action.payload,
      };
    }

    case SET_IS_PAGE: {
      return {
        ...oldState,
        isPage: action.payload,
      };
    }

    case CLEAN_PAGE_STATE: {
      return {
        state,
      };
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

    case SET_TAGS_LIST: {
      return {
        ...oldState,
        tagsList: action.payload,
      };
    }

    case SET_MODIFIED: {
      return {
        ...oldState,
        modified: action.payload,
      };
    }

    case SET_AUTHORS_LIST: {
      const userList = action.payload;
      const authorsList = [];
      userList.map((user) => {
        authorsList.push({ value: user._id, label: user.name });
      });
      return {
        ...oldState,
        authorsList,
      };
    }

    case SET_FEEDBACK_RESULTS: {
      return {
        ...oldState,
        feedBackResults: action.payload,
      };
    }

    default:
      return state;
  }
};

export default pageMainInformationReducer;
