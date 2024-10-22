import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import infoIcon from "../../../styles/assets/icons/main-info.svg";
import Field from "../Field";
import {
  CollapsedText,
  Gradient,
  SectionBox,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import {
  saveManifesto,
  actualizeManifesto,
} from "../../../store/actions/thunk/ManifestoActions.thunk";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import {
  ColorFieldBox,
  VisualiseColorStyle,
  PreviewColorStyle,
} from "../../../styles/styledComponents/global/Field.sc";
import {
  checkContentAndSend,
  checkIfManifestoAndSetup,
  slugMessage,
} from "../../../helper/mainInformationHelper";
import { fetchUsers } from "../../../store/actions/thunk/ArticlesActions.thunk";

const MainInformation = () => {
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );
  const dispatch = useDispatch();
  const mainInformationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { articleId } = useParams();

  const {
    title,
    slug,
    lang,
    colorStyle,
    caption,
    category,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    authors,
    tags,
    users,
    status,
  } = mainInformationState;

  const { isManifesto, manifestoId } = manifestoState;

  useEffect(() => {
    if (!users || users?.length === 0) {
      dispatch(fetchUsers());
    }
    checkIfManifestoAndSetup(isManifesto, manifestoId, articleId, setIsOpen);
  }, [articleId, manifestoId]);

  function onClickOutside() {
    checkContentAndSend(
      dispatch,
      mainInformationState,
      manifestoState,
      setIsOpen,
      saveManifesto,
      actualizeManifesto,
      articleId
    );
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
          <FormTitle>MAIN INFORMATION</FormTitle>
        </SectionTitle>
        {!isOpen && !isManifesto && (
          <>
            <CollapsedText>{title}</CollapsedText>
            <PreviewColorStyle color={colorStyle || "1"} />
            <CollapsedText>{slug}</CollapsedText>
            <CollapsedText>{lang}</CollapsedText>
          </>
        )}
        {!isOpen && isManifesto && (
          <>
            <CollapsedText>{title}</CollapsedText>
          </>
        )}
        {isOpen && (
          <>
            {!isManifesto && <FieldTitle>Title and slug URL</FieldTitle>}
            <Field
              placeholder="Title (internal)"
              maxlength="40"
              infos={
                titleError ? "Content need a title." : "Maximum 40 characters"
              }
              name="title"
              displayName="Title"
              section="mainInformation"
              edit={title}
              error={titleError}
            />
            {!isManifesto && (
              <>
                <Field
                  placeholder="slug URL"
                  infos={
                    slugError
                      ? "Content need a slug."
                      : `${slugMessage(mainInformationState)}`
                  }
                  name="slug"
                  displayName="Slug"
                  section="mainInformation"
                  edit={slug}
                  error={regexSlugError || postingError || slugError}
                  isDisabled={!(status === "DRAFT" || !status)}
                />

                <Field
                  placeholder="Category"
                  name="category"
                  displayName="Category"
                  fieldType="select"
                  section="mainInformation"
                  edit={category || null}
                />
                <Field
                  placeholder="Language"
                  name="lang"
                  displayName="Language"
                  fieldType="select"
                  section="mainInformation"
                  edit={lang || "fr"}
                  isClearable={false}
                  isDisabled={!(status === "DRAFT" || !status)}
                />
              </>
            )}

            <ColorFieldBox>
              <Field
                placeholder="Color Theme"
                name="colorStyle"
                displayName="Color Style"
                fieldType="select"
                section="mainInformation"
                edit={colorStyle?.toString() || "1"}
                isClearable={false}
              />

              <VisualiseColorStyle color={colorStyle?.toString() || "1"} />
            </ColorFieldBox>

            {!isManifesto && (
              <>
                <Field
                  placeholder="Partner Caption"
                  name="caption"
                  displayName="Caption"
                  section="mainInformation"
                  edit={caption || ""}
                  infos="Maximum 100 characters"
                  maxlength="100"
                />
                {authors && (
                  <Field
                    placeholder="Authors"
                    name="authors"
                    displayName="Authors"
                    section="mainInformation"
                    edit={authors || ""}
                    fieldType="multi-value"
                  />
                )}
                {tags && (
                  <Field
                    placeholder="Tags"
                    name="tags"
                    displayName="Tags"
                    section="mainInformation"
                    edit={tags || ""}
                    fieldType="multi-value"
                    lang={lang}
                  />
                )}
              </>
            )}
          </>
        )}
      </SectionBox>
    </>
  );
};

export default MainInformation;
