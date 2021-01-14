import styled from "styled-components";
import colors from "../../core/colors";

export const ErrorNotification = styled.div`
  width: ${(props) => props.style.width || "392px"};
  border: solid 2px ${colors.paleViolet};
  margin: ${(props) => props.style.margin || "0 0 36px 0"};
  padding: 15px 27px 15px 27px;
  display: flex;
`;

export const ErrorNotificationIcon = styled.img`
  width: 20px;
  align-self: flex-start;
  margin-top: 3px;
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
