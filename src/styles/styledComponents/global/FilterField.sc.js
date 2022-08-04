import styled, { css } from "styled-components";
import colors from "../../core/colors";
import cross from "../../assets/icons/cross-white.svg";

export const FilterFieldContainer = styled.div``;

export const FilterInput = styled.input`
  width: 250px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.darkGrey};
  border: solid 1px ${colors.white};
  color: ${colors.white};
  padding: 0 16px;
  font-size: 16px;
  line-height: 32px;

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 10px;
    background-image: url(${cross});
    background-size: 10px 10px;
  }
`;
