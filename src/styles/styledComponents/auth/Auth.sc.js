import styled from "styled-components";
import colors from "../../core/colors";

export const AuthBox = styled.div`
  height: 100%;
  margin-top: 150px;
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
`;
