import React from "react";
import PropTypes from "prop-types";
import {
  PageListLi,
  PageListUl,
  PageListArrow,
} from "../../styles/styledComponents/contentList/Pagination.sc";
import arrowLeft from "../../styles/assets/icons/arrow-left.svg";
import arrowRight from "../../styles/assets/icons/arrow-right.svg";
import Flex from "../../styles/styledComponents/global/FlexBoxes.sc";
import contentList from "../../styles/styledComponents/contentList/ContentListCustomBoxes.sc";
import keyGenerator from "../../helper/KeyGenerator";
import { getContentList } from "../../services/client/contentClient";
import colors from "../../styles/core/colors";

const Pagination = ({ pagination, setPagination, setContents }) => {
  const { currentPage, lastPage } = pagination;
  const pageArr = [];
  const maxDisplayedPages = lastPage < 5 ? lastPage : 5;

  const changePage = (pageNumber) => {
    if (pageNumber)
      getContentList(parseInt(pageNumber, 10)).then((res) => {
        setContents(res.data.contents);
        setPagination(res.data);
      });
  };

  for (let i = 1; i <= maxDisplayedPages && i <= lastPage; i += 1) {
    const page = i;
    pageArr.push(
      <PageListLi
        key={keyGenerator(page)}
        style={
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
    <Flex style={contentList.paginationBox}>
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
    </Flex>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    nextPage: PropTypes.number,
    previousPage: PropTypes.number,
    lastPage: PropTypes.number,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
  setContents: PropTypes.func.isRequired,
};

export default Pagination;
