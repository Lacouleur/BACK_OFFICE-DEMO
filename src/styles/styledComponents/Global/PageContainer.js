import styled from "styled-components";
import colors from "../../core/colors";

const PageContainer = styled.div`
  padding: 0;
  position: absolute;
  height: ${(props) => props.height || "auto"};
  width: 100%;
  background-color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
`;

export default PageContainer;
