import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  ArrowIcon,
  PanelTitleContainer,
  SeparatorUser,
  PanelContainer,
  PanelMainTitle,
  PanelSectionTitle,
  ButtonBox,
} from "../../styles/styledComponents/user/user.sc";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import UserFields from "./UserFields";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import { getToken, parseJwt } from "../../services/client/tokenStuff";
import { updateUser } from "../../store/actions/thunk/UserAction.thunk";
import { dispatchUserInfo, fieldsList } from "../../helper/userHelper";
import { setPanelOpen } from "../../store/actions/userPanelActions";

const UserPanel = ({ userPanel }) => {
  const dispatch = useDispatch();
  const userPanelState = useSelector(
    ({ userPanelReducer }) => userPanelReducer
  );
  const [isLoading, setIsLoading] = useState(true);

  const { isPanelOpen, userIsChanged } = userPanelState;
  const [userInfo] = useState(parseJwt(getToken()));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    dispatchUserInfo(dispatch, userInfo);
  }, []);

  function onClickOutside() {
    dispatch(setPanelOpen(false));
  }

  useClickOutside(userPanel, onClickOutside);

  return (
    <PanelContainer isPanelOpen={isPanelOpen} isLoading={isLoading}>
      <PanelTitleContainer onClick={() => dispatch(setPanelOpen(false))}>
        <ArrowIcon src={arrow} />
        <PanelMainTitle>my profile</PanelMainTitle>
      </PanelTitleContainer>
      {fieldsList.map((field) => {
        if (field.area === "identity") {
          return (
            <UserFields
              key={`${field.name}${field.placeholder}`}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          );
        }
        return null;
      })}
      <SeparatorUser />
      <PanelSectionTitle>signature</PanelSectionTitle>
      {fieldsList.map((field) => {
        if (field.area === "avatar") {
          return (
            <UserFields
              key={`${field.name}${field.placeholder}`}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              max={field.max}
            />
          );
        }
        return null;
      })}
      <ButtonBox>
        <Button
          styles={{
            right: "0",
            left: "100%",
            top: "0",
            position: "absolute",
            transform: "translate(-100%, -100%)",
            marginTop: "38px",
          }}
          type="button"
          onClick={() => dispatch(updateUser(userInfo.sub))}
          disabled={!userIsChanged}
        >
          {userIsChanged ? "save" : "saved"}
        </Button>
      </ButtonBox>
    </PanelContainer>
  );
};

UserPanel.propTypes = {
  userPanel: PropTypes.shape({}).isRequired,
};

export default UserPanel;
