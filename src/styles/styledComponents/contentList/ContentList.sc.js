import styled from "styled-components";
import ReactSelect from "react-select";
import colors from "../../core/colors";

export const ContentSectionBox = styled.div`
  margin-top: 56px;
  min-width: 800px;
`;

export const TitleBox = styled.div`
  min-width: 900px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 50px;
  margin-bottom: 20px;
  height: 36px;
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
