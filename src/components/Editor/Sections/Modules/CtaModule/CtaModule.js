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

const CtaModule = ({
  uuid,
  order,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  url,
  introduction,
  label,
  description,
  openNewTab,
}) => {
  const dispatch = useDispatch();
  const ctaModuleRef = useRef(null);
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const [editorState, setEditorState] = useState();

  const { articleId } = mainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    setCtaModuleContent(
      uuid,
      editorState,
      description,
      setEditorState,
      dispatch
    );
  }, []);

  useEffect(() => {
    setCtaModuleContent(
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
          articleId={articleId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox onClick={() => setIsOpen(true)} isOpen={isOpen}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              dispatch(showCloseModal({ value: true, id: uuid }));
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. CTA`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        <Field
          placeholder="Introduction"
          name="intro"
          section="cta"
          edit={introduction || ""}
          maxlength="90"
          infos="Maximum 90 characters"
          moduleId={uuid}
        />

        <Field
          placeholder="CTA Text"
          name="label"
          infos="Maximum 35 characters"
          maxlength="35"
          section="cta"
          moduleId={uuid}
          edit={label || ""}
        />

        <FieldAndSwitchContainer>
          <Field
            placeholder="CTA Link"
            name="url"
            section="cta"
            moduleId={uuid}
            edit={url || ""}
          />
          <SwitchBox
            htmlFor={`switch-${uuid}`}
            onChange={() => {
              dispatch(setCtaIsNewtab({ id: uuid, value: !openNewTab }));
            }}
          >
            <p>Open in new window</p>
            <Switch
              className="Switch"
              id={`switch-${uuid}`}
              type="checkbox"
              checked={openNewTab}
              readOnly
            />
            <SwitchLabel className="SwitchLabel" htmlFor={`switch-${uuid}`} />
          </SwitchBox>
        </FieldAndSwitchContainer>

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

CtaModule.defaultProps = {
  introduction: null,
  label: null,
  description: null,
};

CtaModule.propTypes = {
  uuid: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  introduction: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  openNewTab: PropTypes.bool.isRequired,
};
export default CtaModule;
