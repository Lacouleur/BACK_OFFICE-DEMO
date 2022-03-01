import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";
import SideBar from "../components/Navigation/SideBar";
import PageCard from "../components/PagesHub/PageCard";
import { fetchPages } from "../store/actions/thunk/PagesHubActions.thunk";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import { H1, TitleBox } from "../styles/styledComponents/global/Titles.sc";
import {
  PageCardsContainer,
  PageHubContainer,
} from "../styles/styledComponents/pagesHub/PagesHub.sc";

const PagesHub = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPages());
  }, []);

  const pagesHubState = useSelector(({ pagesHubReducer }) => pagesHubReducer);

  const { pagesList } = pagesHubState;

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <SideBar />
      <PageHubContainer>
        <TitleBox>
          <H1 id="PageManager"> PAGE MANAGER </H1>
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
                  language={page.language.substring(0, 2)}
                  /*  archivedAt={page?.archivedAt}
                  author={page.author}
                  createdAt={page.createdAt}
                  firstPublishedAt={page.firstPublishedAt}
                  language={page.language}
                  publishedAt={page.publishedAt}
                  sections={page.sections}
                  seoTitle={page.seo.seoTitle}
                  seoDescription={page.seo.seoDescription}
                  slug={page.slug} 
                  updatedAt={page.updatedAt} 
                  */
                />
              );
            })}
        </PageCardsContainer>
      </PageHubContainer>
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default PagesHub;
