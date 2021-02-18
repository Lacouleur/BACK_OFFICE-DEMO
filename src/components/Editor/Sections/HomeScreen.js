import React from "react";
import PropTypes from "prop-types";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
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
  edit,
  contentState,
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
          setValues={setValues}
          values={values}
          error={titleError}
          setError={setTitleError}
          post={posted}
          edit={edit ? edit.title : undefined}
        />
        <Field
          placeholder="slug URL"
          infos={`${slugMessage()}`}
          setValues={setValues}
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
          edit={edit ? edit.slug : undefined}
          contentState={contentState}
        />
        <Field
          placeholder="Category"
          setValues={setValues}
          values={values}
          name="category"
          fieldType="select"
          post={posted}
          section="main"
          setPostingError={setPostingError}
          edit={edit ? edit.category : undefined}
        />
      </SectionBox>
    </>
  );
};

HomeScreen.defaultProps = {
  edit: undefined,
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
  contentState: PropTypes.string.isRequired,
  postingError: PropTypes.shape({
    isError: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
  edit: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default HomeScreen;
