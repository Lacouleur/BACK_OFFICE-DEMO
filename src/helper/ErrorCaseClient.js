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
    console.log("%cError =>", `${consoleError}`, errorData);
  } else {
    dispatch(showErrorModal(true));
    console.log("%cError =>", `${consoleError}`, errorData);
  }
}

export default ErrorCaseClient;
