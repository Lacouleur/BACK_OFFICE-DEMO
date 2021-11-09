import { EditorState } from "draft-js";
import HTMLconverter from "./Editor/HTMLconverter";
import {
  setCtaDescription,
  setValueTextModule,
} from "../store/actions/moduleActions";
import colors from "../styles/core/colors";

export function setTextModuleContent(
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

export function setCtaModuleContent(
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
    if (newValue !== text) {
      dispatch(
        setCtaDescription({
          id: uuid,
          value: newValue,
        })
      );
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

// Functrion to avoid "mailto params" to be escaped
export function processLink(link) {
  return link;
}

export function onEditorStateChange(e, setEditorState) {
  setEditorState(e);
}
