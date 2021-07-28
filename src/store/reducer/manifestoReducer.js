import {
  CONTENT_LOADED,
  SET_IS_MANIFESTO,
  SET_MANIFESTO_ID,
  SET_MANIFESTO_LANG,
  CLEAN_CONTENT_STATE,
  SET_MANIFESTO_STATUS,
} from "../constants";

const initialState = {
  manifestoId: "",
  isManifesto: "",
  manifestoLang: "",
  isPublishedManifesto: false,
  isModifiedManifesto: false,
  manifestoData: [],
};

const manifestoReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case CONTENT_LOADED: {
      return {
        ...oldState,
        manifestoId: action.payload?._id ?? null,
        manifestoData: action.payload,
      };
    }

    case SET_IS_MANIFESTO: {
      return {
        ...oldState,
        isManifesto: action.payload,
      };
    }

    case SET_MANIFESTO_ID: {
      return {
        ...oldState,
        manifestoId: action.payload,
      };
    }

    case SET_MANIFESTO_LANG: {
      return {
        ...oldState,
        manifestoLang: action.payload,
      };
    }

    case SET_MANIFESTO_STATUS: {
      if (action.payload === "PUBLISHED") {
        return {
          ...oldState,
          isPublishedManifesto: true,
        };
      }
      return {
        ...oldState,
        isPublishedManifesto: false,
      };
    }

    case CLEAN_CONTENT_STATE: {
      return {
        initialState,
      };
    }

    default:
      return state;
  }
};

export default manifestoReducer;
