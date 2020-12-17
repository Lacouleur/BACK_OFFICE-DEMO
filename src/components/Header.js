import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BurgerMenu,
  DisconectButton,
  HeaderContainer,
  MainLogo,
} from "../styles/styledComponents/nav/Header.sc";
import phoenixLogo from "../styles/assets/logos/phoenix-logo.svg";
import burger from "../styles/assets/icons/burger.svg";
import { getToken, deleteToken } from "../services/client/authClient";

const Header = () => {
  const [isConnected] = useState(!!getToken());
  const history = useHistory();

  return (
    <HeaderContainer>
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

export default Header;
