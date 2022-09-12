import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const H1 = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  line-height: 30px;
  color: ${colors.white};
`;

export const H2 = styled.h2`
  font-size: 16px;
  line-height: 30px;
  color: ${colors.white};
`;

export const TitleBox = styled.div`
  min-width: 900px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 50px;
  margin-bottom: 20px;
  height: 36px;
`;

const resultTitleMixin = css`
  margin: 32px 0;
`;

const authTitleMixin = css`
  text-align: center;
`;

export const MainTitleBox = styled.div`
  margin: auto;
  width: 392px;
  height: 90px;
  margin-bottom: 19px;
  color: ${colors.white};
  white-space: nowrap;
  ${(props) => props.resultTitle && resultTitleMixin}
  ${(props) => props.authTitle && authTitleMixin}
`;

export const TitleArrow = styled.img`
  visibility: ${(props) => props.hide};
  width: 14px;
  margin: 0 30px 0 0;
  align-self: center;
  cursor: pointer;
  display: inline;
  transition: 0.3s;

  &:hover {
    transform: scale(1.5);
  }
`;

export const FormTitle = styled.h2`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  color: ${colors.white};
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const FieldTitle = styled.h3`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
  margin-top: 26px;
  margin-bottom: 16px;
  color: ${colors.white};
`;

export const TitleIcon = styled.img`
  max-width: 20px;
  max-height: 20px;
  margin-right: 20px;
`;

export const PageTitleBox = styled.div`
  display: flex;
  width: 90%;
  height: 36px;
  margin: 150px 0 24px 5%;
`;

export const ManifestoTitle = styled.div`
  height: 26px;
  font-family: Arial;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  text-transform: uppercase;
  margin: 32px 0;
`;

export const ManifestoLang = styled.div`
  width: 90%;
  height: 26px;
  font-family: Arial;
  color: ${colors.paleViolet};
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  margin: 32px 16px;
`;

export const GreenText = styled.p`
  color: ${colors.green};
  display: inline;
`;
