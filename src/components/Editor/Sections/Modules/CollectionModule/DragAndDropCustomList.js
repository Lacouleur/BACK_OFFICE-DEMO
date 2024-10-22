/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import Fuse from "fuse.js";
import {
  CustomCollectionContainer,
  ListContainer,
  ArticleTitle,
  CustomListVerticalSeparator,
  ArticleBox,
  DnDCustomCollectionStyles,
  LoadMoreCustomList,
  TitleAndFieldContainer,
  DndColumnTitle,
  DndTitleBox,
  DndTitleContainer,
  DndElementBox,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import { fetchContentsList } from "../../../../../store/actions/thunk/ArticlesActions.thunk";
import {
  onDragEndCustomList,
  changePinnedButtonState,
  customIdsListBuilder,
  manageInitialCustomList,
  removeCustomItemFromOriginalList,
} from "../../../../../helper/Editor/dragAndDropHelper";

import SwitchButton from "../../../../Tools/Switch";
import { fuzzyOptions } from "../../../../../helper/fieldsHelper";

const DragAndDropCustomList = ({
  uuid,
  customIdsList,
  pinnedContents,
  ids,
  cumulatedContentsList,
  fetchedCustomList,
  currentPage,
  nextPage,
  lastPage,
  isPined,
  lang,
  searchedInput,
}) => {
  const dispatch = useDispatch();

  const dndRef = useRef(null);

  const [columns, setColumns] = useState({
    originalList: {
      name: "Original List",
      items: [],
    },
    customList: {
      name: "Custom List",
      items: [],
    },
  });

  const loadButtonWording = {
    moreResults: "Load more results",
    noMoreResults: "No more results to load",
    moreArticles: "Load more articles",
    noMoreArticles: "No more articles to load",
  };

  const [fuseResult, setFuseResult] = useState([]);
  const [fuse, setFuse] = useState(null);

  function initFuse() {
    const fuse = new Fuse(cumulatedContentsList, {
      keys: ["title"],
    });
    setFuse(fuse);
  }

  useEffect(() => {
    initFuse();
  }, [cumulatedContentsList]);

  useEffect(() => {
    dispatch(fetchContentsList(1, uuid, "title", lang, 100));
    dispatch(
      fetchContentsList(1, uuid, "title", "", 100, pinnedContents || ids)
    );
    manageInitialCustomList(pinnedContents, uuid, dispatch);
  }, []);

  useEffect(() => {
    if (fuse) {
      setFuseResult(fuse.search(searchedInput || "", fuzzyOptions));
    }
  }, [searchedInput, fuse]);

  useEffect(() => {
    customIdsListBuilder(
      columns,
      uuid,
      ids,
      pinnedContents,
      dispatch,
      customIdsList
    );
  }, [columns]);

  useEffect(() => {
    removeCustomItemFromOriginalList(
      cumulatedContentsList,
      fuseResult,
      columns,
      setColumns
    );
  }, [cumulatedContentsList, columns.customList.items, fuseResult]);

  useEffect(() => {
    setColumns({
      ...columns,
      customList: {
        name: "Original List",
        items: fetchedCustomList,
      },
    });
  }, [fetchedCustomList]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEndCustomList(result, columns, setColumns, uuid, dispatch);
      }}
    >
      <TitleAndFieldContainer moduleRef={dndRef}>
        <DndTitleContainer>
          <DndTitleBox>
            <DndElementBox>
              <DndColumnTitle left>All articles list</DndColumnTitle>
            </DndElementBox>
          </DndTitleBox>
          <DndTitleBox>
            <DndElementBox>
              <DndColumnTitle right>Custom List</DndColumnTitle>
              <SwitchButton
                styleVariant="CustomListDnd"
                disable={columns.customList.items.length === 0}
                action={() => {
                  if (columns.customList.items.length > 0) {
                    changePinnedButtonState(
                      dispatch,
                      customIdsList,
                      uuid,
                      isPined
                    );
                  }
                }}
                isChecked={isPined}
                componentId={`collection-switch-pined-${uuid}`}
                displayedText="Pin above article ?"
                tooltipMessage={
                  customIdsList !== undefined
                    ? `If active, contents from above section " automatic collection " will be appened to your custom list. If unactive and at least one element is in your custom list, only custom content will be displayed.`
                    : `To pin article you need to have at least one element in your custom list`
                }
              />
            </DndElementBox>
          </DndTitleBox>
        </DndTitleContainer>
        {columns && (
          <CustomCollectionContainer>
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <ListContainer
                        id="ListContainer"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={`${item._id}${columnId}`}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={DnDCustomCollectionStyles(
                                      snapshot,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <ArticleBox>
                                      {columnId === "originalList" && (
                                        <ArticleTitle>
                                          {item.title}
                                        </ArticleTitle>
                                      )}
                                      {columnId === "customList" && (
                                        <ArticleTitle>
                                          {`${index + 1}. ${item.title}`}
                                        </ArticleTitle>
                                      )}
                                    </ArticleBox>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ListContainer>
                    );
                  }}
                </Droppable>
              );
            })}
            <CustomListVerticalSeparator />
          </CustomCollectionContainer>
        )}
      </TitleAndFieldContainer>
      {/* LOAD MORE BUTTON */}
      {currentPage !== lastPage && (
        <>
          <LoadMoreCustomList
            onClick={() => {
              if (cumulatedContentsList.length > 0) {
                dispatch(
                  fetchContentsList(currentPage + 1, uuid, "title", lang, 100)
                );
              }
            }}
          >
            {searchedInput
              ? `${loadButtonWording.moreResults}`
              : `${loadButtonWording.moreArticles}`}
          </LoadMoreCustomList>
        </>
      )}
      {currentPage === lastPage && (
        <LoadMoreCustomList disabled>
          {searchedInput
            ? `${loadButtonWording.noMoreResults}`
            : `${loadButtonWording.noMoreArticles}`}
        </LoadMoreCustomList>
      )}
    </DragDropContext>
  );
};

DragAndDropCustomList.defaultProps = {
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
};

DragAndDropCustomList.propTypes = {
  uuid: PropTypes.string.isRequired,
  customIdsList: PropTypes.string,
  cumulatedContentsList: PropTypes.arrayOf(PropTypes.shape({})),
  fetchedCustomList: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  lastPage: PropTypes.number,
  isPined: PropTypes.bool,
  lang: PropTypes.string.isRequired,
  pinnedContents: PropTypes.string,
  ids: PropTypes.string,
  searchedInput: PropTypes.string,
};

export default DragAndDropCustomList;
