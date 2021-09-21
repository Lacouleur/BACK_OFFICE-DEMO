import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import hilighterIcon from "../../../../../styles/assets/icons/highlighter.svg";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  DraftJsWrapper,
  ModuleContainer,
  Delete,
  ActionIcons,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  setValueTextModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import colors from "../../../../../styles/core/colors";
import HTMLconverter from "../../../../../helper/Editor/HTMLconverter";
import emojisList from "./emojisList";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";

const TextModule = ({
  text,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  order,
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
    setAModuleIsOpen(isOpen);
  }, [isOpen]);

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

  // Functrion to avoid "mailto params" to be escaped
  function processLink(link) {
    return link;
  }

  return (
    <ModuleContainer ref={textModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={textModuleRef}
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
                options: ["Normal", "H2", "H3", "H4", "Blockquote"],
              },
              list: {
                inDropdown: true,
                options: ["unordered", "ordered"],
              },
              link: {
                inDropdown: true,
                defaultTargetOption: "_blank",
                linkCallback: processLink,
                trailingWhitespace: false,
                showOpenOptionOnHover: true,
              },
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
  order: PropTypes.number.isRequired,
};
export default TextModule;
