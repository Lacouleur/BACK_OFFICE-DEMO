import {
  editModulesList,
  setCollectionCustomIdsList,
  setIsChanged,
} from "../../store/actions/moduleActions";
import { saveModule } from "../../store/actions/thunk/ModulesActions.thunk";
import { consoleError } from "../consoleStyles";
import { checkForStringtoArray } from "../converters";

/* eslint-disable import/prefer-default-export */

// OnDragEnd function for modules list in page or article editor
export function onDragEnd(result, List, dispatch) {
  if (!result.destination) {
    console.error("%cD&D : unvalid destination", `${consoleError}`);
    return;
  }
  const { source, destination } = result;

  if (destination) {
    const copiedModules = [...List];
    const [removed] = copiedModules.splice(source.index, 1);
    copiedModules.splice(destination.index, 0, removed);

    const orderedList = copiedModules.map((copiedModule, index) => {
      const newModule = copiedModule;
      newModule.order = index + 1;
      return newModule;
    });

    dispatch(editModulesList(orderedList));
    dispatch(setIsChanged(result.draggableId));
    dispatch(saveModule(result.draggableId, "update"));
  }
}

function sendSelectedIdsToState(columns, uuid, dispatch) {
  if (columns.customList.items && columns.customList.items.length !== 0) {
    const customIdsList = [];
    columns.customList.items.map((item) => {
      customIdsList.push(item._id);
      return null;
    });
    dispatch(
      setCollectionCustomIdsList({
        id: uuid,
        value: checkForStringtoArray(customIdsList, "string"),
      })
    );
  }
}

// OnDragEnd function for drag & drop into "Collection module" as custom List
export const onDragEnd2 = (result, columns, setColumns, uuid, dispatch) => {
  if (!result.destination) {
    console.error("%cD&D : unvalid destination", `${consoleError}`);
  }
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
  sendSelectedIdsToState(columns, uuid, dispatch);
};
