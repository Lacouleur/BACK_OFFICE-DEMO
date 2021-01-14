import React from "react";
import PropTypes from "prop-types";
import {
  ErrorNotification,
  ErrorNotificationText,
  ErrorNotificationIcon,
} from "../../styles/styledComponents/global/Errors.sc";
import errorIcon from "../../styles/assets/icons/exclamation.svg";
import validIcon from "../../styles/assets/icons/validIcon.svg";

const Error = ({ text, style, type }) => {
  const icon = type === "error" ? errorIcon : validIcon;
  const styled = type === "error" ? style : { ...style, borderColor: "green" };

  return (
    <ErrorNotification styles={styled}>
      <ErrorNotificationIcon src={icon} />
      <ErrorNotificationText>{text}</ErrorNotificationText>
    </ErrorNotification>
  );
};

Error.defaultProps = {
  style: {},
  type: "error",
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  type: PropTypes.string,
};

export default Error;
