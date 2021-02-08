import styled from "styled-components";
import colors from "../../core/colors";
import media from "../../core/mediaQuery";

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

export const MainTitleBox = styled.div`
  width: 392px;
  height: 90px;
  margin-bottom: 19px;
  color: ${colors.white};
  white-space: nowrap;
  ${media.mobile`
  width: 288px;
  `};
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
  width: 20px;
  margin-right: 20px;
`;

export const PageTitleBox = styled.div`
  display: flex;
  width: 90%;
  height: 36px;
  margin: 150px 0 24px 5%;
`;
