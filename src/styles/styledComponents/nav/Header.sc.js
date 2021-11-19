import styled from "styled-components";
import colors from "../../core/colors";
import powerIcon from "../../assets/icons/power.svg";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${colors.black};
  position: ${(props) => props.position || "absolute"};
  top: 0;
  z-index: 203;
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
  opacity: 0.8;
  transition: 0.3;

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.red};
  }

  &:active {
    opacity: 0.8;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5%;
  height: 100%;
  width: calc(288px - 56px);
  transform: translateY(-50%);
  top: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  background-color: ${colors.lightGrey};
  margin-right: 12px;
  border-radius: 50%;
`;

export const ProfileName = styled.p`
  text-transform: capitalize;
`;

export const MainLogo = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 30px;
`;
