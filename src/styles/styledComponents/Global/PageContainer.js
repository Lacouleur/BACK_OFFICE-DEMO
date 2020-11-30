import styled from "styled-components";
import colors from "../../core/colors";

export const PageContainer = styled.div`
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default PageContainer;
