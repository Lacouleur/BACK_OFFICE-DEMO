import { setIsOpenPublishModal } from "../store/actions/actionBarActions";
import { setIsOpenDuplicateModal } from "../store/actions/contentListActions";
import {
  cancelScheduledPublication,
  duplicateArticle,
  publishAction,
  translateArticle,
} from "../store/actions/thunk/ActionBarActions.thunk";
import { getStatus } from "../store/actions/thunk/ArticlesActions.thunk";

export function handlePublish(actionName, dispatch, articleId, manifestoState) {
  const { isManifesto, manifestoId } = manifestoState;
  if (!isManifesto) {
    dispatch(publishAction(articleId, actionName));
  }
  if (isManifesto) {
    dispatch(publishAction(manifestoId, actionName));
  }
}

export function handleButton(dispatch, actionName, articleId, manifestoState) {
  if (actionName === "CANCEL") {
    dispatch(cancelScheduledPublication(articleId));
    dispatch(getStatus(articleId));
    dispatch(setIsOpenPublishModal(false));
  } else {
    const action = actionName === "UPDATE" ? "PUBLISH" : actionName;
    handlePublish(action, dispatch, articleId, manifestoState);
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

export function handleDuplication(dispatch, id) {
  dispatch(duplicateArticle(id));
}

export function handleTranslation(dispatch, id, selectedLang, history) {
  dispatch(translateArticle(id, selectedLang.value, history));
}

export function handleCheck(
  dispatch,
  simpleChecked,
  id,
  tradChecked,
  selectedLang,
  history
) {
  if (simpleChecked) {
    handleDuplication(dispatch, id);
    dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
  }

  if (tradChecked && selectedLang) {
    handleTranslation(dispatch, id, selectedLang, history);
    dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
  }
}

export function setErrorsList(errorMessage) {
  if (Array.isArray(errorMessage)) {
    return errorMessage;
  }
  return [{ message: errorMessage }];
}
