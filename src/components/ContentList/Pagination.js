/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import {
  PageListArrow,
  PaginationBox,
  PageListNoArrow,
} from "../../styles/styledComponents/contentList/Pagination.sc";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import { fetchContentsList } from "../../store/actions/thunk/ArticlesActions.thunk";
import { fetchPages } from "../../store/actions/thunk/PagesHubActions.thunk";

const Pagination = ({
  itemsList,
  setContent,
  pageName,
  lastPage,
  currentPage,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setContent(itemsList);
  }, [itemsList]);

  const handlePageClick = (event) => {
    if (pageName === "contentList") {
      dispatch(fetchContentsList(event.selected + 1));
    }
    if (pageName === "pagesList") {
      dispatch(fetchPages(event.selected + 1));
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
};

export default Pagination;
