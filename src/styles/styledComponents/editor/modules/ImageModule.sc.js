/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import colors from "../../../core/colors";

export const Thumbnail = styled.img`
  position: absolute;
  max-width: 150px;
  max-height: 244px;
  right: 30%;
  top: 70px;
  height: 100px;
  box-shadow: 0px 0px 31px 2px ${colors.shadow};
`;
