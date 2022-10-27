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
import { checkAndSend } from "../../../store/actions/thunk/ArticlesActions.thunk";
import { actualizeManifesto } from "../../../store/actions/thunk/ManifestoActions.thunk";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import { getTitleAndSplit } from "../../../helper/homeNavigationHelper";
import {
  ColorFieldBox,
  ImageFieldBox,
  VisualiseColorStyle,
} from "../../../styles/styledComponents/global/Field.sc";

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
  const [homeImgTitle, setHomeImgTitle] = useState(undefined);
  const [transparentImgTitle, setTransparentImgTitle] = useState(undefined);
  const [isTransparentImage, setIsTransparentImage] = useState(false);
  const [socialImgTitle, setSocialImgTitle] = useState(undefined);
  const [isSocialImage, setIsSocialImage] = useState(false);
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
    shortDescription,
    backgroundColor,
    transparentImgUuid,
    socialImgUuid,
    socialImgUrls,
    transparentImgUrls,
    transparentImgAlt,
    socialImgAlt,
  } = homeNavigationState;

  const { manifestoId, isManifesto } = manifestoState;

  function onClickOutside() {
    setIsOpen(false);
    if (homeNavIsChanged) {
      if (!isManifesto) {
        dispatch(checkAndSend("update", articleId));
      }

      if (isManifesto && manifestoId) {
        dispatch(actualizeManifesto(manifestoId));
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
    getTitleAndSplit(
      homeImgUuid,
      setHomeImgTitle,
      setIsHomeImage,
      navImgUuid,
      setNavImgTitle,
      setIsNavImage,
      transparentImgUuid,
      setTransparentImgTitle,
      setIsTransparentImage,
      socialImgUuid,
      setSocialImgTitle,
      setIsSocialImage
    );
  }, [
    homeNavIsChanged,
    homeImgUuid,
    navImgUuid,
    socialImgUuid,
    transparentImgUuid,
  ]);

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
            <Field
              placeholder="Title (home)"
              maxlength="80"
              infos="Maximum 80 characters"
              name="title"
              section="homeNavigation"
              edit={homeTitle || undefined}
            />

            <Field
              placeholder="Short Description"
              maxlength="80"
              infos="Maximum 120 characters"
              name="shortDescription"
              section="homeNavigation"
              edit={shortDescription || undefined}
            />

            <>
              <Field
                placeholder="Reading Time"
                name="readTime"
                section="homeNavigation"
                infos="Average reading time, min 1 minute - max 15 minutes"
                type="number"
                maxlength="2"
                edit={readingTime?.toString() || undefined}
              />

              {/* HOME IMAGE FIELD & ALT */}
              <ImageFieldBox>
                <Field
                  placeholder="Home Image"
                  name="homeImage"
                  section="HomeNavigation"
                  fieldType="uploader"
                  edit={homeImgTitle || undefined}
                  infos="Image size: 320x568px - 500ko maximum"
                />

                {homeImgUrls && isHomeImage && (
                  <Thumbnail src={homeImgUrls.thumbnail.url} />
                )}
              </ImageFieldBox>

              <Field
                placeholder="Alternative text for home image"
                name="altHomeImage"
                infos="Maximum 120 characters"
                maxlength="120"
                section="homeNavigation"
                edit={homeImgAlt || undefined}
              />

              {/* TRANSPARENT IMAGE FIELD & ALT */}
              <ImageFieldBox>
                <Field
                  placeholder="Transparent Image"
                  name="transparentImage"
                  section="HomeNavigation"
                  fieldType="uploader"
                  edit={transparentImgTitle || undefined}
                  infos="Image size: 320x568px - 500ko maximum"
                />

                {transparentImgUrls && isTransparentImage && (
                  <Thumbnail src={transparentImgUrls.thumbnail.url} />
                )}
              </ImageFieldBox>

              <Field
                placeholder="Alternative text for transparent image"
                name="altTransparentImg"
                infos="Maximum 120 characters"
                maxlength="120"
                section="homeNavigation"
                edit={transparentImgAlt || undefined}
              />

              {/* BACKGROUND COLOR FIELD */}
              <ColorFieldBox>
                <Field
                  placeholder="Background Color"
                  name="backgroundColor"
                  section="HomeNavigation"
                  fieldType="select"
                  edit={backgroundColor || undefined}
                />
                {backgroundColor && (
                  <>
                    <VisualiseColorStyle variant={backgroundColor} />
                  </>
                )}
              </ColorFieldBox>

              {/* SOCIAL NETWORK IMAGE FIELD & ALT */}
              <ImageFieldBox>
                <Field
                  placeholder="Social Network Image"
                  name="SocialImg"
                  section="HomeNavigation"
                  fieldType="uploader"
                  edit={socialImgTitle || undefined}
                  infos="Image size: 320x568px - 500ko maximum"
                />

                {socialImgUrls && isSocialImage && (
                  <Thumbnail src={socialImgUrls.thumbnail.url} />
                )}
              </ImageFieldBox>

              <Field
                placeholder="Alternative text for Social Network Image"
                name="altSocialImg"
                infos="Maximum 120 characters"
                maxlength="120"
                section="homeNavigation"
                edit={socialImgAlt || undefined}
              />

              {/* NAVIGATION IMAGE FIELD & ALT */}
              <ImageFieldBox>
                <Field
                  placeholder="Navigation Image"
                  name="navImage"
                  section="HomeNavigation"
                  fieldType="uploader"
                  edit={navImgTitle || undefined}
                  infos="Image size: 56x56px - 500ko maximum"
                />

                {navImgUrls && isNavImage && (
                  <RoundThumbnail src={navImgUrls.thumbnail.url} />
                )}
              </ImageFieldBox>

              <Field
                placeholder="Alternative text for navigation image"
                name="altNavImage"
                infos="Maximum 120 characters"
                maxlength="120"
                section="homeNavigation"
                edit={navImgAlt || undefined}
              />
            </>
          </>
        )}
      </SectionBox>
    </>
  );
};

export default HomeNavigation;
