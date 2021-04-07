/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import {
  CollapsedText,
  Gradient,
  SectionBox,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import { checkAndSend } from "../../../store/actions/clientActions";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";

const HomeScreen = () => {
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const dispatch = useDispatch();
  const homeScreenRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    slug,
    category,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    isEditing,
    articleId,
    isChanged,
  } = homeScreenState;

  function slugMessage() {
    let message = "";
    if (postingError) {
      message = "Slug already exist";
    } else if (regexSlugError) {
      message = "INVALID ! Only characters, numbers and hyphens.";
    } else {
      message = "Only characters, numbers and hyphens.";
    }
    return message;
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    articleId ? setIsOpen(false) : setIsOpen(true);
  }, [articleId]);

  function onClickOutside() {
    if (title && slug && !slugError && !regexSlugError && !postingError) {
      setIsOpen(false);
    }
    if (!isEditing && isChanged) {
      dispatch(checkAndSend());
    } else if (isEditing && isChanged) {
      dispatch(checkAndSend("update", articleId));
    }
  }
  useClickOutside(homeScreenRef, onClickOutside);

  return (
    <>
      <SectionBox
        onClick={() => setIsOpen(true)}
        ref={homeScreenRef}
        isOpen={isOpen}
      >
        {!isOpen && <Gradient />}
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>HOME SCREEN</FormTitle>
        </SectionTitle>
        {!isOpen && (
          <>
            <CollapsedText>{title}</CollapsedText>
            <CollapsedText>{slug}</CollapsedText>
          </>
        )}
        {isOpen && (
          <>
            <FieldTitle>Title and slug URL</FieldTitle>
            <Field
              placeholder="Title"
              maxlength="64"
              infos={
                titleError ? "Content need a title." : "Maximum 64 characters"
              }
              name="title"
              section="homeScreen"
              edit={isEditing ? title : undefined}
              error={titleError}
            />
            <Field
              placeholder="slug URL"
              infos={slugError ? "Content need a slug." : `${slugMessage()}`}
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
          </>
        )}
      </SectionBox>
    </>
  );
};

export default HomeScreen;
