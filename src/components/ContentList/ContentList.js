/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { H1 } from "../../styles/styledComponents/global/titles";
import Flex from "../../styles/styledComponents/global/flexBoxes";
import Button from "../../styles/styledComponents/global/buttons";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import { IconCreat } from "../../styles/styledComponents/contentList/content";
import { getContentList } from "../../services/client/contentClient";
import { contentList } from "../../styles/styledComponents/global/customs/customFlexBoxes";
import { createNewContent } from "../../styles/styledComponents/global/customs/customButtons";
import Pagination from "./Pagination";

const ContentList = () => {
  const [contents, setContents] = useState();

  useEffect(() => {
    return getContentList().then((res) => {
      setContents(res.data.contents);
    });
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
      </Flex>
      <Pagination />
    </Flex>
  );
};

export default ContentList;
