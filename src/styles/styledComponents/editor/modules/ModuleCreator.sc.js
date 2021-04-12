import styled from "styled-components";
import colors from "../../../core/colors";

export const DeleteModule = styled.div`
  position: absolute;
  right: 5%;
  width: 16px;
`;

export const ModulesContainer = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ModuleBox = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 10vw;
  height: 10vw;
  background-color: ${colors.paleViolet};
  transition: 0.3s;
  opacity: 0.8;
  border-radius: 5px;

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export const ModuleText = styled.div`
  color: ${colors.darkGrey};
`;

export const ModuleIcon = styled.img`
  margin-top: 20px;
  width: 50px;
`;

export const Close = styled.img`
  z-index: 21;
  width: 20px;
  height: 20px;
  transition: 0.3s;
  position: absolute;
  right: 76px;
  top: 30px;

  &:hover {
    transform: rotate(90deg);
  }
`;
