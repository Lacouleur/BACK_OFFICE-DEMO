import {
  deleteComponent,
  getFeedBackResults,
  saveComponent,
  updateComponent,
  uploadImage,
} from "../../../services/client/contentClient";

import { setUpdatedAt, showErrorModal } from "../actionBarActions";
import { setModified } from "../commonsActions";
import { setManifestoStatus } from "../manifestoActions";
import {
  closeModule,
  setCtaImageUuid,
  setImageUuid,
  setModulePosted,
  setFeaturedImageUuid,
  setCollectionCardImageUuid,
} from "../moduleActions";

import {
  consoleSucces,
  consoleInfo,
  consoleTitle,
} from "../../../helper/consoleStyles";
import {
  setTransparentImageUuid,
  setHomeImageUuid,
  setNavImageUuid,
  setSocialImgUuid,
} from "../homeNavigationActions";
import {
  setHeaderImageUuid,
  setHeaderLargeImageUuid,
} from "../pageHeaderActions";
import { uploadError } from "../../../helper/errorMessages";
import ErrorCaseClient from "../../../helper/ErrorCaseClient";
import {
  deletePageComponent,
  savePageComponent,
  updatePageComponent,
} from "../../../services/client/pagesClient";
import { checkForStringtoArray } from "../../../helper/converters";
import { setFeedbackResults } from "../mainInformationActions";
import {
  manageCardsValues,
  cleanUrlTextComponent,
} from "../../../helper/modulesHelper";
import { deleteToken } from "../../../services/client/tokenStuff";

// This file is an action file for modules using redux-thunk

