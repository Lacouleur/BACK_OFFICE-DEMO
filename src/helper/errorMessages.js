/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
import React from "react";
import { showErrorModal } from "../store/actions/actionBarActions";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import { Br } from "../styles/styledComponents/modal/Modal.sc";

export function uploadError(message) {
  return (
    <>
      <p>{message}</p>
    </>
  );
}

export function alreadyTranslated(message, articleId, history, dispatch) {
  return (
    <>
      <p>{message}</p>
      <Br />
      <p>You can acces to the translated content by clicking below :</p>
      <Button
        styles={{
          width: "50%",
          marginTop: "18px",
        }}
        type="button"
        onClick={() => {
          history.push(`/editor/${articleId}`);
          dispatch(showErrorModal(false));
        }}
      >
        {`Article: ${articleId}`}
      </Button>
    </>
  );
}
