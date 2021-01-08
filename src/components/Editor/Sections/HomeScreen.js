import React, { useState } from "react";
import Flex from "../../../styles/styledComponents/global/FlexBoxes.sc";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import editorBox from "../../../styles/styledComponents/editor/EditorCustomBoxes.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import Button from "../../../styles/styledComponents/global/Buttons.sc";
import checkFields from "../../../helper/Editor/checkFields";
import Error from "../../Notifications/Error";

const HomeScreen = () => {
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    title: "",
    slug: "",
    category: "",
    tag: "",
  });

  function checkAndSend() {
    setErrors(checkFields(values));
    if (errors && errors.length === 0) {
      console.log("payload", values);
    }
  }
  return (
    <>
      {errors &&
        errors.length > 0 &&
        errors.map((error) => (
          <Error text={`Content need an ${error}.`} style={{ width: "90%" }} />
        ))}
      <Flex style={editorBox.contentBox}>
        <Flex style={{}}>
          <TitleIcon src={homeIcon} />
          <FormTitle>HOME SCREEN</FormTitle>
        </Flex>
        <FieldTitle>Title and slug URL</FieldTitle>
        <Field
          boxStyle={editorBox.fieldBox}
          properties={{ placeholder: "Title" }}
          maxlength="64"
          infos="Maximum 64 characters"
          name="title"
          setter={setValues}
          values={values}
          error={errors.includes("title")}
        />
        <Field
          boxStyle={editorBox.fieldBox}
          properties={{ placeholder: "slug URL" }}
          infos="Only characters, numbers and hyphens."
          setter={setValues}
          values={values}
          name="slug"
          error={errors.includes("slug URL")}
        />
        <Field
          boxStyle={editorBox.fieldBox}
          properties={{ placeholder: "Category" }}
          setter={setValues}
          values={values}
          name="category"
        />
        <Field
          boxStyle={editorBox.fieldBox}
          properties={{ placeholder: "Tag" }}
          maxlength="25"
          infos="Maximum 25 characters"
          setter={setValues}
          values={values}
          name="tag"
        />
        <FieldTitle>Background</FieldTitle>
        <Field
          boxStyle={editorBox.fieldBox}
          properties={{ placeholder: "Image(PNG or GIF)" }}
          setter={setValues}
          values={values}
          name="image"
        />
        <Button
          style={{
            alignSelf: "flex-end",
          }}
          onClick={() => checkAndSend()}
        >
          VALIDATE
        </Button>
      </Flex>
    </>
  );
};

export default HomeScreen;
