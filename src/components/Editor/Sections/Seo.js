import React from "react";
import Flex from "../../../styles/styledComponents/global/FlexBoxes.sc";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import editorBox from "../../../styles/styledComponents/editor/EditorCustomBoxes.sc";
import seoIcon from "../../../styles/assets/icons/seo.svg";
import Field from "../Field";
import { ExampleSeo } from "../../../styles/styledComponents/editor/Sections.sc";
import exampleSeoImg from "../../../styles/assets/icons/exampleSeo.svg";

const Seo = () => {
  return (
    <Flex style={editorBox.contentBox}>
      <Flex style={{}}>
        <TitleIcon src={seoIcon} />
        <FormTitle>SEO</FormTitle>
      </Flex>
      <FieldTitle>Text and category</FieldTitle>
      <Field
        boxStyle={editorBox.fieldBox}
        properties={{ placeholder: "Title" }}
      />
      <Field
        boxStyle={editorBox.fieldBox}
        properties={{ placeholder: "Description" }}
        maxlength="155"
        infos="Maximum 155 characters"
      />
      <Flex
        style={{
          position: "absolute",
          left: "60%",
          top: "66px",
          marginRight: "24px",
          flexDirection: "column",
        }}
      >
        <FieldTitle>Example</FieldTitle>
        <ExampleSeo src={exampleSeoImg} />
      </Flex>
    </Flex>
  );
};

export default Seo;
