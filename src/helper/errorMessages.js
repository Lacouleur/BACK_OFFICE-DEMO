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

export function alreadyTranslated(message, id, history, dispatch, type) {
  return (
    <>
      <p>{message}</p>
      <Br />
      <p>You can acces to the translated content by clicking below :</p>
      <Button
        modalAlreadyTranslatedButton
        type="button"
        onClick={() => {
          if (type === "content") {
            history.push(`/editor/${id}`);
          }
          if (type === "page") {
            history.push(`/pages/${id}`);
          }
          dispatch(showErrorModal(false));
        }}
      >
        {`Article: ${id}`}
      </Button>
    </>
  );
}
