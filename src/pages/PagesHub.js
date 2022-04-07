import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";
import SideBar from "../components/Navigation/SideBar";
import PageCard from "../components/PagesHub/PageCard";
import { fetchPages } from "../store/actions/thunk/PagesHubActions.thunk";
import { IconCreat } from "../styles/styledComponents/contentList/ContentList.sc";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import { createNewContent } from "../styles/styledComponents/global/Buttons/CustomButtons.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import { H1, TitleBox } from "../styles/styledComponents/global/Titles.sc";
import {
  PageCardsContainer,
  PageHubContainer,
} from "../styles/styledComponents/pagesHub/PagesHub.sc";
import plusIcon from "../styles/assets/icons/plus.svg";
import {
  cleanContentState,
  cleanPageState,
} from "../store/actions/commonsActions";
import Pagination from "../components/ContentList/Pagination";
import { setPagesList } from "../store/actions/pagesHubActions";
import DuplicateModal from "../components/Modals/DuplicateModal";
import ArchiveModal from "../components/Modals/ArchiveModal";
import ErrorModal from "../components/Modals/ErrorModal";
import { harmonizeLang } from "../helper/fieldsHelper";

const PagesHub = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPages());
    dispatch(cleanContentState());
    dispatch(cleanPageState());
  }, []);

  const pagesHubState = useSelector(({ pagesHubReducer }) => pagesHubReducer);

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { pagesList, lastPage, currentPage } = pagesHubState;

  const {
    isOpenErrorModal,
    isOpenArchiveModal,
    isOpenDuplicateModal,
  } = actionBarState;

  return (
    <>
      <PageContainer position="relative">
        <Header position="fixed" />
        <SideBar />
        <PageHubContainer>
          {isOpenDuplicateModal.value && <DuplicateModal type="page" />}
          {isOpenArchiveModal && <ArchiveModal type="page" />}
          {isOpenErrorModal && <ErrorModal />}
          <TitleBox>
            <H1 id="PageManager"> PAGE MANAGER </H1>
            <Link to="/page-editor/create">
              <Button styles={createNewContent}>
                <IconCreat src={plusIcon} />
                CREATE NEW PAGE
              </Button>
            </Link>
          </TitleBox>
          <PageCardsContainer>
            {pagesList &&
              pagesList.map((page) => {
                return (
                  <PageCard
                    state={page.state}
                    title={page.title}
                    key={`${page._id}`}
                    id={page._id}
                    updatedDate={page.updatedAt}
                    publishedAt={page.publishedAt}
                    modified={page.modified}
                    language={harmonizeLang(page.language)}
                    publishScheduleFailed={page.publishScheduleFailed}
                    publishScheduledAt={page.publishScheduledAt}
                    updatedAt={page.updatedAt}
                    retryAt={page?.publishScheduleFailData?.retryAt}
                    failCount={page?.publishScheduleFailData?.failCount}
                  />
                );
              })}
          </PageCardsContainer>
        </PageHubContainer>
        <Pagination
          itemsList={pagesList}
          setContent={setPagesList}
          pageName="pagesList"
          lastPage={lastPage}
          currentPage={currentPage}
        />
        <Footer position="fixed" />
      </PageContainer>
    </>
  );
};

export default PagesHub;
