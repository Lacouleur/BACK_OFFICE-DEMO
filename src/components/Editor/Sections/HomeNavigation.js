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
  const homeNavigationState = useSelector(
    ({ homeNavigationReducer }) => homeNavigationReducer
  );
  const dispatch = useDispatch();
  const HomeNavigationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { articleId } = useParams();
  const [isHomeImage, setIsHomeImage] = useState(false);
  const [isNavImage, setIsNavImage] = useState(false);
  const [isNavigationImage, setIsNavigationImage] = useState(true);

  const {
    homeTitle,
    readingTime,
    homeImgUuid,
    homeImgAlt,
    navImgUuid,
    navImgAlt,
    homeNavIsChanged,
  } = homeNavigationState;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    articleId ? setIsOpen(false) : setIsOpen(true);
  }, [articleId]);

  function onClickOutside() {
    setIsOpen(false);

    if (homeNavIsChanged) {
      dispatch(checkAndSend("update", articleId));
    }
  }
  useClickOutside(HomeNavigationRef, onClickOutside);

  useEffect(() => {
    if (homeImgUuid) {
      /*  setImageTitle(imageUuid.split("/")[1]); */
      setIsHomeImage(true);
    }
    if (navImgUuid) {
      /*    setImageTitle(imageUuid.split("/")[1]); */
      setIsNavImage(true);
    }
  }, [homeNavIsChanged, homeImgUuid, navImgUuid]);

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
            <CollapsedText>Le titre collapsé</CollapsedText>
            <CollapsedText>les infos collapsés</CollapsedText>
          </>
        )}
        {isOpen && (
          <>
            <Field
              placeholder="Title (home)"
              maxlength="80"
              infos="Maximum 80 characters"
              name="title"
              section="homeNavigation"
              /*               edit={title} */
            />

            <Field
              placeholder="Reading Time"
              name="readTime"
              fieldType="select"
              section="HomeNavigation"
              edit={readingTime || undefined}
            />

            <Field
              placeholder="Home Image"
              name="homeImage"
              section="homeModule"
              fieldType="uploader"
              /* edit={homeImgAlt || undefined} */
              infos="Image size: 320x568px - 500ko maximum"
            />

            {isHomeImage && (
              <>
                <Field
                  placeholder="Alternative text for home image"
                  name="altHomeImage"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="homeNavigation"
                  edit={homeImgAlt || undefined}
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

            {isNavImage && (
              <>
                <Field
                  placeholder="Alternative text for home image"
                  name="altNavImage"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="homeNavigation"
                  edit={navImgAlt || undefined}
                />
              </>
            )}
          </>
        )}
      </SectionBox>
    </>
  );
};

export default HomeNavigation;
