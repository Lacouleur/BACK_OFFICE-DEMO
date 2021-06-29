import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionBarContainer,
  BackIcon,
  backButton,
  saveButton,
  saveButtonDisable,
  BackText,
  StatusContainer,
  LastSavedBox,
  LastSavedText,
  Separator,
  ProgrammedBox,
  ColorDot,
  ProgrammedText,
  StatusBox,
  StatusText,
  Selector,
  ActionsContainer,
  ActionIcon,
  ButtonsContainer,
  PublishButton,
  ArchiveBox,
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import colors from "../../../styles/core/colors";
import eyeIcon from "../../../styles/assets/icons/eye.svg";
import trashIcon from "../../../styles/assets/icons/trash.svg";
import trashGreyIcon from "../../../styles/assets/icons/trash-grey.svg";
import { checkAndSend, saveModule } from "../../../store/actions/clientActions";
import buildDate from "../../../helper/buildDate";
import PublishModal from "../../Modals/PublishModal";
import {
  setIsOpenPublishModal,
  setIsOpenArchiveModal,
} from "../../../store/actions/actionBarActions";
import ErrorModal from "../../Modals/ErrorModal";
import ArchiveModal from "../../Modals/ArchiveModal";
import {
  Tooltip,
  TooltipText,
} from "../../../styles/styledComponents/contentList/Content.sc";

