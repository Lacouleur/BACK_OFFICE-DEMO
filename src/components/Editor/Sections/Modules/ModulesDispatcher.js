/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
/* import PropTypes from "prop-types"; */
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ModulesBoardDnd } from "../../../../styles/styledComponents/editor/modules/Modules.sc";
import TextModule from "./TextModule/TextModule";
import ImageModule from "./ImageModule/ImageModule";
import OpinionModule from "./OpinionModule/OpinionModule";
import CtaModule from "./CtaModule/CtaModule";
import CollectionModule from "./CollectionModule/CollectionModule";
import { checkForStringtoArray } from "../../../../helper/converters";

const ModulesDispatcher = ({
  modulesList,
  isUsedDndArea,
  provided,
  aModuleIsOpen,
}) => {
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );
  const { isPage } = PageMainInformationState;

  return (
    <ModulesBoardDnd
      isUsedDndArea={isUsedDndArea}
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {modulesList?.map((module, index) => {
        switch (module.type) {
          case "text": {
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
                        ...provided.draggableProps.style,
                      }}
                    >
                      <TextModule
                        isPage={isPage}
                        title={isPage ? module.title : undefined}
                        subtitle={isPage ? module.subtitle : undefined}
                        url={isPage ? module.url?.value : undefined}
                        openNewTabHeader={
                          isPage ? module.url?.openNewTab : undefined
                        }
                        text={module.text}
                        uuid={module.uuid}
                        order={module.order}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          }
          case "image": {
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
                        ...provided.draggableProps.style,
                      }}
                    >
                      <ImageModule
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        thumbnail={
                          module?.image?.urls?.thumbnail?.url || undefined
                        }
                        imageUuid={module.image.uuid}
                        altImage={module.image.alt}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          }
          case "opinion": {
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
                        ...provided.draggableProps.style,
                      }}
                    >
                      <OpinionModule
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
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
                  );
                }}
              </Draggable>
            );
          }
          case "cta-button": {
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
                        ...provided.draggableProps.style,
                      }}
                    >
                      <CtaModule
                        isPage={isPage}
                        title={isPage ? module.title : undefined}
                        subtitle={isPage ? module.subtitle : undefined}
                        // Url is header url for section and module url for content.
                        url={
                          isPage && module.url ? module.url.value : module.url
                        }
                        openNewTabHeader={
                          isPage && module.url
                            ? module.url.openNewTab
                            : undefined
                        }
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        link={module?.link?.value}
                        display={module.display || "primary"}
                        openNewTab={
                          isPage ? module?.link?.openNewTab : module.openNewTab
                        }
                        introduction={module.introduction}
                        label={module.label}
                        description={module.description}
                        imageUuid={module.image?.uuid}
                        altImage={module.image?.alt}
                        thumbnail={
                          module.image?.urls?.thumbnail?.url || undefined
                        }
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          }
          case "collection": {
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
                        ...provided.draggableProps.style,
                      }}
                    >
                      <CollectionModule
                        isPage={isPage}
                        title={isPage ? module.title : undefined}
                        subtitle={isPage ? module.subtitle : undefined}
                        url={
                          isPage && module.url ? module.url.value : undefined
                        }
                        openNewTabHeader={
                          isPage && module.url
                            ? module.url.openNewTab
                            : undefined
                        }
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        collectionType={module.display}
                        collectionFormat={module.format}
                        paginate={module.paginate}
                        isCustom={!!(module.isCustom || module?.criteria?.ids)}
                        cumulatedContentsList={module.cumulatedContentsList}
                        fetchedCustomList={module.fetchedCustomList}
                        customIdsList={module?.criteria?.ids || undefined}
                        currentPage={module.currentPage}
                        nextPage={module.nextPage}
                        lastPage={module.lastPage}
                        categories={
                          module?.criteria?.categories
                            ? checkForStringtoArray(
                                module?.criteria?.categories,
                                "array"
                              )
                            : undefined
                        }
                        tags={
                          module?.criteria?.tags
                            ? checkForStringtoArray(
                                module?.criteria?.tags,
                                "array"
                              )
                            : undefined
                        }
                        limit={+module?.criteria?.limit}
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
    </ModulesBoardDnd>
  );
};

/* ModulesDispatcher.defaultProps = {
  position: undefined,
};

ModulesDispatcher.propTypes = {
  position: PropTypes.string,
}; */

export default ModulesDispatcher;
