import { verifySlug } from "../../helper/auth/verifyFields";
import {
  createAutorsList,
  createUsersList,
  harmonizeLang,
} from "../../helper/fieldsHelper";
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
  SET_ARTICLE_ID,
  SET_STATUS,
  SET_MODIFIED,
  ADD_LANG,
  CLEAN_CONTENT_STATE,
  SET_COLOR_STYLE,
  SET_CAPTION,
  SET_USERS,
  SET_AUTHORS,
  SET_TAGS,
  SET_TAGS_LIST,
  SET_NEW_TAG,
  SET_CONTENT_IS_MOVED_TO_TOP,
  SET_CONTENT_CAN_MOVE_TO_TOP,
  SET_CONTENT_ORIGINAL_DATE,
  SET_FEEDBACK_RESULTS,
} from "../constants";

const initialState = {
  // string
  articleId: "",
  title: "",
  slug: "",
  lang: "",
  colorStyle: "",
  caption: "",
  status: "",

  // bool
  isPosted: true,
  titleError: false,
  slugError: false,
  regexSlugError: false,
  postingError: false,
  isChanged: false,
  isManifesto: false,
  isMovedToTop: false,
  undoMoveToTop: false,
  canUndoMoveToTop: false,

  // arr
  options: [],
  categoriesList: [],
  users: [],
  authorsList: [],
  authors: [],
  tagsList: [],
  tags: [],
  feedBackResults: [],

  // obj
  newTag: {},

  // mix
  modified: null,
  category: null,
  manifestoId: null,
};

const mainInformationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case ADD_TITLE: {
      if (action.payload && action.payload.length > 0) {
        oldState.titleError = false;
      } else {
        oldState.titleError = true;
      }
      return { ...oldState, title: action.payload, isChanged: true };
    }

    case ADD_SLUG: {
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

    case ADD_CATEGORY: {
      return { ...oldState, category: action.payload, isChanged: true };
    }

    case ADD_LANG: {
      return { ...oldState, lang: action.payload, isChanged: true };
    }

    case SET_CAPTION: {
      return {
        ...oldState,
        caption: action.payload,
        isChanged: true,
      };
    }

    case SET_COLOR_STYLE: {
      return { ...oldState, colorStyle: action.payload, isChanged: true };
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
      const lang = harmonizeLang(action.payload.language);

      let canUndo = false;
      if (!action.payload.firstPublicationDate) {
        canUndo = false;
      }
      if (
        action.payload?.firstPublicationDate &&
        action.payload.firstPublicationDate !== action.payload.firstPublishedAt
      ) {
        canUndo = true;
      } else {
        canUndo = false;
      }
      console.log("content Loaded", {
        firstPublicationDate: action.payload.firstPublicationDate,
        firstPublishedAt: action.payload.firstPublishedAt,
        canUndo:
          action.payload.firstPublicationDate !==
          action.payload.firstPublishedAt,
      });

      return {
        ...oldState,
        title: action.payload?.title ?? "",
        slug: action.payload?.slug ?? "",
        lang: lang || "",
        category: action.payload?.category?._id ?? "",
        updatedAt: action.payload?.updatedAt ?? "",
        status: action.payload?.state ?? "",
        modified: action.payload?.modified ?? null,
        colorStyle: action.payload?.theme ?? null,
        caption: action.payload?.partnership ?? null,
        authors: action.payload?.authors,
        tags: action.payload?.tags ?? null,
        isMovedToTop: false,
        undoMoveToTop: false,
        canUndoMoveToTop: canUndo,
      };
    }
    case SET_CONTENT_ORIGINAL_DATE: {
      return {
        ...oldState,
        undoMoveToTop: oldState.canUndoMoveToTop ? action.payload : false,
      };
    }

    case SET_USERS: {
      return {
        ...oldState,
        authorsList: createAutorsList(action.payload),
        usersList: createUsersList(action.payload),
        users: action.payload,
      };
    }

    case SET_AUTHORS: {
      return {
        ...oldState,
        authors: action.payload,
        isChanged: true,
      };
    }

    case SET_TAGS: {
      return {
        ...oldState,
        tags: action.payload,
        isChanged: true,
      };
    }

    case SET_TAGS_LIST: {
      return {
        ...oldState,
        tagsList: action.payload,
      };
    }

    case SET_NEW_TAG: {
      return {
        ...oldState,
        newTag: action.payload,
        isChanged: true,
      };
    }

    case SET_CONTENT_IS_MOVED_TO_TOP: {
      return {
        ...oldState,
        isMovedToTop: action.payload,
      };
    }

    case SET_CONTENT_CAN_MOVE_TO_TOP: {
      return {
        ...oldState,
        CanUndoMoveToTop: action.payload,
      };
    }

    case SET_FEEDBACK_RESULTS: {
      return {
        ...oldState,
        feedBackResults: action.payload,
      };
    }

    case CLEAN_CONTENT_STATE: {
      return {
        state,
      };
    }

    default:
      return state;
  }
};

export default mainInformationReducer;
