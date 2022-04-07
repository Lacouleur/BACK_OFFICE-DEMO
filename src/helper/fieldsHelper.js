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
  setCtaAltImage,
  setCtaIntro,
  setCtaLabel,
  setCtaLink,
  setCtaUrl,
  setOpinionExplain,
  setOpinionQuestion,
  setOpinionTextAnswer,
  setPageModuleHeaderSubtitle,
  setPageModuleHeaderTitle,
  setPageModuleHeaderUrl,
  setSliderType,
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
import langList from "./langList";
import {
  pageSetSlug,
  pageSetTitle,
} from "../store/actions/pageEditor/pageMainInformationsActions";
import {
  pageSetSeoDescription,
  pageSetSeoTitle,
} from "../store/actions/pageSeoActions";
import { fetchTags } from "../store/actions/thunk/ArticlesActions.thunk";

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

// Hard coded Color list for SliderType.
export const sliderTypeList = [
  {
    label: "Primary",
    value: "primary",
  },
  {
    label: "Secondary",
    value: "secondary",
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
  setSelectedColorStyle,
  setSelectedSliderType,
  selectedSliderType
) {
  if (edit) {
    setFileTitle(edit);
  }

  if (!selectedSliderType) {
    sliderTypeList.map((option) => {
      if (edit === option.value) {
        setSelectedSliderType(option);
        return null;
      }
      return null;
    });
  }

  if (categoriesList && edit) {
    categoriesList.map((option) => {
      if (edit === option.value) {
        setEditCategory(option);
      }
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

export function initListSelector(edit, setter, selected, list) {
  if (selected.length === 0 && list && edit) {
    const buildList = [];
    list.map((element) => {
      edit.map((edited) => {
        if (edited === element.value) {
          buildList.push(element);
        }

        return null;
      });
      setter(buildList);
      return null;
    });
  }
}

// build a clean array usable for dispatch
export function dispatchElementsValue(event) {
  const arr = [];
  event.map((element) => {
    arr.push(element.value);
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
export function dispatchElementsId(event) {
  const arr = [];
  event.map((element) => {
    if (element._id) {
      arr.push(element._id);
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
  selectedColorStyle,
  selectedSliderType
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

    case "sliderType":
      return selectedSliderType;

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

    case "sliderType":
      return sliderTypeList;

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
  setEditCategory,
  setSelectedLang,
  setSelectedReadTime,
  setSelectedColorStyle,
  setSelectedSliderType,
  moduleId
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

      case "sliderType":
        setSelectedSliderType(event);
        dispatch(setSliderType({ id: moduleId, value }));
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

    case name === "link" && section === "cta":
      dispatch(setCtaLink({ id: moduleId, value }));
      break;

    case name === "altImage" && section === "cta":
      dispatch(setCtaAltImage({ id: moduleId, value }));
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
      dispatch(setOpinionExplain({ id: moduleId, value }));
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

export async function initMultiSelectors(
  fieldType,
  name,
  edit,
  section,
  setSelectedTags,
  selectedTags,
  tagsList,
  setSelectedAuthors,
  selectedAuthors,
  authorsList,
  setSelectedCategories,
  selectedCategories,
  categoriesList,
  selectedTagsSlider,
  setSelectedTagsSlider
) {
  if (fieldType === "multi-value") {
    switch (name) {
      case "tags": {
        if (section === "slider") {
          initTagsSelector(
            edit,
            setSelectedTagsSlider,
            selectedTagsSlider,
            tagsList
          );
        } else {
          initTagsSelector(edit, setSelectedTags, selectedTags, tagsList);
        }
        break;
      }

      case "authors": {
        initListSelector(
          edit,
          setSelectedAuthors,
          selectedAuthors,
          authorsList
        );
        break;
      }

      case "categories": {
        initListSelector(
          edit,
          setSelectedCategories,
          selectedCategories,
          categoriesList
        );
        break;
      }

      default:
        return null;
    }
  }
  return null;
}

export function harmonizeLang(lang) {
  let language = lang.slice(0, 2);
  if (language === "ge") {
    language = "de";
  }

  return language;
}

export function openPreview(language, slug) {
  const lang = harmonizeLang(language);
  window.open(`${PREVIEW_URL}/${lang.slice(0, 2)}/content/${slug}`, "_blank");
}
