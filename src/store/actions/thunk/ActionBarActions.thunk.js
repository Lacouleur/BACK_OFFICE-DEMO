import { setToken } from "../../../services/client/tokenStuff";
import { isValidToken } from "../../../services/client/refreshToken";
import {
  sendAuth,
  publishManager,
  duplicateContent,
  translateContent,
  scheduleContentPublication,
  cancelContentPublication,
} from "../../../services/client/contentClient";
import { setErrorAuth } from "../authActions";
import { setStatus, setModified } from "../commonsActions";
import { setManifestoStatus } from "../manifestoActions";
import {
  setIsScheduled,
  setPublishScheduleFailData,
  setPublishScheduleFailed,
  showErrorModal,
} from "../actionBarActions";
import { alreadyTranslated } from "../../../helper/errorMessages";
import {
  consoleError,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { fetchContentsList } from "./ArticlesActions.thunk";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import {
  cancelPagePublication,
  duplicatePage,
  publishPage,
  schedulePagePublication,
  translatePage,
} from "../../../services/client/pagesClient";
import { fetchPages } from "./PagesHubActions.thunk";

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

export function publishAction(id, mode) {
  console.log("%cPUBLISHING", `${consoleTitle}`, id);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { pageMainInformationReducer } = getState();
      const { isManifesto, manifestoId } = manifestoReducer;
      const { isPage } = pageMainInformationReducer;

      let actionName = "";
      if (mode === "UPDATE") {
        actionName = "PUBLISH";
      } else {
        actionName = mode;
      }

      try {
        const response = !isPage
          ? await publishManager(
              isManifesto ? manifestoId : id,
              actionName,
              isManifesto
            )
          : await publishPage(id, actionName);

        if (response.status < 300 && response.status > 199) {
          console.log(`%c${actionName}ED`, `${consoleSucces}`);
          dispatch(setPublishScheduleFailed(false));
          dispatch(setPublishScheduleFailData(null));
          dispatch(setIsScheduled(false));
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

export function schedulePublication(id, date) {
  console.log("%cSCHEDULING", `${consoleTitle}`, id);

  return async (dispatch, getState) => {
    const { pageMainInformationReducer } = getState();
    const { isPage } = pageMainInformationReducer;

    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = !isPage
          ? await scheduleContentPublication(id, date)
          : await schedulePagePublication(id, date);

        if (response.status < 300 && response.status > 199) {
          console.log(`%cSCHEDULED`, `${consoleSucces}`, date);
          dispatch(setIsScheduled(date));
          dispatch(setStatus("SCHEDULED"));
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }
    return null;
  };
}

export function cancelScheduledPublication(id) {
  console.log("%cPUBLISHING", `${consoleTitle}`, id);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { status } = manifestoReducer;
      const { pageMainInformationReducer } = getState();
      const { isPage } = pageMainInformationReducer;

      try {
        const response = isPage
          ? await cancelPagePublication(id)
          : await cancelContentPublication(id);
        if (response.status < 300 && response.status > 199) {
          console.log(`%cSCHEDULE CANCELED`, `${consoleSucces}`);
          dispatch(setIsScheduled(""));
          dispatch(setStatus(status));
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }
    return null;
  };
}

export function duplicateElement(id, type) {
  console.log("%cDUPLICATION", `${consoleTitle}`, id);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response =
          type === "content"
            ? await duplicateContent(id)
            : await duplicatePage(id);
        if (response.status < 300 && response.status > 199) {
          if (type === "content") {
            dispatch(fetchContentsList());
          }
          if (type === "page") {
            dispatch(fetchPages());
          }
          console.log("%cContent Duplicated", `${consoleSucces}`);
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
      return null;
    }
    return null;
  };
}

export function translateArticle(id, lang, history, type) {
  console.log("%cTRANSLATING ARTICLE", `${consoleTitle}`, id);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response =
          type === "content"
            ? await translateContent(id, lang)
            : await translatePage(id, lang);
        if (response.status < 300 && response.status > 199) {
          console.log(
            "%cContent Duplicated for translation",
            `${consoleSucces}`
          );
          if (type === "content") {
            dispatch(fetchContentsList());
          }
          if (type === "page") {
            dispatch(fetchPages());
          }
        }
      } catch (error) {
        console.error("%cError =>", `${consoleError}`, error?.response?.data);
        if (error?.response?.status === 409) {
          dispatch(
            showErrorModal({
              value: true,
              message: alreadyTranslated(
                error?.response?.data,
                id,
                history,
                dispatch,
                type
              ),
            })
          );
        }
      }
    }
    return null;
  };
}
