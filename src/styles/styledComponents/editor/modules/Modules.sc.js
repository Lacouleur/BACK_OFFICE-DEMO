import styled, { css } from "styled-components";
import colors from "../../../core/colors";

export const ModuleContainer = styled.div`
  position: relative;
  &:hover {
    max-height: ${(props) => props.styles?.maxHeight || `100%`};
  }
`;

const DraftJsContainerClosedMixin = css`
  background-color: transparent;
`;

const DraftJsContainerOpenMixin = css`
  background-color: ${colors.darkGrey};
`;

export const DraftJsWrapper = styled.div`
  & .wrapper {
    width: 80%;
    display: flex;
    height: fit-content;
    flex-direction: column;
    margin-top: 18px;
    overflow: hidden;
  }

  & .toolbar {
    display: flex;
    visibility: ${(props) => props.styles?.visibility};
    flex-direction: row;
    align-items: center;
    border-radius: 2px 2px 0 0;
    box-shadow: 0 0 3px 1px ${colors.transpGrey};
    border-top: none;
    border-right: none;
    border-left: none;
    background-color: ${colors.darkGrey};
  }

  & .editor {
    overflow: hidden;
    min-height: 300px;
    max-height: 65vh;
    border-radius: 0 0 3px 3px;
    padding: 9px 18px 9px 9px;
    font-size: 16px;
    ${(props) =>
      props.isOpen ? DraftJsContainerOpenMixin : DraftJsContainerClosedMixin};

    /* Scrollbar */
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${colors.transpGrey};
      border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: ${colors.lightGrey};
    }

    &:hover {
      overflow: overlay;
    }
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 80px;
  position: absolute;
  justify-content: space-between;
  right: 30px;
  top: 30px;
`;

export const IsVisibleIcon = styled.img`
  position: absolute;
  right: 30px;
  z-index: 21;
  width: 31px;
  height: 31px;
`;

export const Hide = styled.img`
  z-index: 21;
  width: 31px;
  height: 31px;
  cursor: pointer;
`;

export const Delete = styled.img`
  z-index: 21;
  width: 31px;
  height: 31px;
  transition: 0.3s;

  &:hover {
    transform: rotate(90deg);
    cursor: pointer;
  }
`;

export const QuestionSettingContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  height: 111px;
  display: flex;
  background-color: ${colors.darkGrey};
`;

export const QuestionSettingboxOne = styled.div`
  width: 50%;
  padding: 18px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export const QuestionLabel = styled.label`
  width: 50%;
  height: 18px;
  size: 14px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers. https://polished.js.org/docs/#hidevisually
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

export const CheckMark = styled.img`
  width: 22px;
`;

export const CheckBox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
  margin-right: 8px;
  border: 1px solid ${colors.paleViolet};
  border-radius: 5px;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;

export const CheckboxContainer = styled.div`
  position: relative;
  vertical-align: middle;
  ${CheckMark} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }

  ${CheckBox} {
    background: ${(props) =>
      props.checked ? colors.paleViolet : "transparent"};
  }
`;

export const SwitchBox = styled.label`
  position: relative;
  margin-left: 20px;
  margin-top: 16px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1.25px;
`;

export const SwitchLabel = styled.label`
  position: absolute;
  left: 0;
  width: 34px;
  height: 14px;
  border-radius: 15px;
  background: #bebebe;
  margin-top: 11px;
  cursor: pointer;
  background: ${colors.lightGrey};
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    transform: translateY(-14%);
    width: 20px;
    height: 20px;
    background: ${colors.fadedGrey};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const Switch = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  &:checked + ${SwitchLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      background: ${colors.paleViolet};
      width: 20px;
      height: 20px;
      margin-left: 14px;
      transition: 0.2s;
    }
  }
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const IconBox = styled.div`
  height: 56px;
  margin: 16px 12px;
  display: flex;
  align-items: center;
`;

export const AnswerTrashIcon = styled.img`
  cursor: ${(props) => (props.unactive ? "pointer" : "not-allowed")};
`;

export const AddAnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 30px 0;
  &:hover {
    color: ${colors.paleViolet};
  }
`;

export const AddAnswerText = styled.p`
  font-size: 14px;
  letter-spacing: 1.25px;
  margin-left: 8px;
`;

export const AddAnswerIcon = styled.img`
  width: 32px;
`;

const IsInUseBoardDnDMixin = css`
  background-color: ${colors.matBlack};
`;

export const ModulesBoardDnd = styled.div`
  ${(props) => (props.isUsedDndArea ? IsInUseBoardDnDMixin : "")};
  height: 100%;
  min-width: 900px;
`;

const HideOnDndManifesto = css`
  top: 250px !important;
`;

export const HideOnDnd = styled.div`
  ${(props) => (props.isManifesto ? HideOnDndManifesto : "")};
  position: absolute;
  height: 550px;
  width: 100%;
  min-width: 900px;
  opacity: 0.8;
  background-color: ${colors.mediumGrey};
  top: 150px;
  z-index: 99;
`;
