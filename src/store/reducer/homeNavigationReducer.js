import {
  CLEAN_CONTENT_STATE,
  SET_READING_TIME,
  ADD_HOME_TITLE,
  SET_HOME_IMAGE_UUID,
  SET_HOME_IMAGE_ALT,
  SET_NAV_IMAGE_UUID,
  SET_NAV_IMAGE_ALT,
  SET_POSTED,
  CONTENT_LOADED,
} from "../constants";

const initialState = {
  homeTitle: "",
  readingTime: undefined,
  homeImgUuid: undefined,
  homeImgAlt: undefined,
  navImgUuid: "",
  navImgAlt: "",
  homeNavIsChanged: false,
  homeImgUrls: undefined,
  navImgUrls: undefined,
};

const homeNavigationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case CONTENT_LOADED: {
      const { payload } = action;
      return {
        ...oldState,
        homeTitle: payload?.header?.title || "",
        readingTime: payload?.header?.readingTime || undefined,
        homeImgUuid: payload?.header?.image?.uuid || "",
        homeImgAlt: payload?.header?.image?.alt || "",
        navImgUuid: payload?.thumbnail?.uuid || "",
        navImgAlt: payload?.thumbnail?.alt || "",
        homeImgUrls: payload?.header?.image?.urls || undefined,
        navImgUrls: payload?.thumbnail?.urls || undefined,
      };
    }

    case SET_POSTED: {
      return {
        ...oldState,
        homeNavIsChanged: false,
      };
    }

    case SET_READING_TIME: {
      return {
        ...oldState,
        readingTime: action.payload,
        homeNavIsChanged: true,
      };
    }

    case ADD_HOME_TITLE: {
      return {
        ...oldState,
        homeTitle: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_HOME_IMAGE_UUID: {
      return {
        ...oldState,
        homeImgUuid: action.payload.uuid,
        homeImgUrls: action.payload.urls,
        homeNavIsChanged: true,
      };
    }

    case SET_HOME_IMAGE_ALT: {
      return {
        ...oldState,
        homeImgAlt: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_NAV_IMAGE_UUID: {
      return {
        ...oldState,
        navImgUuid: action.payload.uuid,
        navImgUrls: action.payload.urls,
        homeNavIsChanged: true,
      };
    }

    case SET_NAV_IMAGE_ALT: {
      return {
        ...oldState,
        navImgAlt: action.payload,
        homeNavIsChanged: true,
      };
    }

    case CLEAN_CONTENT_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default homeNavigationReducer;
