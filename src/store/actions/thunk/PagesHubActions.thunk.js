/* eslint-disable import/prefer-default-export */
import { consoleSucces, consoleTitle } from "../../../helper/consoleStyles";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import { nameSpaceError, uploadError } from "../../../helper/errorMessages";
import { getPagesList } from "../../../services/client/pagesClient";
import { setPagesList } from "../pagesHubActions";
import {
  isValidToken,
  refreshMyToken,
} from "../../../services/client/refreshToken";

export function fetchPages(id) {
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      try {
        const response = await getPagesList(id);
        if (response.status < 300 && response.status > 199) {
          console.log(`%cPages Fetched =>`, `${consoleSucces}`, response.data);
          dispatch(setPagesList(response.data));
        }
      } catch (error) {
        if (error?.response.status === 400) {
          ErrorCaseClient(dispatch, error?.response?.data);
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}
