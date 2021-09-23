import {
  deleteComponent,
  saveComponent,
  updateComponent,
  uploadImage,
} from "../../../services/client/contentClient";
import { isValidToken } from "../../../services/client/refreshToken";
import { setUpdatedAt, showErrorModal } from "../actionBarActions";
import { setModified } from "../mainInformationActions";
import { setManifestoStatus } from "../manifestoActions";
import { closeModule, setImageUuid, setModulePosted } from "../moduleActions";

import {
  consoleError,
  consoleSucces,
  consoleInfo,
  consoleTitle,
} from "../../../helper/consoleStyles";
import { setHomeImageUuid, setNavImageUuid } from "../homeNavigationActions";
import { nameSpaceError } from "../../../helper/errorMessages";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";

export function deleteModule(articleId, moduleId) {
  console.log("%cDELETING MODULE", `${consoleTitle}`, moduleId);
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const { manifestoReducer } = getState();
      const { isManifesto, manifestoId } = manifestoReducer;
      try {
        let response = null;

        if (isManifesto) {
          response = await deleteComponent(manifestoId, moduleId, isManifesto);
        } else {
          response = await deleteComponent(articleId, moduleId);
        }

        if (response.status < 300 && response.status > 199) {
          dispatch(setUpdatedAt("create"));
          dispatch(closeModule(moduleId));
          dispatch(setModified(true));
          if (isManifesto) {
            dispatch(setManifestoStatus("UNPUBLISHED"));
          }
          console.log(
            `%cDeleted module id:${moduleId} =>`,
            `${consoleSucces}`,
            response
          );
        }
      } catch (error) {
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }
    return null;
  };
}

export function saveModule(uuid, request = "save") {
  return async (dispatch, getState) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const {
        mainInformationReducer,
        modulesReducer,
        manifestoReducer,
      } = getState();
      const { articleId } = mainInformationReducer;
      const { modulesList } = modulesReducer;
      const { isManifesto, manifestoId } = manifestoReducer;
      let values = {};
      let isNewModule = false;

      if (request === "save") {
        console.log("%cSAVING MODULE", `${consoleTitle}`, uuid);
        modulesList.find((module) => {
          if (module.uuid === uuid && module.isNewModule) {
            switch (module.type) {
              case "text": {
                const { type, text, order, isVisible } = module;
                values = {
                  uuid,
                  type,
                  text,
                  order,
                  isVisible,
                };
                isNewModule = true;
                break;
              }
              case "image": {
                const { type, image, order, isVisible } = module;
                values = {
                  uuid,
                  type,
                  image: {
                    alt: image.alt,
                    source: "FTV intenal",
                    uuid: image.uuid,
                  },
                  order,
                  isVisible,
                };
                isNewModule = true;

                break;
              }
              case "opinion": {
                const {
                  type,
                  answers,
                  showPercentage,
                  order,
                  showResponse,
                  showRight,
                  explanation,
                  question,
                  isVisible,
                } = module;

                values = {
                  uuid,
                  type,
                  explanation: explanation || null,
                  question,
                  showPercentage,
                  showResponse,
                  showRight,
                  answers,
                  order,
                  isVisible,
                };
                isNewModule = true;

                break;
              }

              default:
                return null;
            }
          }
          return null;
        });

        if (isNewModule) {
          try {
            let response = null;

            if (isManifesto) {
              response = await saveComponent(manifestoId, values, isManifesto);
            } else {
              response = await saveComponent(articleId, values);
            }

            if (response.status < 300 && response.status > 199) {
              dispatch(setModulePosted(uuid));
              dispatch(setModified(true));
              if (isManifesto) {
                dispatch(setManifestoStatus("UNPUBLISHED"));
              }

              console.log(
                `%cSAVED, ${values.type}-module (id:${uuid}) =>`,
                `${consoleSucces}`,
                response
              );
            }
          } catch (error) {
            ErrorCaseClient(dispatch, error?.response?.data);
            console.log(
              `%cError, ${values.type}-module (id:${uuid})`,
              `${consoleError}`
            );
          }
        }
      }

      if (request === "update") {
        console.log("%cUPDATING MODULE", `${consoleTitle}`, uuid);
        let isChanged = false;

        modulesList.find((module) => {
          if (module.uuid === uuid && module.isChanged) {
            switch (module.type) {
              case "text": {
                const { type, text, order, isVisible } = module;
                values = {
                  type,
                  text,
                  order,
                  isVisible,
                };
                isChanged = true;
                break;
              }
              case "image": {
                const { type, image, order, isVisible } = module;
                values = {
                  type,
                  image: {
                    alt: image.alt,
                    source: "FTV-internal",
                    uuid: image.uuid,
                  },
                  order,
                  isVisible,
                };
                isChanged = true;

                break;
              }
              case "opinion": {
                const {
                  type,
                  answers,
                  showPercentage,
                  order,
                  showResponse,
                  showRight,
                  explanation,
                  question,
                  isVisible,
                } = module;

                const formatedAnswers = [];
                answers.map((answer) => {
                  formatedAnswers.push({
                    right: answer.right,
                    text: answer.text,
                    uuid: answer.uuid,
                  });
                  return null;
                });

                values = {
                  type,
                  explanation: explanation || null,
                  question,
                  showPercentage,
                  showResponse,
                  showRight,
                  answers: formatedAnswers,
                  order,
                  isVisible,
                };
                isChanged = true;

                break;
              }

              default:
                return null;
            }
          }
          return null;
        });

        if (isChanged) {
          try {
            let response = null;
            if (isManifesto) {
              response = await updateComponent(
                manifestoId,
                values,
                uuid,
                isManifesto
              );
            } else {
              response = await updateComponent(articleId, values, uuid);
            }

            if (response.status < 300 && response.status > 199) {
              dispatch(setUpdatedAt("create"));
              dispatch(setModulePosted(uuid));
              dispatch(setModified(true));
              if (isManifesto) {
                dispatch(setManifestoStatus("UNPUBLISHED"));
              }
              console.log(
                `%cUpdated, ${values.type}-module (id:${uuid}) =>`,
                `${consoleSucces}`,
                response
              );
            }
          } catch (error) {
            ErrorCaseClient(dispatch, error?.response?.data);
            console.log(
              `%cError, ${values.type}-module (id:${uuid})`,
              `${consoleError}`
            );
          }
        }
      }
    }
  };
}

export function saveImage(name, image, moduleId) {
  console.log("%cSAVING IMAGE", `${consoleTitle}`, moduleId);
  return async (dispatch) => {
    const tokenIsValid = await isValidToken(dispatch);
    if (tokenIsValid) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await uploadImage(formData);
        if (response.status < 300 && response.status > 199) {
          if (name === "image") {
            console.log("%cRESPONSE", `${consoleInfo}`, response.data);
            dispatch(setImageUuid({ id: moduleId, value: response.data }));
          }
          if (name === "homeImage") {
            dispatch(setHomeImageUuid(response.data));
          }
          if (name === "navImage") {
            dispatch(setNavImageUuid(response.data));
          }
        }
      } catch (error) {
        if (error?.response.status === 400) {
          dispatch(showErrorModal({ value: true, message: nameSpaceError() }));
        } else {
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
    return null;
  };
}
