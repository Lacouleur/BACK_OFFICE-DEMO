import styled, { css } from "styled-components";
import colors from "../../core/colors";
import { CardStatusBoxMixin } from "../pagesHub/PagesHub.sc";

export const TitleDateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  width: 260px;
  padding-right: 18px;
  cursor: pointer;
`;

export const Title = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  justify-self: flex-end;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const ContentStatusBoxMixin = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 54px;
  width: 190px;
  background-color: ${colors.black};
  border-radius: 5px;
  padding: 10px;
  &:hover {
    & div:nth-of-type(1) {
      visibility: visible;
    }
  }
`;

export const StatusBox = styled.div`
  ${(props) => (props.isCard ? CardStatusBoxMixin : ContentStatusBoxMixin)};
`;

export const ActionToolTipMixin = css`
  left: -4px !important;
`;

export const AutoSizeMixin = css`
  left: -4px !important;
`;

export const wideMixin = css`
  width: 500px !important;
`;

export const Tooltip = styled.div`
  ${(props) => (props.archive ? ActionToolTipMixin : "")};
  ${(props) => (props.wide ? wideMixin : "")};
  visibility: hidden;
  min-width: 120px;
  max-width: 190px;
  background-color: ${colors.mediumGrey};
  box-shadow: 0px 11px 15px ${colors.shadow};
  text-align: left;
  padding: 5px 8px;
  border-radius: 6px;
  top: 52px;
  left: 2px;
  position: absolute;
  z-index: 33;
  & :before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid ${colors.mediumGrey};
    border-top: 10px solid transparent;
    left: 10px;
    top: -20px;
  }
`;

export const TooltipText = styled.p`
  display: block;
  font-size: 14px;
  width: 100%;
  line-height: 20px;
  z-index: 2;
  &::first-letter {
    text-transform: capitalize;
  }
`;

const publishedTextMixin = css`
  color: ${colors.green};
`;

const unPublishedTextMixin = css`
  color: ${colors.lightGrey};
`;

const scheduledTextMixin = css`
  color: ${colors.deepBlue};
`;

export const StatusText = styled.p`
  ${(props) => (props.published ? publishedTextMixin : "")};
  ${(props) => (props.unpublished ? unPublishedTextMixin : "")};
  ${(props) => (props.scheduled ? scheduledTextMixin : "")};
  margin-left: 34px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const LastSavedText = styled.p`
  ${(props) => (props.published ? publishedTextMixin : "")};
  ${(props) => (props.unpublished ? unPublishedTextMixin : "")};
  ${(props) => (props.scheduled ? scheduledTextMixin : "")};
  font-weight: 400;
  font-style: italic;
  font-size: 12px;
  line-height: 14px;
  margin-left: 34px;
`;

export const StatusIcon = styled.img`
  width: 24px;
  position: absolute;
  left: 10px;
`;

export const UpdatedDate = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: ${colors.lightGrey};
`;

export const Lang = styled.p`
  text-transform: uppercase;
  margin-right: 18px;
  cursor: pointer;
`;

export const CategoryName = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  width: 85px;
  margin-right: 20px;
  margin: 0 20px;
  cursor: pointer;
`;

export const IconActionBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  width: 250px;
  padding: 0 20px 0 20px;
  justify-content: space-between;
`;

export const IconAction = styled.img`
  width: 29px;
`;

export const ButtonIcon = styled.img`
  margin-left: 7px;
  width: 10px;
  color: ${colors.paleViolet};
`;

export const hoverMixin = css`
  ${Title} {
    text-decoration: underline;
    color: ${colors.paleViolet};
  }
  ${UpdatedDate} {
    color: ${colors.paleViolet};
  }
  ${Lang} {
    color: ${colors.paleViolet};
  }
  ${CategoryName} {
    color: ${colors.paleViolet};
  }
`;

export const isEvenMixin = css`
  background-color: ${colors.darkGrey};
`;

export const LineContentBox = styled.div`
  display: flex;
  width: 100%;
  height: 59px;
  align-items: center;
  justify-content: space-between;
  margin: 0 0;
  padding: 0 8px;
  background-color: ${colors.mediumGrey};
  ${(props) => props.hover && hoverMixin};
  ${(props) => props.isEven && isEvenMixin};

  &:hover {
    outline: 1px solid ${colors.paleViolet};
    box-shadow: 0px 0px 8px 2px ${colors.paleVioletTransp};
  }
`;

export const InformationBox = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${hoverMixin}
  }
`;
