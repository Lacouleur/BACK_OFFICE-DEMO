import { v4 as uuidv4 } from "uuid";
import {
  SET_NEW_MODULE,
  SET_MODULE_LIST,
  DELETE_MODULE,
  SET_VALUE_TEXTMODULE,
  CONTENT_LOADED,
  CLEAN_CONTENT_STATE,
} from "../constants";

const initialState = {
  modulesList: [],
};

const modulesReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_NEW_MODULE: {
      const { payload } = action;
      if (payload === "text") {
        return {
          ...oldState,
          modulesList: [
            ...oldState.modulesList,
            {
              type: "text",
              text: "",
              uuid: `${uuidv4()}`,
              order: state.modulesList.length + 1,
            },
          ],
        };
      }
      return {
        ...oldState,
      };
    }

    case SET_MODULE_LIST: {
      return {
        ...oldState,
      };
    }

    case DELETE_MODULE: {
      state.modulesList.find((module, index) => {
        if (module?.uuid === action.payload) {
          oldState.modulesList.splice(index, 1);
        }
        return null;
      });
      return {
        ...oldState,
        modulesList: oldState.modulesList,
      };
    }

    case SET_VALUE_TEXTMODULE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index].text = value;
          console.log(oldState.modulesList[index].text);
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case CONTENT_LOADED: {
      return {
        ...oldState,
        modulesList: action.payload.components,
      };
    }

    case CLEAN_CONTENT_STATE: {
      return {
        modulesList: [],
      };
    }

    default:
      return state;
  }
};

export default modulesReducer;
