import React from "react";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import ContentList from "../components/ContentList/ContentList";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import { consolePage } from "../helper/consoleStyles";
import SideBar from "../components/Navigation/SideBar";

const Home = () => {
  console.log("%cPAGE: DASHBOARD", `${consolePage}`);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <SideBar />
      <ContentList />
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default Home;
