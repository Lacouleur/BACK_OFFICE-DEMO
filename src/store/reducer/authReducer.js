import { verifyField } from "../../helper/auth/verifyFields";
import { SET_PASSWORD, SET_MAIL, SET_ERROR_AUTH } from "../constants";

const initialState = {
  password: "",
  mail: "",
  passwordFieldError: false,
  mailFieldError: false,
  authError: false,
  isLogged: false,
};

const authReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_PASSWORD: {
      return {
        ...oldState,
        password: action.payload,
        passwordFieldError: verifyField("password", action.payload),
      };
    }

    case SET_MAIL: {
      return {
        ...oldState,
        mail: action.payload,
        mailFieldError: verifyField("mail", action.payload),
      };
    }

    case SET_ERROR_AUTH: {
      return {
        ...oldState,
        authError: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;