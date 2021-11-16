import React from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import {
  onEditorStateChange,
  processLink,
  styleMap,
} from "../../../../helper/modulesHelper";
import hilighterIcon from "../../../../styles/assets/icons/highlighter.svg";
import emojisList from "./TextModule/emojisList";
import { DraftJsWrapper } from "../../../../styles/styledComponents/editor/modules/Modules.sc";

const TextEditor = ({ editorState, setEditorState, isOpen }) => {
  return (
    <DraftJsWrapper isOpen>
      <Editor
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        stripPastedStyles
        customStyleMap={styleMap}
        editorState={editorState}
        onEditorStateChange={(e) => {
          onEditorStateChange(e, setEditorState);
        }}
        toolbarHidden={!isOpen}
        toolbar={{
          options: ["inline", "emoji", "link", "list", "blockType", "history"],
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
  );
};

TextEditor.propTypes = {
  editorState: PropTypes.shape({}).isRequired,
  setEditorState: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default TextEditor;
