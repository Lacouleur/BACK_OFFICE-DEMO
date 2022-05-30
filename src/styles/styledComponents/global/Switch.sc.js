import styled, { css } from "styled-components";
import colors from "../../core/colors";

const mixinSwitchBoxPublishModalToTopLabel = css`
  position: relative !important;
  justify-self: flex-end;
  align-self: center;
  margin: 0 !important;
`;

const mixinSwitchBoxPublishModalToBottomLabel = css`
  position: relative !important;
  justify-self: flex-end;
  align-self: center;
  margin: 0 !important;
`;

export const SwitchLabel = styled.label`
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopLabel}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomLabel}
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

const mixinSwitchBoxPublishModalToTopSwitch = css`
  justify-self: flex-end;
  display: contents !important;
`;

const mixinSwitchBoxPublishModalToBottomSwitch = css`
  justify-self: flex-end;
  display: contents !important;
`;

export const Switch = styled.input`
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopSwitch}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomSwitch}
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

const mixinDisabled = css`
  & > * {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
`;

const mixinSwitchBoxPublishModalToTop = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  width: 290px;
  align-items: center;
  margin-left: 27px !important;
`;

const mixinSwitchBoxPublishModalToBottom = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 290px;
  align-items: center;
  margin-left: 27px !important;
`;

export const SwitchBox = styled.label`
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTop}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottom}
    ${(props) => props.disable && mixinDisabled}
  position: relative;
  margin-left: 20px;
  margin-top: 16px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1.25px;
  cursor: pointer;
`;
