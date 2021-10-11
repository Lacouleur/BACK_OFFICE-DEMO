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

  const { isPanelOpen } = userPanelState;

  /*   const initialState = {
    isAccessible: false,
    isPanelOpen: false,
    position: "",
    lastName: "",
    fisrtName: "",
    displayedName: "",
    quote: "",
  }; */

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.size < 500000 &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/jpeg")
    ) {
      console.log(file);
      /*     dispatch(saveImage(name, file, moduleId));
    setFileTitle(file.name); */
    } else {
      console.log("fail upload");
      /*     dispatch(showErrorModal({ value: true, message: sizeOrFormatError(file) }));
    setFileTitle(""); */
    }
  };

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
                const { value } = e.target;
                switch (name) {
                  case "position":
                    return dispatch(setPosition(value));

                  case "lastName":
                    return dispatch(setLastName(value));

                  case "firstName":
                    return dispatch(setFirstName(value));

                  case "displayedName":
                    return dispatch(setDisplayedName(value));

                  case "quote":
                    return dispatch(setQuote(value));

                  default:
                    return null;
                }
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
                onChange={handleChange}
                style={{ display: "none" }}
              />
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
