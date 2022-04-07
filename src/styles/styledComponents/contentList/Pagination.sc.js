import styled from "styled-components";
import colors from "../../core/colors";

export const PaginationBox = styled.div`
  min-width: 1000px;
  width: 80%;

  & .paginate {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    margin: 32px 0 80px 0;

    &-break {
      height: 40px;
      padding-top: 20px;
      width: 40px;
      text-align: center;

      &:hover {
        color: ${colors.paleViolet};
        text-shadow: 0 0 9px ${colors.paleViolet};
      }
    }

    &-page {
      margin: 0 8px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 20px;
      color: ${colors.lightGrey};
      border: 1px solid ${colors.lightGrey};
      opacity: 0.8;
      border-radius: 5px;
      height: 40px;
      width: 40px;

      &:hover {
        opacity: 1;
        color: ${colors.white};
        border: 1px solid ${colors.white};
        box-shadow: 0px 0px 4px 1px ${colors.transpGrey};
      }

      &__link {
        padding: 10px;
        width: 40px;
        text-align: center;
      }
    }

    & .selected {
      background-color: ${colors.paleVioletTransp};
      border: 2px solid ${colors.paleViolet};
      color: ${colors.green};
      box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
      opacity: 1;
    }
  }
`;

export const PageListUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  min-height: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: initial;
`;

export const PageListLi = styled.li`
  border: ${(props) => props.styles.border};
  border-radius: 2px;
  margin: 0 12px;
  padding: ${(props) => props.styles.padding || 0};
  cursor: pointer;
`;

export const PageListArrow = styled.img`
  height: 14px;
  margin: ${(props) => (props.right ? "0 0 0 16px" : "0 16px")};
  align-self: center;
  cursor: pointer;
  transform: ${(props) => (props.right ? "rotate(180deg)" : "")};
`;

export const PageListNoArrow = styled.img`
  width: 24px;
`;
