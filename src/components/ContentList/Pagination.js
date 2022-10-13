/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import {
  PageListArrow,
  PaginationBox,
  PageListNoArrow,
} from "../../styles/styledComponents/contentList/Pagination.sc";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import { setAskedPage } from "../../store/actions/contentListActions";
import { setAskedPagePagination } from "../../store/actions/pagesHubActions";

const Pagination = ({
  itemsList,
  setContent,
  pageName,
  lastPage,
  currentPage,
  askedPage,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setContent(itemsList);
  }, [itemsList]);

  const handlePageClick = (event) => {
    if (pageName === "contentList") {
      dispatch(setAskedPage(event.selected + 1));
    }
    if (pageName === "pagesList") {
      dispatch(setAskedPagePagination(event.selected + 1));
    }
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
        forcePage={askedPage - 1 || undefined}
      />
    </PaginationBox>
  );
};

Pagination.defaultProps = {
  lastPage: 2,
  currentPage: undefined,
};

Pagination.propTypes = {
  setContent: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lastPage: PropTypes.number,
  currentPage: PropTypes.number,
  askedPage: PropTypes.number.isRequired,
};

export default Pagination;
