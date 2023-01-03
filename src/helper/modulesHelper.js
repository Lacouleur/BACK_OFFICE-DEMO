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
    backgroundColor: snapshot.isDragging ? "#263B4A" : "",
    ...provided.draggableProps.style,
  };
}

export function removeUrlsFromCards(cards) {
  const newCards = [];
  cards.map((card) => {
    newCards.push({ ...card, image: { ...card.image, urls: undefined } });
    return null;
  });
  return newCards;
}

export function manageCardsValues(cards) {
  const newCards = [];
  cards.map((card) => {
    newCards.push({
      ...card,
      url: !card?.url?.value ? null : card?.url,
      image: {
        ...card.image,
        uuid: card.image.uuid || undefined,
        /* API do not accept urls as it need only UUID */
        urls: undefined,
      },
    });
    return null;
  });
  return newCards;
}

export function cleanUrlTextComponent(text) {
  let newText = text;

  const exludeList = [
    "http://localhost:3001",
    "https://bo-phoenix.ftvg-preprod.fr",
    "https://bo-phoenix.francetelevisions.tv",
    "http://localhost:3000",
    "http://localhost:3002",
    "https://www.preprod.phoenix.ftven.fr",
    "https://preview.preprod.phoenix.ftven.fr",
    "https://www.nowuproject.eu",
    "https://preview.nowuproject.eu",
  ];

  exludeList.forEach((element) => {
    newText = newText.replace(element, "");
  });

  return newText;
}
