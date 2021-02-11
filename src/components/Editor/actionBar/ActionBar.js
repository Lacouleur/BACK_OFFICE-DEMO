import React from "react";
import {
  ActionBarContainer,
  BackIcon,
  BackButton,
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import { hostUrl } from "../../../services/config/clientConfig";

const ActionBar = () => {
  return (
    <ActionBarContainer>
      <Button
        type="button"
        styles={BackButton}
        onClick={() => window.location.assign(`${hostUrl}`)}
      >
        <BackIcon src={backArrow} />
      </Button>
      <Button styles={{ height: "28px" }} type="submit">
        save
      </Button>
    </ActionBarContainer>
  );
};

export default ActionBar;
