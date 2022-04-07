/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  ModuleContainer,
  Delete,
  ActionIcons,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import { showCloseModal } from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import HeaderSectionPage from "../HeaderSectionPage";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { fetchTags } from "../../../../../store/actions/thunk/ArticlesActions.thunk";

const SliderModule = ({
  isPage,
  title,
  subtitle,
  url,
  openNewTabHeader,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  order,
  categories,
  tags,
  sliderType,
}) => {
  const dispatch = useDispatch();
  const sliderModuleRef = useRef(null);
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { pageId, lang, tagsList } = PageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (!tagsList) {
      dispatch(fetchTags(lang));
    }
  }, []);

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

  useClickOutside(sliderModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={sliderModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={sliderModuleRef}
          articleId={pageId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (status !== "PUBLISHED" && uuid) {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. slider`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        {isPage && (
          <HeaderSectionPage
            uuid={uuid}
            title={title}
            subtitle={subtitle}
            url={url}
            openNewTabHeader={openNewTabHeader}
          />
        )}

        <Field
          placeholder="SliderType"
          name="sliderType"
          section="slider"
          fieldType="select"
          moduleId={uuid}
          edit={sliderType || "secondary"}
          infos="Primary is only for Main Page"
        />

        <Field
          placeholder="Category to call"
          name="categories"
          section="slider"
          fieldType="multi-value"
          moduleId={uuid}
          edit={categories || null}
        />
        <Field
          placeholder="Tags to call"
          name="tags"
          section="slider"
          fieldType="multi-value"
          moduleId={uuid}
          edit={tags || ""}
          lang={lang}
        />
      </SectionBox>
    </ModuleContainer>
  );
};

SliderModule.defaultProps = {
  title: "",
  subtitle: "",
  url: "",
  openNewTabHeader: true,
  isPage: undefined,
  categories: undefined,
  tags: undefined,
};

SliderModule.propTypes = {
  isPage: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  sliderType: PropTypes.string.isRequired,
};
export default SliderModule;
