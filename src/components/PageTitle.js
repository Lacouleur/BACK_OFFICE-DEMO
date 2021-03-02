import React from "react";
import { useHistory } from "react-router-dom";
import {
  H1,
  TitleArrow,
  PageTitleBox,
} from "../styles/styledComponents/global/Titles.sc";
import arrowLeft from "../styles/assets/icons/arrow-left.svg";

const PageTitle = () => {
  const history = useHistory();
  return (
    <PageTitleBox>
      <TitleArrow src={arrowLeft} onClick={() => history.push("/dashboard")} />
      <H1>CREATE CONTENT</H1>
    </PageTitleBox>
  );
};

export default PageTitle;
