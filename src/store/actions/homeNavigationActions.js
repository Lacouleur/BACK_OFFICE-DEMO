/* eslint-disable import/prefer-default-export */
import {
  SET_READING_TIME,
  ADD_HOME_TITLE,
  SET_HOME_IMAGE_UUID,
  SET_HOME_IMAGE_ALT,
  SET_NAV_IMAGE_UUID,
  SET_NAV_IMAGE_ALT,
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

export const setNavImageAlt = (payload) => ({
  type: SET_NAV_IMAGE_ALT,
  payload,
});