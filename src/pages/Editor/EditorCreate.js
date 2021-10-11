/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, {  useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import MainInformation from "../../components/Editor/Sections/MainInformation";
import {
  Form,
  FormContainer,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import { setIsManifesto } from "../../store/actions/manifestoActions";
import { setIsAccessiblePanel } from "../../store/actions/userPanelActions";



const EditorCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const {isPosted, articleId } = MainInformationState;

  useEffect(() => {
    dispatch(setIsManifesto(false))
    if (isPosted) {
      history.push(`/editor/${articleId}`)
    }
    dispatch(setIsAccessiblePanel(false));
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
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default EditorCreate;
