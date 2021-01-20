import React from "react";
import PropTypes from "prop-types";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  SectionBox,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";

const HomeScreen = ({
  values,
  setValues,
  specialError,
  posted,
  setTitleError,
  titleError,
  setSlugError,
  slugError,
  setSpecialError,
  setPostingError,
  postingError,
}) => {
  const slugMessage = () => {
    let message = "";
    if (postingError.isError) {
      message = `${postingError.text}`;
    } else if (specialError) {
      message = "INVALID ! Only characters, numbers and hyphens.";
    } else {
      message = "Only characters, numbers and hyphens.";
    }
    return message;
  };

  return (
    <>
      <SectionBox>
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
          section="main"
          setter={setValues}
          values={values}
          error={titleError}
          setError={setTitleError}
          post={posted}
        />
        <Field
          placeholder="slug URL"
          infos={`${slugMessage()}`}
          setter={setValues}
          values={values}
          name="slug"
          section="main"
          error={slugError}
          setError={setSlugError}
          post={posted}
          specialError={specialError}
          setSpecialError={setSpecialError}
          setPostingError={setPostingError}
          postingError={postingError}
        />
        <Field
          placeholder="Category"
          setter={setValues}
          values={values}
          name="category"
          fieldType="select"
          post={posted}
          section="main"
          setPostingError={setPostingError}
        />

        <Button
          styles={{
            alignSelf: "flex-end",
          }}
          type="submit"
        >
          VALIDATE
        </Button>
      </SectionBox>
    </>
  );
};

HomeScreen.propTypes = {
  values: PropTypes.shape({}).isRequired,
  setValues: PropTypes.func.isRequired,
  specialError: PropTypes.bool.isRequired,
  setSpecialError: PropTypes.func.isRequired,
  posted: PropTypes.bool.isRequired,
  titleError: PropTypes.bool.isRequired,
  setTitleError: PropTypes.func.isRequired,
  slugError: PropTypes.bool.isRequired,
  setSlugError: PropTypes.func.isRequired,
  setPostingError: PropTypes.func.isRequired,
  postingError: PropTypes.shape({
    isError: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
};

export default HomeScreen;
