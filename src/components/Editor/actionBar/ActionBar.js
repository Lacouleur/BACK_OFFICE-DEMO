import React from "react";
import { useHistory } from "react-router-dom";
import {
  ActionBarContainer,
  BackIcon,
  BackButton,
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";

const ActionBar = () => {
  const history = useHistory();
  return (
    <ActionBarContainer>
      <Button
        type="button"
        styles={BackButton}
        onClick={() => history.push("/dashboard")}
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
