import { SET_UPDATED_AT, SET_PUBLISHED, SET_PROGRAMMED } from "../constants";

export const setUpdatedAt = (payload) => ({
  type: SET_UPDATED_AT,
  payload,
});

export const setPublishedAt = (payload) => ({
  type: SET_PUBLISHED,
  payload,
});

export const setProgrammedAt = (payload) => ({
  type: SET_PROGRAMMED,
  payload,
});
