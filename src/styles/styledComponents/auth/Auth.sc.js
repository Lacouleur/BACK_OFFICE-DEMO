import styled from "styled-components";
import colors from "../../core/colors";
import media from "../../core/mediaQuery";

export const Container = styled.div`
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 392px;
  height: 343px;
  padding: 24px;
  background-color: ${colors.mediumGrey};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0px 11px 15px ${colors.shadow};
  ${media.mobile`
  width: 288px;
  `};
`;

export const ValidateButton = styled.button`
  background-color: ${(props) => props.style.background};
  color: ${(props) => props.style.fontColor};
  cursor: ${(props) => props.style.cursor};
  border: none;
  border-radius: 5px;
  width: 72px;
  height: 36px;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  align-self: flex-end;
  margin-top: auto;
  ${media.mobile`
  width: 100%;
  `};
`;
