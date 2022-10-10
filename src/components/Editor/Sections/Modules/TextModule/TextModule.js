/* eslint-disable no-restricted-globals */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";

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
import {
  closeModule,
  setCollapseTextModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import {
  setTextHTMLContent,
  watchNewModules,
} from "../../../../../helper/modulesHelper";
import TextEditor from "../TextEditor";
import HeaderSectionPage from "../HeaderSectionPage";
import SwitchButton from "../../../../Tools/Switch";

const TextModule = ({
  isPage,
  title,
  subtitle,
  url,
  openNewTabHeader,
  text,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  collapse,
  order,
}) => {
  const dispatch = useDispatch();
  const textModuleRef = useRef(null);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const PageMainInformationState = useSelector(
    ({ pagemainInformationReducer }) => pagemainInformationReducer
  );
  const pageId = PageMainInformationState?.pageId || undefined;
  const articleId = MainInformationState?.articleId || undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    watchNewModules(isNewModule, textModuleRef, setIsOpen);
  }, [isNewModule]);

  useEffect(() => {
    if (isOpenCloseModal) {
      setIsOpen(true);
    }
  }, [isOpenCloseModal]);

  useEffect(() => {
    setTextHTMLContent(
      "textModule",
      uuid,
      editorState,
      text,
      setEditorState,
      dispatch
    );
  }, [editorState]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isChanged || isNewModule) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }

  useClickOutside(textModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={textModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={textModuleRef}
          articleId={articleId || pageId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (isNewModule) {
                dispatch(closeModule(uuid));
              }
              if (status !== "PUBLISHED" && uuid) {
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
        <SwitchButton
          action={() => {
            dispatch(
              setCollapseTextModule({
                id: uuid,
                value: !collapse,
              })
            );
          }}
          isChecked={collapse}
          styleVariant="collapseText"
          componentId={`collapse-text-module-${uuid}`}
          displayedText="Foldable ?"
          tooltipMessage="If this option is enabled this bloc of text will be folded on front. Users will be able to unfold/fold it. Please note that the first line will be visible all the time, so it's better to use H1 or H2 on top of your text bloc."
        />
        {editorState && (
          <>
            <TextEditor
              editorState={editorState}
              setEditorState={setEditorState}
              isOpen={isOpen}
            />
          </>
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

TextModule.defaultProps = {
  title: "",
  subtitle: "",
  url: "",
  openNewTabHeader: null,
  isPage: undefined,
};

TextModule.propTypes = {
  isPage: PropTypes.bool,
  text: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
  collapse: PropTypes.bool.isRequired,
};
export default TextModule;
