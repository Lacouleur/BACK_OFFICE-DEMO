/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import TextModule from "../../components/Editor/Sections/Modules/TextModule/TextModule";
import ImageModule from "../../components/Editor/Sections/Modules/ImageModule/ImageModule";
import {
  setErrorSlug,
  setErrorTitle,
} from "../../store/actions/mainInformationActions";
import colors from "../../styles/core/colors";
import HomeNavigation from "../../components/Editor/Sections/HomeNavigation";
import OpinionModule from "../../components/Editor/Sections/Modules/OpinionModule/OpinionModule";
import { ManifestoLang, ManifestoTitle } from "../../styles/styledComponents/global/Titles.sc";
import { setIsManifesto } from "../../store/actions/manifestoActions";

const EditorManifesto = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const { modulesList } = modulesState;
  const manifestoState = useSelector(
    ({ manifestoReducer}) => manifestoReducer
  );
  const actionBarState = useSelector(({ actionBarReducer }) => actionBarReducer);
 const { manifestoId } = manifestoState;
 const { isOpenCloseModal } = actionBarState;

  useEffect(() => {
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
            onDragEnd={result => onDragEnd(result, modulesList, dispatch)}
          > 
            <Droppable droppableId={articleId}>
              {(provided, snapshot) => {
              return (
                <ModulesBoardDnd
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                > 
                  {modulesList?.map((module) => {
            switch (module.type) {
              case "text":{
                return (
                  <Draggable
                    isDragDisabled={aModuleIsOpen}
                    key={module.uuid}
                    draggableId={module.uuid}
                    index={index}
                  > 
                    {(provided, snapshot) => {
                  return (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        backgroundColor: snapshot.isDragging
                          ? "#263B4A"
                          : "#456C86",
                        ...provided.draggableProps.style
                      }}
                    >
                      <TextModule
                        key={module.uuid}
                        text={module.text}
                        uuid={module.uuid}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        isVisible={module.isVisible}
                      />
                    </div>
                      )}}
                  </Draggable>
                    );}
              case "image":{
                return (
                  <Draggable
                    isDragDisabled={aModuleIsOpen}
                    key={module.uuid}
                    draggableId={module.uuid}
                    index={index}
                  > 
                    {(provided, snapshot) => {
                return (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      backgroundColor: snapshot.isDragging
                        ? "#263B4A"
                        : "#456C86",
                      ...provided.draggableProps.style
                    }}
                  >
                    <ImageModule
                      key={module.uuid}
                      uuid={module.uuid}
                      thumbnail={module?.image?.urls?.thumbnail?.url || undefined}
                      imageUuid={module.image.uuid}
                      altImage={module.image.alt}
                      isChanged={module.isChanged}
                      isOpenCloseModal={module.isOpenCloseModal}
                      isNewModule={module.isNewModule}
                      isVisible={module.isVisible}
                    />
                  </div>
                      )}}
                  </Draggable>
                    );}
                case "opinion":{
                  return (
                    <Draggable
                      isDragDisabled={aModuleIsOpen}
                      key={module.uuid}
                      draggableId={module.uuid}
                      index={index}
                    > 
                      {(provided, snapshot) => {
                  return (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        backgroundColor: snapshot.isDragging
                          ? "#263B4A"
                          : "#456C86",
                        ...provided.draggableProps.style
                      }}
                    >
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
                        isVisible={module.isVisible}
  
                      />
                    </div>
                      )}}
                    </Draggable>
                    );}
                    default :
                    return null;
                }
                })}
                  {provided.placeholder}
                </ModulesBoardDnd>
                

                )
              }}
  
            </Droppable>
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
