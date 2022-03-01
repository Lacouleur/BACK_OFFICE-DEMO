import {
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
  CLEAN_USER,
} from "../constants";

const initialState = {
  isAccessible: false,
  isPanelOpen: false,
  userId: "",
  position: "",
  lastName: "",
  firstName: "",
  displayedName: "",
  displayedNames: null,
  quote: "",
  quotes: null,
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

const userReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
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
      const { value, lang } = action.payload;
      let modifiedState = oldState;

      if (state?.locale === "fr") {
        if (lang === "fr") {
          modifiedState = {
            ...modifiedState,
            displayedName: value,
            userIsChanged: true,
          };
        }
        if (lang === "de") {
          modifiedState = {
            ...modifiedState,
            displayedNames: {
              de: value,
            },
            userIsChanged: true,
          };
        }
      }

      if (state?.locale === "de") {
        if (lang === "de") {
          modifiedState = {
            ...modifiedState,
            displayedName: value,
            userIsChanged: true,
          };
        }

        if (lang === "fr") {
          modifiedState = {
            ...modifiedState,
            displayedNames: {
              fr: value,
            },
            userIsChanged: true,
          };
        }
      }

      return { ...modifiedState };
    }

    case SET_QUOTE: {
      const { value, lang } = action.payload;
      let modifiedState = oldState;

      if (state?.locale === "fr") {
        if (lang === "fr") {
          modifiedState = {
            ...modifiedState,
            quote: value,
            userIsChanged: true,
          };
        }
        if (lang === "de") {
          modifiedState = {
            ...modifiedState,
            quotes: {
              de: value,
            },
            userIsChanged: true,
          };
        }
      }

      if (state?.locale === "de") {
        if (lang === "de") {
          modifiedState = {
            ...modifiedState,
            quote: value,
            userIsChanged: true,
          };
        }

        if (lang === "fr") {
          modifiedState = {
            ...modifiedState,
            quotes: {
              fr: value,
            },
            userIsChanged: true,
          };
        }
      }

      return { ...modifiedState };
    }

    case SET_USER_IS_CHANGED: {
      return {
        ...oldState,
        userIsChanged: action.payload,
      };
    }

    case CLEAN_USER: {
      return {
        state,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
