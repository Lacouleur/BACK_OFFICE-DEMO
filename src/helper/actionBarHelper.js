/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */

import {
  setIsOpenPublishModal,
  setIsOpenScheduleModal,
} from "../store/actions/actionBarActions";
import buildDate from "./buildDate";

/* eslint-disable import/prefer-default-export */
export function watchOpinionModules(modulesList) {
  const opinionModules = [];
  modulesList.map((module) => {
    if (module.type === "opinion" || module.type === "feedback") {
      opinionModules.push(module);
    }
  });

  if (opinionModules.length > 0) {
    return true;
  }
  return false;
}

export function ModifiedModulesWatcher(
  modulesList,
  seoChanged,
  MainInformationChanged,
  homeNavIsChanged,
  pageHeaderIsChanged,
  setContentIsChanged
) {
  const modifiedModules = [];
  modulesList.map((module) => {
    if (module.isChanged || module.isNewModule) {
      modifiedModules.push(module);
      return null;
    }
    return null;
  });

  if (
    seoChanged ||
    MainInformationChanged ||
    homeNavIsChanged ||
    pageHeaderIsChanged ||
    modifiedModules.length > 0
  ) {
    setContentIsChanged(true);
  } else {
    setContentIsChanged(false);
  }
}

export function FieldsErrorWatcher(
  title,
  slug,
  titleError,
  slugError,
  regexSlugError,
  postingError,
  isManifesto,
  setIsEditorError
) {
  if (!isManifesto) {
    if (
      titleError ||
      slugError ||
      regexSlugError ||
      postingError ||
      !slug ||
      !title
    ) {
      setIsEditorError(true);
    } else {
      setIsEditorError(false);
    }
  }

  if (isManifesto) {
    if (titleError || !title) {
      setIsEditorError(true);
    } else {
      setIsEditorError(false);
    }
  }
}

export function timeWatcher(
  dispatch,
  actionBarState,
  setProgrammedDate,
  setUpdateDate,
  setStatus,
  setSelectOptions,
  setPublishedDate
) {
  const { updatedAt, publishedAt, isScheduled } = actionBarState;

  const createUpdateDate = new Date(updatedAt);
  setUpdateDate(buildDate(createUpdateDate));
  if (isScheduled) {
    const createProgrammedDate = new Date(isScheduled);
    setProgrammedDate(buildDate(createProgrammedDate));
    dispatch(setStatus("SCHEDULED"));
    setSelectOptions([
      { value: "PUBLISH", label: "PUBLISH" },
      { value: "CANCEL", label: "CANCEL PUBLICATION" },
    ]);
  }
  if (publishedAt) {
    const createPublishedDate = new Date(publishedAt);
    setPublishedDate(buildDate(createPublishedDate));
  }
}

export function setButtonContent(
  status,
  modified,
  setActionButtonContent,
  setSelectOptions,
  setIsDeleteButton,
  manifestoState,
  actionBarState
) {
  if (actionBarState) {
    const { publicationFailed } = actionBarState;
    const { isManifesto, manifestoId } = manifestoState;

    if (!isManifesto) {
      let buttonStatus = status;

      if (
        publicationFailed === true &&
        !actionBarState?.publicationFailData?.retryAt
      ) {
        buttonStatus = "UNPUBLISHED";
      }

      if (buttonStatus === "PUBLISHED" && modified) {
        setActionButtonContent("PROGRAM UPDATE");
        setSelectOptions([
          { value: "UNPUBLISH", label: "UNPUBLISH" },
          { value: "UPDATE", label: "UPDATE" },
        ]);
        setIsDeleteButton(false);
        return;
      }
      if (buttonStatus === "PUBLISHED" && !modified) {
        setSelectOptions([]);
        setActionButtonContent("UNPUBLISH");
        setIsDeleteButton(false);
        return;
      }
      if (buttonStatus === "DRAFT" || buttonStatus === "UNPUBLISHED") {
        setSelectOptions([{ value: "PUBLISH", label: "PUBLISH" }]);
        setActionButtonContent("PROGRAM");
        setIsDeleteButton(true);
        return;
      }
      if (buttonStatus === "SCHEDULED") {
        setActionButtonContent("PROGRAM UPDATE");
        setSelectOptions([{ value: "CANCEL", label: "CANCEL PUBLICATION" }]);
        setIsDeleteButton(false);
        return;
      }
      setActionButtonContent("PROGRAM");
      setIsDeleteButton(true);
    }

    if (isManifesto) {
      setActionButtonContent(manifestoId ? "UPDATE" : "PUBLISH");
      setIsDeleteButton(false);
    }
  }
}

export function actionsSelectorButton(e, dispatch, setActionButtonContent) {
  if (e?.value !== "PROGRAM") {
    if (e.value === "CANCEL") {
      setActionButtonContent(e?.value);
      dispatch(setIsOpenPublishModal(true));
    } else {
      setActionButtonContent(e?.value);
      dispatch(setIsOpenPublishModal(true));
    }
  } else {
    setActionButtonContent(e?.value);
    dispatch(setIsOpenScheduleModal(true));
  }
}
