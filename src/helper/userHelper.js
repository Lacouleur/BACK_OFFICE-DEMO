import { showErrorModal } from "../store/actions/actionBarActions";
import { saveAvatar } from "../store/actions/thunk/UserAction.thunk";
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
} from "../store/actions/userPanelActions";
import { sizeOrFormatError } from "./errorMessages";

export const handleChange = (event, dispatch) => {
  const image = event.target.files[0];
  if (
    image &&
    image.size < 500000 &&
    (image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/gif" ||
      image.type === "image/jpeg")
  ) {
    dispatch(saveAvatar(image));
  } else {
    dispatch(
      showErrorModal({ value: true, message: sizeOrFormatError(image) })
    );
  }
};

export function watchChangeForm(value, name, dispatch) {
  switch (name) {
    case "position": {
      dispatch(setPosition(value));
      return;
    }

    case "lastName": {
      dispatch(setLastName(value));
      break;
    }

    case "firstName": {
      dispatch(setFirstName(value));
      break;
    }

    case "displayedName": {
      dispatch(setDisplayedName(value));
      break;
    }

    case "quote": {
      dispatch(setQuote(value));
      break;
    }

    default:
  }
}

export function dispatchUserInfo(dispatch, userInfo) {
  if (userInfo) {
    dispatch(setUserId(userInfo.sub || ""));
    dispatch(setPosition(userInfo.position || ""));
    dispatch(setFirstName(userInfo.given_name || ""));
    dispatch(setLastName(userInfo.family_name || ""));
    dispatch(setQuote(userInfo.quote || ""));
    dispatch(setDisplayedName(userInfo.displayed_name || ""));
    dispatch(setEmail(userInfo.email || ""));
    dispatch(setGender(userInfo.gender || ""));
    dispatch(setPicture(userInfo.picture || ""));
    dispatch(setLocale(userInfo.locale || ""));
    dispatch(setUserIsChanged(false));
  }
  return null;
}

export const fieldsList = [
  { name: "position", placeholder: "Position", type: "text", area: "identity" },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    area: "identity",
  },
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    area: "identity",
  },
  { name: "avatar", placeholder: "", type: "image", area: "avatar" },
  {
    name: "displayedName",
    placeholder: "Displayed name",
    type: "text",
    area: "avatar",
    max: 30,
  },
  {
    name: "quote",
    placeholder: "Quote",
    type: "text",
    area: "avatar",
    max: 50,
  },
];
