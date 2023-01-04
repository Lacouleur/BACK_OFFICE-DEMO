/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
  NewBlockButtonBox,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  ModuleContainer,
  Delete,
  ActionIcons,
  FieldAndSwitchContainer,
  SeparatorWhite,
  InnerSectionTitleBox,
  InnerSectionTitle,
  InnerSectionDescritpion,
  TextComponenVariant,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  closeModule,
  setCollectionAddCard,
  setCollectionExcludeLastArticle,
  setCollectionIsMixed,
  setCollectionIsPaginated,
  setCollectionSearchInput,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import HeaderSectionPage from "../HeaderSectionPage";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import SwitchButton from "../../../../Tools/Switch";
import DragAndDropCustomList from "./DragAndDropCustomList";
import { IconCreat } from "../../../../../styles/styledComponents/contentList/ContentList.sc";
import plusIcon from "../../../../../styles/assets/icons/plus.svg";
import {
  FilterFieldContainer,
  FilterInput,
} from "../../../../../styles/styledComponents/global/FilterField.sc";
import Button from "../../../../../styles/styledComponents/global/Buttons/Buttons.sc";
import { onDragEndCollectionCards } from "../../../../../helper/Editor/dragAndDropHelper";
import CollectionsCardsDispatcher from "./CollectionCardsDispatcher";

