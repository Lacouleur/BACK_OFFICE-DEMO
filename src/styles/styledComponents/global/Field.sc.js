import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/async-creatable";
import colors from "../../core/colors";

export const TextOpinion = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  margin: 16px 8px;
`;
export const FieldTitle = styled.p`
  margin-left: 16px;
  z-index: 21;
  color: ${colors.lightGrey};
  font-size: 14px;
  opacity: 0.8;
  white-space: nowrap;
  text-transform: capitalize;
`;

export const Line = styled.div`
  height: 1px;
  width: 90%;
  background-color: ${colors.paleViolet};
  z-index: 18;
  margin-left: 16px;
  box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  align-self: center;
  opacity: 0;
`;

export const FieldTitleBox = styled.div`
  display: flex;
  position: absolute;
  top: -10px;
  width: 100%;
`;

export const FieldError = styled.div`
  color: ${(props) => props.color || colors.lightGrey};
  font-size: 12px;
  line-height: 14px;
  margin-left: 8px;
`;

export const ErrorIcon = styled.img`
  width: 12px;
  margin-left: 17px;
`;

export const FieldBox = styled.div`
  width: ${(props) => props.styles?.width || "100%"};
  flex-direction: column;
  position: relative;

  &:hover {
    & div:nth-of-type(1) {
      visibility: visible;
    }
    & div:nth-of-type(2) {
      visibility: visible;
    }
  }
`;

const unactiveSelectorMixin = css`
  & .select {
    &__indicator {
      display: none;
      &-separator {
        display: none;
      }
    }

    &__single-value {
      color: ${colors.lightGrey};
    }
  }
`;

const activeSelectorMixin = css`
  & .select {
    &__indicator {
      display: block;
      &-separator {
        display: block;
      }
    }

    &__single-value {
      color: ${colors.white};
    }
  }
