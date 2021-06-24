import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  BurgerMenu,
  DisconectButton,
  HeaderContainer,
  MainLogo,
} from "../styles/styledComponents/nav/Header.sc";
import phoenixLogo from "../styles/assets/logos/phoenix-logo.svg";
import burger from "../styles/assets/icons/burger.svg";
import { getToken, deleteToken } from "../services/client/tokenStuff";

const Header = ({ position }) => {
  const [isConnected] = useState(!!getToken());
  const history = useHistory();

  return (
    <HeaderContainer position={position}>
      {isConnected && (
        <>
          <BurgerMenu src={burger} />
          <DisconectButton
            onClick={() => {
              deleteToken();
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
