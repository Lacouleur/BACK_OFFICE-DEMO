/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import {
  PageListArrow,
  PaginationBox,
  PageListNoArrow,
} from "../../styles/styledComponents/contentList/Pagination.sc";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import { fetchContentsList } from "../../store/actions/thunk/ArticlesActions.thunk";

const Pagination = ({ setContentList }) => {
  const contentState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );
  const { currentPage, lastPage, contentsList: items } = contentState;
  const dispatch = useDispatch();

  useEffect(() => {
    setContentList(items);
  }, [items]);

  const handlePageClick = (event) => {
    console.log("Pagination handlePageClick");
    dispatch(fetchContentsList(event.selected + 1));
  };

  return (
    <PaginationBox>
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          currentPage !== 1 ? (
            <PageListArrow alt="arrow" src={arrow} />
          ) : (
            <PageListNoArrow />
          )
        }
        nextLabel={
          lastPage !== currentPage ? (
            <PageListArrow right alt="arrow" src={arrow} />
          ) : (
            <PageListNoArrow />
          )
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={lastPage}
        containerClassName="paginate"
        pageClassName="paginate-page"
        pageLinkClassName="paginate-page__link"
        breakClassName="paginate-break"
        renderOnZeroPageCount={null}
      />
    </PaginationBox>
  );
};

Pagination.propTypes = {
  setContentList: PropTypes.func.isRequired,
};

export default Pagination;
