import styled from "styled-components";
import colors from "../../../core/colors";

const Button = styled.button`
  background-color: ${(props) =>
    props.styles?.background || `${colors.paleViolet}`};
  color: ${(props) => props.styles?.fontColor || `${colors.black}`};
  cursor: ${(props) => props.styles?.cursor || "pointer"};
  border: ${(props) => props.styles?.borderRadius || "none"};
  border-radius: ${(props) => props.styles?.borderRadius || "5px"};
  width: ${(props) => props.styles?.width || "100px"};
  height: ${(props) => props.styles?.height || "36px"};
  font-size: ${(props) => props.styles?.fontSize || "14px"};
  line-height: ${(props) => props.styles?.lineHeight || "16px"};
  text-transform: ${(props) => props.styles?.textTransform || "uppercase"};
  font-family: ${(props) => props.styles?.fontFamily || "Roboto, sans-serif"};
  padding: ${(props) => props.styles?.display || "0 0 0 0"};
  display: ${(props) => props.styles?.display || "box"};
  justify-content: ${(props) => props.styles?.justifyContent || "flex-start"};
  align-items: ${(props) => props.styles?.alignItems || "flex-start"};
  align-self: ${(props) => props.styles?.alignSelf || "center"};
  margin-top: ${(props) => props.styles?.marginTop || "0"};
  margin-right: ${(props) => props.styles?.marginRight || "0"};
  margin-left: ${(props) => props.styles?.marginLeft || "0"};
  margin-bottom: ${(props) => props.styles?.marginBottom || "0"};
  transition: 0.3s;
  opacity: 0.8;
  pointer-events: ${(props) => props.styles?.pointerEvents || "auto"};

  &:active {
    background-color: ${colors.paleVioletTransp};
  }
  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export default Button;