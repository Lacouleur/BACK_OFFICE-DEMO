import { PropTypes } from "prop-types";
import React, { useState } from "react";
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
import { watchChangeForm, handleChangeAvatar } from "../../helper/userHelper";

const UserFields = ({ name, type, placeholder, max }) => {
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
                watchChangeForm(e.target.value, name, dispatch);
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
                onChange={(e) => handleChangeAvatar(e, dispatch)}
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
