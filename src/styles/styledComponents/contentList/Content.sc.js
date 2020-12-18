import styled from "styled-components";
import colors from "../../core/colors";

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
  color: ${(props) => props.style.color || `${colors.paleViolet}`};
  border-radius: 16px;
  border: ${(props) => props.style.border || `solid 2px ${colors.paleViolet}`};
  padding: 0 8px 0 8px;
  margin: 0 20px;
  background-color: ${(props) =>
    props.style.background || colors.paleVioletTransp};
  text-align: center;
  box-shadow: ${(props) =>
    props.style.shadow || `0px 0px 10px 1px ${colors.paleVioletTransp}`};
`;

export const StatusText = styled.p`
  text-transform: lowercase;
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

export const IconCreat = styled.img`
  width: 12px;
`;
