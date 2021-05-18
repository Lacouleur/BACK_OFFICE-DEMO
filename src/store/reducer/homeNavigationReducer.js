import {
  CLEAN_CONTENT_STATE,
  SET_READING_TIME,
  ADD_HOME_TITLE,
  SET_HOME_IMAGE_UUID,
  SET_HOME_IMAGE_ALT,
  SET_NAV_IMAGE_UUID,
  SET_NAV_IMAGE_ALT,
} from "../constants";

const initialState = {
  homeTitle: "",
  readingTime: null,
  homeImgUuid: "",
  homeImgAlt: "",
  navImgUuid: "",
  navImgAlt: "",
  homeNavIsChanged: false,
};

const homeNavigationReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_READING_TIME: {
      return {
        readingTime: action.payload,
        homeNavIsChanged: true,
        ...oldState,
      };
    }

    case ADD_HOME_TITLE: {
      console.log(action.payload);
      return {
        ...oldState,
        homeTitle: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_HOME_IMAGE_UUID: {
      return {
        ...oldState,
        homeImgUuid: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_HOME_IMAGE_ALT: {
      console.log("HOME_IMAGE_ALT", action.payload);
      return {
        ...oldState,
        homeImgAlt: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_NAV_IMAGE_UUID: {
      return {
        ...oldState,
        navImgUuid: action.payload,
        homeNavIsChanged: true,
      };
    }

    case SET_NAV_IMAGE_ALT: {
      console.log("NAV_IMAGE_ALT", action.payload);
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
