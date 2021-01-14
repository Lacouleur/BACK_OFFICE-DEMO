import React from "react";
import {
  H1,
  TitleArrow,
  PageTitleBox,
} from "../styles/styledComponents/global/Titles.sc";
import arrowLeft from "../styles/assets/icons/arrow-left.svg";
import { hostUrl } from "../services/config/clientConfig";

const PageTitle = () => {
  return (
    <PageTitleBox>
      <TitleArrow
        src={arrowLeft}
        onClick={() => window.location.assign(`${hostUrl}`)}
      />
      <H1>CREATE CONTENT</H1>
    </PageTitleBox>
  );
};

export default PageTitle;
