import React, { useState, useRef, useEffect } from "react";
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
} from "../../styles/styledComponents/nav/Header.sc";
import phoenixLogo from "../../styles/assets/logos/phoenix-logo.svg";
import {
  getToken,
  deleteToken,
  parseJwt,
} from "../../services/client/tokenStuff";
import {
  ConnectContainer,
  UserGlobalcontainer,
} from "../../styles/styledComponents/user/user.sc";
import { dispatchUserInfo } from "../../helper/userHelper";

const Header = ({ position }) => {
  const [userInfo] = useState(parseJwt(getToken()));
  const [isConnected] = useState(!!getToken());
  const history = useHistory();
  const dispatch = useDispatch();
  const userPanel = useRef();

  const userState = useSelector(({ userReducer }) => userReducer);

  useEffect(() => {
    dispatchUserInfo(dispatch, userInfo);
  }, []);

  const { firstName, lastName, picture, position: post } = userState;

  // "position props is for "position" css attribute fixed or absolute.
  return (
    <HeaderContainer position={position}>
      {isConnected && (
        <ConnectContainer>
          <UserGlobalcontainer ref={userPanel}>
            <ProfileBox>
              <Avatar src={picture?.urls?.thumbnail?.url || undefined} />
              <ProfileName>{`${firstName} ${lastName} -- ${post}`}</ProfileName>
            </ProfileBox>
          </UserGlobalcontainer>

          <DisconectButton
            onClick={() => {
              deleteToken(dispatch);
              history.push("/");
            }}
          />
        </ConnectContainer>
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
