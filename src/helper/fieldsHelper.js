import { showErrorModal } from "../store/actions/actionBarActions";
import {
  addHomeTitle,
  setHomeImageAlt,
  setNavImageAlt,
  setReadingTime,
} from "../store/actions/homeNavigationActions";
import {
  addCategory,
  addLang,
  addSlug,
  addTitle,
  setCaption,
  setColorStyle,
} from "../store/actions/mainInformationActions";
import {
  setAltImage,
  setOpinionQuestion,
  setOpinionTextAnswer,
} from "../store/actions/moduleActions";
import { addSeoTitle } from "../store/actions/seoActions";
import { saveImage } from "../store/actions/thunk/ModulesActions.thunk";
import { sizeOrFormatError } from "./errorMessages";
import langList from "./langList";

export const readingTimeList = [
  {
    label: "1 min",
    value: 1,
  },
  {
    label: "2 min",
    value: 2,
  },
  {
    label: "3 min",
    value: 3,
  },
  {
    label: "5 min",
    value: 5,
  },
  {
    label: "10 min",
    value: 10,
  },
  {
    label: "15 min",
    value: 15,
  },
  {
    label: "20 min",
    value: 20,
  },
  {
    label: "25 min",
    value: 25,
  },
  {
    label: "30 min",
    value: 30,
  },
];

export const colorStyleList = [
  {
    label: "Blue",
    value: "1",
  },
  {
    label: "Yellow",
    value: "2",
  },
];

export function onEdit(
  edit,
  categoriesList,
  setFileTitle,
  setEditCategory,
  selectedLang,
  setSelectedLang,
  selectedReadTime,
  setSelectedReadTime,
  selectedColorStyle,
  setSelectedColorStyle
) {
  if (edit) {
    setFileTitle(edit);
  }

  if (categoriesList && edit) {
    categoriesList.map((option) => {
      if (edit === option.value) {
        setEditCategory(option);
      }
      return null;
    });
  }

  if (!selectedLang) {
    langList.map((option) => {
      if (edit === option.value) {
        setSelectedLang(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedReadTime) {
    readingTimeList.map((option) => {
      if (parseInt(edit, 10) === option.value) {
        setSelectedReadTime(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedColorStyle) {
    colorStyleList.map((option) => {
      if (edit === option.value) {
        setSelectedColorStyle(option);
        return null;
      }
      return null;
    });
  }
}

export function initAuthorsSelector(
  edit,
  setSelectedAuthors,
  selectedAuthors,
  authorsList
) {
  if (selectedAuthors.length === 0) {
    const buildAuthorList = [];
    authorsList.map((author) => {
      edit.map((authorId) => {
        if (authorId === author.value) {
          buildAuthorList.push(author);
        }
        return null;
      });
      setSelectedAuthors(buildAuthorList);
      return null;
    });
  }
}

export function dispatchAuthors(selectedAuthors) {
  const arr = [];
  selectedAuthors.map((author) => {
    arr.push(author.value);
    return null;
  });
  return arr;
}

export function handleChange(event, dispatch, setFileTitle, name, moduleId) {
  const file = event.target.files[0];
  if (
    file &&
    file.size < 500000 &&
    (file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/jpeg")
  ) {
    dispatch(saveImage(name, file, moduleId));
    setFileTitle(file.name);
  } else {
    dispatch(showErrorModal({ value: true, message: sizeOrFormatError(file) }));
    setFileTitle("");
  }
}

export function valueSelector(
  name,
  editCategory,
  selectedLang,
  selectedReadTime,
  selectedColorStyle
) {
  switch (name) {
    case "category":
      return editCategory;

    case "lang":
      return selectedLang;

    case "readTime":
      return selectedReadTime;

    case "colorStyle":
      return selectedColorStyle;

    default:
      return null;
  }
}

export function createAutorsList(users) {
  const authorList = [];
  users.map((user) => {
    authorList.push({
      value: user._id,
      label: user.displayed_name || user.name,
    });
    return null;
  });
  return authorList;
}

export function optionSelector(name, list) {
  switch (name) {
    case "category":
      return list;

    case "lang":
      return langList;

    case "readTime":
      return readingTimeList;

    case "colorStyle":
      return colorStyleList;

    case "authors":
      return list;

    default:
      return null;
  }
}

export function dispatchSelected(
  event,
  dispatch,
  name,
  setEditCategory,
  setSelectedLang,
  setSelectedReadTime,
  setSelectedColorStyle
) {
  const { value } = event;
  if (value) {
    switch (name) {
      case "category":
        setEditCategory(event);
        dispatch(addCategory(value));
        break;

      case "lang":
        setSelectedLang(event);
        dispatch(addLang(value));
        break;

      case "readTime":
        setSelectedReadTime(event);
        dispatch(setReadingTime(value));
        break;

      case "colorStyle":
        setSelectedColorStyle(event);
        dispatch(setColorStyle(value));
        break;

      default:
        return null;
    }
  } else if (name === "category") {
    setEditCategory("");
    dispatch(addCategory(""));
  }
  return null;
}

export function dispatchFields(
  name,
  section,
  dispatch,
  value,
  moduleId,
  answerId
) {
  console.log({ name, section, dispatch, value, moduleId, answerId });
  switch (true) {
    case name === "title" && section === "mainInformation":
      dispatch(addTitle(value));
      break;

    case name === "slug" && section === "mainInformation":
      dispatch(addSlug(value));
      break;

    case name === "caption" && section === "mainInformation":
      dispatch(setCaption(value));
      break;

    case name === "title" && section === "seo":
      dispatch(addSeoTitle(value));
      break;

    case name === "title" && section === "homeNavigation":
      dispatch(addHomeTitle(value));
      break;

    case name === "altImage" && section === "imageModule":
      dispatch(setAltImage({ id: moduleId, value }));
      break;

    case name === "altHomeImage" && section === "homeNavigation":
      dispatch(setHomeImageAlt(value));
      break;

    case name === "altNavImage" && section === "homeNavigation":
      dispatch(setNavImageAlt(value));
      break;

    case name === "question" && section === "opinion":
      dispatch(setOpinionQuestion({ id: moduleId, value }));
      break;

    case name === "answer" && section === "opinion":
      dispatch(
        setOpinionTextAnswer({
          moduleId,
          answerId,
          value,
        })
      );
      break;

    default:
      return null;
  }
  return null;
}
