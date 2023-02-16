import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TitleIcon,
  FormTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import Field from "../../Editor/Field";
import {
  CollapsedText,
  Gradient,
  SectionBox,
  SectionTitle,
  Thumbnail,
} from "../../../styles/styledComponents/editor/Sections.sc";
import { pageCheckAndSend } from "../../../store/actions/thunk/PageActions.thunk";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import { getTitleAndSplit } from "../../../helper/pageHeaderHelper";
import { ImageFieldBox } from "../../../styles/styledComponents/global/Field.sc";
import SwitchButton from "../../Tools/Switch";
import {
  setHeaderCTAOpenNewTab,
  switchOnOffPageHeader,
} from "../../../store/actions/pageHeaderActions";

const PageHeader = () => {
  const pageHeaderState = useSelector(
    ({ pageHeaderReducer }) => pageHeaderReducer
  );

  const dispatch = useDispatch();
  const PageHeaderRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { pageId } = useParams();
  const [isHeaderImage, setIsHeaderImage] = useState(false);
  const [headerImgTitle, setHeaderImgTitle] = useState(undefined);
  const [isHeaderLargeImage, setIsHeaderLargeImage] = useState(false);
  const [headerLargeImgTitle, setHeaderLargeImgTitle] = useState(undefined);

  const {
    headerTitle,
    headerSubtitle,
    headerImgUuid,
    headerImgAlt,
    headerImgUrls,
    imageDescription,
    headerLargeImgUuid,
    headerLargeImgAlt,
    headerLargeImgUrls,
    headerURL,
    headerCTALabel,
    headerCTAOpenNewTab,
    pageHeaderIsChanged,
    isPageHeaderActive,
  } = pageHeaderState;

  function onClickOutside() {
    setIsOpen(false);
    if (pageHeaderIsChanged) {
      dispatch(pageCheckAndSend("update", pageId));
    }
  }
  useClickOutside(PageHeaderRef, onClickOutside);

  useEffect(() => {
    if (pageId) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [pageId]);

  useEffect(() => {
    getTitleAndSplit(
      headerImgUuid,
      setHeaderImgTitle,
      setIsHeaderImage,
      headerLargeImgUuid,
      setHeaderLargeImgTitle,
      setIsHeaderLargeImage
    );
  }, [pageHeaderIsChanged, headerImgUuid, headerLargeImgUuid]);

  return (
    <>
      <SectionBox
        onClick={() => setIsOpen(true)}
        ref={PageHeaderRef}
        isOpen={isOpen}
      >
        {!isOpen && <Gradient />}
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>PAGE HEADER</FormTitle>
        </SectionTitle>
        {!isOpen && (
          <>
            <CollapsedText>{headerTitle || "section vide"}</CollapsedText>
            <CollapsedText>{headerSubtitle || "section vide"}</CollapsedText>
            <CollapsedText>
              {headerImgTitle ? `Header Image Title : ${headerImgTitle}` : ""}
            </CollapsedText>
          </>
        )}

        {isOpen && (
          <>
            <SwitchButton
              action={() =>
                dispatch(switchOnOffPageHeader(!isPageHeaderActive))}
              isChecked={isPageHeaderActive}
              displayedText="Activate Header Section?"
              componentId="activate-page-header-section"
            />

            {isPageHeaderActive && (
              <>
                <Field
                  placeholder="Title"
                  maxlength="80"
                  infos="Maximum 80 characters"
                  name="title"
                  displayName="title"
                  section="pageHeader"
                  edit={headerTitle || undefined}
                />

                <Field
                  placeholder="Subtitle"
                  maxlength="120"
                  infos="Maximum 120 characters"
                  name="subtitle"
                  displayName="Subtitle"
                  section="pageHeader"
                  edit={headerSubtitle || undefined}
                />

                {/* Header IMAGE FIELD & ALT */}
                <ImageFieldBox>
                  <Field
                    placeholder="Header Image"
                    name="headerImage"
                    displayName="Header Image"
                    section="PageHeader"
                    fieldType="uploader"
                    edit={headerImgTitle || undefined}
                    infos="Image size: 320x568px - 500ko maximum"
                  />

                  {headerImgUrls && isHeaderImage && (
                    <Thumbnail src={headerImgUrls.thumbnail.url} />
                  )}
                </ImageFieldBox>

                <Field
                  placeholder="Alternative text for header image"
                  name="altHeaderImage"
                  displayName="Alt Header Image"
                  infos="Maximum 120 characters"
                  maxlength="120"
                  section="pageHeader"
                  edit={headerImgAlt || undefined}
                />

                {/* LargeImage IMAGE FIELD & ALT */}
                <ImageFieldBox>
                  <Field
                    placeholder="Large Image"
                    name="headerLargeImage"
                    displayName="HeaderLarge Image"
                    section="PageHeader"
                    fieldType="uploader"
                    edit={headerLargeImgTitle || undefined}
                    infos="Image size: 320x568px - 500ko maximum"
                  />

                  {headerLargeImgUrls && isHeaderLargeImage && (
                    <Thumbnail src={headerLargeImgUrls.thumbnail.url} />
                  )}
                </ImageFieldBox>
                {isHeaderLargeImage && (
                  <>
                    <Field
                      placeholder="Alternative text for header large image"
                      name="altHeaderLargeImg"
                      displayName="Alt Header Large Image"
                      infos="Maximum 120 characters"
                      maxlength="120"
                      section="pageHeader"
                      edit={headerLargeImgAlt || undefined}
                    />
                  </>
                )}

                <Field
                  placeholder="Image Description for Accessibility"
                  maxlength="120"
                  infos="Maximum 120 characters"
                  name="imageDescription"
                  displayName="image Description"
                  section="pageHeader"
                  edit={imageDescription || undefined}
                />

                <Field
                  placeholder="URL"
                  name="url"
                  displayName="CTA URL"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="pageHeader"
                  edit={headerURL || undefined}
                />

                <SwitchButton
                  action={() =>
                    dispatch(setHeaderCTAOpenNewTab(!headerCTAOpenNewTab))
                  }
                  isChecked={headerCTAOpenNewTab}
                  displayedText="Open URL in a new TAB?"
                  componentId="page-header-cta-open-new-tab"
                />

                <Field
                  placeholder="CTA label"
                  name="label"
                  displayName="CTA Label"
                  infos="Maximum 80 characters"
                  maxlength="80"
                  section="pageHeader"
                  edit={headerCTALabel || undefined}
                />
              </>
            )}
          </>
        )}
      </SectionBox>
    </>
  );
};

export default PageHeader;
