import React, { useState } from "react";
import PropTypes from "prop-types";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamation.svg";
import eyeIcon from "../../styles/assets/icons/eye.svg";
import {
  FieldStyle,
  FieldContainer,
  FieldError,
  ErrorIcon,
  FieldIcon,
  FieldErrorBox,
} from "../../styles/styledComponents/global/Field.sc";
import {} from "../../styles/styledComponents/auth/Auth.sc";
import { verifyField } from "../../helper/auth/verifyFields";

const Field = ({ settings }) => {
  const { icon, eye, type, placeholder, setter, status } = settings;
  const [passwordShown, setPasswordShown] = useState(false);
  const [focused, setFocused] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <FieldContainer styles={{ width: "100%" }}>
        <FieldIcon src={icon} info="fieldIcon" />
        {eye && (
          <FieldIcon
            src={eyeIcon}
            info="eyeIcon"
            onClick={togglePasswordVisiblity}
          />
        )}

        <FieldStyle
          type={type === "password" && passwordShown === true ? "text" : type}
          placeholder={placeholder}
          styles={{
            paddingLeft: "56px",
            color: `${status === "unvalid" ? colors.paleViolet : colors.white}`,
            height: "56px",
            border: `${
              focused || status === "unvalid"
                ? `2px solid ${colors.paleViolet}`
                : `none`
            }`,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            verifyField(placeholder, e.target.value, setter);
          }}
        />

        {status === "unvalid" && placeholder === "ID" && (
          <FieldErrorBox>
            <ErrorIcon src={exclamationIcon} />
            <FieldError color={colors.paleViolet}>
              Enter a valid mail adress
            </FieldError>
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
    placeholder: PropTypes.string,
    setter: PropTypes.func,
    status: PropTypes.string,
  }).isRequired,
};

export default Field;
