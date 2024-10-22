/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, {  useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import Footer from "../../components/Navigation/Footer";
import Header from "../../components/Navigation/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import MainInformation from "../../components/Editor/Sections/MainInformation";
import {
  Form,
  FormContainer,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import { setIsManifesto } from "../../store/actions/manifestoActions";
import { consolePage } from "../../helper/consoleStyles";
import { setIsPage } from "../../store/actions/pageEditor/pageMainInformationsActions";



const EditorCreate = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const {isPosted, articleId } = MainInformationState;

  useEffect(() => {
    console.log("%cPAGE: CREATE CONTENT", `${consolePage}`);
  }, []);

  useEffect(() => {
    dispatch(setIsManifesto(false))
    dispatch(setIsPage(false));
    if (isPosted) {
      history.push(`/editor/${articleId}`)
    }
  }, [isPosted]);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          <MainInformation />
        </FormContainer>
      </Form>
      {/* <Footer position="fixed" /> */}
    </PageContainer>
  );
};

export default EditorCreate;
