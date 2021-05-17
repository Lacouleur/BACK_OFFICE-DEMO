/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const HomeNavigation = () => {
  const HomeNavigationState = useSelector(
    ({ HomeNavigationReducer }) => HomeNavigationReducer
  );
  const dispatch = useDispatch();
  const HomeNavigationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { articleId } = useParams();
  const [isHomeImage, setIsHomeImage] = useState(true);
  const [isNavigationImage, setIsNavigationImage] = useState(true);

  const {
    title,
    slug,
    lang,
    category,
    regexSlugError,
    slugError,
    titleError,
    postingError,
    isChanged,
  } = HomeNavigationState;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    articleId ? setIsOpen(false) : setIsOpen(true);
  }, [articleId]);

  function onClickOutside() {
    if (title && slug && !slugError && !regexSlugError && !postingError) {
      setIsOpen(false);
    }

    if (isChanged) {
      dispatch(checkAndSend("update", articleId));
    } else if (isChanged && !articleId) {
      dispatch(checkAndSend());
    }
  }
  useClickOutside(HomeNavigationRef, onClickOutside);

  return (
    <>
      <SectionBox
        onClick={() => setIsOpen(true)}
        ref={HomeNavigationRef}
        isOpen={isOpen}
      >
        {!isOpen && <Gradient />}
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>HOME NAVIGATION</FormTitle>
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
              placeholder="Title (home)"
              maxlength="80"
              infos={
                titleError ? "Content need a title." : "Maximum 40 characters"
              }
              name="title"
              section="homeNavigation"
              edit={title}
              error={titleError}
            />

            <Field
              placeholder="Reading Time"
              name="readTime"
              fieldType="select"
              section="HomeNavigation"
              /* edit={readTime || null} */
            />

            <Field
              placeholder="Home Image"
              name="homeImage"
              section="homeModule"
              fieldType="uploader"
              /* edit={imageTitle} */
              infos="Image size: 320x568px - 500ko maximum"
            />

            {isHomeImage && (
              <>
                <Field
                  placeholder="Alternative text for home image"
                  name="altImage"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="homeModule"
                  /*  edit={altImage} */
                />
              </>
            )}

            <Field
              placeholder="Navigation Image"
              name="navigationImage"
              section="homeModule"
              fieldType="uploader"
              /* edit={imageTitle} */
              infos="Image size: 56x56px - 500ko maximum"
            />

            {isNavigationImage && (
              <>
                <Field
                  placeholder="Alternative text for home image"
                  name="altImage"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="homeModule"
                />
              </>
            )}

            <Field
              placeholder="Color Content Style"
              name="color"
              fieldType="select"
              section="HomeNavigation"
              /* edit={lang || "fr"} */
            />
          </>
        )}
      </SectionBox>
    </>
  );
};

export default HomeNavigation;
