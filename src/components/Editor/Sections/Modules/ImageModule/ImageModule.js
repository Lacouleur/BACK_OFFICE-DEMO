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
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  closeModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { ImageFieldBox } from "../../../../../styles/styledComponents/global/Field.sc";

const ImageModule = ({
  uuid,
  imageUuid,
  isChanged,
  altImage,
  isOpenCloseModal,
  isNewModule,
  thumbnail,
  order,
}) => {
  const dispatch = useDispatch();
  const imageModuleRef = useRef(null);
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { articleId } = mainInformationState;
  const [imageTitle, setImageTitle] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (imageUuid) {
      setImageTitle(imageUuid.split("/")[1]);
      setIsImage(true);
    }
  }, [isChanged, imageUuid]);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (isNewModule) {
      setIsOpen(true);
    }
  }, [isNewModule]);

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

  useClickOutside(imageModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={imageModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={imageModuleRef}
          articleId={articleId}
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
          <FormTitle>{`${order}. image`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        {/* IMAGE FIELD & ALT */}
        <ImageFieldBox>
          <Field
            placeholder="Navigation Image"
            name="image"
            displayName="Image"
            section="imageModule"
            fieldType="uploader"
            edit={imageTitle}
            infos="Image size: 320x456 / 320x320 / 320x180 - 500ko maximum"
            moduleId={uuid}
          />
          {thumbnail && imageUuid && <Thumbnail src={thumbnail} />}
        </ImageFieldBox>
        {isImage && (
          <>
            <Field
              placeholder="Alternative text for the image"
              name="altImage"
              displayName="Alt Image"
              infos="Maximum 120 characters"
              maxlength="120"
              section="imageModule"
              moduleId={uuid}
              edit={altImage}
            />
          </>
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

ImageModule.defaultProps = {
  altImage: null,
  imageUuid: undefined,
  thumbnail: undefined,
};

ImageModule.propTypes = {
  imageUuid: PropTypes.string,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  altImage: PropTypes.string,
  thumbnail: PropTypes.string,
  order: PropTypes.number.isRequired,
};
export default ImageModule;
