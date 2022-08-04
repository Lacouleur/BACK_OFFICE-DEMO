import {
  editModulesList,
  setCollectionCustomIdsList,
  setCollectionIsPined,
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

// OnDragEnd function for drag & drop into "Collection module" as custom List
export const onDragEndCustomList = (
  result,
  columns,
  setColumns,
  uuid,
  dispatch
) => {
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
  dispatch(setIsChanged(uuid));
};

function removeUsedItemFromList(usedItems, originalItemsList) {
  const onlyNewItemsList = originalItemsList.filter(
    (originalItem) =>
      usedItems.findIndex((usedItem) => usedItem._id === originalItem._id) < 0
  );
  return onlyNewItemsList;
}

export function removeCustomItemFromOriginalList(
  cumulatedContentsList,
  fuseResult,
  columns,
  setColumns
) {
  let filtredContentsList;
  if (cumulatedContentsList && fuseResult.length === 0) {
    filtredContentsList = removeUsedItemFromList(
      columns.customList.items,
      cumulatedContentsList
    );
  }

  if (cumulatedContentsList && fuseResult.length > 0) {
    const resultList = [];
    fuseResult.map((result) => {
      resultList.push(result.item);
    });
    filtredContentsList = removeUsedItemFromList(
      columns.customList.items,
      resultList
    );
  }
  setColumns({
    ...columns,
    originalList: {
      name: "Original List",
      items: filtredContentsList,
    },
  });
}

export function customIdsListBuilder(
  columns,
  uuid,
  ids,
  pinnedContents,
  dispatch,
  customIdsList
) {
  let buildCustomIdsList = [];
  if (!customIdsList) {
    if (ids && !pinnedContents) {
      buildCustomIdsList = checkForStringtoArray(ids, "array");
    }
    if (pinnedContents) {
      buildCustomIdsList = checkForStringtoArray(pinnedContents, "array");
    }
  }
  if (columns?.customList.items) {
    buildCustomIdsList = columns?.customList.items.map((item) => item._id);
  }

  const stringBuildedCustomList = checkForStringtoArray(
    buildCustomIdsList,
    "string"
  );

  dispatch(
    setCollectionCustomIdsList({
      id: uuid,
      value: stringBuildedCustomList,
    })
  );
}

export function changePinnedButtonState(
  dispatch,
  customIdsList,
  uuid,
  isPined
) {
  if ((!customIdsList, !uuid)) {
    return;
  }
  if (customIdsList === undefined) {
    dispatch(
      setCollectionIsPined({
        id: uuid,
        value: false,
        isChanged: true,
      })
    );
  } else {
    dispatch(
      setCollectionIsPined({
        id: uuid,
        value: !isPined,
        isChanged: true,
      })
    );
  }
}

export function manageInitialCustomList(pinnedContents, uuid, dispatch) {
  if (!pinnedContents) {
    dispatch(
      setCollectionIsPined({
        id: uuid,
        value: false,
        isChanged: false,
      })
    );
  }

  if (pinnedContents) {
    dispatch(
      setCollectionIsPined({
        id: uuid,
        value: true,
        isChanged: false,
      })
    );
  }
}
