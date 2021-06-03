/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import MainInformation from "../../components/Editor/Sections/MainInformation";
import Seo from "../../components/Editor/Sections/Seo";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../../styles/assets/icons/plus.svg";
import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import { IconCreat } from "../../styles/styledComponents/contentList/ContentList.sc";
import {
  Form,
  FormContainer,
  NewBlockButtonBox,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import ModuleCreator from "../../components/Editor/Sections/Modules/ModuleCreator";
import { fetchContent } from "../../store/actions/clientActions";
import TextModule from "../../components/Editor/Sections/Modules/TextModule/TextModule";
import ImageModule from "../../components/Editor/Sections/Modules/ImageModule/ImageModule";
import { setArticleId } from "../../store/actions/commonsActions";
import {
  setErrorSlug,
  setErrorTitle,
} from "../../store/actions/mainInformationActions";
import colors from "../../styles/core/colors";
import HomeNavigation from "../../components/Editor/Sections/HomeNavigation";
import OpinionModule from "../../components/Editor/Sections/Modules/OpinionModule/OpinionModule";



const Editor = () => {
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

  const { modulesList } = modulesState;

  useEffect(() => {
      dispatch(fetchContent(articleId));
      dispatch(setArticleId(articleId));
  }, []);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          <MainInformation />
          <Seo />
          <HomeNavigation />
          {modulesList?.map((module) => {
            switch (module.type) {
              case "text":{
                return (
                  <TextModule
                    key={module.uuid}
                    text={module.text}
                    uuid={module.uuid}
                    isChanged={module.isChanged}
                    isOpenCloseModal={module.isOpenCloseModal}
                    isNewModule={module.isNewModule}
                  />
                );}
              case "image":{
                return (
                  <ImageModule
                    key={module.uuid}
                    uuid={module.uuid}
                    thumbnail={module?.image?.urls?.thumbnail?.url || undefined}
                    imageUuid={module.image.uuid}
                    altImage={module.image.alt}
                    isChanged={module.isChanged}
                    isOpenCloseModal={module.isOpenCloseModal}
                    isNewModule={module.isNewModule}
                  />
                );}
                case "opinion":{
                    return (
                      <OpinionModule 
                        key={module.uuid}
                        uuid={module.uuid}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        question={module.question}
                        showPercentage={module.showPercentage}
                        showResponse={module.showResponse}
                        showRight={module.showRight}
                        explanation={module.explanation}
                        answers={module.answers}
                      />
                );}
                default :
                return null;
            }
            })}
  
          {isOpen && articleId && <ModuleCreator setIsOpen={setIsOpen} />}
          <NewBlockButtonBox>
            <Button
              type="button"
              onClick={() => {
            setIsOpen(true);
            dispatch(setErrorTitle(false));
            dispatch(setErrorSlug(false));
            }}
              styles={{
              ...createNewContent,
              marginLeft: "auto",
              maginRight: "0",
              background: `${colors.paleViolet}`
            }}
            >
              <IconCreat src={plus} />
              ADD A NEW BLOCK
            </Button>
          </NewBlockButtonBox>
        </FormContainer>
      </Form>
      <Footer position="fixed" />
    </PageContainer>
  );
};

export default Editor;
