/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import imageIcon from "../../../../../styles/assets/icons/image.svg";
import {
  TitleIcon,
  FormTitle,
} from "../../../../../styles/styledComponents/global/Titles.sc";
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
} from "../../../../../styles/styledComponents/editor/modules/TextModule.sc";
import { showCloseModal } from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/clientActions";
import Field from "../../../Field";

const ImageModule = ({
  uuid,
  imageUuid,
  isChanged,
  altImage,
  isOpenCloseModal,
  isNewModule,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  const imageModuleRef = useRef(null);
  const [imageTitle, setImageTitle] = useState(undefined);
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { articleId } = mainInformationState;
  const [isOpen, setIsOpen] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (imageUuid) {
      setImageTitle(imageUuid.split("/")[1]);
      setIsImage(true);
    }
  }, [isChanged, imageUuid]);

  useEffect(() => {
    if (isNewModule) {
      imageModuleRef.current.scrollIntoView({ behavior: "smooth" });
      setIsOpen(true);
    }
    dispatch(showCloseModal(false));
  }, [isNewModule]);

  function onClickOutside() {
    setIsOpen(false);
    if (isChanged && isNewModule) {
      dispatch(saveModule(uuid, "save"));
    }
    if (isChanged && !isNewModule) {
      dispatch(saveModule(uuid, "update"));
    }
  }
  useClickOutside(imageModuleRef, onClickOutside);

  return (
    <ModuleContainer onClick={() => setIsOpen(true)} ref={imageModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={imageModuleRef}
          articleId={articleId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen}>
        <Delete
          src={trashIcon}
          onClick={() => {
            dispatch(showCloseModal({ value: true, id: uuid }));
          }}
        />

        <SectionTitle>
          <TitleIcon src={imageIcon} />
          <FormTitle>Image module</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        {thumbnail && <Thumbnail src={thumbnail} />}

        <Field
          placeholder="Navigation Image"
          name="image"
          section="imageModule"
          fieldType="uploader"
          edit={imageTitle}
          infos="Image size: 320x456 / 320x320 / 320x180 - 500ko maximum"
          moduleId={uuid}
        />
        {isImage && (
          <>
            <Field
              placeholder="Alternative text for the image"
              name="altImage"
              infos="Maximum 80 characters"
              maxlength="80"
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
};
export default ImageModule;
