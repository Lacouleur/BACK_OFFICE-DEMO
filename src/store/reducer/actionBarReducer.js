import {
  SET_UPDATED_AT,
  CLEAN_CONTENT_STATE,
  SET_PUBLISHED,
  SET_PROGRAMMED,
  SET_IS_OPEN_PUBLISH_MODAL,
  SHOW_ERROR_MODAL,
  SET_IS_OPEN_ARCHIVE_MODAL,
  SHOW_CLOSE_MODAL,
} from "../constants";

import {} from "../actions/actionBarActions";

const initialState = {
  updatedAt: "",
  publishedAt: null,
  programmedAt: null,
  isOpenPublishModal: false,
  isOpenErrorModal: false,
  isOpenArchiveModal: false,
  isOpenCloseModal: false,
  errorMessage: null,
  isModalOpen: false,
  aModuleIsOpen: false,
  articleToDelete: "",
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
        isModalOpen: action.payload,
      };
    }

    case SHOW_ERROR_MODAL: {
      if (typeof action.payload !== "boolean") {
        const { value, message } = action.payload;
        return {
          ...oldState,
          isOpenErrorModal: true,
          errorMessage: message,
          isModalOpen: value,
        };
      }
      return {
        ...oldState,
        isOpenErrorModal: action.payload,
        errorMessage: null,
      };
    }

    case SET_IS_OPEN_ARCHIVE_MODAL: {
      if (typeof action.payload !== "boolean") {
        const { value, id } = action.payload;
        return {
          ...oldState,
          isOpenArchiveModal: value,
          articleToDelete: id,
          isModalOpen: value,
        };
      }
      return {
        ...oldState,
        isOpenArchiveModal: action.payload,
        isModalOpen: action.payload,
      };
    }

    case SHOW_CLOSE_MODAL: {
      return {
        ...oldState,
        isOpenCloseModal: action.payload,
        isModalOpen: action.payload.value,
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
