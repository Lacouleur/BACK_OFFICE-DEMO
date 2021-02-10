import styled from "styled-components";
import colors from "../../core/colors";

export const ActionBarContainer = styled.div`
  width: 100%;
  height: 40px;
  top: 56px;
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${colors.black};
  transition: 0.3s;
  z-index: 100;
  border-top: 1px solid ${colors.paleVioletTransp};

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
    border-top: 1px solid ${colors.paleViolet};
  }
`;

export const BackButton = {
  height: "28px",
  width: "28px",
  position: "relative",
  marginRight: "20px",
  marginLeft: "20px",
};

export const BackIcon = styled.img`
  width: 16px;
  position: absolute;
  right: 0;
  left: 0;
  top: 6px;
  bottom: 0;
  margin: auto auto;
`;
