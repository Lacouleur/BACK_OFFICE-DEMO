/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "../../components/Navigation/Header";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../../styles/assets/icons/plus.svg";
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
import {
  setErrorSlug,
  setErrorTitle,
} from "../../store/actions/mainInformationActions";
import { HideOnDnd } from "../../styles/styledComponents/editor/modules/Modules.sc";
import { onDragEnd } from "../../helper/Editor/dragAndDropHelper";
import ModulesDispatcher from "../../components/Editor/Sections/Modules/ModulesDispatcher";
import { consolePage } from "../../helper/consoleStyles";
import { pageSetId, setIsPage } from "../../store/actions/pageEditor/pageMainInformationsActions";
import PageMainInformation from "../../components/EditorPage/Sections/PageMainInformation";
import { fetchPage } from "../../store/actions/thunk/PageActions.thunk";
import PageSeo from "../../components/EditorPage/Sections/PageSeo";
import PageHeader from "../../components/EditorPage/Sections/PageHeader";

// This files is the main editor for Pages - it work similarly as article editor : ContentEditor.js

const PageEditor = () => {

  const dispatch = useDispatch();
  const { pageId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const actionBarState = useSelector(({ actionBarReducer }) => actionBarReducer);
  const [isUsedDndArea, setIsUsedDnDArea] = useState(false);
  const { modulesList } = modulesState;
  const { isOpenCloseModal, aModuleIsOpen } = actionBarState;

  useEffect(() => {
    console.log("%cPAGE: PAGE-EDITOR", `${consolePage}`);
    dispatch(fetchPage(pageId));
    dispatch(pageSetId(pageId));
    dispatch(setIsPage(true));
  }, []);

  useEffect(() => {
    console.log("%cMODULE LIST", `${consolePage}`, modulesList);
  }, [modulesList]);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form>
        <ActionBar />
        <FormContainer>
          {isUsedDndArea && <HideOnDnd />}
          {isOpenCloseModal?.value && <HideContent />}
          <PageMainInformation />
          <PageSeo />
          <PageHeader />
          {modulesList?.length > 0 && (<Separator />)}

          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, modulesList, dispatch)
              setIsUsedDnDArea(false)
            }}
            onDragStart={() => setIsUsedDnDArea(true)}
          >
            {modulesList && modulesList.length > 0 && (
              <Droppable droppableId={pageId}>
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

          {isOpen && pageId && <ModuleCreator setIsOpen={setIsOpen} />}
          <NewBlockButtonBox>
            <Button
              type="button"
              onClick={() => {
                setIsOpen(true);
                dispatch(setErrorTitle(false));
                dispatch(setErrorSlug(false));
              }}
              addNewBlockButton
            >
              <IconCreat src={plus} />
              ADD A NEW BLOCK
            </Button>
          </NewBlockButtonBox>
        </FormContainer>
      </Form>
      {/*       <Footer position="fixed" /> */}
    </PageContainer>
  );
};

export default PageEditor;
