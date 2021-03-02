/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import colors from "../../core/colors";

export const Container404 = styled.div`
  height: 224px;
  width: 30%;
  align-self: center;
  justify-self: center;
  margin-top: calc(25% - 50px);
  display: flex;
  background-color: pink;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.mediumGrey};
`;

export const Text404 = styled.p`
  font-size: 16px;
  line-height: 14px;
  margin-bottom: 32px;
`;

export const Title404 = styled.h2`
  font-size: 32px;
  line-height: 14px;
  align-self: center;
  margin-bottom: 32px;
`;
