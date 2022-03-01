import { showErrorModal } from "../store/actions/actionBarActions";
import { consoleError } from "./consoleStyles";

function ErrorCaseClient(dispatch, errorData) {
  if (errorData) {
    dispatch(
      showErrorModal({
        value: true,
        message: errorData,
      })
    );
    console.error("%cError =>", `${consoleError}`, errorData);
  } else {
    dispatch(showErrorModal(true));
    console.error("%cError =>", `${consoleError}`, errorData);
  }
}

export default ErrorCaseClient;
