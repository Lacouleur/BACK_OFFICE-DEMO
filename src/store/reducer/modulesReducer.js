/* eslint-disable no-unused-expressions */
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
  SET_OPINION_SHOW_RESPONSE,
  SET_OPINION_SHOW_RIGHT_ANSWER,
  SET_OPINION_SHOW_PERCENT,
  SET_OPINION_EXPLAIN,
  SET_OPINION_QUESTION,
  SET_OPINION_RIGHT_ANSWER,
  SET_OPINION_TEXT_ANSWER,
  DELETE_OPINION_ANSWER,
  CREATE_OPINION_NEW_ANSWER,
  SET_IS_VISIBLE,
  SET_IS_CHANGED,
  EDIT_MODULES_LIST,
  SET_A_MODULE_IS_OPEN,
} from "../constants";

// isNewModule stand for control auto scroll to module on creation but not on load.
const initialState = {
  modulesList: [],
};

const modulesReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    // COMMON TO MODULES
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
                isChanged: true,
                isNewModule: true,
                isOpenCloseModal: false,
                isVisible: true,
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
                  source: "FTV-internal",
                  uuid: null,
                  urls: {},
                },
                type: "image",
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: true,
                isNewModule: true,
                isOpenCloseModal: false,
                isVisible: true,
              },
            ],
          };
        }
        case "opinion": {
          return {
            ...oldState,
            modulesList: [
              ...oldState.modulesList,
              {
                answers: [
                  {
                    right: false,
                    uuid: `${uuidv4()}`,
                    text: "",
                  },
                  {
                    right: false,
                    uuid: `${uuidv4()}`,
                    text: "",
                  },
                ],

                isVisible: true,
                type: "opinion",
                question: "",
                showPercentage: false,
                showResponse: true,
                showRight: false,
                explanation: null,
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: true,
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

    case SET_IS_VISIBLE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            isVisible: value,
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

    // TEXT MODULES
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

    // IMAGE MODULES
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

    case EDIT_MODULES_LIST: {
      oldState.modulesList = action.payload;
      console.log(oldState);
      return {
        ...oldState,
      };
    }

    case SET_IS_CHANGED: {
      const id = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: true,
          };
        }

        return null;
      });

      return {
        ...oldState,
      };
    }

    // QUESTION MODULES
    case SET_OPINION_SHOW_PERCENT: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            showPercentage: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_SHOW_RESPONSE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            showResponse: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_SHOW_RIGHT_ANSWER: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            showRight: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_EXPLAIN: {
      const { id, value } = action.payload;

      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            explanation: value,
            isChanged: true,
          };
        }

        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_QUESTION: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            question: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_RIGHT_ANSWER: {
      const { moduleId, answerId, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: true,
          };
          module.answers.find((answer, answerIndex) => {
            if (answer?.uuid === answerId) {
              oldState.modulesList[index].answers[answerIndex] = {
                ...answer,
                right: value,
              };
            }
          });
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_OPINION_TEXT_ANSWER: {
      const { moduleId, answerId, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: true,
          };
          module.answers.find((answer, answerIndex) => {
            if (answer?.uuid === answerId) {
              oldState.modulesList[index].answers[answerIndex] = {
                ...answer,
                text: value,
              };
            }
          });
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case DELETE_OPINION_ANSWER: {
      const { moduleId, answerId } = action.payload;

      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: true,
          };
          module.answers.find((answer, answerIndex) => {
            if (answer?.uuid === answerId) {
              if (oldState.modulesList[index].answers.length > 2) {
                oldState.modulesList[index].answers.splice(answerIndex, 1);
              }
            }
          });
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case CREATE_OPINION_NEW_ANSWER: {
      const moduleId = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: true,
            answers: [
              ...module.answers,
              {
                right: false,
                uuid: `${uuidv4()}`,
                text: "",
              },
            ],
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    // CLEANING

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
