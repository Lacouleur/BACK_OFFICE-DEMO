/* eslint-disable import/prefer-default-export */
import { consoleSucces, consoleTitle } from "../../../helper/consoleStyles";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { uploadError } from "../../../helper/errorMessages";
import { dispatchUserInfo } from "../../../helper/userHelper";
import {
  getUser,
  postUser,
  uploadImage,
} from "../../../services/client/contentClient";
import {
  isValidToken,
  refreshMyToken,
} from "../../../services/client/refreshToken";
import { showErrorModal } from "../actionBarActions";
import { setPicture, setUserIsChanged } from "../userActions";

export function updateUser(userId) {
  console.log("%cUPDATING USER", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch, true);
    if (tokenIsValid) {
      const { userReducer } = getState();
      const {
        position,
        lastName,
        firstName,
        displayedName,
        displayedNames,
        quote,
        quotes,
        email,
        gender,
        picture,
        locale,
      } = userReducer;

      const values = {
        email,
        gender,
        given_name: firstName,
        family_name: lastName,
        displayed_name: displayedName,
        displayed_names: displayedNames,
        quote,
        quotes,
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

export function saveAvatar(setFileTitle, image) {
  console.log("%cSAVING Avatar", `${consoleTitle}`);
  return async (dispatch, getState) => {
    const { userReducer } = getState();
    const { picture } = userReducer;
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
          setFileTitle(image.name);
          dispatch(setUserIsChanged(true));
        }
      } catch (error) {
        if (error?.response.status === 400) {
          dispatch(
            showErrorModal({
              value: true,
              message: uploadError(error?.response?.data),
            })
          );
          ErrorCaseClient(dispatch, error?.response?.data);
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}

export function fetchUser(id) {
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getUser(id);
        if (response.status < 300 && response.status > 199) {
          console.log(`%cUser Fetched =>`, `${consoleSucces}`, response.data);
          dispatchUserInfo(dispatch, response.data);
          dispatch(setUserIsChanged(false));
        }
      } catch (error) {
        if (error?.response.status === 400) {
          dispatch(
            showErrorModal({
              value: true,
              message: uploadError(error?.response?.data),
            })
          );
          ErrorCaseClient(dispatch, error?.response?.data);
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}
