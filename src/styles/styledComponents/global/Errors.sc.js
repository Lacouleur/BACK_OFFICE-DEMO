import styled from "styled-components";
import colors from "../../core/colors";

export const ErrorNotification = styled.div`
  width: ${(props) => props.styles.width || "392px"};
  border: solid 2px ${(props) => props.styles.borderColor || colors.paleViolet};
  margin: ${(props) => props.styles.margin || "0 0 36px 50%"};
  transform: translateX(-50%);
  padding: 15px 27px 15px 27px;
  display: flex;
  transition: all ease 0.3;
`;

export const ErrorNotificationIcon = styled.img`
  width: 20px;
  align-self: flex-start;
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
