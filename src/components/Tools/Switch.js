import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  SwitchBox,
  SwitchLabel,
} from "../../styles/styledComponents/editor/modules/Modules.sc";

const SwitchButton = ({ isChecked, componentId, displayedText, action }) => {
  return (
    <SwitchBox
      htmlFor={componentId}
      onChange={() => {
        action();
      }}
    >
      <p>{displayedText}</p>
      <Switch
        className="Switch"
        id={componentId}
        type="checkbox"
        checked={isChecked}
        readOnly
      />
      <SwitchLabel className="SwitchLabel" htmlFor={componentId} />
    </SwitchBox>
  );
};

SwitchButton.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
  displayedText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default SwitchButton;
