import styled, { css } from "styled-components";
import ReactSelect from "react-select";
import colors from "../../core/colors";

export const ContentSectionBox = styled.div`
  margin-top: 56px;
  min-width: 800px;
`;

export const ListBox = styled.div`
  flex-direction: column;
  width: 100%;
  padding: 30px;
  background-color: ${colors.mediumGrey};
`;

export const IconCreat = styled.img`
  width: 12px;
`;

export const ManifestoLangSelector = styled(ReactSelect)`
  margin-left: 20px;

  & .select {
    &__dropdown {
      &-indicator {
        display: none;
      }
    }

    &__indicator {
      display: none;
      &-separator {
        display: none;
      }
    }

    &__control {
      height: 43px;
      width: 117px;
      background-color: ${colors.darkGrey};
      border: 1px solid ${colors.paleViolet};
      border-bottom: 1px solid ${colors.paleViolet};
      opacity: 0.8;

      &:hover {
        cursor: pointer;
        border: 1px solid ${colors.paleViolet};
        opacity: 1;
        box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
      }

      &--is-focused {
        box-shadow: none;
      }
    }

    &__placeholder {
      color: ${colors.paleViolet};
      text-transform: uppercase;
    }

    &__menu {
      margin-top: 0px;
      background-color: ${colors.black};
      border: none;
      box-shadow: none;
      border-radius: 0;
      width: 117px;
    }

    &__option {
      background-color: ${colors.black};
      color: ${(props) => props.color || colors.white};
    }

    &__option {
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__single {
      &-value {
        color: white;
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
      &-container {
        display: flex;
        justify-content: center;
        padding: 0;
      }
    }
  }
`;

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
