import {
  SET_IS_ACCESSIBLE_PANEL,
  SET_PANEL_OPEN,
  SET_POSITION,
  SET_LAST_NAME,
  SET_FIRST_NAME,
  SET_DISPLAYED_NAME,
  SET_QUOTE,
  SET_EMAIL,
  SET_PICTURE,
  SET_LOCALE,
  SET_GENDER,
  SET_USER_ID,
} from "../constants";

const initialState = {
  isAccessible: false,
  isPanelOpen: false,
  userId: "",
  position: "",
  lastName: "",
  fisrtName: "",
  displayedName: "",
  quote: "",
  email: "",
  gender: "",
  picture: {
    alt: "",
    source: "",
    uuid: "",
    urls: {},
  },
  locale: "",
};

const userPanelReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_IS_ACCESSIBLE_PANEL: {
      return {
        ...oldState,
        isAccessible: action.payload,
      };
    }

    case SET_PANEL_OPEN: {
      return {
        ...oldState,
        isPanelOpen: action.payload,
      };
    }

    case SET_USER_ID: {
      return {
        ...oldState,
        userId: action.payload,
      };
    }

    case SET_POSITION: {
      return {
        ...oldState,
        position: action.payload,
      };
    }

    case SET_LAST_NAME: {
      return {
        ...oldState,
        lastName: action.payload,
      };
    }

    case SET_FIRST_NAME: {
      return {
        ...oldState,
        firstName: action.payload,
      };
    }

    case SET_EMAIL: {
      return {
        ...oldState,
        email: action.payload,
      };
    }

    case SET_GENDER: {
      return {
        ...oldState,
        gender: action.payload,
      };
    }

    case SET_PICTURE: {
      return {
        ...oldState,
        picture: action.payload,
      };
    }

    case SET_LOCALE: {
      return {
        ...oldState,
        locale: action.payload,
      };
    }

    case SET_DISPLAYED_NAME: {
      return {
        ...oldState,
        displayedName: action.payload,
      };
    }

    case SET_QUOTE: {
      return {
        ...oldState,
        quote: action.payload,
      };
    }

    default:
      return state;
  }
};

export default userPanelReducer;
