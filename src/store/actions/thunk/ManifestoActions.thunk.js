/* eslint-disable import/prefer-default-export */
import {
  getManifesto,
  postManifesto,
  updateManifesto,
} from "../../../services/client/contentClient";
import {
  contentLoaded,
  setErrorPosting,
  setErrorSpecial,
  setPosted,
} from "../commonsActions";
import { setErrorTitle, setModified } from "../mainInformationActions";
import {
  setManifestoId,
  setManifestolang,
  setManifestoStatus,
} from "../manifestoActions";

import {
  consoleError,
  consoleInfo,
  consoleSucces,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { deleteToken } from "../../../services/client/tokenStuff";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { isValidToken } from "../../../services/client/refreshToken";

export function actualizeManifesto(manifestoId) {
  console.log("%cUPDATING MANIFESTO", `${consoleTitle}`, manifestoId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const {
        seoReducer,
        mainInformationReducer,
        homeNavigationReducer,
      } = getState();
      const { title: mainTitle, colorStyle } = mainInformationReducer;
      const { description, title: seoTitle } = seoReducer;

      const {
        homeTitle,
        readingTime,
        homeImgUuid,
        homeImgAlt,
        navImgUuid,
        navImgAlt,
      } = homeNavigationReducer;
      let theme = colorStyle;

      if (typeof colorStyle === "string") {
        theme = parseInt(colorStyle, 10);
      }

      let values = {};

      values = {
        title: mainTitle,
        theme,
        header: homeTitle
          ? {
              readingTime: readingTime || undefined,
              title: homeTitle || undefined,
              type: "header",
              image: homeImgUuid
                ? {
                    uuid: homeImgUuid || undefined,
                    alt: homeImgAlt || undefined,
                    source: "FTV-internal",
                  }
                : undefined,
            }
          : undefined,
        thumbnail: navImgUuid
          ? {
              uuid: navImgUuid || undefined,
              alt: navImgAlt || undefined,
              source: "FTV-internal",
            }
          : undefined,
      };

      if (seoTitle || description) {
        values.seo = {};
        const { seo } = values;
        if (seoTitle) {
          seo.title = seoTitle;
        }
        if (description) {
          seo.description = description;
        }
      }

      try {
        const response = await updateManifesto(values, manifestoId);
        if (response.status < 300 && response.status > 199) {
          dispatch(setErrorSpecial(false));
          dispatch(setPosted(true));
          dispatch(setModified(true));
          dispatch(setManifestoStatus("UNPUBLISHED"));
          console.log(
            `%cUpdated Manifesto =>`,
            `${consoleSucces}`,
            response.data
          );
        }
      } catch (error) {
        console.log(
          "%cError while updating",
          `${consoleError}`,
          error?.response?.data
        );
        if (error.response.status === 409) {
          dispatch(setErrorPosting(true));
          dispatch(setPosted(false));
          ErrorCaseClient(dispatch, error?.response?.data);
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
          dispatch(setPosted(false));
        }
        return null;
      }
      return null;
    }
    return null;
  };
}

export function fetchManifesto(lang) {
  console.log("%cFETCHING MANIFESTO", `${consoleTitle}`, lang);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      if (lang) {
        try {
          const response = await getManifesto(lang);
          if (response.status < 300 && response.status > 199) {
            const fetchedLang =
              response.data[0].language === "german" ? "de" : "fr";

            console.log(
              "%cManifesto fetched =>",
              `${consoleInfo}`,
              response.data
            );

            if (fetchedLang === lang) {
              dispatch(
                setManifestoStatus(
                  response.data[0]?.modified ? "" : "PUBLISHED"
                )
              );
              dispatch(setManifestolang(fetchedLang));
              dispatch(contentLoaded(response.data[0]));
            } else {
              dispatch(setManifestoId(""));
            }
          }
          return null;
        } catch (error) {
          if (error?.response?.status === 401) {
            console.error(
              "%cError =>",
              `${consoleError}`,
              error?.response?.data
            );
            deleteToken(dispatch);
          }
          console.error("%cError =>", `${consoleError}`, error?.response?.data);
          return null;
        }
      }
      return null;
    }
    return null;
  };
}

export function saveManifesto(lang) {
  console.log("%cSAVING MANIFESTO", `${consoleTitle}`, lang);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { mainInformationReducer } = getState();
      const { title: mainTitle, colorStyle } = mainInformationReducer;

      const titleError = !mainTitle;

      if (titleError) {
        dispatch(setErrorTitle(true));
      }

      let values = {};
      let theme = colorStyle;

      if (typeof colorStyle === "string") {
        theme = parseInt(colorStyle, 10);
      }

      values = {
        title: mainTitle,
        theme,
      };

      if (!titleError && lang) {
        try {
          const response = await postManifesto(values, lang);
          if (response.status < 300 && response.status > 199) {
            dispatch(setManifestoId(response.data));
            dispatch(setPosted(true));
            dispatch(setManifestoStatus("UNPUBLISHED"));

            console.log(
              `%cPosted manifesto`,
              `${consoleSucces}`,
              response.data
            );
          }
        } catch (error) {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}
