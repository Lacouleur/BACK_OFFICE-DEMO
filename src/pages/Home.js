import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentList from "../components/ContentList/ContentList";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import { consolePage } from "../helper/consoleStyles";

const Home = () => {
  console.log("%cPAGE => DASHBOARD", `${consolePage}`);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <ContentList />
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default Home;
