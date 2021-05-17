/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from "uuid";
import {
  SET_NEW_MODULE,
  CLOSE_MODULE,
  SET_VALUE_TEXTMODULE,
  SET_IMAGE_UUID,
  CONTENT_LOADED,
  CLEAN_CONTENT_STATE,
  SHOW_CLOSE_MODAL,
  SET_MODULE_POSTED,
  SET_ALT_IMAGE,
} from "../constants";

// isNewModule stand for control auto scroll to module on creation but not on load.
const initialState = {
  modulesList: [],
};

const modulesReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case SET_NEW_MODULE: {
      const { payload } = action;
      switch (payload) {
        case "text": {
          return {
            ...oldState,
            modulesList: [
              ...oldState.modulesList,
              {
                type: "text",
                text: "<p></p>",
                uuid: `${uuidv4()}`,
                order: state.modulesList.length + 1,
                isPostedModule: false,
                isChanged: false,
                isNewModule: true,
                isOpenCloseModal: false,
              },
            ],
          };
        }
        case "image": {
          return {
            ...oldState,
            modulesList: [
              ...oldState.modulesList,
              {
                image: {
                  alt: null,
                  source: null,
                  uuid: null,
                  urls: {},
                },
                type: "image",
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: false,
                isNewModule: true,
                isOpenCloseModal: false,
              },
            ],
          };
        }
        default:
          return null;
      }
    }

    case SET_MODULE_POSTED: {
      state.modulesList.map((module, index) => {
        if (module?.uuid === action.payload) {
          oldState.modulesList[index] = {
            ...module,
            isPostedModule: true,
            isChanged: false,
            isOpenCloseModal: false,
            isNewModule: false,
          };
        }
        return {
          ...oldState,
        };
      });
      return {
        ...oldState,
      };
    }

    case CLOSE_MODULE: {
      state.modulesList.map((module, index) => {
        if (module?.uuid === action.payload) {
          oldState.modulesList.splice(index, 1);
        }
        if (oldState.modulesList[index]) {
          oldState.modulesList[index].order = index + 1;
          oldState.modulesList[index].isOpenCloseModal = false;
        }
        return {
          ...oldState,
        };
      });
      return {
        isOpenCloseModal: false,
        ...oldState,
      };
    }

    case SET_VALUE_TEXTMODULE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            text: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_IMAGE_UUID: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            image: {
              alt: module.image.alt,
              source: module.image.source,
              uuid: value.uuid,
              urls: value.urls,
            },
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_ALT_IMAGE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          console.log(value);
          oldState.modulesList[index] = {
            ...module,
            image: {
              alt: value,
              source: module.image.source,
              uuid: module.image.uuid,
              urls: module.image.urls,
            },
            isChanged: true,
          };
        }

        return null;
      });

      return {
        ...oldState,
      };
    }

    case CONTENT_LOADED: {
      const { components } = action.payload;
      components.map((module) => {
        oldState.modulesList = [
          ...oldState.modulesList,
          {
            ...module,
            isNewModule: false,
            isPostedModule: true,
            isChanged: false,
            isOpenCloseModal: false,
          },
        ];
      });
      return {
        ...oldState,
      };
    }

    case SHOW_CLOSE_MODAL: {
      const { id, value } = action.payload;
      state.modulesList.map((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            isOpenCloseModal: value,
          };
        }
        return null;
      });

      return {
        ...oldState,
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
