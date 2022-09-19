import styled, { css } from "styled-components";
import colors from "../../core/colors";

const resultPageMixin = css`
  padding-top: 70px;
`;

export const ModulesContainer = styled.div`
  padding-top: 131px;
  width: 70%;
  margin: 12px auto auto auto;
  max-width: 2000px;
  ${(props) => props.results && resultPageMixin}
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  background-color: ${colors.mediumGrey};
  min-width: 900px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
`;

export const TotalInfo = styled.div`
  min-width: 150px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  margin-top: 32px;
  background-color: ${colors.darkGrey};
`;

export const BoldText = styled.p`
  font-weight: bold;
`;

export const RegularText = styled.p`
  font-weight: normal;
`;

export const LightText = styled.p`
  font-weight: lighter;
`;

export const ResponseList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const ElementBox = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const ReturnText = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  line-height: 24px;
  color: ${colors.white};
`;

export const IsRightIcon = styled.img`
  width: 24px;
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 32px;
  width: 80px;
`;

export const PercentBox = styled.div`
  display: flex;
  width: 120px;
`;

const isActiveMixin = css`
  color: ${colors.paleViolet}!important;
  border-bottom: 4px solid ${colors.paleViolet};
`;

export const NavLine = styled.div`
  height: 1px;
  background-color: ${colors.lightGrey};
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const NavBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 32px;
  margin-bottom: 8px;
  position: relative;
`;

export const NavElement = styled.div`
  width: 103px;
  height: 100%;
  padding-top: 8px;
  text-align: center;
  align-self: center;
  cursor: pointer;
  ${(props) => props.isActive && isActiveMixin};
`;

export const ActionHeadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const BreadCrumBox = styled.div`
  display: flex;
`;

export const HomeIcon = styled.img`
  width: 14px;
`;

export const BreadCrumLink = styled.div`
  padding: 0 8px;
  opacity: 0.8;
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 400 : 700)};
  font-size: 16px;
  &:hover {
    opacity: ${(props) => (props.selected ? "" : "1")};
    text-decoration: ${(props) => (props.selected ? "" : "underline")};
  }
`;

export const BackIcon = styled.img`
  transform: rotate(180deg);
`;

export const BreadCrumArrow = styled.img`
  transform: rotate(180deg);
  height: 8px;
  width: 8px;
  margin-top: 4px;
`;

export const ButtonImage = styled.img`
  position: absolute;
  width: 12px;
  left: 8px;
  top: 50%;
  transform: translate(50%, -50%);
`;

export const ButtonsAndInfosContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const ResultTitleBox = styled.div`
  width: 100%;
  height: 90px;
  font-size: 24px;
  margin-bottom: 19px;
  color: ${colors.white};
  display: flex;
  align-items: center;
`;

export const ResultTitleIcon = styled.img`
  max-width: 38px;
  max-height: 38px;
  margin-right: 8px;
`;

export const FeedBackResultContainer = styled.div`
  width: 100%;
  background-color: ${colors.mediumGrey};
  margin: 16px 0;
  padding: 16px 16px 64px 16px;
`;

export const FeedBackTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  margin: 0 0 32px 0;
`;

export const FeedBackTitle = styled.p`
  text-transform: uppercase;
  margin: auto 0;
  font-weight: 700;
  width: 90%;
`;

export const FeedBackEyeIcon = styled.img`
  z-index: 21;
  width: 31px;
  height: 31px;
`;

export const FeedBackListContainer = styled.div``;

export const FeedbackTotalsResults = styled.div`
  color: ${colors.paleViolet};
  margin: 0 0 32px 32px;
  font-weight: 700;
`;

export const FeedBackListInfos = styled.div`
  margin-top: 16px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px 8px 16px;
`;

export const FeedBackColumnName = styled.p`
  text-transform: uppercase;
  color: ${colors.lightGrey};
  padding: 0 32px;
`;

const ListBoxOpenMixin = css`
  height: 100%;
  overflow: hidden;
`;

export const FeedBackListBox = styled.div`
  background-color: ${colors.darkGrey};
  margin: 0 32px;
  height: 500px;
  padding: 4px;
  overflow-y: ${(props) => (props.needScroll ? "scroll" : "hidden")};
  overflow-x: hidden;
  ${(props) => props.isOpen && ListBoxOpenMixin};

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

  &::-webkit-scrollbar-corner {
    display: none;
  }
`;

const oddLineMixin = css`
  background-color: ${colors.mediumGrey};
`;

export const FeedBackLine = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  ${(props) => props.odd && oddLineMixin};
`;

export const FeedbackLineNumber = styled.span`
  width: 3%;
  margin: auto 16px;
`;

export const FeedBackUserText = styled.p`
  width: 67%;
  height: 38px;
  margin: auto 16px;
  padding-right: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
`;

export const FeedBackCopy = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.white};
  text-decoration: underline;
`;

export const FeedBackTime = styled.span`
  width: 20%;
  line-height: 38px;
  text-align: right;
  margin: auto 0;
  padding-right: 8px;
  font-size: 14px;
  line-height: 14px;
`;

export const FeedbackCopyBox = styled.div`
  width: 20%;
  height: 38px;
  margin: auto 16px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:active {
    background-color: ${colors.green};
  }
`;

export const FeedbackCopyIcon = styled.img`
  width: 12px;
`;

export const FeedBackSeeMore = styled.button`
  background-color: ${colors.paleViolet};
  border: none;
  height: 32px;
  border-radius: 5px;
  margin: 16px 0 0 32px;
`;