const CollectionModule = ({
  title,
  subtitle,
  url,
  openNewTabHeader,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  order,
  categories,
  tags,
  limit,
  collectionType,
  collectionFormat,
  paginate,
  isPined,
  customIdsList,
  searchedInput,
  pinnedContents,
  ids,
  cumulatedContentsList,
  fetchedCustomList,
  currentPage,
  nextPage,
  lastPage,
  excludeLastContent,
  isMixed,
  resource,
  cardsList,
  currentOpennedCard,
}) => {
  const dispatch = useDispatch();
  const collectionModuleRef = useRef(null);
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { pageId, lang } = PageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (resource === "mixed") {
      dispatch(
        setCollectionIsMixed({ id: uuid, value: true, isChanged: false })
      );
    }
    if (resource === "contents") {
      dispatch(
        setCollectionIsMixed({ id: uuid, value: false, isChanged: false })
      );
    }
  }, []);

  useEffect(() => {
    watchNewModules(isNewModule, collectionModuleRef, setIsOpen);
  }, [isNewModule]);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isNewModule && isChanged) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }

  useClickOutside(collectionModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={collectionModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={collectionModuleRef}
          articleId={pageId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (isNewModule) {
                dispatch(closeModule(uuid));
              }
              if (status !== "PUBLISHED" && uuid) {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>
        <SectionTitle>
          <FormTitle>
            {`${order}. collection ${isMixed ? `(Mixed)` : ""} ${
              isMixed === false ? `(Articles)` : ""
            }`}
          </FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        {/* 2 SWITCHES TO SELECT IF MIXED OR ARTICLE COLLECTION */}
        {isMixed === undefined && (
          <>
            <TextComponenVariant>
              What type of collection do you want to create ?
            </TextComponenVariant>
            <SwitchButton
              styleVariant="selectModuleVariant"
              action={() => {
                dispatch(setCollectionIsMixed({ id: uuid, value: false }));
              }}
              isChecked={false}
              componentId="switch-collection-type-articles"
              displayedText="Articles"
            />

            <SwitchButton
              styleVariant="selectModuleVariant"
              action={() => {
                dispatch(setCollectionIsMixed({ id: uuid, value: true }));
              }}
              isChecked={false}
              componentId="switch-collection-type-mixed"
              displayedText="Mixed"
            />
          </>
        )}
        {isMixed !== undefined && (
          <>
            {/* HEADER FIELDS - TITLE-SUBTITLE-URL */}
            <HeaderSectionPage
              uuid={uuid}
              title={title}
              subtitle={subtitle}
              url={url}
              openNewTabHeader={openNewTabHeader}
            />

            <InnerSectionTitleBox>
              <InnerSectionTitle>COLLECTION MAIN SETTING -</InnerSectionTitle>
              <InnerSectionDescritpion>
                choose your collection type
                {/* choose if your collection is a slider or a gird */}
              </InnerSectionDescritpion>
            </InnerSectionTitleBox>

            {/* FIELD Resource TYPE - only one choice for the moment */}
            <Field
              placeholder="Resource Type"
              name="resourceType"
              displayName="Ressource Type"
              section="collection"
              fieldType="select"
              moduleId={uuid}
              edit={isMixed ? "mixed" : "contents"}
              isDisabled
            />

            {/* FIELD COLLECTION FORMAT & SWITCH */}
            <FieldAndSwitchContainer>
              <Field
                placeholder="Collection Format"
                name="collectionFormat"
                displayName="Collection Format"
                section="collection"
                fieldType="select"
                moduleId={uuid}
                edit={collectionFormat || "carousel"}
              />
              <SwitchButton
                action={() => {
                  dispatch(
                    setCollectionIsPaginated({
                      id: uuid,
                      value: !paginate,
                    })
                  );
                }}
                isChecked={paginate}
                componentId={`collection-switch-paginate-${uuid}`}
                displayedText="Paginate ?"
                tooltipMessage="By default the collection display selected images only, in -paginate- mode it will display to user a button to load more content"
              />
            </FieldAndSwitchContainer>

            {/* FIELD COLLECTION TYPE */}
            <Field
              placeholder="Collection Type"
              name="collectionType"
              displayName="Collection Type"
              isDisabled={!!isMixed}
              section="collection"
              fieldType="select"
              moduleId={uuid}
              edit={collectionType && !isMixed ? collectionType : "primary"}
              infos="Primary is only for Main Page"
            />

            {/* REGULAR COLLECTIONS */}
            {isMixed === false && (
              <>
                <SeparatorWhite />
                <InnerSectionTitleBox>
                  <InnerSectionTitle>AUTOMATIC COLLECTION -</InnerSectionTitle>
                  <InnerSectionDescritpion>
                    A collection will be self generated folowing your selected
                    filters : category, tags, limit.
                  </InnerSectionDescritpion>
                </InnerSectionTitleBox>

                <Field
                  placeholder="Category to call"
                  name="categories"
                  displayName="Categories"
                  section="collection"
                  fieldType="multi-value"
                  moduleId={uuid}
                  edit={categories || null}
                />
                <Field
                  placeholder="Tags to call"
                  name="tags"
                  displayName="Tags"
                  section="collection"
                  fieldType="multi-value"
                  moduleId={uuid}
                  edit={tags || ""}
                  lang={lang}
                />
                <FieldAndSwitchContainer>
                  <Field
                    placeholder="Limit criteria"
                    name="limit"
                    displayName="Limit"
                    section="collection"
                    type="number"
                    moduleId={uuid}
                    edit={limit || 6}
                  />
                  <SwitchButton
                    action={() => {
                      dispatch(
                        setCollectionExcludeLastArticle({
                          id: uuid,
                          value: !excludeLastContent,
                        })
                      );
                    }}
                    isChecked={excludeLastContent}
                    componentId={`collection-switch-exclude-${uuid}`}
                    displayedText="Exclude last article ?"
                    tooltipMessage="If the last article is in the hilight section, switch this on to not display it a second time in the page"
                  />
                </FieldAndSwitchContainer>

                <SeparatorWhite />
                <InnerSectionTitleBox>
                  <InnerSectionTitle>CUSTOM COLLECTION -</InnerSectionTitle>
                  <InnerSectionDescritpion>
                    Please note that &quot;automatic&quot; section filters will
                    be ignored if you have items in your custom list
                  </InnerSectionDescritpion>
                </InnerSectionTitleBox>

                <FilterFieldContainer>
                  <FilterInput
                    type="search"
                    placeholder="Search articles"
                    onChange={(e) => {
                      dispatch(
                        setCollectionSearchInput({
                          id: uuid,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </FilterFieldContainer>

                <DragAndDropCustomList
                  uuid={uuid}
                  customIdsList={customIdsList}
                  cumulatedContentsList={cumulatedContentsList}
                  fetchedCustomList={fetchedCustomList}
                  currentPage={currentPage}
                  nextPage={nextPage}
                  lastPage={lastPage}
                  isPined={isPined}
                  lang={lang}
                  pinnedContents={pinnedContents}
                  ids={ids}
                  searchedInput={searchedInput}
                />
              </>
            )}

            {/* MIXED COLLECTIONS */}
            {isMixed === true && (
              <>
                <SeparatorWhite />
                <InnerSectionTitleBox>
                  <InnerSectionTitle>CREATE NEW CARDS -</InnerSectionTitle>
                  <InnerSectionDescritpion>
                    Create new cards and organize them to create your custom
                    blade.
                  </InnerSectionDescritpion>
                </InnerSectionTitleBox>

                {/* ADD CARD BUTTON */}
                <NewBlockButtonBox>
                  <Button
                    type="button"
                    onClick={() => {
                      dispatch(setCollectionAddCard(uuid));
                    }}
                    addNewCollectionCardButton
                  >
                    <IconCreat src={plusIcon} />
                    ADD A NEW CARD
                  </Button>
                </NewBlockButtonBox>

                <DragDropContext
                  onDragEnd={(result) => {
                    onDragEndCollectionCards(result, cardsList, dispatch, uuid);
                  }}
                >
                  {cardsList && (
                    <Droppable droppableId={uuid}>
                      {(provided) => {
                        return (
                          <CollectionsCardsDispatcher
                            cardsList={cardsList}
                            provided={provided}
                            moduleId={uuid}
                            currentOpennedCard={currentOpennedCard}
                            isOpenModule={isOpen}
                          />
                        );
                      }}
                    </Droppable>
                  )}
                </DragDropContext>
              </>
            )}
          </>
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

CollectionModule.defaultProps = {
  title: "",
  subtitle: "",
  url: "",
  openNewTabHeader: false,
  categories: undefined,
  tags: undefined,
  limit: 6,
  customIdsList: undefined,
  cumulatedContentsList: [],
  fetchedCustomList: [],
  currentPage: undefined,
  nextPage: undefined,
  lastPage: undefined,
  isPined: false,
  pinnedContents: undefined,
  ids: undefined,
  searchedInput: undefined,
  excludeLastContent: false,
  isMixed: undefined,
  resource: "",
  cardsList: [],
  currentOpennedCard: "",
};

CollectionModule.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  collectionType: PropTypes.string.isRequired,
  collectionFormat: PropTypes.string.isRequired,
  paginate: PropTypes.bool.isRequired,
  customIdsList: PropTypes.string,
  cumulatedContentsList: PropTypes.arrayOf(PropTypes.shape({})),
  fetchedCustomList: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  lastPage: PropTypes.number,
  isPined: PropTypes.bool,
  pinnedContents: PropTypes.string,
  ids: PropTypes.string,
  searchedInput: PropTypes.string,
  excludeLastContent: PropTypes.bool,
  isMixed: PropTypes.bool,
  resource: PropTypes.string,
  cardsList: PropTypes.arrayOf(PropTypes.shape({})),
  currentOpennedCard: PropTypes.string,
};
export default CollectionModule;
