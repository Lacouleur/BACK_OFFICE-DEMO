import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  SwitchBox,
  SwitchLabel,
} from "../../styles/styledComponents/global/Switch.sc";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";

const SwitchButton = ({
  isChecked,
  componentId,
  displayedText,
  action,
  styleVariant,
  disable,
  tooltipMessage,
}) => {
  return (
    <SwitchBox
      tooltip={tooltipMessage || false}
      disable={disable || false}
      htmlFor={componentId}
      styleVariant={styleVariant}
      onChange={() => {
        action();
      }}
    >
      <Tooltip wide>
        <TooltipText>{tooltipMessage}</TooltipText>
      </Tooltip>

      <p>{displayedText}</p>
      <Switch
        className="Switch"
        styleVariant={styleVariant}
        id={componentId}
        type="checkbox"
        checked={isChecked}
        readOnly
      />
      <SwitchLabel
        className="SwitchLabel"
        styleVariant={styleVariant}
        htmlFor={componentId}
      />
    </SwitchBox>
  );
};

SwitchButton.defaultProps = {
  styleVariant: "regular",
  disable: false,
  tooltipMessage: undefined,
};

SwitchButton.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
  displayedText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  styleVariant: PropTypes.string,
  disable: PropTypes.bool,
  tooltipMessage: PropTypes.string,
};

export default SwitchButton;
