/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
/* import PropTypes from "prop-types"; */
import { Draggable } from "react-beautiful-dnd";
import { ModulesBoardDnd } from "../../../../styles/styledComponents/editor/modules/Modules.sc";
import TextModule from "./TextModule/TextModule";
import ImageModule from "./ImageModule/ImageModule";
import OpinionModule from "./OpinionModule/OpinionModule";
import CtaModule from "./CtaModule/CtaModule";

const ModulesDispatcher = ({
  modulesList,
  isUsedDndArea,
  provided,
  aModuleIsOpen,
}) => {
  return (
    <ModulesBoardDnd
      isUsedDndArea={isUsedDndArea}
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {modulesList?.map((module, index) => {
        // Faire un fichier commun avec ce switch -> Commun avec MANIFESTO
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
                        key={module.uuid}
                        uuid={module.uuid}
                        order={module.order}
                        isChanged={module.isChanged}
                        isOpenCloseModal={module.isOpenCloseModal}
                        isNewModule={module.isNewModule}
                        url={module.url}
                        introduction={module.introduction}
                        label={module.label}
                        description={module.description}
                        openNewTab={module.openNewTab}
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
