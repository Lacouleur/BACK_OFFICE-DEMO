/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
import React from "react";
import { showErrorModal } from "../store/actions/actionBarActions";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import { Br } from "../styles/styledComponents/modal/Modal.sc";
import convertBytes from "./convertBytes";

export function sizeOrFormatError(file) {
  const size = convertBytes(file.size);
  return (
    <>
      <p>The weight of an image cannot exceed 500kb</p>

      <p>the accepted formats are : png, jpg, jpeg and gif.</p>

      <p>Please check the characteristics of your image and try again.</p>
      <Br />
      <p>
        Your file size : {size}
        /500ko
      </p>
      <p>Your file type : {file.type}</p>
    </>
  );
}

export function nameSpaceError() {
  return (
    <>
      <p>Image title can only contain dashes, underscores, letters, numbers.</p>
      <p>It must ends with a dot followed by the format extension.</p>
      <Br />
      <p>ex: my-image-name.jpg</p>
      <p>plase verify your image name and try again.</p>
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
