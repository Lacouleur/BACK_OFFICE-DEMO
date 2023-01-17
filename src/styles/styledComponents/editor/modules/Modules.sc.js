import styled, { css } from "styled-components";
import colors from "../../../core/colors";

export const ModuleContainer = styled.div`
  position: relative;
  &:hover {
    max-height: ${(props) => props.styles?.maxheight || `100%`};
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
    margin-bottom: 18px;
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

  &:hover {
    cursor: pointer;
  }
`;

export const IsVisibleIcon = styled.img`
  position: absolute;
  right: 30px;
  z-index: 21;
  width: 31px;
  height: 31px;
  &:hover {
    width: 33px;
  }
`;

export const Hide = styled.img`
  z-index: 21;
  width: 31px;
  height: 31px;
  cursor: pointer;
  &:hover {
    width: 33px;
  }
`;

export const Delete = styled.img`
  z-index: 21;
  width: 31px;
  transition: 0.3s;

  &:hover {
    width: 33px;
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

export const FieldAndSwitchContainer = styled.div`
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

export const SeparatorWhite = styled.div`
  margin: 40px auto;
  opacity: 0.5;
  height: 1px;
  background-color: ${colors.white};
  width: 80%;
`;

export const CustomCollectionContainer = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

export const ListContainer = styled.div`
  background-color: ${colors.darkGrey};
  width: 48%;
  min-height: 400px;
  max-height: 550px;
  overflow: auto;
  position: relative;
`;

export const ArticleBox = styled.div`
  border: 1px solid ${colors.paleViolet};
  background-color: ${colors.paleVioletTransp};
  border-radius: 25px;
  margin: 8px;
  max-width: 90%;
  width: fit-content;
  &:hover {
    transform: scale(1.02);
  }
`;

export const ArticleTitle = styled.div`
  margin: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CustomListVerticalSeparator = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  height: 100%;
  width: 1px;
  background-color: ${colors.lightGrey};
`;

export function DnDCustomCollectionStyles(snapshot, providedStyle) {
  return {
    userSelect: "none",
    ...providedStyle,
  };
}

export const LoadMoreCustomList = styled.button`
  border: 1px solid
    ${(props) => (props.disabled ? colors.lightGrey : colors.paleViolet)};
  background-color: transparent;
  border-radius: 5px;
  text-align: center;
  color: ${(props) => (props.disabled ? colors.lightGrey : colors.paleViolet)};
  margin: 8px 0;
  padding: 8px;
  height: 44px;
  width: fit-content;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const TitleAndFieldContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const rightColumnMixin = css``;

const leftColumnMixin = css``;

export const DndTitleContainer = styled.div`
  color: ${colors.lightGrey};
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DndTitleBox = styled.div`
  width: 48%;
`;

export const DndElementBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DndColumnTitle = styled.p`
  ${(props) => props.right && rightColumnMixin};
  ${(props) => props.left && leftColumnMixin};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 16px;
`;

export const ListBox = styled.div`
  padding: 8px;
  scroll-padding: 20px;
`;

export const InnerSectionTitleBox = styled.div`
  display: felx;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 32px;
`;

export const InnerSectionTitle = styled.h4`
  color: ${colors.lightGrey};
  text-transform: uppercase;
  margin-right: 16px;
`;

export const InnerSectionDescritpion = styled.p`
  color: ${colors.lightGrey};
`;

export const TextComponenVariant = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  margin: 16px 8px;
`;

export const CollectionCardsDnDContainer = styled.div`
  background-color: ${colors.darkGrey};
  min-height: 150px;
  width: 100%;
  padding: 8px;
`;

const isOpenCardMixin = css`
  height: 88px;
  border: 1px solid ${colors.lightGrey};
  border-left: 6px solid ${colors.paleViolet};

  &:hover {
    border: 1px solid ${colors.paleViolet};
    border-left: 6px solid ${colors.paleViolet};
    height: 90px;
    width: calc(100% + 2px);
  }
`;

const isFirstMixin = css`
  margin-top: 0;
`;

export const CollectionCardContainer = styled.div`
  background-color: ${colors.mediumGrey};
  border-radius: 5px;
  margin-top: 8px;
  border: 1px solid ${colors.lightGrey};
  border-left: 6px solid ${colors.paleViolet};
  padding: 25px;
  cursor: ${(props) => (!props.isHand ? "grab" : "pointer")};

  &:hover {
    border: 1px solid ${colors.paleViolet};
    border-left: 6px solid ${colors.paleViolet};
  }

  ${(props) => !props.isOpen && isOpenCardMixin};
  ${(props) => props.isFirst && isFirstMixin};
`;

export const CardHeaderContainer = styled.div`
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
}
`;

export const CardHandleIcon = styled.img`
  height: 24px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  text-align: left;
  color: ${colors.white};
  text-transform: uppercase;
`;

export const RoundThumbnailPlaceholder = styled.div`
  background-color: ${colors.fadedGrey};
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export const DuplicateModuleIcon = styled.img`
  width: 31px;
  z-index: 30;
  cursor: pointer;

  &:hover {
    width: 33px;
  }
`;
