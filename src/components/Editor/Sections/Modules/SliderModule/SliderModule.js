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
  SwitchBox,
  Switch,
  SwitchLabel,
  FieldAndSwitchContainer,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  setCtaIsNewtab,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import {
  setCtaModuleContent,
  watchNewModules,
} from "../../../../../helper/modulesHelper";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import TextEditor from "../TextEditor";
import HeaderSectionPage from "../HeaderSectionPage";

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
}) => {
  const dispatch = useDispatch();
  const sliderModuleRef = useRef(null);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const { articleId } = MainInformationState;
  const [isOpen, setIsOpen] = useState(false);

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
          articleId={articleId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (status !== "PUBLISHED") {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. text`}</FormTitle>
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
          placeholder="Category to call"
          name="category"
          section="slider"
          fieldType="select"
          edit={category || null}
        />
        {/*    <Field
          placeholder="Tags to call"
          name="tags"
          section="slider"
          edit={tags || ""}
          fieldType="multi-value"
          lang={lang}
        /> */}
      </SectionBox>
    </ModuleContainer>
  );
};

SliderModule.defaultProps = {
  title: "",
  subtitle: "",
  url: "",
  openNewTabHeader: null,
  isPage: undefined,
};

SliderModule.propTypes = {
  isPage: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.string,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.string.isRequired,
  isOpenCloseModal: PropTypes.string.isRequired,
  isNewModule: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
};
export default SliderModule;
