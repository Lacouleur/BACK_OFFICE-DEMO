import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageListLi,
  PageListUl,
  PageListArrow,
  PaginationBox,
} from "../../styles/styledComponents/contentList/Pagination.sc";
import arrowLeft from "../../styles/assets/icons/arrow-left.svg";
import arrowRight from "../../styles/assets/icons/arrow-right.svg";
import keyGenerator from "../../helper/keyGenerator";
import colors from "../../styles/core/colors";
import { fetchContentsList } from "../../store/actions/clientActions";

const Pagination = () => {
  const contentState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );
  const { currentPage, lastPage } = contentState;
  const pageArr = [];
  const maxDisplayedPages = lastPage < 5 ? lastPage : 5;
  const dispatch = useDispatch();

  const changePage = (pageNumber) => {
    if (pageNumber) dispatch(fetchContentsList(parseInt(pageNumber, 10)));
  };

  for (let i = 1; i <= maxDisplayedPages && i <= lastPage; i += 1) {
    const page = i;
    pageArr.push(
      <PageListLi
        key={keyGenerator(page)}
        styles={
          page === currentPage
            ? { border: `1px solid ${colors.white}`, padding: "5px 8px" }
            : { border: "none" }
        }
        onClick={(e) => {
          changePage(e.target.innerText);
        }}
      >
        {page}
      </PageListLi>
    );
  }

  return (
    <PaginationBox>
      <PageListArrow
        src={arrowLeft}
        onClick={() => {
          changePage(currentPage - 1);
        }}
        hide={currentPage - 1 < 1 ? "hidden" : "visible"}
      />
      <PageListUl>{pageArr}</PageListUl>
      <PageListArrow
        src={arrowRight}
        onClick={() => {
          changePage(currentPage + 1);
        }}
        hide={currentPage + 1 > maxDisplayedPages ? "hidden" : "visible"}
      />
    </PaginationBox>
  );
};

export default Pagination;
