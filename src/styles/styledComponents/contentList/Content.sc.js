import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const LineContentBox = styled.div`
  display: flex;
  width: 100%;
  height: 59px;
  align-items: center;
  justify-content: space-between;
  margin: 0 0;
  padding: 0 24px;
  background-color: ${(props) => props.styles.backgroundColor};
`;

export const StatusBox = styled.div`
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

export const ActionToolTipMixin = css`
  left: -4px !important;
`;

export const Tooltip = styled.div`
  ${(props) => (props.action ? ActionToolTipMixin : "")};
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
  font-size: 14px;
  width: 100%;
  line-height: 20px;
  z-index: 2;
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
  margin-left: 40px;
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
  margin-left: 40px;
`;

export const StatusIcon = styled.img`
  width: 24px;
  position: absolute;
  left: 10px;
`;

export const TitleDateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  width: 312px;
  padding-right: 18px;
`;

export const UpdatedDate = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: ${colors.lightGrey};
`;

export const Lang = styled.p`
  text-transform: uppercase;
  margin-right: 18px;
`;

export const CategoryName = styled.div`
  text-transform: uppercase;
  line-height: 100%;
  font-size: 14px;
  min-width: 120px;
  max-width: 120px;
  margin-right: 20px;
  margin: 0 20px;
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
`;

export const IconActionBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  padding: 0 34px 0 42px;
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
