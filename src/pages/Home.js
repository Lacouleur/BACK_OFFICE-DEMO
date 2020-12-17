import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentList from "../components/ContentList/ContentList";
import PageContainer from "../styles/styledComponents/global/pageContainer";

const Home = () => {
  return (
    <PageContainer>
      <Header />
      <ContentList />
      <Footer />
    </PageContainer>
  );
};

export default Home;
