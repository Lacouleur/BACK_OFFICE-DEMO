import { EditorState } from "draft-js";
import HTMLconverter from "./Editor/HTMLconverter";
import {
  createOpinionNewAnswer,
  deleteOpinionAnswer,
  setCtaDescription,
  setOpinionExplain,
  setValueTextModule,
} from "../store/actions/moduleActions";
import colors from "../styles/core/colors";

export function setTextHTMLContent(
  moduleName,
  uuid,
  editorState,
  text,
  setEditorState,
  dispatch
) {
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
    if (moduleName === "textModule") {
      if (newValue !== text) {
        dispatch(
          setValueTextModule({
            id: uuid,
            value: newValue,
          })
        );
      }
    }
    if (moduleName === "ctaModule") {
      if (newValue !== text) {
        dispatch(
          setCtaDescription({
            id: uuid,
            value: newValue,
          })
        );
      }
    }
    if (moduleName === "opinionModule") {
      if (newValue !== text) {
        dispatch(
          setOpinionExplain({
            id: uuid,
            value: newValue,
          })
        );
      }
    }
  }
}

export function watchNewModules(isNewModule, textModuleRef, setIsOpen) {
  if (isNewModule) {
    textModuleRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    setIsOpen(true);
  }
}

export const styleMap = {
  STRIKETHROUGH: {
    backgroundColor: colors.paleViolet,
    color: colors.darkGrey,
  },
};

// Function to avoid "mailto params" to be escaped
export function processLink(link) {
  return link;
}

export function onEditorStateChange(e, setEditorState) {
  setEditorState(e);
}

export function manageReactionAnswers(answers, dispatch, uuid) {
  // CREATE EMOJI MODE
  const emojis = ["😍", "🤔", "👏", "😥", "😡"];
  dispatch(
    deleteOpinionAnswer({
      moduleId: uuid,
      answerId: undefined,
      eraseAll: true,
    })
  );

  emojis.map((emoji) => {
    dispatch(
      createOpinionNewAnswer({ moduleId: uuid, text: emoji, changed: false })
    );
  });
}

export function dndEditorCustomStyles(snapshot, provided) {
  return {
    userSelect: "none",
    backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
    ...provided.draggableProps.style,
  };
}
