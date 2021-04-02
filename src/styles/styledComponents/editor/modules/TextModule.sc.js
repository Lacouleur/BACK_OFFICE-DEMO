/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import colors from "../../../core/colors";

export const ModuleContainer = styled.div`
  position: relative;
  &:hover {
    max-height: ${(props) => props.styles?.maxHeight || `100%`};
  }
`;

export const DraftJsWrapper = styled.div`
  width: 700px;
  display: flex;
  height: fit-content;
  flex-direction: column;
  margin-top: 18px;
  overflow: hidden;
`;

const DraftJsContainerClosedMixin = css`
  background-color: transparent;
`;

const DraftJsContainerOpenMixin = css`
  background-color: ${colors.lightGrey};
`;

export const DraftJsContainer = styled.div`
  ${(props) =>
    props.isOpen ? DraftJsContainerOpenMixin : DraftJsContainerClosedMixin};
  display: flex;
  min-height: 300px;
  border-radius: 0 0 3px 3px;
  padding: 5px;
  font-size: 16px;
  box-shadow: 0 0 3px 1px ${colors.transpGrey};

  &&& .DraftEditor {
    &-root {
      width: 100%;
    }
    &-editorContainer {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  visibility: ${(props) => props.styles?.visibility};
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 5px 7px;
  margin-bottom: 8px;
  border-radius: 2px 2px 0 0;
  box-shadow: 0 0 3px 1px ${colors.transpGrey};
`;

export const ToolsIconsContainer = styled.div`
  display: flex;
  margin-right: 7px;
`;

export const ToolsbarItems = styled.div`
  width: 28px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: 0 1px 11px 1px ${colors.transpGrey};
  background-color: ${colors.lightGrey};
  color: ${colors.white};
  font-size: 16px;
  transition: all 250ms ease-in-out;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    `
  transform: translateY(1px);
  color: ${colors.paleViolet};
  background-color: transparent;
  box-shadow: none;
  border: 1px solid ${colors.transpGrey};
  `}

  &:hover {
    transform: translateY(1px);
    color: ${colors.paleViolet};
    background-color: transparent;
    box-shadow: none;
    border: 1px solid ${colors.transpGrey};
  }
`;

/*   &&& .jodit {
    &-wysiwyg {
      background-color: ${colors.darkGrey};
    }

    &-container:not(.jodit_inline) {
    }

    &-icon {
      fill: ${colors.paleViolet};
    }

    &-toolbar {
      &-button__trigger {
        svg {
          fill: ${colors.paleViolet};
        }
      }
      &__box {
        background-color: ${colors.mediumGrey};
      }
    }

    &-status-bar__item {
      color: ${colors.mediumGrey};
    }
  } */
