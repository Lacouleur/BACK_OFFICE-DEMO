import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import infoIcon from "../../../styles/assets/icons/main-info.svg";
import Field from "../../Editor/Field";
import {
  CollapsedText,
  Gradient,
  SectionBox,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import {
  checkPageAndSend,
  slugMessage,
} from "../../../helper/mainInformationHelper";

const PageMainInformation = () => {
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );
  const dispatch = useDispatch();
  const mainInformationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { pageId } = useParams();

  const {
    title,
    slug,
    lang,
    regexSlugError,
    slugError,
    titleError,
    postingError,
  } = PageMainInformationState;

  useEffect(() => {
    if (pageId) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [pageId]);

  function onClickOutside() {
    console.log("Click outside");
    checkPageAndSend(dispatch, PageMainInformationState, setIsOpen, pageId);
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
          <TitleIcon src={infoIcon} />
          <FormTitle>PAGE MAIN INFORMATION</FormTitle>
        </SectionTitle>
        {!isOpen && (
          <>
            <CollapsedText>{title}</CollapsedText>
            <CollapsedText>{slug}</CollapsedText>
            <CollapsedText>{lang}</CollapsedText>
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
              section="pageMainInformation"
              edit={title}
              error={titleError}
            />

            <Field
              placeholder="slug URL"
              infos={
                slugError
                  ? "Content need a slug."
                  : `${slugMessage(PageMainInformationState)}`
              }
              name="slug"
              section="pageMainInformation"
              edit={slug}
              error={regexSlugError || postingError || slugError}
            />

            <Field
              placeholder="Language"
              name="lang"
              fieldType="select"
              section="pageMainInformation"
              edit={lang || "fr"}
            />
          </>
        )}
      </SectionBox>
    </>
  );
};

export default PageMainInformation;
