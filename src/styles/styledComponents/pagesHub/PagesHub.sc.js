import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const PageCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 224px);
  grid-gap: 32px;
  justify-content: space-between;
  width: 100%;
  background-color: ${colors.mediumGrey};
  padding: 12px;
`;

export const PageCardContainer = styled.div`
  background-color: ${colors.grey};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 224px;
  height: 224px;
  justify-content: space-around;
`;

export const PageHubContainer = styled.div`
  margin-top: 56px;
  width: 80%;
  min-width: 800px;
`;

export const CardIconActionBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 16px 0;
  padding: 0 20px 0 20px;
  justify-content: space-between;
`;

export const CardIconAction = styled.img`
  width: 29px;
`;

export const CardArchiveBox = styled.div`
  position: relative;
  display: flex;

  &:hover {
    & div {
      visibility: visible;
    }
  }
`;

export const CardTitleDateBox = styled.div`
  padding: 0 16px;
`;

export const CardUpdatedDate = styled.p`
  font-size: 12px;
  line-height: 20px;
  margin: 16px 0;
  color: ${colors.lightGrey};
`;

export const CardTitle = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  justify-self: flex-end;
  width: 100%;
`;

export const CardStatusBoxMixin = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 54px;
  width: 170px;
  background-color: ${colors.darkGrey};
  border-radius: 5px;
  padding: 10px;
  &:hover {
    & div:nth-of-type(1) {
      visibility: visible;
    }
  }
`;

export const CardSatusAndLang = styled.div`
  display: flex;
`;

export const CardLang = styled.p`
  background-color: ${colors.black};
  text-transform: uppercase;
  height: 54px;
  width: 54px;
  text-align: center;
  line-height: 54px;
`;