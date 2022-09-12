import styled from "styled-components";
import colors from "../../core/colors";

export const ErrorNotification = styled.div`
  margin-top: 32px;
  width: 392px;
  border: solid 2px ${colors.paleViolet};
  padding: 15px 27px 15px 27px;
  display: flex;
  transition: all ease 0.3;
`;

export const ErrorNotificationIcon = styled.img`
  width: 20px;
  margin-right: 16px;
  align-self: center;
`;

export const ErrorNotificationText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-left: 12px;
  width: 100%;
  color: ${colors.white};
`;

export const FieldErrorBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3px;
`;
