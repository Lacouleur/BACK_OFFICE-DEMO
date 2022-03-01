import {
  setDisplayedName,
  setEmail,
  setFirstName,
  setGender,
  setLastName,
  setLocale,
  setPicture,
  setPosition,
  setQuote,
  setUserId,
  setUserIsChanged,
} from "../store/actions/userActions";

// Signatures and quotes need to be dispatched depending on the locale language of the user. If locale is FR then displayed-name and quote will have all french infos, on the other hand displayed-names ans quotes will have all foreign languages in an object {de, it, fi...}
function findLangAndDispatch(userInfo, dispatch) {
  const userLang = userInfo.locale;
  const quotesLangArr = userInfo.quotes ? Object.keys(userInfo.quotes) : [];
  const dispNamesLangArr = userInfo.displayed_names
    ? Object.keys(userInfo.displayed_names)
    : [];

  dispatch(setLocale(userInfo.locale || ""));
  dispatch(setQuote({ value: userInfo.quote || null, lang: userLang }));
  dispatch(
    setDisplayedName({
      value: userInfo.displayed_name || null,
      lang: userLang,
    })
  );

  if (userInfo.locale) {
    quotesLangArr.map((currentLang) => {
      return dispatch(
        setQuote({
          value: userInfo.quotes[currentLang] || null,
          lang: currentLang,
        })
      );
    });
    dispNamesLangArr.map((currentLang) => {
      return dispatch(
        setDisplayedName({
          value: userInfo?.displayed_names[currentLang] || null,
          lang: currentLang,
        })
      );
    });
  }
}

export function dispatchUserInfo(dispatch, userInfo) {
  if (userInfo) {
    dispatch(setUserId(userInfo.sub || userInfo._id || ""));
    dispatch(setPosition(userInfo.position || ""));
    dispatch(setFirstName(userInfo.given_name || ""));
    dispatch(setLastName(userInfo.family_name || ""));
    dispatch(setEmail(userInfo.email || ""));
    dispatch(setGender(userInfo.gender || ""));
    dispatch(setPicture(userInfo.picture || ""));
    dispatch(setLocale(userInfo.locale || ""));
    findLangAndDispatch(userInfo, dispatch);
    dispatch(setUserIsChanged(false));
  }
  return null;
}

export function listenToScroll(setShowActionBar) {
  const scrollPosition =
    document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    setShowActionBar(true);
  } else {
    setShowActionBar(false);
  }
}

export function findSignature(
  name,
  locale,
  quote,
  displayedName,
  quotes,
  displayedNames
) {
  const fieldLang = name.substr(name.length - 2);
  const fieldType = name.substring(0, name.length - 3);

  if (fieldLang === locale) {
    if (quote && fieldType === "quote") {
      return quote;
    }

    if (displayedName && fieldType === "displayedName") {
      return displayedName;
    }
  }

  if (quotes && fieldType === "quote" && quotes[fieldLang]) {
    return quotes[fieldLang];
  }

  if (
    displayedNames &&
    fieldType === "displayedName" &&
    displayedNames[fieldLang]
  ) {
    return displayedNames[fieldLang];
  }

  return "";
}

export function findSelectedUser(usersList, userInfo, setSelectedUser) {
  if (usersList) {
    usersList.map((user) => {
      if (user.label === userInfo.name) {
        setSelectedUser(user);
      }
      return null;
    });
  }
}

export function buildAvatarInfos(picture, setAvatarTitle, setIsAvatarImage) {
  if (picture?.uuid) {
    setAvatarTitle(picture.uuid.split("/")[1]);
    setIsAvatarImage(true);
  }
}

export const fieldsList = [
  {
    name: "position",
    placeholder: "Position",
    type: "text",
    section: "identity",
    max: "40",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    section: "identity",
    max: "40",
  },
  { name: "avatar", placeholder: "", type: "image", section: "userSign" },
  {
    name: "displayedName-fr",
    placeholder: "Displayed name",
    type: "text",
    section: "userSign",
    max: "64",
    lang: "fr",
  },
  {
    name: "quote-fr",
    placeholder: "Quote",
    type: "text",
    section: "userSign",
    max: "64",
    lang: "fr",
  },
  {
    name: "displayedName-de",
    placeholder: "Displayed name",
    type: "text",
    section: "userSign",
    max: "64",
    lang: "de",
  },
  {
    name: "quote-de",
    placeholder: "Quote",
    type: "text",
    section: "userSign",
    max: "64",
    lang: "de",
  },
];
