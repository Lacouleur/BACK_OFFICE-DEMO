import styled from "styled-components";
import colors from "../../core/colors";

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${colors.black};
  position: relative;
  margin-top: 100px;
  min-height: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

export default FooterContainer;
