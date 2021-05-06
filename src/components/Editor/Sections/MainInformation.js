import React, { useRef, useState, useEffect } from "react";
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

const MainInformation = () => {
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const dispatch = useDispatch();
  const mainInformationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    slug,
    lang,
    category,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    isEditing,
    articleId,
    isChanged,
  } = mainInformationState;

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
  useClickOutside(mainInformationRef, onClickOutside);

  return (
    <>
      <SectionBox
        onClick={() => setIsOpen(true)}
        ref={mainInformationRef}
        isOpen={isOpen}
      >
        {!isOpen && <Gradient />}
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>MAIN INFORMATION</FormTitle>
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
              placeholder="Title (internal)"
              maxlength="40"
              infos={
                titleError ? "Content need a title." : "Maximum 40 characters"
              }
              name="title"
              section="mainInformation"
              edit={isEditing ? title : undefined}
              error={titleError}
            />
            <Field
              placeholder="slug URL"
              infos={slugError ? "Content need a slug." : `${slugMessage()}`}
              name="slug"
              section="mainInformation"
              edit={isEditing ? slug : undefined}
              error={regexSlugError || postingError || slugError}
            />
            <Field
              placeholder="Category"
              name="category"
              fieldType="select"
              section="mainInformation"
              edit={isEditing ? category : undefined}
            />
            <Field
              placeholder="Language"
              name="lang"
              fieldType="select"
              section="mainInformation"
              edit={isEditing ? lang : "fr"}
            />
          </>
        )}
      </SectionBox>
    </>
  );
};

export default MainInformation;
