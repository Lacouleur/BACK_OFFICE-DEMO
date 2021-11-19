import styled, { keyframes, css } from "styled-components";
import colors from "../../core/colors";

const expandPanel = keyframes`
  0% {width:0; opacity: 0; padding: 25px 0};
  100% {width: 288px;}
`;

const foldPanel = keyframes`
  0% {width: 288px;};
  100% {opacity: 0; padding: 25px 0}
`;

export const UserGlobalcontainer = styled.div``;

export const ConnectContainer = styled.div`
  position: relative;
  height: 56px;
  width: 100%;
  max-width: 1920px;
  margin: auto;
  z-index: 300;
`;

const OpenPanelMixin = css`
  animation-name: ${expandPanel};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`;

const ClosePanelMixin = css`
  animation-name: ${foldPanel};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`;

const LoadingPanelMixin = css`
  animation-name: ${foldPanel};
  animation-duration: 0s;
  width: 0;
`;

export const PanelContainer = styled.div`
  z-index: 300;
  ${(props) => (props?.isPanelOpen ? OpenPanelMixin : ClosePanelMixin)};
  animation-duration: ${(props) => {
    return props?.isLoading ? LoadingPanelMixin : "";
  }};
  width: 0;
  display: block;
  height: ${window.innerHeight}px;
  background-color: ${colors.mediumGrey};
  position: absolute;
  right: 0;
  top: 56px;
  bottom: 0;
  padding: 25px 16px;
  overflow: scroll;
  box-shadow: -4px 0px 13px 2px ${colors.shadow};
`;

export const ArrowIcon = styled.img`
  transform: rotate(180deg);
  margin-right: 16px;
  width: 7px;

  &:hover {
    width: 8px;
  }
`;

export const PanelTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 256px;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
`;

export const SeparatorUser = styled.div`
  width: 242px;
  height: 2px;
  background-color: ${colors.lightGrey};
  margin: 32px auto;
`;

export const PanelMainTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
`;

export const PanelSectionTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
`;

export const AvatarField = styled.input`
  width: 81px;
  height: 81px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transform: scale(102%);
  }
`;

export const AvatarImg = styled.img`
  position: absolute;
  left: 0;
  border: none;
  border-width: 0px;
  width: 81px;
  height: 81px;
  background-color: ${colors.lightGrey};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transform: scale(102%);
  }
`;

export const AvatarBox = styled.div`
  position: relative;
  width: 81px;
  height: 81px;
`;

export const UploaderIcon = styled.img`
  width: 24px;
  right: 0%;
  bottom: 0;
  position: absolute;
  cursor: pointer;
`;

export const ButtonBox = styled.div`
  position: relative;
  width: 256px;
  height: 56px;
`;
