import { PropTypes } from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FieldBox,
  FieldContainer,
  FieldStyle,
} from "../../styles/styledComponents/global/Field.sc";
import {
  AvatarBox,
  AvatarField,
  AvatarImg,
  UploaderIcon,
} from "../../styles/styledComponents/user/user.sc";
import DlIcon from "../../styles/assets/icons/download-violet.svg";
import {
  setDisplayedName,
  setFirstName,
  setLastName,
  setPosition,
  setQuote,
} from "../../store/actions/userPanelActions";
import { showErrorModal } from "../../store/actions/actionBarActions";
import { sizeOrFormatError } from "../../helper/errorMessages";
import { saveAvatar } from "../../store/actions/thunk/UserAction.thunk";

function watchChageForm(value, name, dispatch) {
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

const handleChange = (event, dispatch) => {
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

const UserFields = ({ name, type, placeholder, max }) => {
  // Next functions concern File Uploader fields
  const hiddenFileInput = React.useRef(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const userPanelState = useSelector(
    ({ userPanelReducer }) => userPanelReducer
  );

  const { picture } = userPanelState;

  switch (type) {
    case "text": {
      return (
        <FieldContainer>
          <FieldBox>
            <FieldStyle
              styles={{
                width: "256px",
                height: "56px",
              }}
              type={type}
              placeholder={placeholder}
              name={name}
              maxLength={max || ""}
              defaultValue={userPanelState[name]}
              onInput={(e) => {
                watchChageForm(e.target.value, name, dispatch);
              }}
            />
          </FieldBox>
        </FieldContainer>
      );
    }

    case "image": {
      return (
        <FieldContainer>
          <FieldBox
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <AvatarBox>
              <AvatarField placeholder={placeholder} type="text" disabled />
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => handleChange(e, dispatch)}
                style={{ display: "none" }}
              />
              {picture?.urls?.thumbnail?.url && (
                <>
                  <AvatarImg src={picture?.urls?.thumbnail?.url} />
                </>
              )}
              <UploaderIcon src={DlIcon} />
            </AvatarBox>
          </FieldBox>
        </FieldContainer>
      );
    }

    default:
      return null;
  }
};

UserFields.defaultProps = {
  max: undefined,
};

UserFields.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
};

export default UserFields;
