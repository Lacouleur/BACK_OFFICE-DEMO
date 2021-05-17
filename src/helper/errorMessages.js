/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
import React from "react";
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
