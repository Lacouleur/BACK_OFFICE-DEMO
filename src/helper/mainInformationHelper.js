import { checkAndSend } from "../store/actions/thunk/ArticlesActions.thunk";

export function slugMessage(mainInformationState) {
  const { regexSlugError, postingError } = mainInformationState;

  let message = "";
  if (postingError) {
    message = "Slug already exist";
  } else if (regexSlugError) {
    message = "INVALID ! Only characters, numbers and hyphens.";
  } else {
    message = "Only characters, numbers and hyphens.";
  }
  return message;
}

export function checkIfManifestoAndSetup(
  isManifesto,
  manifestoId,
  articleId,
  setIsOpen
) {
  if (!isManifesto) {
    if (articleId) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  if (isManifesto) {
    if (manifestoId) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
}

export function checkContentAndSend(
  dispatch,
  mainInformationState,
  manifestoState,
  setIsOpen,
  saveManifesto,
  actualizeManifesto,
  articleId
) {
  const {
    title,
    slug,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    isChanged,
  } = mainInformationState;

  const { isManifesto, manifestoId, manifestoLang } = manifestoState;

  if (isManifesto) {
    if (title && !titleError) {
      setIsOpen(false);
      if (isChanged && !manifestoId) {
        dispatch(saveManifesto(manifestoLang));
      } else if (isChanged && manifestoId) {
        dispatch(actualizeManifesto(manifestoId));
      }
    }
  }

  if (!isManifesto) {
    if (title && slug && !slugError && !regexSlugError && !postingError) {
      setIsOpen(false);
    }
    if (isChanged && articleId) {
      dispatch(checkAndSend("update", articleId));
    } else if (isChanged && !articleId) {
      dispatch(checkAndSend());
    }
  }
}
