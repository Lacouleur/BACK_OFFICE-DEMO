import React from "react";
import {
  BurgerMenu,
  DisconectButton,
  HeaderContainer,
  MainLogo,
} from "../styles/styledComponents/Navigation/Header";
import phoenixLogo from "../styles/assets/logos/phoenix-logo.svg";
import burger from "../styles/assets/icons/burger.svg";

const Header = (isConnected = false) => {
  return (
    <HeaderContainer>
      {!isConnected && (
        <>
          <BurgerMenu src={burger} />
          <DisconectButton />
        </>
      )}
      <MainLogo src={phoenixLogo} />
    </HeaderContainer>
  );
};

export default Header;
