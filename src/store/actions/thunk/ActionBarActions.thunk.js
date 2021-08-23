import { setToken } from "../../../services/client/tokenStuff";
import { isValidToken } from "../../../services/client/refreshToken";
import {
  sendAuth,
  publishManager,
  duplicateContent,
  translateContent,
} from "../../../services/client/contentClient";
import { setErrorAuth } from "../authActions";
import { setModified, setStatus } from "../mainInformationActions";
import { setManifestoStatus } from "../manifestoActions";
import { showErrorModal } from "../actionBarActions";
import { alreadyTranslated } from "../../../helper/errorMessages";
import {
  consoleError,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { fetchContentsList } from "./ArticlesActions.thunk";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";

export function logUser(redirectTo) {
  console.log("%cLOGING USER", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const { authReducer } = getState();
    const data = {
      email: authReducer.mail,
      password: authReducer.password,
    };
    try {
      const response = await sendAuth(data);
      if (response.status < 300 && response.status > 199) {
        console.log("%cUser logged=>", `${consoleSucces}`);
        setToken(response.data);
        redirectTo("/dashboard");
      }
      dispatch(setErrorAuth(true));
      return false;
    } catch (error) {
      dispatch(setErrorAuth(true));
      console.log("%cerror =>", `${consoleError}`, error?.response?.data);
      return false;
    }
  };
}

export function publishAction(articleId, mode) {
  console.log("%cPUBLISHING", `${consoleTitle}`, articleId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { isManifesto, manifestoId } = manifestoReducer;

      let actionName = "";
      if (mode === "UPDATE") {
        actionName = "PUBLISH";
      } else {
        actionName = mode;
      }
      try {
        const response = await publishManager(
          isManifesto ? manifestoId : articleId,
          actionName,
          isManifesto
        );
        if (response.status < 300 && response.status > 199) {
          if (!isManifesto) {
            if (actionName === "PUBLISH") {
              dispatch(setStatus("PUBLISHED"));
              dispatch(setModified(false));
            }
            if (actionName === "UNPUBLISH") {
              dispatch(setStatus("UNPUBLISHED"));
            }
          }
          if (isManifesto) {
            if (actionName === "PUBLISH") {
              dispatch(setManifestoStatus("PUBLISHED"));
              dispatch(setModified(false));
            }
          }
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }
    return null;
  };
}

export function duplicateArticle(articleId) {
  console.log("%cDUPLICATION", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await duplicateContent(articleId);
        if (response.status < 300 && response.status > 199) {
          dispatch(fetchContentsList());
          console.log("%cContent Duplicated", `${consoleSucces}`);
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
      return null;
    }
  };
}

export function translateArticle(articleId, lang, history) {
  console.log("%cTRANSLATING ARTICLE", `${consoleTitle}`, articleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await translateContent(articleId, lang);
        if (response.status < 300 && response.status > 199) {
          console.log(
            "%cContent Duplicated for translation",
            `${consoleSucces}`
          );
          dispatch(fetchContentsList());
        }
      } catch (error) {
        console.log("%cError =>", `${consoleError}`, error?.response?.data);
        if (error?.response?.status === 409) {
          dispatch(
            showErrorModal({
              value: true,
              message: alreadyTranslated(
                error?.response?.data,
                articleId,
                history,
                dispatch
              ),
            })
          );
        }
      }
    }
    return null;
  };
}
