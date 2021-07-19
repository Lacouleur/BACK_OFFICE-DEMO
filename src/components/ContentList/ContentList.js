import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { H1 } from "../../styles/styledComponents/global/Titles.sc";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import {
  IconCreat,
  ContentSectionBox,
  TitleBox,
  ListBox,
  ManifestoLangSelector,
} from "../../styles/styledComponents/contentList/ContentList.sc";

import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import Pagination from "./Pagination";

import keyGenerator from "../../helper/keyGenerator";

import { fetchContentsList } from "../../store/actions/clientActions";
import { cleanContentState } from "../../store/actions/commonsActions";
import langList from "../../helper/langList";
import DuplicateModal from "../Modals/DuplicateModal";
import ArchiveModal from "../Modals/ArchiveModal";
import ErrorModal from "../Modals/ErrorModal";

const ContentList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const langSelector = React.useRef(null);
  const contentsListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );
  const { contentsList, isOpenDuplicateModal } = contentsListState;
  const { isOpenErrorModal, isOpenArchiveModal } = actionBarState;

  useEffect(() => {
    dispatch(fetchContentsList());
    dispatch(cleanContentState());
  }, []);

  console.log(isOpenArchiveModal);

  return (
    <>
      {isOpenDuplicateModal.value && <DuplicateModal />}
      {isOpenArchiveModal && <ArchiveModal />}
      <ContentSectionBox>
        {isOpenErrorModal && <ErrorModal />}
        <TitleBox>
          <H1> CONTENT LIST</H1>
          <ManifestoLangSelector
            ref={langSelector}
            placeholder="Manifesto"
            classNamePrefix="select"
            options={langList}
            onChange={(lang) => {
              history.push(`/create-manifesto/${lang.value}`);
            }}
          />
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
                slug={content.slug}
                programmedAt={content.publishScheduledAt}
                publishedAt={content.publishedAt}
                categoryLabel={content.category?.label}
                modified={content.modified}
                title={content.title}
                lang={content.language}
                updatedAt={content.updatedAt}
                key={keyGenerator(content._id)}
                modulesList={content.components}
              />
            );
          })}
        </ListBox>
      </ContentSectionBox>
      <Pagination />
    </>
  );
};

export default ContentList;
