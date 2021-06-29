import {
  SET_IS_MANIFESTO,
  SET_MANIFESTO_ID,
  SET_MANIFESTO_LANG,
  SET_MANIFESTO_STATUS,
} from "../constants";

export const setIsManifesto = (payload) => ({
  type: SET_IS_MANIFESTO,
  payload,
});

export const setManifestoId = (payload) => ({
  type: SET_MANIFESTO_ID,
  payload,
});

export const setManifestolang = (payload) => ({
  type: SET_MANIFESTO_LANG,
  payload,
});

export const setManifestoStatus = (payload) => ({
  type: SET_MANIFESTO_STATUS,
  payload,
});
