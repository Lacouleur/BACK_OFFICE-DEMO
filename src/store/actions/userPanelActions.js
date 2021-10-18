import {
  SET_IS_ACCESSIBLE_PANEL,
  SET_PANEL_OPEN,
  SET_POSITION,
  SET_LAST_NAME,
  SET_FIRST_NAME,
  SET_DISPLAYED_NAME,
  SET_QUOTE,
  SET_EMAIL,
  SET_GENDER,
  SET_PICTURE,
  SET_LOCALE,
  SET_USER_ID,
} from "../constants";

export const setIsAccessiblePanel = (payload) => ({
  type: SET_IS_ACCESSIBLE_PANEL,
  payload,
});

export const setPanelOpen = (payload) => ({
  type: SET_PANEL_OPEN,
  payload,
});

export const setPosition = (payload) => ({
  type: SET_POSITION,
  payload,
});

export const setLastName = (payload) => ({
  type: SET_LAST_NAME,
  payload,
});

export const setFirstName = (payload) => ({
  type: SET_FIRST_NAME,
  payload,
});

export const setDisplayedName = (payload) => ({
  type: SET_DISPLAYED_NAME,
  payload,
});

export const setQuote = (payload) => ({
  type: SET_QUOTE,
  payload,
});

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const setGender = (payload) => ({
  type: SET_GENDER,
  payload,
});

export const setPicture = (payload) => ({
  type: SET_PICTURE,
  payload,
});

export const setLocale = (payload) => ({
  type: SET_LOCALE,
  payload,
});

export const setUserId = (payload) => ({
  type: SET_USER_ID,
  payload,
});
