/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import hilighterIcon from "../../../../../styles/assets/icons/highlighter.svg";
import {
  TitleIcon,
  FormTitle,
} from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import textIcon from "../../../../../styles/assets/icons/text-white.svg";
import {
  DraftJsWrapper,
  ModuleContainer,
  Delete,
} from "../../../../../styles/styledComponents/editor/modules/TextModule.sc";
import {
  setValueTextModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/clientActions";
import colors from "../../../../../styles/core/colors";
import HTMLconverter from "../../../../../helper/Editor/HTMLconverter";

const TextModule = ({
  text,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
}) => {
  const dispatch = useDispatch();
  const textModuleRef = useRef(null);
  const textEditorRef = useRef(null);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const { articleId } = MainInformationState;
  const [isOpen, setIsOpen] = useState(false);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (isNewModule) {
      textModuleRef.current.scrollIntoView({ behavior: "smooth" });
      textEditorRef?.current?.focus();
      setIsOpen(true);
    }
    dispatch(showCloseModal(false));
  }, [isNewModule]);

  useEffect(() => {
    function setContent() {
      if (text) {
        const converted = HTMLconverter(editorState, "from", text);
        const stateWithContent = EditorState.createWithContent(converted);
        return stateWithContent;
      }
      const stateEmpty = EditorState.createEmpty();
      return stateEmpty;
    }

    if (!editorState) {
      setEditorState(setContent());
    }

    if (editorState) {
      const newValue = HTMLconverter(editorState);
      if (newValue !== text) {
        dispatch(
          setValueTextModule({
            id: uuid,
            value: newValue,
          })
        );
      }
    }
  }, [editorState]);

  function onEditorStateChange(e) {
    setEditorState(e);
  }

  function onClickOutside() {
    setIsOpen(false);
    if (isChanged && isNewModule) {
      dispatch(saveModule(uuid, "save"));
    }
    if (isChanged && !isNewModule) {
      dispatch(saveModule(uuid, "update"));
    }
  }

  useClickOutside(textModuleRef, onClickOutside);

  const styleMap = {
    STRIKETHROUGH: {
      backgroundColor: colors.paleViolet,
      color: colors.darkGrey,
    },
  };

  return (
    <ModuleContainer onClick={() => setIsOpen(true)} ref={textModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={textModuleRef}
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
          <TitleIcon src={textIcon} />
          <FormTitle>Text module</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        <DraftJsWrapper isOpen={isOpen}>
          <Editor
            wrapperClassName="wrapper"
            editorClassName="editor"
            toolbarClassName="toolbar"
            stripPastedStyles
            customStyleMap={styleMap}
            editorState={editorState}
            onEditorStateChange={(e) => {
              onEditorStateChange(e);
            }}
            toolbarHidden={!isOpen}
            toolbar={{
              options: [
                "inline",
                "emoji",
                "link",
                "list",
                "blockType",
                "history",
              ],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "italic", "underline", "strikethrough"],
                strikethrough: {
                  icon: hilighterIcon,
                },
              },
              blockType: {
                inDropdown: true,
                options: ["H2", "H3", "H4", "Blockquote"],
              },
              list: {
                inDropdown: true,
                options: ["unordered", "ordered"],
              },
              link: { inDropdown: true, defaultTargetOption: "_self" },
              history: { inDropdown: false },
            }}
          />
        </DraftJsWrapper>
      </SectionBox>
    </ModuleContainer>
  );
};

TextModule.propTypes = {
  text: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
};
export default TextModule;
