import React from "react";
import Flex from "../styles/styledComponents/global/FlexBoxes.sc";
import { H1, TitleArrow } from "../styles/styledComponents/global/Titles.sc";
import arrowLeft from "../styles/assets/icons/arrow-left.svg";
import editorBox from "../styles/styledComponents/editor/EditorCustomBoxes.sc";

const PageTitle = () => {
  return (
    <Flex style={editorBox.titleBox}>
      <TitleArrow src={arrowLeft} />
      <H1>CREATE CONTENT</H1>
    </Flex>
  );
};

export default PageTitle;
