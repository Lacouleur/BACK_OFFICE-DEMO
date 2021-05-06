import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentList from "../components/ContentList/ContentList";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";

const Home = () => {
  return (
    <PageContainer position="absolute">
      <Header />
      <ContentList />
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default Home;
