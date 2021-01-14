import React from "react";
import PropTypes from "prop-types";
import {
  ErrorNotification,
  ErrorNotificationText,
  ErrorNotificationIcon,
} from "../../styles/styledComponents/global/Errors.sc";
import errorIcon from "../../styles/assets/icons/exclamation.svg";

const Error = ({ text, style }) => {
  return (
    <ErrorNotification style={style}>
      <ErrorNotificationIcon src={errorIcon} />
      <ErrorNotificationText>{text}</ErrorNotificationText>
    </ErrorNotification>
  );
};

Error.defaultProps = {
  style: {},
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

export default Error;
