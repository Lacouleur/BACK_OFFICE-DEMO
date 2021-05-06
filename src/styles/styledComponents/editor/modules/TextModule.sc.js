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
    padding: 9px;
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
      overflow: auto;
    }
  }
`;

export const Delete = styled.img`
  z-index: 21;
  width: 31px;
  height: 31px;
  transition: 0.3s;
  position: absolute;
  right: 76px;
  top: 30px;

  &:hover {
    transform: rotate(90deg);
  }
`;
