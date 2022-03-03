/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, {  useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import Footer from "../../components/Navigation/Footer";
import Header from "../../components/Navigation/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import {
  Form,
  FormContainer,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import { consolePage } from "../../helper/consoleStyles";
import PageMainInformation from "../../components/EditorPage/Sections/PageMainInformation";



const PageEditorCreate = () => {
  
  const history = useHistory();
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const {isPosted, pageId } = PageMainInformationState;

  useEffect(() => {
    console.log("%cPAGE: CREATE NEW PAGE", `${consolePage}`);
  }, []);

  useEffect(() => {
    if (isPosted && pageId) {
      history.push(`/page-editor/${pageId}`)
    }
  }, [isPosted, pageId]);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          <PageMainInformation />
        </FormContainer>
      </Form>
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default PageEditorCreate;
