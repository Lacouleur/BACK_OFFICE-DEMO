import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TitleIcon,
  FormTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../Field";
import {
  CollapsedText,
  Gradient,
  RoundThumbnail,
  SectionBox,
  SectionTitle,
  Thumbnail,
} from "../../../styles/styledComponents/editor/Sections.sc";
import {
  actulalizeManifesto,
  checkAndSend,
} from "../../../store/actions/clientActions";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";

const HomeNavigation = () => {
  const homeNavigationState = useSelector(
    ({ homeNavigationReducer }) => homeNavigationReducer
  );

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const dispatch = useDispatch();
  const HomeNavigationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { articleId } = useParams();
  const [isHomeImage, setIsHomeImage] = useState(false);
  const [isNavImage, setIsNavImage] = useState(false);
  /*   const [isNavigationImage, setIsNavigationImage] = useState(true); */
  const [homeImgTitle, setHomeImgTitle] = useState(undefined);
  const [navImgTitle, setNavImgTitle] = useState(undefined);

  const {
    homeTitle,
    readingTime,
    homeImgUuid,
    homeImgAlt,
    navImgUuid,
    navImgAlt,
    homeNavIsChanged,
    homeImgUrls,
    navImgUrls,
  } = homeNavigationState;

  const { manifestoId, isManifesto } = manifestoState;

  function getTitleAndSplit() {
    if (homeImgUuid) {
      setHomeImgTitle(homeImgUuid.split("/")[1]);
      setIsHomeImage(true);
    }

    if (navImgUuid) {
      setNavImgTitle(navImgUuid.split("/")[1]);
      setIsNavImage(true);
    }
  }

  function onClickOutside() {
    setIsOpen(false);
    if (homeNavIsChanged) {
      if (!isManifesto) {
        dispatch(checkAndSend("update", articleId));
      }

      if (isManifesto && manifestoId) {
        dispatch(actulalizeManifesto(manifestoId));
      }
    }
  }
  useClickOutside(HomeNavigationRef, onClickOutside);

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

  useEffect(() => {
    getTitleAndSplit();
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
            {navImgUrls && isNavImage && (
              <RoundThumbnail preview src={navImgUrls.thumbnail.url} />
            )}
            <CollapsedText>{homeTitle || "section vide"}</CollapsedText>
            <CollapsedText>
              {readingTime ? `reading time : ${readingTime}min` : ""}
            </CollapsedText>
            <CollapsedText>
              {homeImgTitle ? `Home image Title : ${homeImgTitle}` : ""}
            </CollapsedText>
            <CollapsedText>
              {navImgTitle ? `Nav image Title : ${navImgTitle}` : ""}
            </CollapsedText>
          </>
        )}

        {isOpen && (
          <>
            {homeImgUrls && isHomeImage && (
              <Thumbnail homeImage src={homeImgUrls.thumbnail.url} />
            )}

            {navImgUrls && isNavImage && (
              <RoundThumbnail src={navImgUrls.thumbnail.url} />
            )}

            <Field
              placeholder="Title (home)"
              maxlength="80"
              infos="Maximum 80 characters"
              name="title"
              section="homeNavigation"
              edit={homeTitle || undefined}
            />
            {homeTitle && (
              <>
                <Field
                  placeholder="Reading Time"
                  name="readTime"
                  infos="Average reading time."
                  fieldType="select"
                  section="HomeNavigation"
                  edit={readingTime?.toString() || undefined}
                />

                <Field
                  placeholder="Home Image"
                  name="homeImage"
                  section="homeModule"
                  fieldType="uploader"
                  edit={homeImgTitle || undefined}
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
                  name="navImage"
                  section="homeModule"
                  fieldType="uploader"
                  edit={navImgTitle || undefined}
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
          </>
        )}
      </SectionBox>
    </>
  );
};

export default HomeNavigation;
