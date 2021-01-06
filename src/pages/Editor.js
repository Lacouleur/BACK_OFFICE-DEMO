import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FieldStyle } from "../styles/styledComponents/global/Field.sc";
import Flex from "../styles/styledComponents/global/FlexBoxes.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import colors from "../styles/core/colors";

const Editor = () => {
  return (
    <PageContainer>
      <Header />
      <Flex
        style={{
          backgroundColor: `${colors.mediumGrey}`,
          width: "90%",
          height: "100%",
        }}
      >
        <FieldStyle
          type="text"
          placeholder="Title"
          style={{
            width: "60%",
            height: "56px",
            color: `${colors.white}`,
          }}
        />
      </Flex>
      <Footer />
    </PageContainer>
  );
};

export default Editor;
