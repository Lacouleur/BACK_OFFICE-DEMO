import styled from "styled-components";
import colors from "../../core/colors";
import powerIcon from "../../assets/icons/power.svg";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${colors.black};
  position: relative;
`;

export const DisconectButton = styled.button`
  height: 56px;
  width: 56px;
  border: none;
  background-color: ${colors.red};
  background-image: url(${powerIcon});
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  right: 0;
`;

export const BurgerMenu = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 0;
  margin-left: 16px;
`;

export const MainLogo = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
