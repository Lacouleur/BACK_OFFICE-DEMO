import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { TitleBox, H1 } from "../../styles/styledComponents/global/Titles.sc";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import {
  IconCreat,
  ContentSectionBox,
  ListBox,
  ManifestoLangSelector,
} from "../../styles/styledComponents/contentList/ContentList.sc";
import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import Pagination from "./Pagination";
import keyGenerator from "../../helper/keyGenerator";
import { fetchContentsList } from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  cleanContentState,
  cleanPageState,
} from "../../store/actions/commonsActions";
import langList from "../../helper/langList";
import DuplicateModal from "../Modals/DuplicateModal";
import ArchiveModal from "../Modals/ArchiveModal";
import ErrorModal from "../Modals/ErrorModal";
import { setContentsList } from "../../store/actions/contentListActions";

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

  const { lastPage, currentPage, contentsList } = contentsListState;

  const {
    isOpenErrorModal,
    isOpenArchiveModal,
    isOpenDuplicateModal,
  } = actionBarState;

  useEffect(() => {
    dispatch(fetchContentsList());
    dispatch(cleanContentState());
    dispatch(cleanPageState());
  }, []);

  return (
    <>
      {isOpenDuplicateModal.value && <DuplicateModal type="content" />}
      {isOpenArchiveModal && <ArchiveModal type="content" />}

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
          {contentsList &&
            contentsList.map((content, index) => {
              return (
                <Content
                  number={index}
                  id={content._id}
                  status={content.state}
                  slug={content.slug}
                  publishScheduleFailed={content.publishScheduleFailed}
                  publishScheduledAt={content.publishScheduledAt}
                  publishedAt={content.publishedAt}
                  categoryLabel={content.category?.label}
                  modified={content.modified}
                  title={content.title}
                  lang={content.language}
                  updatedAt={content.updatedAt}
                  key={keyGenerator(content._id)}
                  modulesList={content.components}
                  retryAt={content?.publishScheduleFailData?.retryAt}
                  failCount={content?.publishScheduleFailData?.failCount}
                />
              );
            })}
        </ListBox>

        <Pagination
          itemsList={contentsList}
          setContent={setContentsList}
          pageName="contentList"
          lastPage={lastPage}
          currentPage={currentPage}
        />
      </ContentSectionBox>
    </>
  );
};

export default ContentList;
