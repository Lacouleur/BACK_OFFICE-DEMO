/* eslint-disable import/prefer-default-export */
import { consoleSucces, consoleTitle } from "../../../helper/consoleStyles";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { nameSpaceError } from "../../../helper/errorMessages";
import { postUser, uploadImage } from "../../../services/client/contentClient";
import {
  isValidToken,
  refreshMyToken,
} from "../../../services/client/refreshToken";
import { showErrorModal } from "../actionBarActions";
import { setPicture, setUserIsChanged } from "../userPanelActions";

export function updateUser(userId) {
  console.log("%cUPDATING USER", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { userPanelReducer } = getState();
      const {
        position,
        lastName,
        firstName,
        displayedName,
        quote,
        email,
        gender,
        picture,
        locale,
      } = userPanelReducer;

      const values = {
        email,
        gender,
        given_name: firstName,
        family_name: lastName,
        displayed_name: displayedName,
        quote,
        picture: {
          alt: picture.alt,
          uuid: picture.uuid,
        },
        locale,
        position,
      };
      try {
        const response = await postUser(values, userId);

        if (response.status < 300 && response.status > 199) {
          console.log(`%cUser infos updated=>`, `${consoleSucces}`, response);
          await refreshMyToken(dispatch);
          dispatch(setUserIsChanged(false));
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }
    return null;
  };
}

export function saveAvatar(image) {
  console.log("%cSAVING Avatar", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const { userPanelReducer } = getState();
    const { picture } = userPanelReducer;
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await uploadImage(formData);
        if (response.status < 300 && response.status > 199) {
          console.log(`%cAvatar saved =>`, `${consoleSucces}`, response);
          dispatch(
            setPicture({
              alt: picture.alt || "",
              source: picture.source || "",
              uuid: response.data.uuid,
              urls: response.data.urls,
            })
          );
          dispatch(setUserIsChanged(true));
        }
      } catch (error) {
        if (error?.response.status === 400) {
          dispatch(showErrorModal({ value: true, message: nameSpaceError() }));
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}
