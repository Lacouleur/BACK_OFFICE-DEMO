/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import HomeScreen from "../components/Editor/Sections/HomeScreen";
import Seo from "../components/Editor/Sections/Seo";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../styles/assets/icons/plus.svg";
import { createNewContent } from "../styles/styledComponents/global/Buttons/CustomButtons.sc";
import { IconCreat } from "../styles/styledComponents/contentList/ContentList.sc";
import {
  Form,
  FormContainer,
  NewBlockButtonBox,
} from "../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../components/Editor/actionBar/ActionBar";
import ModuleCreator from "../components/Editor/Sections/Modules/ModuleCreator";
import { fetchContent, saveModule } from "../store/actions/clientActions";
import TextModule from "../components/Editor/Sections/Modules/TextModule";
import { setArticleId } from "../store/actions/commonsActions";
import {
  setErrorSlug,
  setErrorTitle,
} from "../store/actions/homeScreenActions";
import colors from "../styles/core/colors";



const Editor = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const { isEditing, articleId, title, slug } = homeScreenState;

  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

  const { modulesList } = modulesState;

  useEffect(() => {
    if (!articleId && location.state?.id) {
      dispatch(setArticleId(location.state?.id));
      dispatch(fetchContent(location.state?.id));
    }
  }, []);

  useEffect(() => {
    modulesList?.map((module) => {
    if (module.isNewModule) {
      dispatch(saveModule(module.uuid, "save"));
    }
    return null;
  });
  }, [modulesList]);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          <HomeScreen />
          <Seo />
          {modulesList?.map((module) => {
            if (module.type === "text") {
              if (module.isPostedModule) {
                return (
                  <TextModule
                    key={module.uuid}
                    text={module.text}
                    uuid={module.uuid}
                    isChanged={module.isChanged}
                    edit={isEditing}
                    isOpenCloseModal={module.isOpenCloseModal}
                    isNewModule={module.isNewModule}
                  />
                );
              }
            }
            return null;
          })}
          {isOpen && articleId && <ModuleCreator setIsOpen={setIsOpen} />}
          <NewBlockButtonBox>
            <Button
              type="button"
              onClick={() => {
          if (articleId) {
            setIsOpen(true);
            dispatch(setErrorTitle(false));
            dispatch(setErrorSlug(false));
          } else if (!isEditing) {
              if (!slug) {
                dispatch(setErrorSlug(true));
              }
              if (!title) {
                dispatch(setErrorTitle(true));
              }
            }
        }}
              styles={
              isEditing ? {
          ...createNewContent,
          marginLeft: "auto",
          maginRight: "0",
        } : {
          ...createNewContent,
          marginLeft: "auto",
          maginRight: "0",
          background: `${colors.lightGrey}`
        }
}
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
