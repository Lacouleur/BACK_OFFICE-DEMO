import styled from "styled-components";
import colors from "../../core/colors";

const PageContainer = styled.div`
  padding: 0;
  position: ${(props) => props.position || "relative"};
  height: ${(props) => props.height || ""};
  width: 100%;
  min-width: 800px;
  color: ${colors.white};
  background-color: ${colors.darkGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: ${(props) => (props.isModalOpen ? "hidden" : "visible")};
`;

export default PageContainer;
