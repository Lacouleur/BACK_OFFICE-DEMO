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

export const MainTitleBox = styled.div`
  width: 392px;
  height: 90px;
  margin-top: 42px;
  margin-bottom: 19px;
  color: ${colors.white};
  ${media.mobile`
  width: 288px;
  `};
`;

export const MainTitle = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  line-height: 30px;
`;

export const MainSubTitle = styled.p`
  font-size: 16px;
  line-height: 30px;
`;

export const Box = styled.div`
  width: 392px;
  height: 343px;
  padding: 24px;
  background-color: ${colors.mediumGrey};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 11px 15px ${colors.shadow};
  ${media.mobile`
  width: 288px;
  `};
`;

export const FormTitle = styled.h2`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  margin-bottom: 16px;
  color: ${colors.white};
`;

export const FieldContainer = styled.div`
  width: 100%;
  height: 52px;
  margin-top: 16px;
  position: relative;
`;

export const Field = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  border: none;
  padding-left: 52px;
  color: ${colors.white};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 14px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${colors.darkGrey} inset;
  }
  // Font styles
  &:-webkit-autofill::first-line {
    font-family: Arial;
    color: ${colors.white};
    font-size: 14px;
  }
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
  background-color: ${colors.paleViolet};
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
