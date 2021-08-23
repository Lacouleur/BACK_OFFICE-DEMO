import {
  SET_NEW_MODULE,
  SET_MODULE_POSTED,
  CLOSE_MODULE,
  SET_VALUE_TEXTMODULE,
  SHOW_CLOSE_MODAL,
  SET_IMAGE_UUID,
  SET_ALT_IMAGE,
  SET_OPINION_QUESTION,
  SET_OPINION_SHOW_PERCENT,
  SET_OPINION_SHOW_RESPONSE,
  SET_OPINION_EXPLAIN,
  SET_OPINION_RIGHT_ANSWER,
  SET_OPINION_TEXT_ANSWER,
  CREATE_OPINION_NEW_ANSWER,
  DELETE_OPINION_ANSWER,
  SET_OPINION_SHOW_RIGHT_ANSWER,
  SET_IS_VISIBLE,
} from "../constants";

export const setNewModule = (payload) => ({
  type: SET_NEW_MODULE,
  payload,
});

export const closeModule = (payload) => ({
  type: CLOSE_MODULE,
  payload,
});

export const setValueTextModule = (payload) => ({
  type: SET_VALUE_TEXTMODULE,
  payload,
});

export const showCloseModal = (payload) => ({
  type: SHOW_CLOSE_MODAL,
  payload,
});

export const setModulePosted = (payload) => ({
  type: SET_MODULE_POSTED,
  payload,
});

export const setImageUuid = (payload) => ({
  type: SET_IMAGE_UUID,
  payload,
});

export const setAltImage = (payload) => ({
  type: SET_ALT_IMAGE,
  payload,
});

export const setOpinionQuestion = (payload) => ({
  type: SET_OPINION_QUESTION,
  payload,
});

export const setOpinionshowPercentage = (payload) => ({
  type: SET_OPINION_SHOW_PERCENT,
  payload,
});

export const setOpinionShowResponse = (payload) => ({
  type: SET_OPINION_SHOW_RESPONSE,
  payload,
});

export const setOpinionExplain = (payload) => ({
  type: SET_OPINION_EXPLAIN,
  payload,
});

export const SetOpinionShowRightAnswer = (payload) => ({
  type: SET_OPINION_SHOW_RIGHT_ANSWER,
  payload,
});

export const SetOpinionRightAnswer = (payload) => ({
  type: SET_OPINION_RIGHT_ANSWER,
  payload,
});

export const setOpinionTextAnswer = (payload) => ({
  type: SET_OPINION_TEXT_ANSWER,
  payload,
});

export const createOpinionNewAnswer = (payload) => ({
  type: CREATE_OPINION_NEW_ANSWER,
  payload,
});

export const deleteOpinionAnswer = (payload) => ({
  type: DELETE_OPINION_ANSWER,
  payload,
});

export const setIsVisible = (payload) => ({
  type: SET_IS_VISIBLE,
  payload,
});
