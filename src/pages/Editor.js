import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import HomeScreen from "../components/Editor/Sections/HomeScreen";
import PageTitle from "../components/PageTitle";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../styles/assets/icons/plus.svg";
import { createNewContent } from "../styles/styledComponents/global/Buttons/CustomButtons.sc";
import { IconCreat } from "../styles/styledComponents/contentList/ContentList.sc";

const Editor = () => {
  return (
    <PageContainer position="relative">
      <Header />
      <PageTitle />
      <HomeScreen />
      <Button
        styles={{
          ...createNewContent,
          alignSelf: "flex-end",
          marginRight: "5%",
        }}
      >
        <IconCreat src={plus} />
        ADD A NEW BLOCK
      </Button>
      <Footer />
    </PageContainer>
  );
};

export default Editor;
