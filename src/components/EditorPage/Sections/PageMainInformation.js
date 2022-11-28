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
import {
  pageSetDisplayTitle,
  setIsPage,
} from "../../../store/actions/pageEditor/pageMainInformationsActions";
import { FieldAndSwitchContainer } from "../../../styles/styledComponents/editor/modules/Modules.sc";
import SwitchButton from "../../Tools/Switch";

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
    displayTitle,
    subtitle,
    status,
  } = PageMainInformationState;

  useEffect(() => {
    dispatch(setIsPage(true));
  }, []);

  useEffect(() => {
    if (pageId) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [pageId]);

  function onClickOutside() {
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
            <FieldAndSwitchContainer>
              <Field
                placeholder="Title (internal)"
                maxlength="80"
                infos={
                  titleError ? "Content need a title." : "Maximum 40 characters"
                }
                name="title"
                displayName="Title"
                section="pageMainInformation"
                edit={title}
                error={titleError}
              />
              <SwitchButton
                action={() => {
                  dispatch(pageSetDisplayTitle(!displayTitle));
                }}
                isChecked={displayTitle}
                componentId="mainInfo-switch-isSubtitle"
                displayedText="Display Title ?"
                tooltipMessage="If you choose to display title it will apear on front website. If checked you can also add a subtitle to be displayed"
              />
            </FieldAndSwitchContainer>

            {displayTitle && (
              <Field
                placeholder="subtitle"
                infos="Subtitle to display on this page"
                name="subtitle"
                displayName="Subtitle"
                section="pageMainInformation"
                edit={subtitle}
              />
            )}

            <Field
              placeholder="slug URL"
              infos={
                slugError
                  ? "Content need a slug."
                  : `${slugMessage(PageMainInformationState)}`
              }
              name="slug"
              displayName="Slug"
              section="pageMainInformation"
              edit={slug}
              error={regexSlugError || postingError || slugError}
              isDisabled={!(status === "DRAFT" || !status)}
            />

            <Field
              placeholder="Language"
              name="lang"
              displayName="Language"
              fieldType="select"
              section="pageMainInformation"
              edit={lang || "fr"}
              isClearable={false}
              isDisabled={!(status === "DRAFT" || !status)}
            />
          </>
        )}
      </SectionBox>
    </>
  );
};

export default PageMainInformation;
