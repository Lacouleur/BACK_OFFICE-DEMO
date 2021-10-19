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
import { checkAndSend } from "../../../store/actions/thunk/ArticlesActions.thunk";
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
    isChanged,
  } = mainInformationState;

  const { isManifesto, manifestoId, manifestoLang } = manifestoState;

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
    if (!isManifesto) {
      if (articleId) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }

    if (isManifesto) {
      if (manifestoId) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  }, [articleId, manifestoId]);

  function onClickOutside() {
    if (isManifesto) {
      if (title && !titleError) {
        setIsOpen(false);
        if (isChanged && !manifestoId) {
          dispatch(saveManifesto(manifestoLang));
        } else if (isChanged && manifestoId) {
          dispatch(actualizeManifesto(manifestoId));
        }
      }
    }

    if (!isManifesto) {
      if (title && slug && !slugError && !regexSlugError && !postingError) {
        setIsOpen(false);
      }
      if (isChanged && articleId) {
        dispatch(checkAndSend("update", articleId));
      } else if (isChanged && !articleId) {
        dispatch(checkAndSend());
      }
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
          <TitleIcon src={infoIcon} />
          <FormTitle>MAIN INFORMATION</FormTitle>
        </SectionTitle>
        {!isOpen && !isManifesto && (
          <>
            <CollapsedText>{title}</CollapsedText>
            <PreviewColorStyle color={colorStyle || 1} />
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
              section="mainInformation"
              edit={title}
              error={titleError}
            />
            {!isManifesto && (
              <>
                <Field
                  placeholder="slug URL"
                  infos={
                    slugError ? "Content need a slug." : `${slugMessage()}`
                  }
                  name="slug"
                  section="mainInformation"
                  edit={slug}
                  error={regexSlugError || postingError || slugError}
                />
                <Field
                  placeholder="Category"
                  name="category"
                  fieldType="select"
                  section="mainInformation"
                  edit={category || null}
                />

                <Field
                  placeholder="Language"
                  name="lang"
                  fieldType="select"
                  section="mainInformation"
                  edit={lang || "fr"}
                />
              </>
            )}

            <ColorFieldBox>
              <Field
                placeholder="Color Theme"
                name="colorStyle"
                fieldType="select"
                section="mainInformation"
                edit={colorStyle?.toString() || "1"}
              />

              <VisualiseColorStyle color={colorStyle?.toString() || "1"} />
            </ColorFieldBox>

            {!isManifesto && (
              <Field
                placeholder="Partner Caption"
                name="caption"
                section="mainInformation"
                edit={caption || ""}
                infos="Maximum 100 characters"
                maxlength="100"
              />
            )}
          </>
        )}
      </SectionBox>
    </>
  );
};

export default MainInformation;
