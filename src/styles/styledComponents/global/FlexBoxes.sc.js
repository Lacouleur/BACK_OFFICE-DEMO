import styled from "styled-components";
import colors from "../../core/colors";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.style.flexDirection || "row"};
  justify-content: ${(props) => props.style.justifyContent || "flex-start"};
  align-items: ${(props) => props.style.alignItems || "flex-start"};
  background-color: ${(props) => props.style.backgroundColor || "transparent"};
  width: ${(props) => props.style.width || "auto"};
  height: ${(props) => props.style.height || "auto"};
  min-height: ${(props) => props.style.minHeight || "none"};
  max-height: ${(props) => props.style.maxHeight || "none"};
  margin-top: ${(props) => props.style.marginTop || "0"};
  margin-right: ${(props) => props.style.marginRight || "0"};
  margin-left: ${(props) => props.style.marginLeft || "0"};
  margin-bottom: ${(props) => props.style.marginBottom || "0"};
  margin: ${(props) => props.style.margin || "0"};
  padding: ${(props) => props.style.padding || "none"};
  color: ${(props) => props.style.margin || colors.white};
  justify-self: ${(props) => props.style.justifySelf || "felx-start"};
  align-self: ${(props) => props.style.alignSelf || "felx-start"};
  overflow: ${(props) => props.style.overflow || "hidden"};
  flex-grow: ${(props) => props.style.flexGrow || "none"};
`;

export default Flex;
