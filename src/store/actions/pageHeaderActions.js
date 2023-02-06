import {
  ADD_HEADER_TITLE,
  ADD_HEADER_SUBTITLE,
  SET_HEADER_IMAGE_UUID,
  SET_HEADER_IMAGE_ALT,
  SET_HEADER_LARGE_IMAGE_UUID,
  SET_HEADER_LARGE_IMAGE_ALT,
  SET_IMAGE_DESCRIPTION,
  SET_HEADER_CTA_LABEL,
  SET_HEADER_CTA_OPEN_NEW_TAB,
  SET_HEADER_URL,
  SWITCH_ON_OFF_HEADER_SECTION,
} from "../constants";

export const addHeaderTitle = (payload) => ({
  type: ADD_HEADER_TITLE,
  payload,
});

export const addHeaderSubtitle = (payload) => ({
  type: ADD_HEADER_SUBTITLE,
  payload,
});

export const setHeaderImageUuid = (payload) => ({
  type: SET_HEADER_IMAGE_UUID,
  payload,
});

export const setHeaderImageAlt = (payload) => ({
  type: SET_HEADER_IMAGE_ALT,
  payload,
});

export const setHeaderLargeImageUuid = (payload) => ({
  type: SET_HEADER_LARGE_IMAGE_UUID,
  payload,
});

export const setHeaderLargeImageAlt = (payload) => ({
  type: SET_HEADER_LARGE_IMAGE_ALT,
  payload,
});

export const setImageDescription = (payload) => ({
  type: SET_IMAGE_DESCRIPTION,
  payload,
});

export const setHeaderCTALabel = (payload) => ({
  type: SET_HEADER_CTA_LABEL,
  payload,
});

export const setHeaderURL = (payload) => ({
  type: SET_HEADER_URL,
  payload,
});

export const setHeaderCTAOpenNewTab = (payload) => ({
  type: SET_HEADER_CTA_OPEN_NEW_TAB,
  payload,
});

export const switchOnOffPageHeader = (payload) => ({
  type: SWITCH_ON_OFF_HEADER_SECTION,
  payload,
});

