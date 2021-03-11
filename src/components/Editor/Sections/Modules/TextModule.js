/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Editor as DraftJs, EditorState, RichUtils } from "draft-js";
import "../../../../styles/css/draft.css";
import { useDispatch, useSelector } from "react-redux";
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
  setValueTextModule,
  showCloseModal,
} from "../../../../store/actions/moduleActions";
import keyGenerator from "../../../../helper/keyGenerator";
import CloseModal from "../../../Modals.js/CloseModal";
import useClickOutside from "../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../store/actions/clientActions";

const TextModule = ({
  text,
  uuid,
  isChanged,
  edit,
  isOpenCloseModal,
  isNewModule,
}) => {
  const dispatch = useDispatch();
  const textModuleRef = useRef(null);
  const textEditorRef = useRef(null);
  const HomeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const { articleId } = HomeScreenState;
  function setContent() {
    if (edit) {
      return EditorState.createWithContent(convertFromHTML(text));
    }
    return EditorState.createEmpty();
  }

  const [editorState, setEditorState] = useState(setContent());

  useEffect(() => {
    if (isNewModule) {
      textModuleRef.current.scrollIntoView({ behavior: "smooth" });
      textEditorRef.current.focus();
    }
    dispatch(showCloseModal(false));
  }, [isNewModule]);

  useEffect(() => {
    const newValue = convertToHTML(editorState.getCurrentContent());
    if (newValue !== text) {
      dispatch(
        setValueTextModule({
          id: uuid,
          value: convertToHTML(editorState.getCurrentContent()),
        })
      );
    }
  }, [editorState]);

  function applyStyle(style) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style, edit));
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

  function onClickOutside() {
    if (isChanged) {
      dispatch(saveModule(uuid, "update"));
    }
  }

  useClickOutside(textModuleRef, onClickOutside);

  return (
    <div ref={textModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={textModuleRef}
          articleId={articleId}
        />
      )}
      <SectionBox>
        <Close
          src={crossIcon}
          onClick={() => {
            dispatch(showCloseModal({ value: true, id: uuid }));
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
              ref={textEditorRef}
              placeholder="start to tip in"
              editorState={editorState}
              onChange={setEditorState}
            />
          </DraftJsContainer>
        </DraftJsWrapper>
      </SectionBox>
    </div>
  );
};

TextModule.propTypes = {
  text: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
};
export default TextModule;
