import styled from "styled-components";
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
  color: ${(props) => props.styles.color || colors.white};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;

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

export const Selector = styled(ReactSelect)`
  & .select {
    &__indicator &__dropdown-indicator {
      border-color: transparent transparent red;
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
      margin-top: 0px;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
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

    &__single-value {
      color: white;
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
`;

export const TextAreaStyles = styled.div`
  &.textArea {
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
  }
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
