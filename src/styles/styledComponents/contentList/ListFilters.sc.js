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
  position: absolute;
  top: 0;
  width: 100%;
  height: 32px;
  background-color: ${colors.mediumGrey};
  border: 1px solid ${colors.lightGrey};
  padding-left: 68px;
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
  width: 300px;
  height: 32px;
  max-height: 32px;
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

export const LangOfResearchButton = styled(ReactSelect)`
  /*  position: absolute;
  top: 0px;
  z-index: 1; */
  & #react-select-3-option-0 {
    word-spacing: 5px;
  }

  & .selectFlag {
    &__indicator &__dropdown-indicator {
      border-color: transparent transparent red;
    }

    &__indicator {
      display: none;
      min-height: 32px;

      &-separator {
        display: none;
      }
    }

    &__control {
      width: 64px;
      min-height: 32px;
      background-color: ${colors.mediumGrey};
      border: 1px solid ${colors.white};
      border-bottom-left-radius: 25px;
      border-top-left-radius: 25px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;

      &--is-focused {
        border: 1px solid ${colors.white};
        border-top-left-radius: 15px;
        border-bottom-left-radius: 0px;
        border-bottom: none;
        box-shadow: none;
      }
    }

    &__placeholder {
      color: ${colors.paleViolet};
    }

    &__menu {
      margin-top: -1px;
      z-index: -1;
      background-color: ${colors.darkGrey};
      border: 1px solid ${colors.white};
      box-shadow: none;
      border-top: none;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      overflow: hidden;
      width: 64px;
      height: 100px;
    }

    &__option {
      color: ${(props) => props.color || colors.white};
      height: 32px;
      padding: 6px 0 6px 10px;
    }

    &__option {
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__single {
      &-value {
        color: white;
        position: absolute;
        line-height: 32px;
      }
    }

    &__clear {
      &-indicator {
        color: ${colors.paleVioletTransp};
        &:hover {
          color: ${colors.paleViolet};
        }
      }
    }

    &__value {
      padding-left: 8px;
      &-container {
        line-height: 32px;
      }
    }
  }
`;
