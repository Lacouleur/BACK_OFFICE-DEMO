import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";
import colors from "../../core/colors";

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  min-width: 900px;
  height: ${(props) => props.height || "auto"};
  background-color: #1b182190;
  z-index: 99;
`;
export const ModalBox = styled.div`
  background-color: ${colors.mediumGrey};
  position: relative;
  transform: translate(-50%);
  margin-top: ${(props) => (props.closeModal ? "0" : "170px")};
  margin-left: 50%;
  height: ${(props) => props.height || "260px"};
  width: 807px;
`;

export const Message = styled.p`
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  max-width: 90%;
  margin-left: 27px;
  padding-top: 27px;
`;

export const MessageSmall = styled.p`
  font-size: 12px;
  max-width: 90%;
  margin: 12px 27px;
`;

export const Br = styled.br`
  margin-top: 12px;
`;

export const ButtonsBox = styled.div`
  position: absolute;
  bottom: 27px;
  right: 27px;
  left: 27px;
  display: flex;
  justify-content: space-between;
`;

export const Cross = styled.img`
  width: 20px;
  height: 20px;
  transition: 0.3s;
  position: absolute;
  right: 27px;
  top: 27px;

  &:hover {
    transform: rotate(90deg);
  }
`;

export const DuplicateTitle = styled.h2`
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  max-width: 90%;
  margin-left: 27px;
  padding-top: 27px;
  margin-bottom: 18px;
`;

export const Text = styled.p`
  margin-left: 27px;
`;

export const ChoiceContainer = styled.div`
  margin: 18px 0 0 27px;
  display: flex;
  flex-direction: column;
`;

export const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

export const Separator = styled.span`
  display: block;
  height: 1px;
  background: ${colors.paleViolet};
  width: calc(100% - 2 * 27px);
  margin: 0 27px;
`;

export const TradContainer = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 300px 18px 27px;
`;

// Checkbox
export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Icon = styled.div`
  width: 10px;
  height: 10px;
  background: ${colors.paleViolet};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckbox = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  background: transparent;
  border-radius: 50%;
  border: 2px solid ${colors.paleViolet};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const DateContainer = styled.div`
  margin: 12px 27px;
`;

export const DatePicker = styled(DateTimePicker)`
  .react-datetime-picker__inputGroup__hour {
    color: hotpink;
  }
  .react-datetime-picker {
    &__wrapper {
      height: 56px;
      padding-left: 16px;
    }

    &__calendar {
      z-index: 102;
    }

    &__inputGroup {
      font-size: 16px;
      line-height: 24px;

      &__input {
        color: ${colors.white};
      }
      &__minute {
        color: ${colors.paleViolet};
      }
      &__leadingZero {
        color: ${colors.paleViolet};
      }
      &__hour {
        color: ${colors.paleViolet};
      }
    }
  }
  .react-calendar {
    background-color: ${colors.lightGrey};
    z-index: 202;

    &__tile--now {
      background-color: ${colors.paleViolet};
    }
  }
`;

export const DatePickerIcon = styled.img`
  width: 12px;
  margin-left: 16px;
`;
