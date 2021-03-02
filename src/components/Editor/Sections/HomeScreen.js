import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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

const HomeScreen = () => {
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );

  const {
    title: mainTitle,
    slug,
    category,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    isEditing,
  } = homeScreenState;

  const slugMessage = () => {
    let message = "";
    if (postingError) {
      message = `Slug already exist`;
    } else if (regexSlugError) {
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
          section="homeScreen"
          edit={isEditing ? mainTitle : undefined}
          error={titleError}
        />
        <Field
          placeholder="slug URL"
          infos={`${slugMessage()}`}
          name="slug"
          section="homeScreen"
          edit={isEditing ? slug : undefined}
          error={regexSlugError || postingError || slugError}
        />
        <Field
          placeholder="Category"
          name="category"
          fieldType="select"
          section="homeScreen"
          edit={isEditing ? category : undefined}
        />
      </SectionBox>
    </>
  );
};

HomeScreen.defaultProps = {
  edit: undefined,
};

HomeScreen.propTypes = {
  edit: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default HomeScreen;
