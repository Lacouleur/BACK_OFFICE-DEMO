import {
  SET_READING_TIME,
  ADD_HOME_TITLE,
  SET_HOME_IMAGE_UUID,
  SET_HOME_IMAGE_ALT,
  SET_NAV_IMAGE_UUID,
  SET_TRANSPARENT_IMAGE_UUID,
  SET_SOCIAL_IMAGE_UUID,
  SET_NAV_IMAGE_ALT,
  SET_HOME_SHORT_DESCRIPTION,
  SET_BACKGROUND_COLOR,
  SET_TRANSPARENT_IMAGE_ALT,
  SET_SOCIAL_IMAGE_ALT,
} from "../constants";

export const setReadingTime = (payload) => ({
  type: SET_READING_TIME,
  payload,
});

export const addHomeTitle = (payload) => ({
  type: ADD_HOME_TITLE,
  payload,
});

export const setHomeImageUuid = (payload) => ({
  type: SET_HOME_IMAGE_UUID,
  payload,
});

export const setHomeImageAlt = (payload) => ({
  type: SET_HOME_IMAGE_ALT,
  payload,
});

export const setNavImageUuid = (payload) => ({
  type: SET_NAV_IMAGE_UUID,
  payload,
});

export const setTransparentImageUuid = (payload) => ({
  type: SET_TRANSPARENT_IMAGE_UUID,
  payload,
});

export const setSocialImgUuid = (payload) => ({
  type: SET_SOCIAL_IMAGE_UUID,
  payload,
});

export const setNavImageAlt = (payload) => ({
  type: SET_NAV_IMAGE_ALT,
  payload,
});

export const setHomeShortDescription = (payload) => ({
  type: SET_HOME_SHORT_DESCRIPTION,
  payload,
});

export const setBackgroundColor = (payload) => ({
  type: SET_BACKGROUND_COLOR,
  payload,
});

export const setTransparentImageAlt = (payload) => ({
  type: SET_TRANSPARENT_IMAGE_ALT,
  payload,
});

export const setSocialImageAlt = (payload) => ({
  type: SET_SOCIAL_IMAGE_ALT,
  payload,
});
