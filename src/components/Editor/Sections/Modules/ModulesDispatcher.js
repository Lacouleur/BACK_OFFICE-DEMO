/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
/* import PropTypes from "prop-types"; */
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { ModulesBoardDnd } from "../../../../styles/styledComponents/editor/modules/Modules.sc";
import TextModule from "./TextModule/TextModule";
import ImageModule from "./ImageModule/ImageModule";
import OpinionModule from "./OpinionModule/OpinionModule";
import CtaModule from "./CtaModule/CtaModule";
import CollectionModule from "./CollectionModule/CollectionModule";
import { checkForStringtoArray } from "../../../../helper/converters";
import FeedBackModule from "./FeedBackModule/FeedBackModule";
import { dndEditorCustomStyles } from "../../../../helper/modulesHelper";
import FeaturedModule from "./FeaturedModule/FeaturedModule";

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
                      style={dndEditorCustomStyles(snapshot, provided)}
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
                        collapse={module.collapse || false}
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
                      style={dndEditorCustomStyles(snapshot, provided)}
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
                      style={dndEditorCustomStyles(snapshot, provided)}
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
                        explanation={
                          module.idReaction
                            ? module.description
                            : module.explanation
                        }
                        answers={module.answers}
                        isVisible={module.isVisible}
                        isReaction={module.isReaction}
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
                      style={dndEditorCustomStyles(snapshot, provided)}
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
                      style={dndEditorCustomStyles(snapshot, provided)}
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
                        isPined={module?.isPined}
                        cumulatedContentsList={module.cumulatedContentsList}
                        fetchedCustomList={module.fetchedCustomList}
                        customIdsList={module.customIdsList}
                        pinnedContents={module?.criteria?.pinnedContents}
                        ids={module?.criteria?.ids}
                        currentPage={module.currentPage}
                        nextPage={module.nextPage}
                        lastPage={module.lastPage}
                        customListLoaded={module.customListLoaded}
                        searchedInput={module?.searchedInput}
                        excludeLastContent={
                          module?.criteria?.excludeLastContent
                        }
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
                        limit={
                          parseInt(module?.criteria?.limit, 10) > 0
                            ? parseInt(module?.criteria?.limit, 10)
                            : 0
                        }
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          }
          case "feedback": {
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
                      style={dndEditorCustomStyles(snapshot, provided)}
                    >
                      <FeedBackModule
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        isChanged={module.isChanged}
                        isVisible={module.isVisible}
                        question={module?.question}
                      />
                    </div>
                  );
                }}
              </Draggable>
            );
          }
          case "featured": {
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
                      style={dndEditorCustomStyles(snapshot, provided)}
                    >
                      <FeaturedModule
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        isChanged={module.isChanged}
                        title={module.title}
                        subtitle={module.subtitle}
                        // Url is header url for section and module url for content.
                        url={module.url.value || ""}
                        openNewTabHeader={module.url.openNewTab}
                        featuredTitle={module.featuredTitle || ""}
                        featuredExcerpt={module.featuredExcerpt || ""}
                        featuredImageAlt={module?.image?.alt || ""}
                        featuredLinkCtaValue={module?.link?.value || ""}
                        featuredLinkCtaOpenNewTab={module?.link?.openNewTab}
                        featuredImageThumbnailUrl={
                          module?.image?.urls?.thumbnail.url || undefined
                        }
                        featuredImageUuid={module.image?.uuid}
                        backgroundColor={module?.backgroundColor}
                        sticker={module?.sticker}
                        featuredCategory={module?.featuredCategory}
                        tags={
                          module?.criteria?.tags
                            ? checkForStringtoArray(
                                module?.criteria?.tags,
                                "array"
                              )
                            : undefined
                        }
                        categories={
                          module?.criteria?.categories
                            ? checkForStringtoArray(
                                module?.criteria?.categories,
                                "array"
                              )
                            : undefined
                        }
                        authors={
                          module?.criteria?.authors
                            ? checkForStringtoArray(
                                module?.criteria?.authors,
                                "array"
                              )
                            : undefined
                        }
                        slug={module?.criteria?.slug}
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

export default ModulesDispatcher;
