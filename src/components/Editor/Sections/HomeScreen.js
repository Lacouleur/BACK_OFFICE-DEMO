import React from "react";
import Flex from "../../../styles/styledComponents/global/FlexBoxes.sc";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import editorBox from "../../../styles/styledComponents/editor/EditorCustomBoxes.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";

const HomeScreen = () => {
  return (
    <Flex style={editorBox.contentBox}>
      <Flex style={{}}>
        <TitleIcon src={homeIcon} />
        <FormTitle>HOME SCREEN</FormTitle>
      </Flex>
      <FieldTitle>Text and category</FieldTitle>
      <Field
        boxStyle={editorBox.fieldBox}
        properties={{ placeholder: "Title" }}
        maxlength="64"
        infos="Maximum 64 characters"
      />
      <Field
        boxStyle={editorBox.fieldBox}
        properties={{ placeholder: "Category" }}
      />
      <FieldTitle>Background</FieldTitle>
      <Field
        boxStyle={editorBox.fieldBox}
        properties={{ placeholder: "Image(PNG or GIF)" }}
      />
    </Flex>
  );
};

export default HomeScreen;
