import styled from "styled-components";
import colors from "../../../core/colors";

export const ModuleBlock = styled.div`
  cursor: pointer;
  width: 10%;
  min-width: 50px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  background-color: ${colors.paleViolet};
  transition: 0.2s;
  opacity: 0.8;
  border-radius: 5px;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export const ModulesListContainer = styled.div`
  width: 100%;
  min-width: 100%;
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ModuleImg = styled.img`
  width: 50%;
`;
export const toto = "titi";
