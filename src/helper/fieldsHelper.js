import {
  addHomeTitle,
  setHomeImageAlt,
  setHomeShortDescription,
  setNavImageAlt,
  setReadingTime,
  setBackgroundColor,
  setSocialImageAlt,
  setTransparentImageAlt,
  setHomeImageUuid,
  setNavImageUuid,
  setTransparentImageUuid,
  setSocialImgUuid,
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
  setCollectionType,
  setCollectionFormat,
  setCollectionLimit,
  setCtaType,
  setFeedbackQuestion,
  setFeaturedTitle,
  setFeaturedAltImage,
  setFeaturedExcerpt,
  setFeaturedLinkCta,
  setFeaturedBackgroundColor,
  setFeaturedSticker,
  setFeaturedCategory,
  setFeaturedSlug,
  setCollectionResourceType,
  setCollectionCardAltImage,
  setCollectionCardLinkTo,
  setCollectionCardCtaLabel,
  setCollectionCardDescription,
  setImageUuid,
  setCtaImageUuid,
  setFeaturedImageUuid,
  setCollectionCardImageUuid,
} from "../store/actions/moduleActions";
import {
  setDisplayedName,
  setFirstName,
  setLastName,
  setPicture,
  setPosition,
  setQuote,
} from "../store/actions/userActions";
import { saveAvatar } from "../store/actions/thunk/UserAction.thunk";
import { addSeoDescription, addSeoTitle } from "../store/actions/seoActions";
import { saveImage } from "../store/actions/thunk/ModulesActions.thunk";
import langList from "./langList";
import {
  pageSetSlug,
  pageSetSubtitle,
  pageSetTitle,
} from "../store/actions/pageEditor/pageMainInformationsActions";
import {
  pageSetSeoDescription,
  pageSetSeoTitle,
} from "../store/actions/pageSeoActions";

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

// Hard coded list for CollectionType. && ctaType
export const primarySecondaryTypeList = [
  {
    label: "Primary",
    value: "primary",
  },
  {
    label: "Secondary",
    value: "secondary",
  },
];

export const collectionFormatList = [
  {
    label: "Slider",
    value: "carousel",
  },
  /*   {
    label: "Grid",
    value: "grid",
  }, */
];

export const backgroundColorsList = [
  {
    label: "Pink",
    value: "pink",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Blue",
    value: "blue",
  },
];

export const stickerList = [
  {
    label: "Nouvel Article",
    value: "new",
  },
];

