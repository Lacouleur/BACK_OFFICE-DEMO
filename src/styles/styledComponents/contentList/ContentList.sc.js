import styled from "styled-components";
import colors from "../../core/colors";

export const ContentSectionBox = styled.div`
  margin-top: 56px;
  overflow: hidden;
  min-width: 800px;
`;

export const TitleBox = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  height: 36px;
  flex-grow: 1;
`;

export const ListBox = styled.div`
  flex-direction: column;
  min-height: 500px;
  max-height: 1110px;
  height: 70vh;
  width: 100%;
  padding: 30px;
  background-color: ${colors.mediumGrey};
  overflow: scroll;
`;

export const IconCreat = styled.img`
  width: 12px;
`;
