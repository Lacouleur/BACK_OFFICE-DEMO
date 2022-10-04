import styled, { css } from "styled-components";
import ReactSelect from "react-select";
import colors from "../../core/colors";

export const FilteringBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 32px;
  margin: 16px 0;
`;

export const LangFilter = styled.div`
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 32px;
`;

const firstOptionMixin = css`
  border-radius: 25px 0 0 25px;
`;

const lastOptionMixin = css`
  border-radius: 0 25px 25px 0;
`;

const selectedMixin = css`
  background-color: ${colors.white} !important;
  color: ${colors.black} !important;
`;

export const OptionFilter = styled.div`
  ${(props) => props.first && firstOptionMixin}
  ${(props) => props.last && lastOptionMixin}
  width: calc(120px / 3);
  ${(props) => props.selected && selectedMixin}
  width: calc(120px / 3);
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-transform: capitalize;
  outline: 1px solid ${colors.white};
  background-color: ${colors.mediumGrey};
  cursor: pointer;
`;

export const ResearchFilterField = styled.input`
  width: 100%;
  height: 32px;
  background-color: ${colors.mediumGrey};
  border: 1px solid ${colors.lightGrey};
  padding-left: 32px;
  padding-right: 0;
  color: ${colors.white};
  cursor: auto;
  caret-color: ${colors.white};
  text-overflow: clip;
  border-radius: 25px;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    border: 1px solid ${colors.white};
  }

  &:focus {
    border: 1px solid ${colors.paleViolet};
  }
`;

export const ResearchIcon = styled.img`
  position: absolute;
  width: 12px;
  right: 6px;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ResearchFilterBox = styled.div`
  position: relative;
  width: 250px;
  margin-left: 32px;
`;

export const ResearchButton = styled.div`
  background-color: ${colors.mediumGrey};
  width: 32px;
  height: 100%;
  position: absolute;
  right: 0px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: 1px solid ${colors.white};
  top: 50%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    background-color: ${colors.paleViolet};
  }
`;

export const LangOfResearchButton = styled(ReactSelect)``;
