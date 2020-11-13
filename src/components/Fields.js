/* eslint-disable react/prop-types */
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import colors from "../styles/core/colors";
import excalamtionIcon from "../styles/assets/icons/exclamation.svg";
import eyeIcon from "../styles/assets/icons/eye.svg";
import {
  FieldStyle,
  FieldContainer,
  FieldError,
  FieldIcon,
  ErrorIcon,
  FieldErrorBox,
} from "../styles/styledComponents/Auth/Auth";
import verifyField from "../helper/auth/verifyFields";

const Field = ({ settings }) => {
  const { icon, eye, type, name, placeholder, setter, status } = settings;
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <FieldContainer>
        <FieldIcon src={icon} info="fieldIcon" />
        {eye && (
          <FieldIcon
            src={eyeIcon}
            info="eyeIcon"
            onClick={togglePasswordVisiblity}
          />
        )}
        <FieldStyle
          autoComplete="off"
          name={name}
          type={
            name === "pwd" && passwordShown === false ? "password" : { type }
          }
          placeholder={placeholder}
          color={
            name === "ID" && status === "unvalid"
              ? colors.paleViolet
              : colors.lightGrey
          }
          border={
            name === "ID" && status === "unvalid"
              ? `2px solid ${colors.paleViolet}`
              : `none`
          }
          onChange={(e) => verifyField(name, e.target.value, setter)}
        />
        {status === "unvalid" && name === "ID" && (
          <FieldErrorBox>
            <ErrorIcon src={excalamtionIcon} />
            <FieldError> Enter a valid mail adress </FieldError>
          </FieldErrorBox>
        )}
      </FieldContainer>
    </>
  );
};

Field.propTypes = {
  settings: PropTypes.shape({
    icon: PropTypes.string,
    eye: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    setter: PropTypes.func,
    status: PropTypes.string,
  }).isRequired,
};

export default Field;
