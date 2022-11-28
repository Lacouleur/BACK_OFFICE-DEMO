import styled, { css } from "styled-components";
import colors from "../../core/colors";

const mixinSwitchBoxPublishModalToTopLabel = css`
  position: relative;
  justify-self: flex-end;
  align-self: center;
  margin: 0;
`;

const mixinSwitchBoxPublishModalToBottomLabel = css`
  position: relative;
  justify-self: flex-end;
  align-self: center;
  margin: 0;
`;

const mixinSwitchCustomListDndLabel = css`
  position: relative;
`;

const mixinSwitchLabelSelectModuleVariant = css`
  left: 100%;
  margin-left: 8px;
`;

const mixinSwitchLabelCollapseText = css`
  margin-left: 8px;
  margin-top: 8px;
  position: relative;
`;

export const SwitchLabel = styled.label`
  position: absolute;
  left: 0;
  width: 34px;
  height: 14px;
  border-radius: 15px;
  background: hotpink;
  margin-top: 11px;
  cursor: pointer;
  background: ${colors.lightGrey};

  ${(props) =>
    props.styleVariant === "selectModuleVariant" &&
    mixinSwitchLabelSelectModuleVariant}
  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopLabel}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomLabel}
  ${(props) =>
    props.styleVariant === "CustomListDnd" && mixinSwitchCustomListDndLabel}
     ${(props) =>
    props.styleVariant === "collapseText" && mixinSwitchLabelCollapseText}

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
  display: contents;
`;

const mixinSwitchBoxPublishModalToBottomSwitch = css`
  justify-self: flex-end;
  display: contents;
`;

const mixinSwitchCustomListDndSwitch = css`
  width: 8px;
`;
const mixinSwitchCollapseText = css`
  justify-self: flex-end;
  display: contents;
`;
export const Switch = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;

  ${(props) =>
    props.styleVariant === "publishModal-toTop" &&
    mixinSwitchBoxPublishModalToTopSwitch}
  ${(props) =>
    props.styleVariant === "publishModal-toBottom" &&
    mixinSwitchBoxPublishModalToBottomSwitch}
  ${(props) =>
    props.styleVariant === "CustomListDnd" && mixinSwitchCustomListDndSwitch}
      ${(props) =>
    props.styleVariant === "collapseText" && mixinSwitchCollapseText}

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
    cursor: not-allowed;
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
  margin-left: 27px;
`;

const mixinSwitchBoxPublishModalToBottom = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 290px;
  align-items: center;
  margin-left: 27px;
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
  line-height: 32px;
  justify-content: space-between;
  width: auto;
  margin-top: 0;
`;

const mixinSwitchBoxSelectModuleVariant = css`
  display: flex;
  line-height: 32px;
  justify-content: space-between;
  width: 110px;
  margin: 8px;
`;

const mixinSwitchBoxCollapseText = css`
  width: 128px;
  display: flex;
  line-height: 32px;
  justify-content: space-between;
  margin-left: 0;
`;

export const SwitchBox = styled.label`
  margin-left: 20px;
  margin-top: 16px;
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1.25px;
  cursor: pointer;

  ${(props) =>
    props.styleVariant === "selectModuleVariant" &&
    mixinSwitchBoxSelectModuleVariant}
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
  ${(props) =>
    props.styleVariant === "collapseText" && mixinSwitchBoxCollapseText}
`;

export const SwitchSeparatorVertical = styled.div`
  background-color: ${colors.lightGrey};
  width: 1px;
  height: 50px;
  margin: 0 0 20px 20px;
  justify-self: center;
  align-self: center;
`;
