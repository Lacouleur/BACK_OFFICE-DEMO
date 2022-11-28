/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { CollectionCardsDnDContainer } from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import { dndEditorCustomStyles } from "../../../../../helper/modulesHelper";
import CollectionCardImage from "./CollectionCards/CollectionCardImage";
import {
  setCollectionAddCard,
  setCollectionCurrentOpenedCard,
} from "../../../../../store/actions/moduleActions";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";

const CollectionsCardsDispatcher = ({
  provided,
  cardsList,
  moduleId,
  currentOpennedCard,
  isOpenModule,
}) => {
  const dispatch = useDispatch();
  const DndAreaRef = useRef();

  useEffect(() => {
    if (!isOpenModule) {
      dispatch(setCollectionCurrentOpenedCard({ moduleId, cardId: "" }));
    }
  }, [isOpenModule]);

  function onClickOutside() {
    if (isOpenModule) {
      dispatch(setCollectionCurrentOpenedCard({ moduleId, cardId: "" }));
    }
  }

  useClickOutside(DndAreaRef, onClickOutside);

  return (
    <CollectionCardsDnDContainer
      ref={DndAreaRef}
      onClick={() =>
        cardsList.length === 0 && dispatch(setCollectionAddCard(moduleId))
      }
    >
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {cardsList?.map((card, index) => {
          switch (card.type) {
            case "image": {
              return (
                <Draggable
                  isDragDisabled={!!currentOpennedCard}
                  key={card.uuid}
                  draggableId={card.uuid}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={dndEditorCustomStyles(snapshot, provided)}
                      >
                        <CollectionCardImage
                          moduleId={moduleId}
                          cardId={card.uuid}
                          cardOrder={card.order}
                          cardImageThumbnail={
                            card?.image?.urls?.thumbnail?.url || undefined
                          }
                          cardImageUuid={card?.image?.uuid}
                          altCardImage={card?.image?.alt}
                          cardLinkTo={card?.url?.value}
                          cardLinkOpenNewTab={card?.url?.openNewTab}
                          cardCtaLabel={card?.url?.ctaLabel}
                          description={card?.description}
                          currentOpennedCard={currentOpennedCard}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              );
            }
            default:
              return null;
          }
        })}
        {provided.placeholder}
      </div>
    </CollectionCardsDnDContainer>
  );
};

export default CollectionsCardsDispatcher;
