/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Editor as DraftJs, EditorState, RichUtils } from "draft-js";
import "../../../../styles/css/draft.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { convertToHTML, convertFromHTML } from "draft-convert";
import {
  TitleIcon,
  FormTitle,
} from "../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
} from "../../../../styles/styledComponents/editor/Sections.sc";
import crossIcon from "../../../../styles/assets/icons/cross-white.svg";
import textIcon from "../../../../styles/assets/icons/text.svg";
import { Close } from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";
import {
  DraftJsWrapper,
  DraftJsContainer,
  ToolbarContainer,
  ToolsIconsContainer,
  ToolsbarItems,
} from "../../../../styles/styledComponents/editor/modules/TextModule.sc";
import {
  deleteModule,
  setValueTextModule,
} from "../../../../store/actions/moduleCreatorActions";
import keyGenerator from "../../../../helper/keyGenerator";
import { createNewContent } from "../../../../styles/styledComponents/global/Buttons/CustomButtons.sc";

const TextModule = ({ module, setModulesList, edit }) => {
  const dispatch = useDispatch();
  const textModuleRef = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    textModuleRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(
      setValueTextModule({
        id: module?.uuid,
        value: convertToHTML(editorState.getCurrentContent()),
      })
    );
  }, [editorState]);

  useEffect(() => {
    if (edit) {
      setEditorState(
        EditorState.createWithContent(convertFromHTML(module.text))
      );
    }
  }, [edit]);

  function applyStyle(style) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  function isActive(style) {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }

  const toolsList = [
    {
      label: "bold",
      style: "BOLD",
      icon: <FontAwesomeIcon icon={faBold} />,
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: <FontAwesomeIcon icon={faItalic} />,
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: <FontAwesomeIcon icon={faUnderline} />,
    },
  ];

  return (
    <>
      <SectionBox ref={textModuleRef}>
        {/*  {console.log("convertedContent", convertedContent)} */}
        <Close
          src={crossIcon}
          onClick={() => {
            dispatch(deleteModule());
          }}
        />
        <SectionTitle>
          <TitleIcon src={textIcon} />
          <FormTitle>Text module</FormTitle>
        </SectionTitle>
        <DraftJsWrapper>
          <ToolbarContainer>
            <ToolsIconsContainer>
              {toolsList.map((tool, index) => (
                <ToolsbarItems
                  isActive={isActive(tool.style)}
                  key={keyGenerator(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyStyle(tool.style);
                  }}
                >
                  {tool.icon || tool.label}
                </ToolsbarItems>
              ))}
            </ToolsIconsContainer>
          </ToolbarContainer>
          <DraftJsContainer>
            <DraftJs
              placeholder="start to tip in"
              editorState={editorState}
              onChange={setEditorState}
            />
          </DraftJsContainer>
        </DraftJsWrapper>
      </SectionBox>
    </>
  );
};

/* TextModule.defaultProps = {
  edit: undefined,
};

TextModule.propTypes = {
  module: PropTypes.shape({
    type: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setModulesList: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape([]).isRequired,
  edit: PropTypes.shape({}),
}; */
export default TextModule;
