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
  setTags,
} from "../store/actions/mainInformationActions";
import {
  setAltImage,
  setCtaIntro,
  setCtaLabel,
  setCtaUrl,
  setOpinionExplain,
  setOpinionQuestion,
  setOpinionTextAnswer,
  setPageModuleHeaderSubtitle,
  setPageModuleHeaderTitle,
  setPageModuleHeaderUrl,
} from "../store/actions/moduleActions";
import {
  setDisplayedName,
  setFirstName,
  setLastName,
  setPosition,
  setQuote,
} from "../store/actions/userActions";
import { saveAvatar } from "../store/actions/thunk/UserAction.thunk";
import { addSeoDescription, addSeoTitle } from "../store/actions/seoActions";
import { saveImage } from "../store/actions/thunk/ModulesActions.thunk";
import { sizeOrFormatError } from "./errorMessages";
import langList from "./langList";
import {
  pageSetlang,
  pageSetSlug,
  pageSetTitle,
} from "../store/actions/pageEditor/pageMainInformationsActions";
import {
  pageSetSeoDescription,
  pageSetSeoTitle,
} from "../store/actions/pageSeoActions";

// Hard coded reading time list for theming.
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

// Hard coded Color list for theming.
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

// match selection with current list for simple selector fields.
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

// Init the Author selector with fetched tags from API
export function initAuthorsSelector(
  edit,
  setSelectedAuthors,
  selectedAuthors,
  authorsList
) {
  if (selectedAuthors.length === 0 && authorsList && edit) {
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

// build a clean array usable for dispatch
export function dispatchAuthors(event) {
  const arr = [];
  event.map((author) => {
    arr.push(author.value);
    return null;
  });
  return arr;
}

// Init the tag selector with fetched tags from API
export function initTagsSelector(
  edit,
  setSelectedTags,
  selectedTags,
  tagsList
) {
  if (selectedTags?.length === 0 && tagsList && edit) {
    const buildTagList = [];
    tagsList.map((tag) => {
      edit.map((tagId) => {
        if (tagId === tag._id) {
          buildTagList.push(tag);
        }

        return null;
      });
      setSelectedTags(buildTagList);
      return null;
    });
  }
}

// Dispatch selected tags in the reducer.
export function dispatchTags(event) {
  const arr = [];
  event.map((tag) => {
    if (tag._id) {
      arr.push(tag._id);
    }
    return null;
  });
  return arr;
}

// Check image of the upload fields, throw modal error if not valid
export function checkImage(event, dispatch, setFileTitle, name, moduleId) {
  const file = event.target.files[0];
  if (name === "avatar") {
    dispatch(saveAvatar(setFileTitle, file));
  } else {
    dispatch(saveImage(setFileTitle, name, file, moduleId));
  }
}

// feed multi-selector with fetched selected values.
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

export function createUsersList(users) {
  const usersList = [];
  users.map((user) => {
    usersList.push({
      value: user._id,
      label: user.name || "unamed",
    });
    return null;
  });
  return usersList;
}

// feeding selector field with the good option list
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

// dispatch the value of selector field in th good reducer.
export function dispatchSelected(
  event,
  dispatch,
  name,
  section,
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

      case "lang" && section === "pageMainInformation":
        setSelectedLang(event);
        dispatch(pageSetlang(value));
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

// dispatch the value of field in th good reducer.
export function dispatchFields(
  name,
  section,
  dispatch,
  value,
  moduleId,
  answerId = null,
  lang = "fr"
) {
  switch (true) {
    // CONTENT EDITOR

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

    case name === "description" && section === "seo":
      dispatch(addSeoDescription(value));
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
    case name === "intro" && section === "cta":
      dispatch(setCtaIntro({ id: moduleId, value }));
      break;

    case name === "label" && section === "cta":
      dispatch(setCtaLabel({ id: moduleId, value }));
      break;

    case name === "url" && section === "cta":
      dispatch(setCtaUrl({ id: moduleId, value }));
      break;

    case name === "position" && section === "userProfile":
      dispatch(setPosition(value));
      break;

    case name === "lastName" && section === "userProfile":
      dispatch(setLastName(value));
      break;

    case name === "firstName" && section === "userProfile":
      dispatch(setFirstName(value));
      break;

    case name.substr(0, name.length - 3) === "displayedName" &&
      section === "userProfile":
      dispatch(setDisplayedName({ value, lang }));
      break;

    case name.substr(0, name.length - 3) === "quote" &&
      section === "userProfile":
      dispatch(setQuote({ value, lang }));
      break;

    case name === "explanation" && section === "opinion":
      dispatch(setOpinionExplain({ id: moduleId, value: e.target.value }));
      break;

    // PAGE EDITOR

    case name === "title" && section === "pageMainInformation":
      dispatch(pageSetTitle(value));
      break;

    case name === "slug" && section === "pageMainInformation":
      dispatch(pageSetSlug(value));
      break;

    case name === "title" && section === "pageSeo":
      dispatch(pageSetSeoTitle(value));
      break;

    case name === "description" && section === "pageSeo":
      dispatch(pageSetSeoDescription(value));
      break;

    // PAGE EDITOR SECTIONS HEADER

    case name === "title" && section === "sectionHeader":
      dispatch(setPageModuleHeaderTitle({ id: moduleId, value }));
      break;

    case name === "subtitle" && section === "sectionHeader":
      dispatch(setPageModuleHeaderSubtitle({ id: moduleId, value }));
      break;

    case name === "url" && section === "sectionHeader":
      dispatch(setPageModuleHeaderUrl({ id: moduleId, value }));
      break;

    default:
      return null;
  }
  return null;
}

// Fuse.js + react-select -> dynamic tag search field
export async function loadOptions(inputValue, fuse) {
  if (!inputValue) {
    return [];
  }
  const result = await fuse.search(inputValue).map((c) => ({ ...c.item }));
  return result;
}

// fuze.js options
// https://fusejs.io/demo.html
export const fuzzyOptions = {
  keys: ["label"],
  limit: 15,
  distance: 4,
};
