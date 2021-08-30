import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ReactSelect from "react-select";
import colors from "../../core/colors";

export const FieldContainer = styled.div`
  width: ${(props) => props.styles?.width || "50%"};
  flex-direction: column;
  margin-bottom: 30px;
  margin: 16px 0 16px 0;
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

  &::-webkit-file-upload-button {
    display: none;
  }

  // customing the native CSS for autocomplet.
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${colors.darkGrey} inset;
  }
  &:-webkit-autofill::first-line {
    font-family: Arial;
    color: ${colors.lightGrey};
    font-size: 14px;
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
      height: 56px;
      margin-top: 0;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      z-index: 101;
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

export const TextArea = styled(TextareaAutosize)`
  -webkit-appearance: none;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: auto;
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
