/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, {  useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import MainInformation from "../../components/Editor/Sections/MainInformation";
import {
  Form,
  FormContainer,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import { setIsManifesto} from "../../store/actions/manifestoActions";
import { TitleBox } from "../../styles/styledComponents/contentList/ContentList.sc";
import { ManifestoLang, ManifestoTitle } from "../../styles/styledComponents/global/Titles.sc";
import { fetchManifesto } from "../../store/actions/clientActions";

const EditorCreateManifesto = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { lang } = useParams();
  

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const {manifestoId, manifestoLang, isManifesto } = manifestoState;

  useEffect(() => { 

    dispatch(setIsManifesto(true))

    if(!manifestoId) {
      dispatch(fetchManifesto(lang));
    }

     }, []);

  useEffect(() => { 
    if (manifestoId) {
      history.push(`/manifesto/${lang}`)
    }

   }, [manifestoId, manifestoLang]);


  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          <TitleBox>
            <ManifestoTitle>MANIFESTO</ManifestoTitle>
            <ManifestoLang>{lang}</ManifestoLang>
          </TitleBox>
          <MainInformation />
        </FormContainer>
      </Form>
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default EditorCreateManifesto;
