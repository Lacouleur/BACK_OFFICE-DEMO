import {
  CLEAN_CONTENT_STATE,
  SET_READING_TIME,
  ADD_HOME_TITLE,
  SET_HOME_IMAGE_UUID,
  SET_HOME_IMAGE_ALT,
  SET_NAV_IMAGE_UUID,
  SET_TRANSPARENT_IMAGE_UUID,
  SET_SOCIAL_IMAGE_UUID,
  SET_NAV_IMAGE_ALT,
  SET_POSTED,
  CONTENT_LOADED,
  SET_HOME_SHORT_DESCRIPTION,
  SET_BACKGROUND_COLOR,
  SET_TRANSPARENT_IMAGE_ALT,
  SET_SOCIAL_IMAGE_ALT,
} from "../constants";

const initialState = {
  // string
  homeTitle: "",
  shortDescription: "",
  navImgUuid: "",
  navImgAlt: "",
  transparentImgAlt: "",
  socialImgAlt: "",
  backgroundColor: "",
  transparentImgUuid: "",
  socialImgUuid: "",

  // bool
  homeNavIsChanged: false,

  // mix
  readingTime: undefined,
  homeImgUuid: undefined,
  homeImgAlt: undefined,
  homeImgUrls: undefined,
  navImgUrls: undefined,
  transparentImgUrls: undefined,
  socialImgUrls: undefined,
};

const homeNavigationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case CONTENT_LOADED: {
      const { payload } = action;
      return {
        ...oldState,
        homeTitle: payload?.header?.title || "",
        shortDescription: payload?.header?.excerpt || "",
        readingTime: payload?.header?.readingTime || undefined,
        homeImgUuid: payload?.header?.image?.uuid || undefined,
        homeImgAlt: payload?.header?.image?.alt || "",
        navImgUuid: payload?.thumbnail?.uuid || undefined,
        navImgAlt: payload?.thumbnail?.alt || "",
        homeImgUrls: payload?.header?.image?.urls || undefined,
        navImgUrls: payload?.thumbnail?.urls || undefined,
        backgroundColor: payload?.header?.backgroundColor || undefined,
        transparentImgUrls:
          payload?.header?.transparentImage?.urls || undefined,
        transparentImgUuid:
          payload?.header?.transparentImage?.uuid || undefined,
        transparentImgAlt: payload?.header?.transparentImage?.alt || "",
        socialImgUuid: payload?.header?.snImage?.uuid || undefined,
        socialImgUrls: payload?.header?.snImage?.urls || undefined,
        socialImgAlt: payload?.header?.snImage?.alt || "",
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

    case SET_HOME_SHORT_DESCRIPTION: {
      return {
        ...oldState,
        shortDescription: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_HOME_IMAGE_UUID: {
      return {
        ...oldState,
        homeImgUuid: action.payload?.uuid || undefined,
        homeImgUrls: action.payload?.urls || undefined,
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

    case SET_TRANSPARENT_IMAGE_UUID: {
      return {
        ...oldState,
        transparentImgUuid: action.payload?.uuid || undefined,
        transparentImgUrls: action.payload?.urls || undefined,
        homeNavIsChanged: true,
      };
    }

    case SET_TRANSPARENT_IMAGE_ALT: {
      return {
        ...oldState,
        transparentImgAlt: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_SOCIAL_IMAGE_ALT: {
      return {
        ...oldState,
        socialImgAlt: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_SOCIAL_IMAGE_UUID: {
      return {
        ...oldState,
        socialImgUuid: action.payload?.uuid || undefined,
        socialImgUrls: action.payload?.urls || undefined,
        homeNavIsChanged: true,
      };
    }

    case SET_NAV_IMAGE_UUID: {
      return {
        ...oldState,
        navImgUuid: action.payload?.uuid || undefined,
        navImgUrls: action.payload?.urls || undefined,
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

    case SET_BACKGROUND_COLOR: {
      return {
        ...oldState,
        backgroundColor: action.payload,
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
