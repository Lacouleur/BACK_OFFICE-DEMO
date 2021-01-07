/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { H1 } from "../../styles/styledComponents/global/Titles.sc";
import Flex from "../../styles/styledComponents/global/FlexBoxes.sc";
import Button from "../../styles/styledComponents/global/Buttons.sc";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import { IconCreat } from "../../styles/styledComponents/contentList/Content.sc";
import { getContentList } from "../../services/client/contentClient";
import contentList from "../../styles/styledComponents/contentList/ContentListCustomBoxes.sc";
import { createNewContent } from "../../styles/styledComponents/global/customs/CustomButtons.sc";
import Pagination from "./Pagination";

const ContentList = () => {
  const [contents, setContents] = useState();
  const [pagination, setPagination] = useState();

  function paginationBuilder(data) {
    const isNextPage = data.nextPage || 1;
    const isPreviousPage = data.previousPage || 1;
    const paginate = {
      currentPage: data.currentPage,
      nextPage: isNextPage,
      previousPage: isPreviousPage,
      lastPage: data.lastPage,
    };
    return paginate;
  }

  useEffect(async () => {
    const res = await getContentList();
    setPagination(paginationBuilder(res.data));
    setContents(res.data.contents);
  }, []);

  return (
    <Flex style={contentList.ContentsPageContainer}>
      <Flex style={contentList.titleBox}>
        <H1> CONTENT LIST</H1>
        <Button style={createNewContent}>
          <IconCreat src={plus} />
          CREAT NEW CONTENT
        </Button>
      </Flex>
      <Flex style={contentList.listContainer}>
        {contents &&
          contents.map((content, index) => (
            <Content number={index} content={content} key={content._id} />
          ))}
        {pagination && (
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            setContents={setContents}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ContentList;