const ActionBar = () => {
  const dispatch = useDispatch();
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

  const homeNavigationState = useSelector(
    ({ homeNavigationReducer }) => homeNavigationReducer
  );

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { homeNavIsChanged } = homeNavigationState;

  const {
    isManifesto,
    manifestoId,
    isPublishedManifesto,
    manifestoLang,
  } = manifestoState;

  const {
    updatedAt,
    programmedAt,
    publishedAt,
    isOpenPublishModal,
    isOpenErrorModal,
    isOpenArchiveModal,
  } = actionBarState;

  const { isChanged: seoChanged } = seoState;
  const {
    title,
    slug,
    titleError,
    slugError,
    regexSlugError,
    postingError,
    isChanged: MainInformationChanged,
    articleId,
    modified,
    status,
    lang,
  } = MainInformationState;

  const isEditing = !!articleId;
  const { modulesList } = modulesState;
  const history = useHistory();
  const [updateDate, setUpdateDate] = useState();
  const [programmedDate, setProgrammedDate] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [contentIsChanged, setContentIsChanged] = useState(false);
  const [actionButtonContent, setActionButtonContent] = useState("");
  const [isDeleteButton, setIsDeleteButton] = useState(false);
  const [isPreviewButton, setIsPreviewButton] = useState(false);
  const [isArticleError, setIsArticleError] = useState("");
  const selectOptions = [{ value: "UNPUBLISH", label: "UNPUBLISH" }];

  function ModifiedModulesWatcher() {
    const modifiedModules = [];
    modulesList.map((module) => {
      if (module.isChanged) {
        modifiedModules.push(module);
        return null;
      }
      return null;
    });
    if (
      seoChanged ||
      MainInformationChanged ||
      homeNavIsChanged ||
      modifiedModules.length > 0
    ) {
      setContentIsChanged(true);
    } else {
      setContentIsChanged(false);
    }
  }

  function FieldsErrorWatcher() {
    if (!isManifesto) {
      if (
        titleError ||
        slugError ||
        regexSlugError ||
        postingError ||
        !slug ||
        !title
      ) {
        setIsArticleError(true);
      } else {
        setIsArticleError(false);
      }
    }

    if (isManifesto) {
      if (titleError || !title) {
        setIsArticleError(true);
      } else {
        setIsArticleError(false);
      }
    }
  }

  function timeWatcher() {
    const createUpdateDate = new Date(updatedAt);
    setUpdateDate(buildDate(createUpdateDate));

    if (programmedAt) {
      const createProgrammedDate = new Date(programmedAt);
      setProgrammedDate(buildDate(createProgrammedDate));
    }
    if (publishedAt) {
      const createPublishedDate = new Date(publishedAt);
      setPublishedDate(buildDate(createPublishedDate));
    }
  }

  function setButtonContent() {
    if (!isManifesto) {
      if (status === "PUBLISHED" && modified) {
        setActionButtonContent("UPDATE");
        setIsDeleteButton(false);
      } else if (status === "PUBLISHED" && !modified) {
        setActionButtonContent("UNPUBLISH");
        setIsDeleteButton(false);
      } else {
        setActionButtonContent("PUBLISH");
        setIsDeleteButton(true);
      }
    }

    if (isManifesto) {
      setActionButtonContent(manifestoId ? "UPDATE" : "PUBLISH");
      setIsDeleteButton(false);
    }
  }

  useEffect(() => {
    ModifiedModulesWatcher();
  }, [seoChanged, MainInformationChanged, modulesState, homeNavIsChanged]);

  useEffect(() => {
    FieldsErrorWatcher();
  }, [titleError, slugError, regexSlugError, postingError, title, slug]);

  useEffect(() => {
    timeWatcher();
  }, [updatedAt, programmedAt, publishedAt]);

  useEffect(() => {
    setButtonContent();
  }, [MainInformationState]);

  useEffect(() => {
    if (!isManifesto && lang && slug && articleId) {
      setIsPreviewButton(true);
      return;
    }

    if (isManifesto && manifestoLang && manifestoId) {
      setIsPreviewButton(true);
      return;
    }
    setIsPreviewButton(false);
  }, [articleId, lang, slug, isManifesto, manifestoLang, manifestoId]);

  useEffect(() => {
    if (isOpenPublishModal === false) {
      setButtonContent();
    }
  }, [isOpenPublishModal]);

  function handleSubmit() {
    if (!isEditing && contentIsChanged) {
      dispatch(checkAndSend());
    }

    if (isEditing && contentIsChanged) {
      dispatch(checkAndSend("update", articleId));

      modulesList?.map((module) => {
        if (module.isChanged) {
          dispatch(saveModule(module.uuid, "update"));
        }
        return null;
      });
    }
  }

  return (
    <>
      <ActionBarContainer>
        {isOpenErrorModal && <ErrorModal />}
        {isOpenPublishModal && (
          <PublishModal
            actionName={actionButtonContent}
            articleId={isManifesto ? manifestoId : articleId}
          />
        )}
        {isOpenArchiveModal && <ArchiveModal articleId={articleId} />}
        <ButtonsContainer>
          <Button
            type="button"
            styles={backButton}
            onClick={() => history.push("/dashboard")}
          >
            <BackIcon src={backArrow} />
            <BackText>BACK</BackText>
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            styles={
              contentIsChanged && !isArticleError
                ? saveButton
                : saveButtonDisable
            }
            type="button"
          >
            {contentIsChanged && !isArticleError ? "save" : "saved"}
          </Button>
        </ButtonsContainer>
        <StatusContainer>
          {isEditing && (
            <LastSavedText>
              <LastSavedBox>
                <LastSavedText>Last Saved</LastSavedText>
                <LastSavedText>{`${updateDate}`}</LastSavedText>
              </LastSavedBox>
            </LastSavedText>
          )}

          {programmedAt && (
            <>
              <Separator />
              <ProgrammedBox>
                <ColorDot background={`${colors.deepBlue}`} />
                <ProgrammedText>Will be published</ProgrammedText>
                <ProgrammedText>{`${programmedDate}`}</ProgrammedText>
              </ProgrammedBox>
            </>
          )}
          {publishedAt && status === "PUBLISHED" && (
            <>
              <Separator />
              <StatusBox>
                <ColorDot background={`${colors.green}`} />
                <StatusText>Published</StatusText>
                <StatusText>{`${publishedDate}`}</StatusText>
              </StatusBox>
            </>
          )}
        </StatusContainer>
        <ActionsContainer>
          {isPreviewButton && (
            <ActionIcon
              src={eyeIcon}
              onClick={() => {
                if (!isManifesto) {
                  window.open(
                    `${PREVIEW_URL}/${lang}/content/${slug}`,
                    "_blank"
                  );
                }

                if (isManifesto) {
                  window.open(
                    `${PREVIEW_URL}/${manifestoLang}/manifest`,
                    "_blank"
                  );
                }
              }}
            />
          )}

          {isDeleteButton ? (
            <ArchiveBox role="button">
              <ActionIcon
                src={trashIcon}
                onClick={() => dispatch(setIsOpenArchiveModal(true))}
              />
            </ArchiveBox>
          ) : (
            <ArchiveBox role="button">
              <ActionIcon src={trashGreyIcon} />
              <Tooltip archive>
                <TooltipText>
                  A published content cannot be archived
                </TooltipText>
              </Tooltip>
            </ArchiveBox>
          )}
          {isManifesto && (
            <PublishButton
              disabled={
                !(manifestoId && !isPublishedManifesto && !contentIsChanged)
              }
              type="button"
              onClick={() => {
                if (manifestoId) {
                  dispatch(setIsOpenPublishModal(true));
                }
              }}
            >
              {actionButtonContent}
            </PublishButton>
          )}
          {!isManifesto && (
            <PublishButton
              disabled={!(articleId && !contentIsChanged)}
              type="button"
              onClick={() => {
                if (articleId) {
                  dispatch(setIsOpenPublishModal(true));
                }
              }}
            >
              {actionButtonContent}
            </PublishButton>
          )}
          {status === "PUBLISHED" && modified && !contentIsChanged && (
            <Selector
              placeholder=""
              classNamePrefix="select"
              options={selectOptions}
              onChange={(e) => {
                if (e?.value === "UNPUBLISH") {
                  setActionButtonContent(e?.value);
                  dispatch(setIsOpenPublishModal(true));
                }
              }}
            />
          )}
        </ActionsContainer>
      </ActionBarContainer>
    </>
  );
};

export default ActionBar;
