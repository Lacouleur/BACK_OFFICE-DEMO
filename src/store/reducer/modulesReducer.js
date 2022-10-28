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
  SET_OPINION_IS_REACTION,
  DELETE_OPINION_ANSWER,
  CREATE_OPINION_NEW_ANSWER,
  SET_IS_VISIBLE,
  SET_IS_CHANGED,
  SET_CTA_URL,
  SET_CTA_LINK,
  SET_CTA_INTRO,
  SET_CTA_LABEL,
  SET_CTA_IS_NEWTAB,
  SET_CTA_DESCRIPTION,
  SET_CTA_TYPE,
  PAGE_LOADED,
  SET_PAGE_MODULE_HEADER_URL_NEWTAB,
  SET_PAGE_MODULE_HEADER_URL,
  SET_PAGE_MODULE_HEADER_SUBTITLE,
  SET_PAGE_MODULE_HEADER_TITLE,
  SET_CTA_IMAGE_UUID,
  SET_CTA_ALT_IMAGE,
  SET_MODULE_CATEGORIES,
  SET_MODULE_TAGS,
  SET_COLLECTION_LIMIT,
  EDIT_MODULES_LIST,
  SET_COLLECTION_TYPE,
  SET_COLLECTION_FORMAT,
  SET_COLLECTION_IS_PAGINATED,
  SET_COLLECTION_CUSTOM_IDS_LIST,
  SET_CUMULATED_CONTENTS_LIST,
  SET_FETCHED_CUSTOM_LIST,
  SET_COLLECTION_PAGINATION,
  SET_COLLECTION_IS_PINED,
  SET_COLLECTION_SEARCH_INPUT,
  SET_FEEDBACK_QUESTION,
  SET_COLLAPSE_TEXTMODULE,
  SET_FEATURED_ALT_IMAGE,
  SET_FEATURED_EXCERPT,
  SET_FEATURED_LINK_CTA,
  SET_FEATURED_TITLE,
  SET_FEATURED_IMAGE_UUID,
  SET_FEATURED_BACKGROUND_COLOR,
  SET_FEATURED_STICKER,
  SET_FEATURED_CATEGORY,
  SET_MODULE_AUTHORS,
  SET_FEATURED_SLUG,
  SET_COLLECTION_EXCLUDE_LAST_ARTICLE,
} from "../constants";

// isNewModule stand for control auto scroll to module on creation but not on load.
const initialState = {
  modulesList: [],
};

const modulesReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  const pageModulesHeaderField = {
    title: "",
    subtitle: "",
    url: {
      value: null,
      openNewTab: false,
    },
  };

  switch (action.type) {
    // COMMON TO MODULES

    case SET_NEW_MODULE: {
      const { payload } = action;
      switch (payload.type) {
        case "text": {
          return {
            ...oldState,
            modulesList: [
              ...oldState.modulesList,
              {
                ...(payload.editor === "page" && pageModulesHeaderField),
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
                  {
                    right: false,
                    uuid: `${uuidv4()}`,
                    text: "",
                  },
                ],

                isVisible: true,
                type: "opinion",
                question: "",
                showPercentage: true,
                showResponse: true,
                showRight: true,
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

        case "cta-button": {
          return {
            ...oldState,
            modulesList: [
              ...oldState.modulesList,
              {
                ...(payload.editor === "page" && pageModulesHeaderField),
                type: "cta-button",
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: true,
                isNewModule: true,
                isOpenCloseModal: false,
                isVisible: true,
                introduction: null,
                link: {
                  value: null,
                  openNewTab: false,
                },
                label: "",
                description: "<p></p>",
                image: {
                  alt: null,
                  source: "FTV-internal",
                  uuid: null,
                  urls: {},
                },
              },
            ],
          };
        }

        case "collection": {
          return {
            ...oldState,
            modulesList: [
              ...state.modulesList,
              {
                ...(payload.editor === "page" && pageModulesHeaderField),
                type: "collection",
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: true,
                isNewModule: true,
                isOpenCloseModal: false,
                isVisible: true,
                sectionDescription: "",
                display: "secondary",
                format: "carousel",
                paginate: true,
                isCustom: false,
                categories: [],
                tags: [],
                limit: 6,
              },
            ],
          };
        }

        case "feedback": {
          return {
            ...oldState,
            modulesList: [
              ...state.modulesList,
              {
                type: "feedback",
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

        case "featured": {
          return {
            ...oldState,
            modulesList: [
              ...state.modulesList,
              {
                ...(payload.editor === "page" && pageModulesHeaderField),
                type: "featured",
                order: state.modulesList.length + 1,
                uuid: `${uuidv4()}`,
                isPostedModule: false,
                isChanged: true,
                isNewModule: true,
                isOpenCloseModal: false,
                featuredTitle: "",
                featuredExcerpt: "",
                featuredImageAlt: "",
                link: { value: null, openNewTab: false },
              },
            ],
          };
        }
        default:
          return null;
      }
    }

    case SET_PAGE_MODULE_HEADER_URL_NEWTAB: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            url: {
              ...oldState.modulesList[index].url,
              openNewTab: value,
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

    case SET_PAGE_MODULE_HEADER_URL: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            url: {
              ...oldState.modulesList[index].url,
              value: value === "" ? null : value,
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

    case SET_PAGE_MODULE_HEADER_SUBTITLE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            subtitle: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_PAGE_MODULE_HEADER_TITLE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            title: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
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
      components?.map((module) => {
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

    case PAGE_LOADED: {
      const { sections } = action.payload;
      sections?.map((module) => {
        oldState.modulesList = [
          ...oldState.modulesList,
          {
            ...module,
            title: module.title || "",
            subtitle: module.subtitle || "",
            url: module.url || {},
            isNewModule: false,
            isPostedModule: true,
            isChanged: false,
            isOpenCloseModal: false,
            isPage: true,
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

    case SET_COLLAPSE_TEXTMODULE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            collapse: value,
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

    case SET_OPINION_IS_REACTION: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            isReaction: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

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
      const { id, value, changed } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            showRight: value,
            isChanged: changed === undefined,
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
      const { moduleId, answerId, eraseAll } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          module.answers.find((answer, answerIndex) => {
            if (!eraseAll && oldState.modulesList[index].answers.length > 2) {
              if (answer?.uuid === answerId) {
                oldState.modulesList[index].answers.splice(answerIndex, 1);
              }
            }
            if (eraseAll) {
              oldState.modulesList[index].answers = [];
            }
          });

          oldState.modulesList[index] = {
            ...module,
            isChanged: !!eraseAll,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case CREATE_OPINION_NEW_ANSWER: {
      const { moduleId, text, changed } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            isChanged: !!changed,
            answers: [
              ...module.answers,
              {
                right: false,
                uuid: `${uuidv4()}`,
                text: text || "",
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

    // CTA

    case SET_CTA_URL: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            url: value,
            isChanged: true,
          };
        }
        return null;
      });
      return {
        ...oldState,
      };
    }

    case SET_CTA_LINK: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            link: {
              ...oldState.modulesList[index].url,
              value,
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

    case SET_CTA_INTRO: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            introduction: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CTA_TYPE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            display: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CTA_LABEL: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            label: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CTA_DESCRIPTION: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            description: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CTA_IS_NEWTAB: {
      const { id, value, type } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          if (type === "page") {
            oldState.modulesList[index] = {
              ...module,
              link: {
                ...oldState.modulesList[index].url,
                openNewTab: value,
              },
              isChanged: true,
            };
          }

          if (type === "content") {
            oldState.modulesList[index] = {
              ...module,
              openNewTab: value,
              isChanged: true,
            };
          }
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CTA_IMAGE_UUID: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            image: {
              ...module.image,
              source: "ftv-internal",
              uuid: value.uuid,
              urls: value.urls,
            },
            isChanged: true,
          };
        }
      });
      return {
        ...oldState,
      };
    }

    case SET_CTA_ALT_IMAGE: {
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

    case SET_MODULE_CATEGORIES: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              categories: value,
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

    case SET_MODULE_TAGS: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              tags: value,
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

    case SET_MODULE_AUTHORS: {
      const { moduleId, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === moduleId) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              authors: value,
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

    case SET_COLLECTION_LIMIT: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              limit: value,
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

    case SET_COLLECTION_TYPE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            display: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_FORMAT: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            format: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_IS_PAGINATED: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            paginate: value,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_IS_PINED: {
      const { id, value, isChanged } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            isPined: value,
            isChanged: isChanged || module.isChanged,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_CUSTOM_IDS_LIST: {
      const { id, value } = action.payload;

      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            customIdsList: value,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_CUMULATED_CONTENTS_LIST: {
      const { id, value } = action.payload;

      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          const originalContentList =
            state.modulesList[index]?.cumulatedContentsList || [];

          const onlyNewItemsList = originalContentList.filter(
            (originalItem) =>
              value.findIndex(
                (recievedItem) => recievedItem._id === originalItem._id
              ) < 0
          );

          oldState.modulesList[index] = {
            ...module,
            cumulatedContentsList: [...onlyNewItemsList, ...value],
            /*  isChanged: true, */
          };
        }

        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_FETCHED_CUSTOM_LIST: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            fetchedCustomList: value,
            /* isChanged: true, */
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_SEARCH_INPUT: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            searchedInput: value,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_PAGINATION: {
      const { id, currentPage, lastPage, nextPage } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            currentPage,
            lastPage,
            nextPage,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_COLLECTION_EXCLUDE_LAST_ARTICLE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              excludeLastContent: value,
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

    case SET_FEEDBACK_QUESTION: {
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

    case SET_FEATURED_TITLE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            featuredTitle: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_FEATURED_EXCERPT: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            featuredExcerpt: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_FEATURED_ALT_IMAGE: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            image: {
              ...module.image,
              alt: value,
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

    case SET_FEATURED_LINK_CTA: {
      const { id, value, openNewTab } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            link: {
              openNewTab:
                openNewTab !== undefined
                  ? openNewTab
                  : module?.link?.openNewTab || undefined,
              value:
                value !== undefined ? value : module.link.value || undefined,
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

    case SET_FEATURED_IMAGE_UUID: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            image: {
              ...module.image,
              urls: value.urls,
              uuid: value.uuid,
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

    case SET_FEATURED_BACKGROUND_COLOR: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            backgroundColor: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_FEATURED_STICKER: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            sticker: value,
            isChanged: true,
          };
        }
        return null;
      });

      return {
        ...oldState,
      };
    }

    case SET_FEATURED_SLUG: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            criteria: {
              ...module.criteria,
              slug: value === "" ? undefined : value,
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

    case SET_FEATURED_CATEGORY: {
      const { id, value } = action.payload;
      state.modulesList.find((module, index) => {
        if (module?.uuid === id) {
          oldState.modulesList[index] = {
            ...module,
            featuredCategory: value,
            isChanged: true,
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
