/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Footer from "../../components/Navigation/Footer";
import Header from "../../components/Navigation/Header";
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
  HideContent,
  NewBlockButtonBox,
  Separator,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import ModuleCreator from "../../components/Editor/Sections/Modules/ModuleCreator";
import { fetchContent } from "../../store/actions/thunk/ArticlesActions.thunk";
import { setArticleId } from "../../store/actions/commonsActions";
import {
  setErrorSlug,
  setErrorTitle,
} from "../../store/actions/mainInformationActions";
import {
  setIsManifesto,
} from "../../store/actions/manifestoActions";
import colors from "../../styles/core/colors";
import HomeNavigation from "../../components/Editor/Sections/HomeNavigation";
import { HideOnDnd } from "../../styles/styledComponents/editor/modules/Modules.sc";
import { onDragEnd } from "../../helper/Editor/dragAndDrop";
import { setIsAccessiblePanel } from "../../store/actions/userActions";
import ModulesDispatcher from "../../components/Editor/Sections/Modules/ModulesDispatcher";
import { consolePage } from "../../helper/consoleStyles";


const Editor = () => {
  
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const actionBarState = useSelector(({ actionBarReducer }) => actionBarReducer);
  const [isUsedDndArea, setIsUsedDnDArea] = useState(false);
  const { modulesList } = modulesState;
  const { isOpenCloseModal, aModuleIsOpen } = actionBarState;

  useEffect(() => {
      console.log("%cPAGE => EDIT CONTENT", `${consolePage}`);
      dispatch(setIsManifesto(false))
      dispatch(fetchContent(articleId));
      dispatch(setArticleId(articleId));
  }, []);


  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          {isUsedDndArea && <HideOnDnd />}
          {isOpenCloseModal?.value && <HideContent />}
          <MainInformation />
          <Seo />
          <HomeNavigation />
          {modulesList?.length > 0 && (
            <Separator />
          )}
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, modulesList, dispatch)
              setIsUsedDnDArea(false)
              }}
            onDragStart={() => setIsUsedDnDArea(true)}
          > 
            {modulesList && modulesList.length > 0 && (
            <Droppable droppableId={articleId}>
              {(provided) => {
              return (
                <ModulesDispatcher
                  modulesList={modulesList}
                  isUsedDndArea={isUsedDndArea}
                  provided={provided}
                  aModuleIsOpen={aModuleIsOpen}
                />
                )
              }}
            </Droppable>
          )}
          </DragDropContext>

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
