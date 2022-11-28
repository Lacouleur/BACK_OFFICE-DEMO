/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
  Thumbnail,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  ModuleContainer,
  Delete,
  ActionIcons,
  FieldAndSwitchContainer,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  closeModule,
  setCtaIsNewtab,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import {
  setTextHTMLContent,
  watchNewModules,
} from "../../../../../helper/modulesHelper";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import TextEditor from "../TextEditor";
import HeaderSectionPage from "../HeaderSectionPage";
import SwitchButton from "../../../../Tools/Switch";
import { ImageFieldBox } from "../../../../../styles/styledComponents/global/Field.sc";

const CtaModule = ({
  uuid,
  order,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  link,
  introduction,
  label,
  description,
  openNewTab,
  display,
  title,
  subtitle,
  url,
  openNewTabHeader,
  isPage,
  imageUuid,
  altImage,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  const ctaModuleRef = useRef(null);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );
  const [editorState, setEditorState] = useState();
  const [imageTitle, setImageTitle] = useState(undefined);
  const [isImage, setIsImage] = useState(false);

  const pageId = PageMainInformationState?.pageId || undefined;
  const articleId = MainInformationState?.articleId || undefined;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    setTextHTMLContent(
      "ctaModule",
      uuid,
      editorState,
      description,
      setEditorState,
      dispatch
    );
  }, []);

  useEffect(() => {
    setTextHTMLContent(
      "ctaModule",
      uuid,
      editorState,
      description,
      setEditorState,
      dispatch
    );
  }, [editorState]);

  useEffect(() => {
    watchNewModules(isNewModule, ctaModuleRef, setIsOpen);
  }, [isNewModule]);

  useEffect(() => {
    if (isOpenCloseModal) {
      setIsOpen(true);
    }
  }, [isOpenCloseModal]);

  useEffect(() => {
    if (imageUuid) {
      setImageTitle(imageUuid.split("/")[1]);
      setIsImage(true);
    }
  }, [imageUuid]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isChanged && isNewModule) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }

  useClickOutside(ctaModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={ctaModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={ctaModuleRef}
          articleId={articleId || pageId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox onClick={() => setIsOpen(true)} isOpen={isOpen}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (isNewModule) {
                dispatch(closeModule(uuid));
              }
              if (!isNewModule) {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. CTA`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        {isPage && (
          <>
            {/* HEADER FIELDS - TITLE-SUBTITLE-URL */}
            <HeaderSectionPage
              uuid={uuid}
              title={title}
              subtitle={subtitle}
              url={url}
              openNewTabHeader={openNewTabHeader}
            />
          </>
        )}

        <Field
          placeholder="Introduction"
          name="intro"
          displayName="Introduction"
          section="cta"
          edit={introduction || ""}
          maxlength="90"
          infos="Maximum 90 characters"
          moduleId={uuid}
        />

        <Field
          placeholder="CTA Text"
          name="label"
          displayName="Label"
          infos="Maximum 80 characters"
          maxlength="80"
          section="cta"
          moduleId={uuid}
          edit={label || ""}
        />

        {!isPage && (
          <>
            <Field
              placeholder="Cta Type"
              name="ctaType"
              displayName="Cta Type"
              fieldType="select"
              section="cta"
              moduleId={uuid}
              edit={display || null}
            />

            <FieldAndSwitchContainer>
              <Field
                placeholder="CTA Link"
                name="url"
                displayName="URL"
                section="cta"
                moduleId={uuid}
                edit={url || ""}
              />

              <SwitchButton
                action={() =>
                  dispatch(
                    setCtaIsNewtab({
                      id: uuid,
                      value: !openNewTab,
                      type: "content",
                    })
                  )}
                isChecked={openNewTab}
                componentId={`cta-switch-${uuid}`}
                displayedText="Open in new window"
              />
            </FieldAndSwitchContainer>
          </>
        )}

        {isPage && (
          <FieldAndSwitchContainer>
            <Field
              placeholder="CTA Link"
              name="link"
              displayName="Cta Link"
              section="cta"
              moduleId={uuid}
              edit={link || ""}
            />

            <SwitchButton
              action={() =>
                dispatch(
                  setCtaIsNewtab({
                    id: uuid,
                    value: !openNewTab,
                    type: "page",
                  })
                )
              }
              isChecked={openNewTab}
              componentId={`cta-switch-${uuid}`}
              displayedText="Open in new window"
            />
          </FieldAndSwitchContainer>
        )}

        {editorState && (
          <>
            <TextEditor
              editorState={editorState}
              setEditorState={setEditorState}
              isOpen={isOpen}
            />
          </>
        )}
        {isPage && (
          <>
            <ImageFieldBox>
              <Field
                placeholder="Navigation Image"
                name="ctaImage"
                displayName="Cta Image"
                section="cta"
                fieldType="uploader"
                edit={imageTitle}
                infos="Image size: 320x456 / 320x320 / 320x180 - 500ko maximum"
                moduleId={uuid}
              />

              {thumbnail && isOpen && imageTitle && (
                <Thumbnail ctaPageImage src={thumbnail} />
              )}
            </ImageFieldBox>

            {isImage && (
              <>
                <Field
                  placeholder="Alternative text for the image"
                  name="altImage"
                  displayName="Alt Cta Image"
                  section="cta"
                  infos="Maximum 120 characters"
                  maxlength="120"
                  moduleId={uuid}
                  edit={altImage}
                />
              </>
            )}
          </>
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

CtaModule.defaultProps = {
  introduction: null,
  label: null,
  description: null,
  title: "",
  subtitle: "",
  link: undefined,
  openNewTabHeader: false,
  isPage: undefined,
  url: undefined,
  openNewTab: false,
  imageUuid: undefined,
  altImage: undefined,
  thumbnail: undefined,
  display: undefined,
};

CtaModule.propTypes = {
  uuid: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  url: PropTypes.string,
  introduction: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  openNewTab: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
  isPage: PropTypes.bool,
  imageUuid: PropTypes.string,
  altImage: PropTypes.string,
  thumbnail: PropTypes.string,
  display: PropTypes.string,
};
export default CtaModule;
