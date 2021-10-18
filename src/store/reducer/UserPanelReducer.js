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
  SET_USER_IS_CHANGED,
} from "../constants";

const initialState = {
  isAccessible: false,
  isPanelOpen: false,
  userId: "",
  position: "",
  lastName: "",
  firstName: "",
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
  userIsChanged: false,
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
        userIsChanged: true,
      };
    }

    case SET_LAST_NAME: {
      return {
        ...oldState,
        lastName: action.payload,
        userIsChanged: true,
      };
    }

    case SET_FIRST_NAME: {
      return {
        ...oldState,
        firstName: action.payload,
        userIsChanged: true,
      };
    }

    case SET_EMAIL: {
      return {
        ...oldState,
        email: action.payload,
        userIsChanged: true,
      };
    }

    case SET_GENDER: {
      return {
        ...oldState,
        gender: action.payload,
        userIsChanged: true,
      };
    }

    case SET_PICTURE: {
      return {
        ...oldState,
        picture: action.payload,
        userIsChanged: true,
      };
    }

    case SET_LOCALE: {
      return {
        ...oldState,
        locale: action.payload,
        userIsChanged: true,
      };
    }

    case SET_DISPLAYED_NAME: {
      return {
        ...oldState,
        displayedName: action.payload,
        userIsChanged: true,
      };
    }

    case SET_QUOTE: {
      return {
        ...oldState,
        quote: action.payload,
        userIsChanged: true,
      };
    }

    case SET_USER_IS_CHANGED: {
      return {
        ...oldState,
        userIsChanged: action.payload,
      };
    }

    default:
      return state;
  }
};

export default userPanelReducer;
