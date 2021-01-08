import styled from "styled-components";
import colors from "../../core/colors";

const Button = styled.button`
  background-color: ${(props) =>
    props.style.background || `${colors.paleViolet}`};
  color: ${(props) => props.style.fontColor || `${colors.black}`};
  cursor: ${(props) => props.style.cursor || "pointer"};
  border: ${(props) => props.style.borderRadius || "none"};
  border-radius: ${(props) => props.style.borderRadius || "5px"};
  width: ${(props) => props.style.width || "100px"};
  height: ${(props) => props.style.height || "36px"};
  font-size: ${(props) => props.style.fontSize || "14px"};
  line-height: ${(props) => props.style.lineHeight || "16px"};
  text-transform: ${(props) => props.style.textTransform || "uppercase"};
  font-family: ${(props) => props.style.fontFamily || "Roboto, sans-serif"};
  padding: ${(props) => props.style.display || "0 0 0 0"};
  display: ${(props) => props.style.display || "box"};
  justify-content: ${(props) => props.style.justifyContent || "flex-start"};
  align-items: ${(props) => props.style.alignItems || "flex-start"};
  align-self: ${(props) => props.style.alignSelf || "center"};
  margin-top: ${(props) => props.style.marginTop || "0"};
  margin-right: ${(props) => props.style.marginRight || "0"};
  margin-left: ${(props) => props.style.marginLeft || "0"};
  margin-bottom: ${(props) => props.style.marginBottom || "0"};
  transition: 0.3s;
  opacity: 0.8;
  pointer-events: ${(props) => props.style.pointerEvents || "auto"};

  &:active {
    background-color: ${colors.paleVioletTransp};
  }
  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export default Button;
