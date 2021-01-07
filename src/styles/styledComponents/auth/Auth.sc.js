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

export const FieldContainer = styled.div`
  width: 100%;
  height: 52px;
  margin: 16px 0 16px 0;
  position: relative;
`;

export const FieldStyle = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  border: none;
  padding-left: 52px;
  border-bottom: ${(props) => props.border};
  color: ${(props) => props.color};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;

  // customing the native CSS for autocomplet.
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${colors.darkGrey} inset;
  }
  &:-webkit-autofill::first-line {
    font-family: Arial;
    color: ${colors.lightGrey};
    font-size: 14px;
  }
`;

export const ErrorNotification = styled.div`
  width: 392px;
  border: solid 2px ${colors.paleViolet};
  margin-top: 36px;
  padding: 15px 27px 15px 27px;
  display: flex;
  ${media.mobile`
  width: 288px;
  `};
`;

export const ErrorNotificationIcon = styled.img`
  width: 20px;
  align-self: flex-start;
  margin-top: 3px;
`;

export const ErrorNotificationText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-left: 12px;
  width: 100%;
  color: ${colors.white};
`;

export const FieldErrorBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3px;
`;

export const FieldIcon = styled.img`
  position: absolute;
  left: ${(props) => (props.info === "eyeIcon" ? "90%" : "0")};
  margin: ${(props) => (props.info === "eyeIcon" ? "0" : "0 0 0 13px")};
  top: 50%;
  transform: translateY(-50%);
  ${media.mobile`
  left: ${(props) => (props.info === "eyeIcon" ? "85%" : "0")};
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
