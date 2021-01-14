import styled from "styled-components";
import colors from "../../core/colors";

export const LineContentBox = styled.div`
  display: flex;
  width: 100%;
  min-height: 59px;
  max-height: 59px;
  align-items: center;
  justify-content: space-between;
  margin: 0 0;
  background-color: ${(props) => props.styles.backgroundColor};
`;

export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  max-width: 5%;
  min-width: 125px;
`;

export const CategoryName = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  min-width: 120px;
  max-width: 120px;
  margin-right: 20px;
  margin: 0 20px;
`;

export const Title = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  width: 40%;
  min-width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
`;

export const Status = styled.div`
  height: 32px;
  font-size: 14px;
  line-height: 28px;
  color: ${(props) => props.styles.color || `${colors.paleViolet}`};
  border-radius: 16px;
  border: ${(props) => props.styles.border || `solid 2px ${colors.paleViolet}`};
  padding: 0 8px 0 8px;
  margin: 0 20px;
  background-color: ${(props) =>
    props.styles.background || colors.paleVioletTransp};
  text-align: center;
  box-shadow: ${(props) =>
    props.styles.shadow || `0px 0px 10px 1px ${colors.paleVioletTransp}`};
`;

export const StatusText = styled.p`
  text-transform: lowercase;
`;

export const ActionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 10%;
  min-width: 205px;
  margin-right: 20px;
`;

export const Action = styled.div`
  margin: 0 20px;
  text-decoration: underline;
  display: flex;
  flex-wrap: nowrap;
`;

export const IconAction = styled.img`
  width: 14px;
  margin-left: 8px;
`;
