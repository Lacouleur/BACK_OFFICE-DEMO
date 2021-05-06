import styled from "styled-components";

export const PaginationBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 70px;
  height: 60px;
  min-width: 1000px;
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
  visibility: ${(props) => props.hide};
  height: 16px;
  margin: 0 30px;
  align-self: center;
  cursor: pointer;
  transform: ${(props) => (props.right ? "rotate(180deg)" : "")};
`;