export function deleteModule(articleId, moduleId) {
  console.log("%cDELETING MODULE", `${consoleTitle}`, moduleId);
  return async (dispatch, getState) => {
    const { manifestoReducer, pageMainInformationReducer } = getState();
    const { isManifesto, manifestoId } = manifestoReducer;
    const { pageId, isPage } = pageMainInformationReducer;
    try {
      let response = null;

      if (isManifesto) {
        response = await deleteComponent(manifestoId, moduleId, isManifesto);
      } else if (isPage) {
        response = await deletePageComponent(pageId, moduleId);
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
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      ErrorCaseClient(dispatch, error?.response?.data);
    }

    return null;
  };
}

export function saveModule(uuid, request = "save") {
  return async (dispatch, getState) => {
    const {
      mainInformationReducer,
      modulesReducer,
      manifestoReducer,
      pageMainInformationReducer,
    } = getState();
    const { articleId } = mainInformationReducer;
    const { modulesList } = modulesReducer;
    const { isManifesto, manifestoId } = manifestoReducer;
    const { pageId, isPage, lang } = pageMainInformationReducer;

    let values = {};
    let isNewModule = false;

    if (request === "save") {
      console.log("%cSAVING MODULE", `${consoleTitle}`, uuid);
      modulesList.find((module) => {
        if (module.uuid === uuid && module.isNewModule) {
          const pageSectionHeaderValues = {
            title: module.title || null,
            subtitle: module.subtitle || null,
            url: module?.url?.value
              ? {
                  ...module.url,
                  value: module.url?.value,
                  openNewTab: module.url?.openNewTab || false,
                }
              : null,
          };
          switch (module.type) {
            /* save */
            case "text": {
              const { type, text, order, isVisible, collapse } = module;
              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type,
                text: cleanUrlTextComponent(text),
                collapse,
                order,
                isVisible,
              };
              isNewModule = true;
              break;
            }

            /* save */
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

            /* save */
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
                isReaction,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type,
                explanation: explanation
                  ? cleanUrlTextComponent(explanation)
                  : null,
                question,
                showPercentage,
                showResponse,
                showRight,
                answers,
                order,
                isVisible,
                isReaction,
              };
              isNewModule = true;

              break;
            }

            /* save */
            case "cta-button": {
              const {
                type,
                order,
                isVisible,
                introduction,
                url,
                label,
                description,
                link,
                image,
                openNewTab,
                display,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type,
                order,
                isVisible,
                introduction,
                label,
                description: cleanUrlTextComponent(description),
                url,
                openNewTab: isPage ? undefined : openNewTab || false,
                link: isPage ? link : undefined,
                image: isPage
                  ? {
                      alt: image?.alt || undefined,
                      source: "FTV-internal",
                      uuid: image.uuid,
                    }
                  : undefined,
                display: display || undefined,
              };
              isNewModule = true;
              break;
            }

            /* save */
            case "collection": {
              const {
                order,
                isVisible,
                criteria,
                display,
                format,
                paginate,
                isPined,
                customIdsList,
                isMixed,
                cards,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type: "collection",
                order,
                isVisible,
                resource: isMixed ? "mixed" : "contents",
                display: isMixed ? "secondary" : display,
                paginate,
                format: format || "",
                cards:
                  isMixed && cards && cards?.length !== 0
                    ? manageCardsValues(cards)
                    : undefined,
                criteria: isMixed
                  ? null
                  : {
                      limit: criteria?.limit || 6,
                      page: 1,
                      sort: "firstPublishedAt",
                      order: "desc",
                      fields: "header,slug,category,theme",
                      lang,
                      excludeLastContent: criteria?.excludeLastContent,
                      categories:
                        checkForStringtoArray(criteria?.categories, "string") ||
                        undefined,
                      tags:
                        checkForStringtoArray(criteria?.tags, "string") ||
                        undefined,
                      ids:
                        !isPined && customIdsList ? customIdsList : undefined,
                      pinnedContents:
                        isPined && customIdsList ? customIdsList : undefined,
                    },
              };
              isNewModule = true;

              break;
            }

            /* save */
            case "feedback": {
              const { order, isVisible, question } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type: "feedback",
                order,
                isVisible,
                question,
                label: "question",
              };
              isNewModule = true;

              break;
            }

            /* save */
            case "featured": {
              const {
                order,
                featuredTitle,
                featuredExcerpt,
                link,
                featuredImageUuid,
                featuredImageAlt,
                backgroundColor,
                sticker,
                featuredCategory,
                criteria,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                uuid,
                type: "featured",
                resource: "contents",
                featuredTitle: featuredTitle || undefined,
                featuredExcerpt: featuredExcerpt || undefined,
                link: link?.value
                  ? {
                      value: link.value,
                      openNewTab: link?.openNewTab || false,
                    }
                  : undefined,
                image: featuredImageUuid
                  ? {
                      uuid: featuredImageUuid || undefined,
                      alt: featuredImageAlt || undefined,
                      source: "FTV-internal",
                    }
                  : undefined,
                criteria: {
                  ...criteria,
                  limit: 1,
                  page: 1,
                  lang,
                  fields: "header,slug,category,theme",
                  categories:
                    checkForStringtoArray(criteria?.categories, "string") ||
                    undefined,
                  tags:
                    checkForStringtoArray(criteria?.tags, "string") ||
                    undefined,
                  authors:
                    checkForStringtoArray(criteria?.authors, "string") ||
                    undefined,
                },
                sticker: "new-article",
                backgroundColor,
                featuredCategory,
                order,
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
          } else if (isPage) {
            response = await savePageComponent(pageId, values);
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
          if (error?.response?.data === "Invalid token") {
            deleteToken();
          }
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }

    if (request === "update") {
      console.log("%cUPDATING MODULE", `${consoleTitle}`, uuid);
      let isChanged = false;

      modulesList.find((module) => {
        if (module.uuid === uuid && module.isChanged) {
          const pageSectionHeaderValues = {
            title: module.title || null,
            subtitle: module.subtitle || null,
            url: module?.url?.value ? module.url : undefined,
          };

          switch (module.type) {
            /* update */
            case "text": {
              const { type, text, order, isVisible, collapse } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                type,
                text: cleanUrlTextComponent(text),
                order,
                isVisible,
                collapse,
              };
              isChanged = true;
              break;
            }

            /* update */
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

            /* update */
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
                isReaction,
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
                ...(isPage && pageSectionHeaderValues),
                type,
                explanation: explanation
                  ? cleanUrlTextComponent(explanation)
                  : null,
                question,
                showPercentage,
                showResponse,
                showRight,
                answers: formatedAnswers,
                order,
                isVisible,
                isReaction,
              };
              isChanged = true;

              break;
            }

            /* update */
            case "cta-button": {
              const {
                type,
                order,
                isVisible,
                introduction,
                url,
                label,
                description,
                link,
                image,
                openNewTab,
                display,
              } = module;

              const pageurl = url?.value ? url : undefined;

              values = {
                ...(isPage && pageSectionHeaderValues),
                type,
                order,
                isVisible,
                introduction,
                label,
                description: cleanUrlTextComponent(description),
                url: !isPage ? url : pageurl,
                openNewTab: isPage ? undefined : openNewTab || false,
                link: isPage ? link : undefined,
                image:
                  isPage && image?.uuid
                    ? {
                        alt: image?.alt || undefined,
                        source: "FTV-internal",
                        uuid: image.uuid,
                      }
                    : undefined,
                display: display || undefined,
              };
              isChanged = true;
              break;
            }

            /* update */
            case "collection": {
              const {
                order,
                isVisible,
                criteria,
                display,
                format,
                paginate,
                isPined,
                customIdsList,
                isMixed,
                cards,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                type: "collection",
                order,
                isVisible,
                resource: isMixed ? "mixed" : "contents",
                display: isMixed ? "secondary" : display,
                paginate,
                cards:
                  isMixed && cards && cards?.length !== 0
                    ? manageCardsValues(cards)
                    : undefined,
                format: format || "carousel",
                criteria: isMixed
                  ? null
                  : {
                      limit: criteria?.limit,
                      page: 1,
                      sort: "firstPublishedAt",
                      order: "desc",
                      fields: "header,slug,category,theme",
                      lang,
                      excludeLastContent: criteria?.excludeLastContent,
                      categories:
                        checkForStringtoArray(criteria?.categories, "string") ||
                        undefined,
                      tags:
                        checkForStringtoArray(criteria?.tags, "string") ||
                        undefined,
                      ids:
                        !isPined && customIdsList ? customIdsList : undefined,
                      pinnedContents:
                        isPined && customIdsList ? customIdsList : undefined,
                    },
              };

              isChanged = true;

              break;
            }

            /* update */
            case "feedback": {
              const { order, isVisible, question } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                type: "feedback",
                order,
                isVisible,
                question,
                label: "question",
              };
              isChanged = true;

              break;
            }

            /* update */
            case "featured": {
              const {
                order,
                featuredTitle,
                featuredExcerpt,
                image,
                link,
                backgroundColor,
                featuredCategory,
                criteria,
              } = module;

              values = {
                ...(isPage && pageSectionHeaderValues),
                type: "featured",
                resource: "contents",
                featuredTitle: featuredTitle || undefined,
                featuredExcerpt: featuredExcerpt || undefined,
                link: link?.value
                  ? {
                      value: link.value,
                      openNewTab: link?.openNewTab || false,
                    }
                  : undefined,
                image: image?.uuid
                  ? {
                      uuid: image.uuid,
                      alt: image.alt || undefined,
                      source: "FTV-internal",
                    }
                  : undefined,
                criteria: {
                  ...criteria,
                  limit: 1,
                  lang,
                  page: 1,
                  fields: "header,slug,category,theme",
                  categories:
                    checkForStringtoArray(criteria?.categories, "string") ||
                    undefined,
                  tags:
                    checkForStringtoArray(criteria?.tags, "string") ||
                    undefined,
                  authors:
                    checkForStringtoArray(criteria?.authors, "string") ||
                    undefined,
                },
                backgroundColor,
                featuredCategory,
                sticker: "new-article",
                order,
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
          } else if (isPage) {
            response = await updatePageComponent(pageId, values, uuid);
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
          if (error?.response?.data === "Invalid token") {
            deleteToken();
          }
          ErrorCaseClient(dispatch, error?.response?.data);
        }
      }
    }
  };
}

export function saveImage(setFileTitle, name, image, moduleId, subId) {
  console.log("%cSAVING IMAGE", `${consoleTitle}`, image.name);
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await uploadImage(formData);
      if (response.status < 300 && response.status > 199) {
        setFileTitle(image.name);
        console.log("%cRESPONSE", `${consoleInfo}`, response.data);
        if (name === "image") {
          dispatch(setImageUuid({ id: moduleId, value: response.data }));
        }
        if (name === "homeImage") {
          dispatch(setHomeImageUuid(response.data));
        }
        if (name === "navImage") {
          dispatch(setNavImageUuid(response.data));
        }
        if (name === "ctaImage") {
          dispatch(setCtaImageUuid({ id: moduleId, value: response.data }));
        }
        if (name === "transparentImage") {
          dispatch(setTransparentImageUuid(response.data));
        }
        if (name === "SocialImg") {
          dispatch(setSocialImgUuid(response.data));
        }
        if (name === "featuredImage") {
          dispatch(
            setFeaturedImageUuid({ id: moduleId, value: response.data })
          );
        }
        if (name === "collectionCardImage") {
          dispatch(
            setCollectionCardImageUuid({
              moduleId,
              value: response.data,
              cardId: subId,
            })
          );
        }
        if (name === "headerImage") {
          dispatch(setHeaderImageUuid(response.data));
        }
        if (name === "headerLargeImage") {
          dispatch(setHeaderLargeImageUuid(response.data));
        }
      }
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      if (error?.response?.status === 400) {
        dispatch(
          showErrorModal({
            value: true,
            message: uploadError(error?.response?.data),
          })
        );
      } else {
        console.error("ERROR", error);
        ErrorCaseClient(dispatch, error?.response?.data);
      }
    }

    return null;
  };
}

export function fetchFeedBackResults(id, resultType) {
  console.log("%cFETCHING FEEDBACK RESULTS", `${consoleTitle}`, id);
  return async (dispatch) => {
    try {
      const response = await getFeedBackResults(id, resultType);
      if (response.status < 300 && response.status > 199) {
        console.log("%cFEEDBACK RESULTS", `${consoleInfo}`, response.data);
        dispatch(setFeedbackResults(response.data));
      }
    } catch (error) {
      if (error?.response?.data === "Invalid token") {
        deleteToken();
      }
      ErrorCaseClient(dispatch, error?.response?.data);
    }

    return null;
  };
}
