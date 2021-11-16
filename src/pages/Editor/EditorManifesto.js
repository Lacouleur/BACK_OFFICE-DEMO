/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import MainInformation from "../../components/Editor/Sections/MainInformation";
import Seo from "../../components/Editor/Sections/Seo";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../../styles/assets/icons/plus.svg";
import { createNewContent } from "../../styles/styledComponents/global/Buttons/CustomButtons.sc";
import { IconCreat, TitleBox } from "../../styles/styledComponents/contentList/ContentList.sc";
import {
  Form,
  FormContainer,
  HideContent,
  NewBlockButtonBox,
  Separator,
} from "../../styles/styledComponents/editor/Sections.sc";
import ActionBar from "../../components/Editor/actionBar/ActionBar";
import ModuleCreator from "../../components/Editor/Sections/Modules/ModuleCreator";
import { fetchManifesto } from "../../store/actions/thunk/ManifestoActions.thunk";
import {
  setErrorSlug,
  setErrorTitle,
} from "../../store/actions/mainInformationActions";
import colors from "../../styles/core/colors";
import HomeNavigation from "../../components/Editor/Sections/HomeNavigation";
import { ManifestoLang, ManifestoTitle } from "../../styles/styledComponents/global/Titles.sc";
import { setIsManifesto } from "../../store/actions/manifestoActions";
import { onDragEnd } from "../../helper/Editor/dragAndDrop";
import { HideOnDnd} from "../../styles/styledComponents/editor/modules/Modules.sc";
import { setIsAccessiblePanel } from "../../store/actions/userPanelActions";
import ModulesDispatcher from "../../components/Editor/Sections/Modules/ModulesDispatcher";

const EditorManifesto = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isUsedDndArea, setIsUsedDnDArea] = useState(false)
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const { modulesList } = modulesState;
  const manifestoState = useSelector(
    ({ manifestoReducer}) => manifestoReducer
  );
  const actionBarState = useSelector(({ actionBarReducer }) => actionBarReducer);
 const { manifestoId} = manifestoState;
 const { isOpenCloseModal, aModuleIsOpen} = actionBarState;

  useEffect(() => {
    dispatch(setIsAccessiblePanel(false));
    dispatch(setIsManifesto(true));
    if (!manifestoId) {
      dispatch(fetchManifesto(lang));
    }
  }, []);


  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          {isUsedDndArea && <HideOnDnd />}
          {isOpenCloseModal?.value && <HideContent />}
          <TitleBox>
            <ManifestoTitle>MANIFESTO</ManifestoTitle>
            <ManifestoLang>{lang}</ManifestoLang>
          </TitleBox>
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
            <Droppable droppableId="droppableManifesto">
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
  
          {isOpen && <ModuleCreator setIsOpen={setIsOpen} />}
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
              background: `${colors.paleViolet}`,
              position: "absolute",
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

export default EditorManifesto;
