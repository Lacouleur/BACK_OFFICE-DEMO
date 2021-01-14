import React, { useState, useEffect } from "react";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import { checkTitle, checkSlug } from "../../../helper/Editor/checkFields";
import Error from "../../Notifications/Error";
import {
  ContentForm,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import keyGenerator from "../../../helper/KeyGenerator";
import { postContent } from "../../../services/client/contentClient";

const HomeScreen = () => {
  const [titleError, setTitleError] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const [posted, setPosted] = useState(false);
  const [values, setValues] = useState({});
  const [specialError, setSpecialError] = useState(false);

  function checkAndSend(e) {
    e.preventDefault();
    const title = checkTitle(values);
    const slug = specialError ? true : checkSlug(values);

    setTitleError(title);
    setSlugError(slug);
    if (!title && !slug) {
      console.log(values);
      const form = e.target;
      postContent(values, setValues, form, setPosted, setSpecialError);
    }
  }

  useEffect(() => {
    if (posted) {
      setTimeout(() => {
        setPosted(false);
      }, 3000);
    }
  }, [posted]);

  return (
    <>
      {posted && (
        <Error
          key={keyGenerator()}
          text="The content has been saved"
          styles={{ width: "90%" }}
          type="valid"
        />
      )}
      {titleError && (
        <Error
          key={keyGenerator()}
          text="Content need a title."
          styles={{ width: "90%" }}
        />
      )}
      {slugError && (
        <Error
          key={keyGenerator()}
          text={`Content need a ${
            specialError ? "valid " : ""
          } valid slug URL.`}
          styles={{ width: "90%" }}
        />
      )}
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
          }Only characters, numbers and hyphens.`}
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
        <Field
          placeholder="Tag"
          maxlength="25"
          infos="Maximum 25 characters"
          setter={setValues}
          values={values}
          name="tag"
          post={posted}
        />
        <FieldTitle>Background</FieldTitle>
        <Field
          placeholder="Image(PNG or GIF)"
          setter={setValues}
          values={values}
          name="image"
          post={posted}
        />
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
