/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { H1 } from "../../styles/styledComponents/global/Titles.sc";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import {
  IconCreat,
  ContentSectionBox,
  TitleBox,
  ListBox,
} from "../../styles/styledComponents/contentList/ContentList.sc";
import { getContentList } from "../../services/client/contentClient";
import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import Pagination from "./Pagination";
import { hostUrl } from "../../services/config/clientConfig";
import keyGenerator from "../../helper/keyGenerator";
import { deleteArticleToEdit } from "../../services/client/localStorage";

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

  useEffect(() => {
    async function fetchContentList() {
      const res = await getContentList();
      setPagination(paginationBuilder(res.data));
      setContents(res.data.contents);
      deleteArticleToEdit();
    }
    fetchContentList();
  }, []);

  return (
    <ContentSectionBox>
      <TitleBox>
        <H1> CONTENT LIST</H1>
        <Button
          styles={createNewContent}
          onClick={() => window.location.assign(`${hostUrl}/editor`)}
        >
          <IconCreat src={plus} />
          CREATE NEW CONTENT
        </Button>
      </TitleBox>
      <ListBox>
        {contents &&
          contents.map((content, index) => {
            return (
              <Content
                number={index}
                id={content._id}
                status={content.state}
                categoryLabel={content.category?.label}
                title={content.title}
                key={keyGenerator(content._id)}
              />
            );
          })}
        {pagination && (
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            setContents={setContents}
          />
        )}
      </ListBox>
    </ContentSectionBox>
  );
};

export default ContentList;
