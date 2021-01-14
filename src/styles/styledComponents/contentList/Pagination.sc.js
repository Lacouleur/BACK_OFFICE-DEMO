import styled from "styled-components";

export const PaginationBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  height: 60px;
  width: 20%;
  max-width: 200px;
  margin-left: auto;
  margin-right: 0;
`;

export const PageListUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: calc(100%);
  min-height: 30px;
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
  width: 14px;
  margin: 0 30px;
  padding-top: 5px;
  align-self: center;
  cursor: pointer;
`;
