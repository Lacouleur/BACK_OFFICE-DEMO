import styled from "styled-components";
import colors from "../../core/colors";

const PageContainer = styled.div`
  padding: 0;
  position: ${(props) => props.position || "absolute"};
  height: ${(props) => props.height || "100%"};
  width: 100%;
  min-width: 750px;
  background-color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export default PageContainer;
