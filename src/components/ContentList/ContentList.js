import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { TitleBox, H1 } from "../../styles/styledComponents/global/Titles.sc";
import Content from "./Content";
import plus from "../../styles/assets/icons/plus.svg";
import {
  IconCreat,
  ContentSectionBox,
  ListBox,
  ManifestoLangSelector,
} from "../../styles/styledComponents/contentList/ContentList.sc";
import Pagination from "./Pagination";
import keyGenerator from "../../helper/keyGenerator";
import {
  fetchContentsList,
  fetchResearchedContentsList,
} from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  cleanContentState,
  cleanPageState,
} from "../../store/actions/commonsActions";
import langList from "../../helper/langList";
import DuplicateModal from "../Modals/DuplicateModal";
import ArchiveModal from "../Modals/ArchiveModal";
import ErrorModal from "../Modals/ErrorModal";
import {
  setContentsList,
  setSearchedList,
} from "../../store/actions/contentListActions";
import { harmonizeLang } from "../../helper/fieldsHelper";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import ListFilters from "./ListFilters";

// Content list is used to display a list of Content.js by passing props from the fetched content list

const ContentList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const langSelector = React.useRef(null);
  const contentsListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );

  const userState = useSelector(({ userReducer }) => userReducer);

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { locale } = userState;

  const {
    lastPage,
    currentPage,
    contentsList,
    searchedList,
    searchedArticle,
    langOfResearch,
  } = contentsListState;

  const [filterLang, setFilterLang] = useState("");

  const [filteredList, setFilteredList] = useState("");

  const [askedPage, setAskedPage] = useState(1);

  const {
    isOpenErrorModal,
    isOpenArchiveModal,
    isOpenDuplicateModal,
  } = actionBarState;

  useEffect(() => {
    dispatch(cleanContentState());
    dispatch(cleanPageState());
  }, []);

  useEffect(() => {
    setFilterLang(locale || "");
  }, [locale]);

  useEffect(() => {
    dispatch(
      fetchContentsList(currentPage || 1, undefined, "lang", filterLang)
    );
  }, []);

  useEffect(() => {
    if (searchedArticle === "" && currentPage && currentPage !== askedPage) {
      dispatch(fetchContentsList(askedPage, undefined, "lang", filterLang));
    }
    if (searchedArticle !== "") {
      dispatch(
        fetchResearchedContentsList(
          searchedArticle,
          filterLang,
          langOfResearch.value,
          currentPage === askedPage ? currentPage : askedPage
        )
      );
    }
  }, [filterLang, currentPage, askedPage]);

  useEffect(() => {
    if (searchedArticle === "") {
      dispatch(setSearchedList(null));
    }
  }, [searchedArticle]);

  useEffect(() => {
    const filtering = [];
    if (!searchedList) {
      contentsList.map((content) => {
        if (
          harmonizeLang(content.language) === filterLang ||
          filterLang === ""
        ) {
          filtering.push(content);
        }
        setFilteredList(filtering);
      });
    } else {
      setFilteredList(searchedList);
    }
  }, [filterLang, searchedList, contentsList]);

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
            <Button createNewContentButton>
              <IconCreat src={plus} />
              create new content
            </Button>
          </Link>
        </TitleBox>

        <ListFilters filterLang={filterLang} setFilterLang={setFilterLang} />

        <ListBox>
          {filteredList &&
            filteredList.map((content, index) => {
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

        {currentPage && (
          <Pagination
            itemsList={searchedList || contentsList}
            setContent={
              searchedArticle !== "" ? setSearchedList : setContentsList
            }
            pageName="contentList"
            lastPage={lastPage}
            currentPage={currentPage}
            setAskedPage={setAskedPage}
          />
        )}
      </ContentSectionBox>
    </>
  );
};

export default ContentList;
