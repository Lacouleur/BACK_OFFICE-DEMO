import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DisconectButton,
  HeaderContainer,
  MainLogo,
} from "../styles/styledComponents/nav/Header.sc";
import phoenixLogo from "../styles/assets/logos/phoenix-logo.svg";
import { getToken, deleteToken } from "../services/client/tokenStuff";

const Header = ({ position }) => {
  const [isConnected] = useState(!!getToken());
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <HeaderContainer position={position}>
      {isConnected && (
        <>
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
