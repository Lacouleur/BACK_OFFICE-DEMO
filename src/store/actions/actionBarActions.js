import {
  SET_UPDATED_AT,
  SET_PUBLISHED,
  SET_IS_OPEN_PUBLISH_MODAL,
  SHOW_ERROR_MODAL,
  SET_IS_OPEN_ARCHIVE_MODAL,
  SHOW_HIDE_MODAL,
  SET_IS_OPEN_SCHEDULE_MODAL,
  SET_IS_SCHEDULED,
  SET_A_MODULE_IS_OPEN,
  SET_PUBLISH_SCHEDULE_FAIL_DATA,
  SET_PUBLISH_SCHEDULE_FAILED,
  SET_IS_OPEN_DUPLICATE_MODAL,
} from "../constants";

export const setPublishScheduleFailData = (payload) => ({
  type: SET_PUBLISH_SCHEDULE_FAIL_DATA,
  payload,
});

export const setPublishScheduleFailed = (payload) => ({
  type: SET_PUBLISH_SCHEDULE_FAILED,
  payload,
});

export const setUpdatedAt = (payload) => ({
  type: SET_UPDATED_AT,
  payload,
});

export const setPublishedAt = (payload) => ({
  type: SET_PUBLISHED,
  payload,
});

export const setIsOpenPublishModal = (payload) => ({
  type: SET_IS_OPEN_PUBLISH_MODAL,
  payload,
});

export const showErrorModal = (payload) => ({
  type: SHOW_ERROR_MODAL,
  payload,
});

export const setIsOpenArchiveModal = (payload) => ({
  type: SET_IS_OPEN_ARCHIVE_MODAL,
  payload,
});

export const showHideModal = (payload) => ({
  type: SHOW_HIDE_MODAL,
  payload,
});

export const setIsOpenScheduleModal = (payload) => ({
  type: SET_IS_OPEN_SCHEDULE_MODAL,
  payload,
});

export const setIsScheduled = (payload) => ({
  type: SET_IS_SCHEDULED,
  payload,
});

export const setAModuleIsOpen = (payload) => ({
  type: SET_A_MODULE_IS_OPEN,
  payload,
});

export const setIsOpenDuplicateModal = (payload) => ({
  type: SET_IS_OPEN_DUPLICATE_MODAL,
  payload,
});
