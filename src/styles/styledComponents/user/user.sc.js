import styled, { keyframes, css } from "styled-components";
import ReactSelect from "react-select";
import colors from "../../core/colors";

const expand = keyframes`
  0% { background-color: rgba(28, 28, 28, 0)};
  100% { background-color: ${colors.matBlack};}
`;

const fold = keyframes`
  0% { background-color: ${colors.matBlack};}
  100% { background-color: rgba(28, 28, 28, 0)};
`;

const disabledMixin = css`
  background-color: ${colors.lightGrey}!important;

  &:hover {
    opacity: 0.8 !important;
    cursor: not-allowed !important;
    box-shadow: 0px 0px 10px 1px ${colors.mediumGrey}!important;
  }
`;

export const SaveButton = styled.button`
  ${(props) => (props.disabled ? disabledMixin : "")};
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  margin-left: 56px;
  border: none;
  background-color: ${colors.paleViolet};

  &:active {
    background-color: ${colors.paleVioletTransp};
  }
  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export const UserGlobalcontainer = styled.div``;

export const ConnectContainer = styled.div`
  position: relative;
  height: 56px;
  width: 100%;
  margin: auto;
  z-index: 300;
`;

export const Selector = styled(ReactSelect)`
  margin-left: auto;
  width: 256px;
  & .select {
    &__single-value {
      color: ${colors.white};
    }
    &__indicator &__dropdown-indicator {
      border-color: none;
    }

    &__control {
      height: 56px;
      background-color: ${colors.mediumGrey};
      border: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &--is-focused {
        border: none;
        box-shadow: none;
      }
    }

    &__menu {
      margin-top: 0;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      z-index: 205;
      box-shadow: 0px 13px 16px 3px ${colors.shadow};
      &-list {
        z-index: 205;
      }
    }

    &__option {
      background-color: ${colors.darkGrey};
      color: ${(props) => props.color || colors.white};
    }

    &__option {
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__value {
      &-container {
        padding-left: 20px;
      }
    }

    &__clear-indicator {
      color: ${colors.paleVioletTransp};
      &:hover {
        color: ${colors.paleViolet};
      }
    }
  }
`;

export const UserActionBar = styled.div`
  width: 100%;
  height: 112px;
  margin-top: 56px;
  z-index: 201;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  position: fixed;
  ${(props) =>
    props.show
      ? css`
          animation: ${expand} 0.3s forwards;
        `
      : css`
          animation: ${fold} 0.3s forwards;
        `};
`;

export const ActionBarBox = styled.div`
  max-width: 2000px;
  min-width: 900px;
  width: 70%;
  margin: auto;
  display: flex;
`;
