import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
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
  FieldBox,
} from "../../styles/styledComponents/global/Field.sc";
import {} from "../../styles/styledComponents/auth/Auth.sc";
import {
  setErrorAuth,
  setMail,
  setPassword,
} from "../../store/actions/authActions";

const AuthField = ({ icon, eye, type, placeholder, status }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <FieldContainer styles={{ width: "100%" }}>
      <FieldBox>
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
            color: `${status ? colors.paleViolet : colors.white}`,
            height: "56px",
            border: `${
              focused || status ? `2px solid ${colors.paleViolet}` : `none`
            }`,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            dispatch(setErrorAuth(false));
            if (type === "mail") {
              dispatch(setMail(e.target.value));
            }
            if (type === "password") {
              dispatch(setPassword(e.target.value));
            }
          }}
        />
      </FieldBox>
      {status && placeholder === "ID" && (
        <FieldErrorBox>
          <ErrorIcon src={exclamationIcon} />
          <FieldError color={colors.paleViolet}>
            Enter a valid mail adress
          </FieldError>
        </FieldErrorBox>
      )}
    </FieldContainer>
  );
};

AuthField.propTypes = {
  icon: PropTypes.string.isRequired,
  eye: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

export default AuthField;