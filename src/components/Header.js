import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  DisconectButton,
  HeaderContainer,
  MainLogo,
  ProfileBox,
  ProfileName,
} from "../styles/styledComponents/nav/Header.sc";
import phoenixLogo from "../styles/assets/logos/phoenix-logo.svg";
import { getToken, deleteToken } from "../services/client/tokenStuff";
import { setPanelOpen } from "../store/actions/userPanelActions";
import UserPanel from "./User/UserPanel";
import { UserGlobalcontainer } from "../styles/styledComponents/user/user.sc";

const Header = ({ position }) => {
  const [isConnected] = useState(!!getToken());
  const history = useHistory();
  const dispatch = useDispatch();
  const userPanel = useRef();

  const userPanelState = useSelector(
    ({ userPanelReducer }) => userPanelReducer
  );

  const { isAccessible, isPanelOpen, picture } = userPanelState;

  return (
    <HeaderContainer position={position}>
      {isConnected && (
        <>
          <UserGlobalcontainer ref={userPanel}>
            {isAccessible && (
              <ProfileBox
                onClick={() => {
                  dispatch(setPanelOpen(!isPanelOpen));
                }}
              >
                <Avatar src={picture.urls.thumbnail.url} />
                <ProfileName>My profile</ProfileName>
              </ProfileBox>
            )}
            <UserPanel userPanel={userPanel} />
          </UserGlobalcontainer>

          <DisconectButton
            onClick={() => {
              deleteToken(dispatch);
              history.push("/");
            }}
          />
        </>
      )}
      <MainLogo src={phoenixLogo} />
    </HeaderContainer>
  );
};

Header.defaultProps = {
  position: undefined,
};

Header.propTypes = {
  position: PropTypes.string,
};

export default Header;
