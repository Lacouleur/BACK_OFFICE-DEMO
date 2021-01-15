import React, { useState } from "react";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import { checkTitle, checkSlug } from "../../../helper/Editor/checkFields";
import {
  ContentForm,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import { postContent } from "../../../services/client/contentClient";
import EditorErrors from "../EditorErrors";

const HomeScreen = () => {
  const [titleError, setTitleError] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const [posted, setPosted] = useState(false);
  const [values, setValues] = useState({});
  const [specialError, setSpecialError] = useState(false);
  const [postingError, setPostingError] = useState({
    isError: false,
    name: "",
    text: "",
  });

  function checkAndSend(e) {
    e.preventDefault();
    const title = checkTitle(values);
    const slug = specialError ? true : checkSlug(values);

    setTitleError(title);
    setSlugError(slug);
    if (!title && !slug) {
      const form = e.target;
      postContent(
        values,
        setValues,
        form,
        setPosted,
        setSpecialError,
        setPostingError
      );
    }
  }

  return (
    <>
      <EditorErrors
        postingError={postingError}
        setPostingError={setPostingError}
        specialError={specialError}
        posted={posted}
        setPosted={setPosted}
        titleError={titleError}
        slugError={slugError}
      />
      <ContentForm onSubmit={checkAndSend}>
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>HOME SCREEN</FormTitle>
        </SectionTitle>
        <FieldTitle>Title and slug URL</FieldTitle>
        <Field
          placeholder="Title"
          maxlength="64"
          infos="Maximum 64 characters"
          name="title"
          setter={setValues}
          values={values}
          error={titleError}
          setError={setTitleError}
          post={posted}
        />
        <Field
          placeholder="slug URL"
          infos={`${
            specialError ? "INVALID ! " : ""
          }"Only characters, numbers and hyphens.`}
          setter={setValues}
          values={values}
          name="slug"
          error={slugError}
          setError={setSlugError}
          post={posted}
          specialError={specialError}
          setSpecialError={setSpecialError}
        />
        <Field
          placeholder="Category"
          setter={setValues}
          values={values}
          name="category"
          fieldType="select"
          post={posted}
        />
        {/*         <Field
          placeholder="Tag"
          maxlength="25"
          infos="Maximum 25 characters"
          setter={setValues}
          values={values}
          name="htag"
          post={posted}
        />
        <FieldTitle>Background</FieldTitle>
        <Field
          placeholder="Image(PNG or GIF)"
          setter={setValues}
          values={values}
          name="image"
          post={posted}
        /> */}
        <Button
          styles={{
            alignSelf: "flex-end",
          }}
          type="submit"
        >
          VALIDATE
        </Button>
      </ContentForm>
    </>
  );
};

export default HomeScreen;
