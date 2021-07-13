import styled from "styled-components";
import colors from "../../core/colors";

export const ModulesContainer = styled.div`
  padding-top: 131px;
  width: 70%;
  margin: 12px auto auto auto;
  max-width: 2000px;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  background-color: ${colors.mediumGrey};
  min-width: 900px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
`;

export const TotalInfo = styled.div`
  min-width: 150px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  margin-top: 32px;
  background-color: ${colors.darkGrey};
`;

export const BoldText = styled.p`
  font-weight: bold;
`;

export const RegularText = styled.p`
  font-weight: normal;
`;

export const LightText = styled.p`
  font-weight: lighter;
`;

export const ResponseList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const ElementBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const returnButton = {
  height: "42px",
  width: "176px",
  display: "flex",
  background: "transparent",
  position: "absolute",
  top: "88px",
  left: "24px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "9px 26px",
  border: `1px solid ${colors.white}`,
};

export const modifyButton = {
  background: "transparent",
  fontColor: `${colors.paleViolet}`,
  border: `1px solid ${colors.paleViolet}`,
  fontWeight: "700",
  marginTop: "12px",
};

export const ReturnText = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  line-height: 24px;
  color: ${colors.white};
`;

export const IsRightIcon = styled.img`
  width: 24px;
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 32px;
  width: 80px;
`;

export const PercentBox = styled.div`
  display: flex;
  width: 120px;
`;