`;

export const Selector = styled(ReactSelect)`
  ${(props) =>
    props.isDisabled ? unactiveSelectorMixin : activeSelectorMixin};

  & .select {
    &__indicator &__dropdown-indicator {
      border-color: none;
    }

    &__control {
      height: 56px;
      background-color: ${colors.darkGrey};
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
      &-list {
        z-index: 205;
        border-bottom: 1px solid ${colors.paleViolet};
        border-right: 1px solid ${colors.paleViolet};
        border-left: 1px solid ${colors.paleViolet};
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

export const SelectorAuthor = styled(ReactSelect)`
  ${(props) =>
    props.isDisabled ? unactiveSelectorMixin : activeSelectorMixin};
  & .select {
    &__indicator &__dropdown-indicator {
      border-color: none;
    }

    &__input {
      color: ${colors.paleViolet};
    }

    &__multi-value {
      background-color: ${colors.darkGrey};
      border-radius: 20px;
      border: 1px solid ${colors.paleViolet};

      &__label {
        color: ${colors.white};
      }

      &__remove {
        &:hover {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 25px;
          background-color: ${colors.paleVioletTransp};
        }
      }
    }

    &__control {
      min-height: 56px;
      height: 100%;
      background-color: ${colors.darkGrey};
      border: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &--is-focused {
        border: none;
        box-shadow: none;
      }
    }

    &__menu {
      height: 56px;
      margin-top: 0;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      z-index: 205;
      &-list {
        z-index: 205;
        background-color: ${colors.darkGrey};
        min-height: 56px;
        max-height: 200px;
        border-bottom: 1px solid ${colors.paleViolet};
        border-right: 1px solid ${colors.paleViolet};
        border-left: 1px solid ${colors.paleViolet};
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
        padding: 18px 0 18px 20px;
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

export const WarningCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.darkGrey};
  position: relative;
  z-index: 19;
  width: 100%;
  height: 100%;
  min-height: 100px;
  margin-bottom: 16px;
`;

export const TextWarn = styled.div`
  margin-right: 12px;
  margin-left: 12px;
  z-index: 20;
  width: ${(props) => (props.width30 ? "30%" : "auto")};
  color: ${(props) => (props.violet ? colors.paleViolet : colors.white)};
  padding: ${(props) => (props.margin ? "16px 0 16px 16px" : "0 0 0 16px")};
`;

export const WarnCreateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.darkGrey};
  height: 100%;
`;

export const BoxWarnButton = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 20px;
`;

export const ButtonWarn = styled.button`
  width: 40px;
  border: 2px solid ${colors.white};
  border-radius: 25px;
  text-align: center;
  padding: 3px;
  z-index: 99;
  opacity: 0.8;
  background: none;
  color: ${colors.white};
  cursor: pointer;
  &:hover {
    border: 2px solid ${colors.paleViolet};
    color: ${colors.paleViolet};
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
  }
`;

export const TagBox = styled.div`
  border: 2px solid ${colors.paleViolet};
  border-radius: 25px;
  text-align: center;
  padding: 3px 10px;
`;

export const MultiSelectorAndCreate = styled(CreatableSelect)`
  ${(props) =>
    props.isDisabled ? unactiveSelectorMixin : activeSelectorMixin};

  & .select {
    &__indicator &__dropdown-indicator {
      border-color: none;
    }

    &__input {
      color: ${colors.paleViolet};
    }

    &__multi-value {
      background-color: ${colors.darkGrey};
      border-radius: 20px;
      border: 1px solid ${colors.paleViolet};

      &__label {
        color: ${colors.white};
      }

      &__remove {
        &:hover {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 25px;
          background-color: ${colors.paleVioletTransp};
        }
      }
    }

    &__control {
      min-height: 56px;
      height: 100%;
      background-color: ${colors.darkGrey};
      border: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      &--is-focused {
        border: none;
        box-shadow: none;
      }
    }

    &__menu {
      height: 56px;
      margin-top: 0;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      z-index: 205;
      &-list {
        z-index: 205;
        display: flex;
        flex-wrap: wrap;
        background-color: ${colors.darkGrey};
        min-height: 56px;
        max-height: 200px;
        border: 1px solid ${colors.paleViolet};
      }
    }

    &__option {
      background-color: ${colors.darkGrey};
      color: ${(props) => props.color || colors.white};
      border-radius: 20px;
      border: 1px solid ${colors.paleViolet};
      width: auto !important;
      margin: 4px;
      height: 24px;
      text-align: center;
      font-size: 85%;
      padding: 4px 8px !important;
      cursor: pointer;
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__value {
      &-container {
        padding: 18px 0 18px 20px;
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

export const MultiSelector = styled(ReactSelect)`
  ${(props) =>
    props.isDisabled ? unactiveSelectorMixin : activeSelectorMixin};

  & .select {
    &__indicator &__dropdown-indicator {
      border-color: none;
    }

    &__input {
      color: ${colors.paleViolet};
    }

    &__multi-value {
      background-color: ${colors.darkGrey};
      border-radius: 20px;
      border: 1px solid ${colors.paleViolet};

      &__label {
        color: ${colors.white};
      }

      &__remove {
        &:hover {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 25px;
          background-color: ${colors.paleVioletTransp};
        }
      }
    }

    &__control {
      min-height: 56px;
      height: 100%;
      background-color: ${colors.darkGrey};
      border: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      cursor: pointer;

      &--is-focused {
        border: none;
        box-shadow: none;
      }
    }

    &__menu {
      min-height: 56px;
      margin-top: 0;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      z-index: 205;
      &-list {
        z-index: 205;
        display: flex;
        flex-wrap: wrap;
        background-color: ${colors.darkGrey};
        min-height: 112px;
        max-height: 200px;
        border: 1px solid ${colors.paleViolet};
      }
    }

    &__option {
      background-color: ${colors.darkGrey};
      color: ${(props) => props.color || colors.white};
      border-radius: 20px;
      border: 1px solid ${colors.paleViolet};
      width: auto !important;
      margin: 4px;
      height: 24px;
      text-align: center;
      font-size: 85%;
      padding: 4px 8px !important;
      cursor: pointer;
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__value {
      &-container {
        padding: 18px 0 18px 20px;
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

export const TextArea = styled(TextareaAutosize)`
  -webkit-appearance: none;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: auto;
  max-height: ${(props) => (props.maxheight === "feedback" ? "100px" : "auto")};
  min-height: 56px;
  font-size: 16px;
  line-height: 24px;
  background-color: ${colors.darkGrey};
  border: none;
  padding: 0 20px;
  color: ${(props) => props.color};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.white};
  font-family: Arial, Helvetica, sans-serif;
  padding: 16px;
  outline: none;
`;

export const PreviewColorStyle = styled.div`
  position: absolute;
  top: 26px;
  left: 230px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${colors.white};
  background-color: ${(props) => (props.color === 1 ? "#000065" : "#FFC700")};
  margin-left: 18px;
  box-shadow: 1px 1px 10px 3px ${colors.darkGrey};
`;

export const VisualiseColorStyle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${colors.white};
  background-color: ${(props) => (props.color === "1" ? "#000065" : "#FFC700")};
  margin-left: 18px;
  box-shadow: 1px 1px 10px 3px ${colors.darkGrey};
`;

export const ColorFieldBox = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldErrorBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3px;
`;

export const FieldInfosBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const FieldIcon = styled.img`
  opacity: ${(props) => (props.passwordShown ? "1" : ".5")};
  position: absolute;
  left: ${(props) => (props.info === "eyeIcon" ? "87%" : "0")};
  margin: ${(props) => (props.info === "eyeIcon" ? "0" : "0 0 0 13px")};
  top: 50%;
  transform: translateY(-50%);
`;

export const FieldButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: inline;
  right: 16px;
  transform: translateY(-50%);
  top: 50%;
`;

export const FieldContainer = styled.div`
  width: ${(props) => props.styles?.width || "50%"};
  flex-direction: column;
  margin-bottom: 30px;
  margin: 16px 0 16px 0;
  position: relative;

  &:focus-within {
    & ${FieldTitle} {
      color: ${colors.paleViolet};
      opacity: 1;
      font-size: 16px;
    }
    & ${Line} {
      opacity: 1;
      box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
    }

    & ${Selector} {
      .select__indicator-separator {
        background-color: ${colors.paleViolet};
      }
    }
  }

  &:hover:not(:focus) {
    & ${FieldTitle} {
      color: ${colors.paleViolet};
      font-size: 16px;
    }

    & ${Selector} {
      .select__indicator-separator {
        background-color: ${colors.paleViolet};
      }
    }

    & ${MultiSelectorAndCreate} {
      &:hover {
        .select__indicator-separator {
          background-color: ${colors.paleViolet} !important;
        }
      }
    }

    & ${SelectorAuthor} {
      &:hover {
        .select__indicator-separator {
          background-color: ${colors.paleViolet} !important;
        }
      }
    }
  }
`;

export const FieldStyle = styled.input`
  width: ${(props) => props.styles.width || "100%"};
  height: ${(props) => props.styles.height || "100%"};
  background-color: ${colors.darkGrey};
  border: ${(props) => props.styles.border || "none"};
  padding-left: ${(props) => props.styles.paddingLeft || "20px"};
  padding-right: ${(props) => props.styles.paddingRight || "0"};
  color: ${(props) => props.styles.color || colors.white};
  cursor: ${(props) => props.styles.cursor || "auto"};
  text-overflow: ${(props) => props.styles.textOverflow || "clip"};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;

  /* to hide up/down button on number fields */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & [type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-file-upload-button {
    display: none;
  }

  // customing the native CSS for autocomplet.
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${colors.darkGrey} inset;
    -webkit-text-fill-color: ${colors.lightGrey};
  }
  &:-webkit-autofill::first-line {
    font-family: Arial;
  }
`;
