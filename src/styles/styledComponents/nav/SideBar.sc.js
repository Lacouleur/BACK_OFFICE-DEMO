import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const SideBarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  width: 104px;
  z-index: 202;
  display: flex;
  flex-direction: column;
  background-color: ${colors.mediumGrey};
`;
export const SideBarText = styled.span`
  font-size: 12px;
`;

export const SideBarIcon = styled.img`
  width: 29px;
  height: 29px;
  margin-bottom: 12px;
`;

const activeIconBoxMixin = css`
  background-color: ${colors.paleVioletTransp} !important;
  box-shadow: inset 0px 0px 10px -2px ${colors.paleViolet};
`;

export const SideBarIconBox = styled.div`
  ${(props) => (props.active ? activeIconBoxMixin : ``)};
  width: 104px;
  height: 104px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: ${colors.mediumGrey};
  cursor: pointer;
  border-top: ${(props) =>
    props.top ? "none" : `1px solid ${colors.transpGrey}`};
  border-bottom: ${(props) =>
    props.bottom ? `1px solid ${colors.transpGrey}` : "none"};

  &:hover {
    ${(props) =>
      props.active
        ? ""
        : `
        background-color: ${colors.darkGrey}; 
        & ${SideBarIcon}, ${SideBarText} {
          opacity: 0.5;
        }`};
  }
`;