export const resourceTypeList = [
  {
    label: "Contents",
    value: "contents",
  },
  {
    label: "Mixed",
    value: "mixed",
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
  selectedColorStyle,
  setSelectedColorStyle,
  setSelectedCollectionType,
  selectedCollectionType,
  setSelectedCollectionFormat,
  selectedCollectionFormat,
  setSelectedCtaType,
  selectedCtaType,
  selectedBackgroundColor,
  setSelectedBackgroundColor,
  selectedFeaturedBackgroundColor,
  setSelectedFeaturedBackgroundColor,
  selectedSticker,
  setSelectedSticker,
  selectedResourceType,
  setSelectedResourceType
) {
  if (edit) {
    setFileTitle(edit);
  }

  if (!selectedResourceType) {
    resourceTypeList.map((option) => {
      if (edit === option.value) {
        setSelectedResourceType(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedSticker) {
    stickerList.map((option) => {
      if (edit === option.value) {
        setSelectedSticker(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedCollectionType) {
    primarySecondaryTypeList.map((option) => {
      if (edit === option.value) {
        setSelectedCollectionType(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedCollectionFormat) {
    collectionFormatList.map((option) => {
      if (edit === option.value) {
        setSelectedCollectionFormat(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedCtaType) {
    primarySecondaryTypeList.map((option) => {
      if (edit === option.value) {
        setSelectedCtaType(option);
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

  if (!selectedColorStyle) {
    colorStyleList.map((option) => {
      if (edit === option.value) {
        setSelectedColorStyle(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedBackgroundColor) {
    backgroundColorsList.map((option) => {
      if (edit === option.value) {
        setSelectedBackgroundColor(option);
        return null;
      }
      return null;
    });
  }

  if (!selectedFeaturedBackgroundColor) {
    backgroundColorsList.map((option) => {
      if (edit === option.value) {
        setSelectedFeaturedBackgroundColor(option);
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
export function checkImage(
  event,
  dispatch,
  setFileTitle,
  name,
  moduleId,
  subId
) {
  const file = event.target.files[0];
  if (name === "avatar") {
    dispatch(saveAvatar(setFileTitle, file));
  } else {
    dispatch(saveImage(setFileTitle, name, file, moduleId, subId));
  }
}

// Feed selector with the good value set
export function valueSelector(
  name,
  editCategory,
  selectedLang,
  selectedReadTime,
  selectedColorStyle,
  selectedCollectionType,
  selectedCollectionFormat,
  selectedCtaType,
  selectedBackgroundColor,
  selectedFeaturedBackgroundColor,
  selectedSticker,
  selectedResourceType
) {
  switch (name) {
    case "resourceType":
      return selectedResourceType;

    case "sticker":
      return selectedSticker;

    case "category": {
      return editCategory && editCategory.label.substring(0, 2) === "- "
        ? {
            value: editCategory.value,
            label: `${editCategory.mainCat} ${editCategory.label}`,
          }
        : editCategory || undefined;
    }

    case "lang":
      return selectedLang;

    case "readTime":
      return selectedReadTime;

    case "colorStyle":
      return selectedColorStyle;

    case "collectionType":
      return selectedCollectionType;

    case "collectionFormat":
      return selectedCollectionFormat;

    case "ctaType":
      return selectedCtaType;

    case "backgroundColor":
      return selectedBackgroundColor;

    case "featuredBackgroundColor":
      return selectedFeaturedBackgroundColor;

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

    case "colorStyle":
      return colorStyleList;

    case "collectionType":
      return primarySecondaryTypeList;

    case "collectionFormat":
      return collectionFormatList;

    case "authors":
      return list;

    case "ctaType":
      return primarySecondaryTypeList;

    case "backgroundColor":
      return backgroundColorsList;

    case "featuredBackgroundColor":
      return backgroundColorsList;

    case "sticker":
      return stickerList;

    case "resourceType":
      return resourceTypeList;

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
  setSelectedCollectionType,
  setSelectedCollectionFormat,
  setSelectedCtaType,
  setSelectedBackgroundColor,
  setSelectedFeaturedBackgroundColor,
  setSelectedSticker,
  setSelectedResourceType,
  moduleId
) {
  const { value } = event;
  if (value) {
    switch (name) {
      case "resourceType":
        setSelectedResourceType(event);
        dispatch(setCollectionResourceType({ id: moduleId, value }));
        break;
      case "sticker":
        setSelectedSticker(event);
        dispatch(setFeaturedSticker({ id: moduleId, value }));
        break;

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

      case "collectionType":
        setSelectedCollectionType(event);
        dispatch(setCollectionType({ id: moduleId, value }));
        break;

      case "collectionFormat":
        setSelectedCollectionFormat(event);
        dispatch(setCollectionFormat({ id: moduleId, value }));
        break;

      case "ctaType":
        setSelectedCtaType(event);
        dispatch(setCtaType({ id: moduleId, value }));
        break;

      case "backgroundColor":
        setSelectedBackgroundColor(event);
        dispatch(setBackgroundColor(value));
        break;

      case "featuredBackgroundColor":
        setSelectedFeaturedBackgroundColor(event);
        dispatch(setFeaturedBackgroundColor({ id: moduleId, value }));
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
  subId = null,
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

    case name === "shortDescription" && section === "homeNavigation":
      dispatch(setHomeShortDescription(value));
      break;

    case name === "readTime" && section === "homeNavigation":
      dispatch(setReadingTime(value));
      break;

    case name === "altHomeImage" && section === "homeNavigation":
      dispatch(setHomeImageAlt(value));
      break;

    case name === "altNavImage" && section === "homeNavigation":
      dispatch(setNavImageAlt(value));
      break;

    case name === "altSocialImg" && section === "homeNavigation":
      dispatch(setSocialImageAlt(value));
      break;

    case name === "altTransparentImg" && section === "homeNavigation":
      dispatch(setTransparentImageAlt(value));
      break;

    // MODULES

    case name === "question" && section === "opinion":
      dispatch(setOpinionQuestion({ id: moduleId, value }));
      break;

    case name === "answer" && section === "opinion":
      dispatch(
        setOpinionTextAnswer({
          moduleId,
          answerId: subId,
          value,
        })
      );
      break;

    case name === "description" && section === "opinion":
      dispatch(setOpinionExplain({ id: moduleId, value }));
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

    case name === "question" && section === "feedback":
      dispatch(setFeedbackQuestion({ id: moduleId, value }));
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

    case name === "altImage" && section === "imageModule":
      dispatch(setAltImage({ id: moduleId, value }));
      break;

    case name === "title" && section === "featured":
      dispatch(setFeaturedTitle({ id: moduleId, value }));
      break;

    case name === "excerpt" && section === "featured":
      dispatch(setFeaturedExcerpt({ id: moduleId, value }));
      break;

    case name === "featuredImageAlt" && section === "featured":
      dispatch(setFeaturedAltImage({ id: moduleId, value }));
      break;

    case name === "featuredLinkCta" && section === "featured":
      dispatch(setFeaturedLinkCta({ id: moduleId, value }));
      break;

    case name === "featuredCategory" && section === "featured":
      dispatch(setFeaturedCategory({ id: moduleId, value }));
      break;

    case name === "slug" && section === "featured":
      dispatch(setFeaturedSlug({ id: moduleId, value }));
      break;

    case name === "limit" && section === "collection":
      dispatch(setCollectionLimit({ id: moduleId, value }));
      break;

    case name === "collectionCardAltImage" && section === "collection":
      dispatch(setCollectionCardAltImage({ moduleId, cardId: subId, value }));
      break;

    case name === "collectionCardLinkTo" && section === "collection":
      dispatch(setCollectionCardLinkTo({ moduleId, cardId: subId, value }));
      break;

    case name === "collectionCardCtaLabel" && section === "collection":
      dispatch(setCollectionCardCtaLabel({ moduleId, cardId: subId, value }));
      break;

    case name === "collectionCardDescription" && section === "collection":
      dispatch(
        setCollectionCardDescription({ moduleId, cardId: subId, value })
      );
      break;

    // PAGE EDITOR

    case name === "title" && section === "pageMainInformation":
      dispatch(pageSetTitle(value));
      break;

    case name === "slug" && section === "pageMainInformation":
      dispatch(pageSetSlug(value));
      break;

    case name === "subtitle" && section === "pageMainInformation":
      dispatch(pageSetSubtitle(value));
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
  selectedTagsCollection,
  setSelectedTagsCollection
) {
  if (fieldType === "multi-value") {
    switch (name) {
      case "tags": {
        if (section === "collection" || section === "featured") {
          initTagsSelector(
            edit,
            setSelectedTagsCollection,
            selectedTagsCollection,
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

export function openPreview(language, slug, type = "contents") {
  const lang = harmonizeLang(language);
  let string = "";
  if (type === "contents") {
    string = `${PREVIEW_URL}/${lang}/${type}/${slug}`;
  }
  if (type === "pages") {
    string = `${PREVIEW_URL}/${lang}/${slug}`;
  }
  window.open(`${string}`, "_blank");
}

export function deleteImage(dispatch, setFileTitle, name, moduleId, subId) {
  switch (name) {
    case "image": {
      dispatch(setImageUuid({ id: moduleId, value: undefined }));
      break;
    }

    case "homeImage": {
      dispatch(setHomeImageUuid(undefined));
      break;
    }

    case "navImage": {
      dispatch(setNavImageUuid(undefined));
      break;
    }
    case "ctaImage": {
      dispatch(setCtaImageUuid({ id: moduleId, value: undefined }));
      break;
    }
    case "avatar": {
      dispatch(setPicture(undefined));
      break;
    }
    case "transparentImage": {
      dispatch(setTransparentImageUuid(undefined));
      break;
    }
    case "SocialImg": {
      dispatch(setSocialImgUuid(undefined));
      break;
    }
    case "featuredImage": {
      dispatch(setFeaturedImageUuid({ id: moduleId, value: undefined }));
      break;
    }
    case "collectionCardImage": {
      dispatch(
        setCollectionCardImageUuid({
          moduleId,
          value: undefined,
          cardId: subId,
        })
      );
      break;
    }
    default:
      return null;
  }
  setFileTitle("");
  return null;
}
