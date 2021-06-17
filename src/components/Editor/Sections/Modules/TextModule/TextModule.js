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
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  setValueTextModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/clientActions";
import colors from "../../../../../styles/core/colors";
import HTMLconverter from "../../../../../helper/Editor/HTMLconverter";
import emojisList from "./emojisList";

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

  function setContent() {
    if (!editorState) {
      if (text) {
        const converted = HTMLconverter(editorState, "from", text);
        const stateWithContent = EditorState.createWithContent(converted);
        setEditorState(stateWithContent);
      } else {
        const stateEmpty = EditorState.createEmpty();
        setEditorState(stateEmpty);
      }
    } else {
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
  }

  function watchNewModules() {
    if (isNewModule) {
      textModuleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      textEditorRef?.current?.focus();
      setIsOpen(true);
    }
  }

  useEffect(() => {
    watchNewModules();
  }, [isNewModule]);

  useEffect(() => {
    if (isOpenCloseModal) {
      setIsOpen(true);
    }
  }, [isOpenCloseModal]);

  useEffect(() => {
    setContent();
  }, [editorState]);

  function onEditorStateChange(e) {
    setEditorState(e);
  }

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
              emoji: {
                emojis: emojisList,
              },
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
