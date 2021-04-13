import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import Pagination from "./Pagination";

import keyGenerator from "../../helper/keyGenerator";

import { fetchContentsList } from "../../store/actions/clientActions";
import { cleanContentState } from "../../store/actions/commonsActions";

const ContentList = () => {
  const dispatch = useDispatch();
  const contentsState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );

  const { contentsList } = contentsState;

  useEffect(() => {
    dispatch(fetchContentsList());
    dispatch(cleanContentState());
  }, []);

  return (
    <ContentSectionBox>
      <TitleBox>
        <H1> CONTENT LIST</H1>
        <Link to="/editor">
          <Button styles={createNewContent}>
            <IconCreat src={plus} />
            CREATE NEW CONTENT
          </Button>
        </Link>
      </TitleBox>
      <ListBox>
        {contentsList.map((content, index) => {
          return (
            <Content
              number={index}
              id={content._id}
              status={content.state}
              programmedAt={content.publishScheduledAt}
              publishedAt={content.publishedAt}
              categoryLabel={content.category?.label}
              modified={content.modified}
              title={content.title}
              lang={content.language}
              updatedAt={content.updatedAt}
              key={keyGenerator(content._id)}
            />
          );
        })}
        <Pagination />
      </ListBox>
    </ContentSectionBox>
  );
};

export default ContentList;
