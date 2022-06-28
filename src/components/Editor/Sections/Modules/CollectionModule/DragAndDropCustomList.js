/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
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
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import { setCollectionCustomIdsList } from "../../../../../store/actions/moduleActions";
import { fetchContentsList } from "../../../../../store/actions/thunk/ArticlesActions.thunk";
import { updateCustomListComponent } from "../../../../../helper/modulesHelper";
import { onDragEnd2 } from "../../../../../helper/Editor/dragAndDropHelper";

import { checkForStringtoArray } from "../../../../../helper/converters";

const DragAndDropCustomList = ({
  uuid,
  customIdsList,
  cumulatedContentsList,
  fetchedCustomList,
  currentPage,
  nextPage,
  lastPage,
  lang,
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

  useEffect(() => {
    dispatch(fetchContentsList(1, uuid, "title", lang));
    if (customIdsList) {
      dispatch(fetchContentsList(1, uuid, "title", "", customIdsList));
    }
  }, []);

  useEffect(() => {
    updateCustomListComponent(
      cumulatedContentsList,
      columns,
      setColumns,
      fetchedCustomList
    );
  }, [cumulatedContentsList, fetchedCustomList]);

  useEffect(() => {
    if (columns?.customList.items && columns?.customList.items !== 0) {
      const buildCustomIdsList = [];
      columns.customList.items.map((item) => {
        buildCustomIdsList.push(item._id);
        return null;
      });

      dispatch(
        setCollectionCustomIdsList({
          id: uuid,
          value: checkForStringtoArray(buildCustomIdsList, "string"),
          isChanged: fetchedCustomList !== columns.customList.items,
        })
      );
    } else {
      dispatch(setCollectionCustomIdsList(uuid, undefined));
    }
  }, [columns]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd2(result, columns, setColumns, uuid, dispatch);
      }}
    >
      <TitleAndFieldContainer moduleRef={dndRef}>
        <DndTitleBox>
          <DndColumnTitle right>All articles list</DndColumnTitle>
          <DndColumnTitle left>Your custom List</DndColumnTitle>
        </DndTitleBox>
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
                dispatch(fetchContentsList(nextPage, uuid, "title", lang));
              }
            }}
          >
            Load More Articles
          </LoadMoreCustomList>
        </>
      )}
      {currentPage === lastPage && (
        <LoadMoreCustomList disabled>
          No more Article to load
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
  lang: undefined,
};

DragAndDropCustomList.propTypes = {
  uuid: PropTypes.string.isRequired,
  customIdsList: PropTypes.string,
  cumulatedContentsList: PropTypes.arrayOf(PropTypes.shape({})),
  fetchedCustomList: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  lastPage: PropTypes.number,
  lang: PropTypes.string,
};

export default DragAndDropCustomList;
