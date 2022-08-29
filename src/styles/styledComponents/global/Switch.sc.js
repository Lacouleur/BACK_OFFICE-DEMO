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

const mixinSwitchCustomListDndLabel = css`
  position: relative !important;
`;

const mixinSwitchLabelIsReaction = css`
  left: 100% !important;
  margin-left: 8px;
`;

export const SwitchLabel = styled.label`
  ${(props) =>
    props.styleVariant === "isReaction" && mixinSwitchLabelIsReaction}
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopLabel}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomLabel}
  ${(props) =>
    props.styleVariant === "CustomListDnd" && mixinSwitchCustomListDndLabel}
  position: absolute;
  left: 0;
  width: 34px;
  height: 14px;
  border-radius: 15px;
  background: hotpink;
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

const mixinSwitchCustomListDndSwitch = css`
  width: 8px !important;
`;

export const Switch = styled.input`
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopSwitch}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomSwitch}
  ${(props) =>
    props.styleVariant === "CustomListDnd" && mixinSwitchCustomListDndSwitch}

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
  & ${Switch} {
    visibility: hidden;
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

const mixinToolTip = css`
  &:hover {
    ${(props) =>
      props.styleVariant === "publishModal-toTop" &&
      mixinSwitchBoxPublishModalToTop}
    & div:nth-of-type(1) {
      visibility: visible;
    }
  }
`;

const mixinSwitchBoxCustomListDnd = css`
  display: flex;
  line-height: 32px !important;
  justify-content: space-between;
  width: auto !important;
  margin-top: 0 !important;
`;

const mixinSwitchBoxIsReaction = css`
  display: flex;
  line-height: 32px !important;
  justify-content: space-between;
  width: 110px !important;
  margin: 8px !important;
`;

export const SwitchBox = styled.label`
  ${(props) => props.styleVariant === "isReaction" && mixinSwitchBoxIsReaction}
  ${(props) => props.tooltip && mixinToolTip}

  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTop}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottom}
    ${(props) => props.disable && mixinDisabled}

    ${(props) =>
    props.styleVariant === "CustomListDnd" && mixinSwitchBoxCustomListDnd}
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

export const SwitchSeparatorVertical = styled.div`
  background-color: ${colors.lightGrey};
  width: 1px;
  height: 50px;
  margin: 0 0 20px 20px;
  justify-self: center;
  align-self: center;
`;
