import styled from "styled-components";
import colors from "../../core/colors";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.style.flexDirection || "row"};
  justify-content: ${(props) => props.style.justifyContent || "flex-start"};
  align-items: ${(props) => props.style.alignItems || "flex-start"};
  background-color: ${(props) => props.style.backgroundColor || "transparent"};
  width: ${(props) => props.style.width || "auto"};
  height: ${(props) => props.style.width || "100%"};
  margin-top: ${(props) => props.style.marginTop || "0"};
  margin-right: ${(props) => props.style.marginRight || "0"};
  margin-left: ${(props) => props.style.marginLeft || "0"};
  margin-bottom: ${(props) => props.style.marginBottom || "0"};
  margin: ${(props) => props.style.margin || "0"};
  padding: ${(props) => props.style.padding || "none"};
  color: ${(props) => props.style.margin || colors.white};
`;

export default Flex;
