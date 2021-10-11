import {
  SET_IS_ACCESSIBLE_PANEL,
  SET_PANEL_OPEN,
  SET_POSITION,
  SET_LAST_NAME,
  SET_FIRST_NAME,
  SET_DISPLAYED_NAME,
  SET_QUOTE,
  SET_AVATAR,
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

export const setAvatar = (payload) => ({
  type: SET_AVATAR,
  payload,
});
