import {
  CLEAN_PAGE_STATE,
  ADD_HEADER_TITLE,
  ADD_HEADER_SUBTITLE,
  SET_HEADER_IMAGE_UUID,
  SET_HEADER_IMAGE_ALT,
  SET_HEADER_LARGE_IMAGE_UUID,
  SET_HEADER_LARGE_IMAGE_ALT,
  SET_POSTED,
  PAGE_LOADED,
  SET_IMAGE_DESCRIPTION,
  SET_HEADER_CTA_LABEL,
  SET_HEADER_CTA_OPEN_NEW_TAB,
  SET_HEADER_URL,
  SWITCH_ON_OFF_HEADER_SECTION,
} from "../constants";

const initialState = {
  headerTitle: "",
  headerSubtitle: "",
  headerImgUuid: undefined,
  headerImgAlt: undefined,
  headerImgUrls: undefined,
  headerLargeImgUuid: "",
  headerLargeImgAlt: "",
  headerLargeImgUrls: undefined,
  imageDescription: "",
  headerURL: undefined,
  headerCTALabel: "",
  headerCTAOpenNewTab: false,
  pageHeaderIsChanged: false,
  isPageHeaderActive: false,
};

const pageHeaderReducer = (state = initialState, action = {}) => {
  const oldState = { ...state };

  switch (action.type) {
    case PAGE_LOADED: {
      const { payload } = action;
      return {
        ...oldState,
        headerTitle: payload?.header?.title || "",
        headerSubtitle: payload?.header?.subtitle || "",
        imageDescription: payload?.header?.imageDescription || "",
        headerImgUuid: payload?.header?.image?.uuid || undefined,
        headerImgAlt: payload?.header?.image?.alt || "",
        headerImgUrls: payload?.header?.image?.urls || undefined,
        headerLargeImgUuid: payload?.header?.largeImage?.uuid || undefined,
        headerLargeImgAlt: payload?.header?.largeImage?.alt || "",
        headerLargeImgUrls: payload?.header?.largeImage?.urls || undefined,
        headerURL: payload?.header?.url?.value || "",
        headerCTALabel: payload?.header?.url?.ctaLabel || "",
        headerCTAOpenNewTab: payload?.header?.url?.openNewTab || false,
      };
    }

    case SET_POSTED: {
      return {
        ...oldState,
        pageHeaderIsChanged: false,
      };
    }

    case ADD_HEADER_TITLE: {
      return {
        ...oldState,
        headerTitle: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case ADD_HEADER_SUBTITLE: {
      return {
        ...oldState,
        headerSubtitle: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_IMAGE_DESCRIPTION: {
      return {
        ...oldState,
        imageDescription: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_IMAGE_UUID: {
      return {
        ...oldState,
        headerImgUuid: action.payload?.uuid || undefined,
        headerImgUrls: action.payload?.urls || undefined,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_IMAGE_ALT: {
      return {
        ...oldState,
        headerImgAlt: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_LARGE_IMAGE_UUID: {
      return {
        ...oldState,
        headerLargeImgUuid: action.payload?.uuid || undefined,
        headerLargeImgUrls: action.payload?.urls || undefined,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_LARGE_IMAGE_ALT: {
      return {
        ...oldState,
        headerLargeImgAlt: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_CTA_LABEL: {
      return {
        ...oldState,
        headerCTALabel: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_CTA_OPEN_NEW_TAB: {
      return {
        ...oldState,
        headerCTAOpenNewTab: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SET_HEADER_URL: {
      return {
        ...oldState,
        headerURL: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case SWITCH_ON_OFF_HEADER_SECTION: {
      return {
        ...oldState,
        isPageHeaderActive: action.payload,
        pageHeaderIsChanged: true,
      };
    }

    case CLEAN_PAGE_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default pageHeaderReducer;
