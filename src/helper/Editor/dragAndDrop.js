import {
  editModulesList,
  setIsChanged,
} from "../../store/actions/moduleActions";
import { saveModule } from "../../store/actions/thunk/ModulesActions.thunk";

/* eslint-disable import/prefer-default-export */
export function onDragEnd(result, modulesList, dispatch) {
  const { source, destination } = result;
  const copiedModules = [...modulesList];
  const [removed] = copiedModules.splice(source.index, 1);
  copiedModules.splice(destination.index, 0, removed);

  const orderedModule = copiedModules.map((copiedModule, index) => {
    const newModule = copiedModule;
    newModule.order = index + 1;
    return newModule;
  });

  dispatch(editModulesList(orderedModule));
  dispatch(setIsChanged(result.draggableId));
  dispatch(saveModule(result.draggableId, "update"));
}
