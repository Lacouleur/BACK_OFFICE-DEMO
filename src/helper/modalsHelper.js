import {
  setIsOpenPublishModal,
  setIsOpenDuplicateModal,
} from "../store/actions/actionBarActions";
import {
  cancelScheduledPublication,
  duplicateArticle,
  duplicateElement,
  publishAction,
  translateArticle,
} from "../store/actions/thunk/ActionBarActions.thunk";
import { getStatus } from "../store/actions/thunk/ArticlesActions.thunk";

export function handlePublish(actionName, dispatch, id, manifestoState) {
  const { isManifesto, manifestoId } = manifestoState;
  if (!isManifesto) {
    dispatch(publishAction(id, actionName));
  }
  if (isManifesto) {
    dispatch(publishAction(manifestoId, actionName));
  }
}

export function handleButton(dispatch, actionName, id, manifestoState) {
  if (actionName === "CANCEL") {
    dispatch(cancelScheduledPublication(id));
    dispatch(getStatus(id));
    dispatch(setIsOpenPublishModal(false));
  } else {
    const action = actionName === "UPDATE" ? "PUBLISH" : actionName;
    handlePublish(action, dispatch, id, manifestoState);
    dispatch(setIsOpenPublishModal(false));
  }
}

export function convertLang(lang, setSelectedLang) {
  if (lang) {
    if (lang === "german") {
      setSelectedLang({
        label: "French",
        value: "fr",
      });
    } else {
      setSelectedLang({
        label: "German",
        value: "de",
      });
    }
  }
}

export function handleCheck(
  dispatch,
  simpleChecked,
  id,
  tradChecked,
  selectedLang,
  history,
  type
) {
  if (simpleChecked) {
    dispatch(duplicateElement(id, type));
    dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
  }

  if (tradChecked && selectedLang) {
    dispatch(translateArticle(id, selectedLang.value, history, type));
    dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
  }
}

export function setErrorsList(errorMessage) {
  if (Array.isArray(errorMessage)) {
    return errorMessage;
  }
  return [{ message: errorMessage }];
}
