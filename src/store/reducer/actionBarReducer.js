import {
  SET_UPDATED_AT,
  CLEAN_CONTENT_STATE,
  SET_PUBLISHED,
  SET_PROGRAMMED,
  SET_IS_OPEN_PUBLISH_MODAL,
  SHOW_ERROR_MODAL,
  SET_IS_OPEN_ARCHIVE_MODAL,
} from "../constants";

import {} from "../actions/actionBarActions";

const initialState = {
  updatedAt: "",
  publishedAt: null,
  programmedAt: null,
  isOpenPublishModal: false,
  isOpenErrorModal: false,
  isOpenArchiveModal: false,
  errorMessage: null,
};

const actionBarReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_UPDATED_AT: {
      if (action.payload === "create") {
        const date = new Date().toISOString();
        return {
          ...oldState,
          updatedAt: date,
        };
      }
      return {
        ...oldState,
        updatedAt: action.payload,
      };
    }
    case SET_PUBLISHED:
      if (action.payload) {
        return {
          ...oldState,
          publishedAt: action.payload,
        };
      }
      return {
        ...oldState,
        publishedAt: null,
      };

    case SET_PROGRAMMED:
      if (action.payload) {
        return {
          ...oldState,
          programmedAt: action.payload,
        };
      }
      return {
        ...oldState,
        programmedAt: null,
      };

    case SET_IS_OPEN_PUBLISH_MODAL: {
      return {
        ...oldState,
        isOpenPublishModal: action.payload,
      };
    }

    case SHOW_ERROR_MODAL: {
      if (typeof action.payload !== "boolean") {
        return {
          ...oldState,
          isOpenErrorModal: true,
          errorMessage: action.payload,
        };
      }
      return {
        ...oldState,
        isOpenErrorModal: action.payload,
        errorMessage: null,
      };
    }

    case SET_IS_OPEN_ARCHIVE_MODAL: {
      return {
        ...oldState,
        isOpenArchiveModal: action.payload,
      };
    }

    case CLEAN_CONTENT_STATE:
      return {
        updatedAt: "",
        publishedAt: null,
        programmedAt: null,
        isOpenPublishModal: false,
        isOpenErrorModal: false,
        isOpenArchiveModal: false,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default actionBarReducer;
