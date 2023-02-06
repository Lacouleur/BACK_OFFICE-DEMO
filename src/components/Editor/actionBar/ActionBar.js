import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionBarContainer,
  BackIcon,
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
  PublishButtonBox,
  ArchiveBox,
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import colors from "../../../styles/core/colors";
import eyeIcon from "../../../styles/assets/icons/eye-circle-green.svg";
import statIconGreen from "../../../styles/assets/icons/opinion-green.svg";
import statIconGrey from "../../../styles/assets/icons/opinion-grey.svg";
import trashIcon from "../../../styles/assets/icons/trash.svg";
import trashGreyIcon from "../../../styles/assets/icons/trash-grey.svg";
import buildDate from "../../../helper/buildDate";
import PublishModal from "../../Modals/PublishModal";
import {
  setIsOpenPublishModal,
  setIsOpenArchiveModal,
  setIsOpenScheduleModal,
} from "../../../store/actions/actionBarActions";
import ErrorModal from "../../Modals/ErrorModal";
import ArchiveModal from "../../Modals/ArchiveModal";
import {
  Tooltip,
  TooltipText,
} from "../../../styles/styledComponents/contentList/Content.sc";
import {
  actionsSelectorButton,
  FieldsErrorWatcher,
  ModifiedModulesWatcher,
  setButtonContent,
  timeWatcher,
  watchOpinionModules,
} from "../../../helper/actionBarHelper";
import ScheduleModal from "../../Modals/ScheduleModal";
import {
  cleanContentState,
  cleanPageState,
  setStatus,
} from "../../../store/actions/commonsActions";
import { openPreview } from "../../../helper/fieldsHelper";

const ActionBar = () => {
  const dispatch = useDispatch();
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );
  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

  const homeNavigationState = useSelector(
    ({ homeNavigationReducer }) => homeNavigationReducer
  );

  const pageHeaderState = useSelector(
    ({ pageHeaderReducer }) => pageHeaderReducer
  );

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { homeNavIsChanged } = homeNavigationState;
  const { pageHeaderIsChanged } = pageHeaderState;

  const {
    isManifesto,
    manifestoId,
    isPublishedManifesto,
    manifestoLang,
  } = manifestoState;

  const {
    updatedAt,
    publishedAt,
    isOpenPublishModal,
    isOpenErrorModal,
    isOpenArchiveModal,
    isOpenScheduleModal,
    isScheduled,
    publicationFailed,
    publicationFailData,
  } = actionBarState;

  const { isChanged: seoChanged } = seoState;
  const { isPage } = PageMainInformationState;

  const {
    title,
    slug,
    titleError,
    slugError,
    regexSlugError,
    postingError,
    isChanged: MainInformationChanged,
    articleId,
    pageId,
    status,
    lang,
    modified,
  } = isPage ? PageMainInformationState : MainInformationState;

  const id = isPage ? pageId : articleId;

  const isEditing = isPage ? !!isPage : !!id;
  const { modulesList } = modulesState;
  const history = useHistory();
  const [updateDate, setUpdateDate] = useState();
  const [programmedDate, setProgrammedDate] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [contentIsChanged, setContentIsChanged] = useState(false);
  const [actionButtonContent, setActionButtonContent] = useState("");
  const [isDeleteButton, setIsDeleteButton] = useState(false);
  const [isPreviewButton, setIsPreviewButton] = useState(false);
  const [isEditorError, setIsEditorError] = useState("");
  const [isOpinionModules, setIsOpinionModules] = useState(false);
  const [selectOptions, setSelectOptions] = useState([
    { value: "PUBLISH", label: "PUBLISH" },
    { value: "UNPUBLISH", label: "UNPUBLISH" },
  ]);

  const opinionLink = React.useRef(null);

  useEffect(() => {
    console.log('#### ActionBar useEffect contentIsChanged:', contentIsChanged, id)
    ModifiedModulesWatcher(
      modulesList,
      seoChanged,
      MainInformationChanged,
      homeNavIsChanged,
      pageHeaderIsChanged,
      setContentIsChanged
    );
  }, [
    seoChanged,
    MainInformationChanged,
    modulesState,
    homeNavIsChanged,
    pageHeaderIsChanged,
  ]);

  useEffect(() => {
    FieldsErrorWatcher(
      title,
      slug,
      titleError,
      slugError,
      regexSlugError,
      postingError,
      isManifesto,
      setIsEditorError
    );
  }, [titleError, slugError, regexSlugError, postingError, title, slug]);

  useEffect(() => {
    timeWatcher(
      dispatch,
      actionBarState,
      setProgrammedDate,
      setUpdateDate,
      setStatus,
      setSelectOptions,
      setPublishedDate
    );
  }, [updatedAt, isScheduled, publishedAt]);

  useEffect(() => {
    console.log("#### ActionBar useEffect MainInformationState, publicationFailed, status", status, modified);
    if (isOpenPublishModal === false) {
      setButtonContent(
        status,
        modified,
        setActionButtonContent,
        setSelectOptions,
        setIsDeleteButton,
        manifestoState,
        actionBarState
      );
    }
  }, [MainInformationState, publicationFailed, status, modified]);

  useEffect(() => {
    if (isOpenPublishModal === false) {
      setButtonContent(
        status,
        modified,
        setActionButtonContent,
        setSelectOptions,
        setIsDeleteButton,
        manifestoState,
        actionBarState
      );
    }
  }, [isOpenPublishModal]);

  useEffect(() => {
    setIsOpinionModules(watchOpinionModules(modulesList));
  }, [modulesList.length]);

  useEffect(() => {
    if (!isManifesto && lang && slug && id) {
      setIsPreviewButton(true);
      return;
    }

    if (isManifesto && manifestoLang && manifestoId) {
      setIsPreviewButton(true);
      return;
    }
    setIsPreviewButton(false);
  }, [id, lang, slug, isManifesto, manifestoLang, manifestoId]);

  return (
    <>
      <ActionBarContainer>
        {isOpenErrorModal && <ErrorModal />}
        {isOpenPublishModal && (
          <PublishModal
            actionName={actionButtonContent}
            id={isManifesto ? manifestoId : id}
            articleStatus={status}
          />
        )}
        {isOpenArchiveModal && (
          <ArchiveModal id={id} type={isPage ? "page" : "content"} />
        )}
        {isOpenScheduleModal && <ScheduleModal id={id} />}
        <ButtonsContainer>
          <Button
            type="button"
            backButton
            onClick={() => {
              history.push(isPage ? "/pages" : "/dashboard");
            }}
          >
            <BackIcon src={backArrow} />
            <BackText>BACK</BackText>
          </Button>
          <Button
            saveButton={contentIsChanged && !isEditorError}
            saveButtonDisable={!contentIsChanged || isEditorError}
            type="button"
          >
            {contentIsChanged && !isEditorError ? "save" : "saved"}
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

          {isScheduled && !publicationFailed && !publicationFailData && (
            <>
              <Separator />
              <ProgrammedBox>
                <ColorDot background={`${colors.deepBlue}`} />
                <ProgrammedText>Will be published</ProgrammedText>
                <ProgrammedText>{`${programmedDate}`}</ProgrammedText>
              </ProgrammedBox>
            </>
          )}

          {(publicationFailed || publicationFailData) && !isManifesto && (
            <>
              {publicationFailData?.retryAt && (
                <>
                  <Separator />
                  <ProgrammedBox>
                    <ColorDot background={`${colors.orange}`} />
                    <ProgrammedText>{`Publish failed (count: ${publicationFailData.failCount})`}</ProgrammedText>
                    <ProgrammedText>
                      {`retry at : ${buildDate(
                        new Date(publicationFailData.retryAt)
                      )}`}
                    </ProgrammedText>
                  </ProgrammedBox>
                </>
              )}

              {!publicationFailData?.retryAt && (
                <>
                  <Separator />
                  <ProgrammedBox>
                    <ColorDot background={`${colors.red}`} />
                    <ProgrammedText>Publish failed</ProgrammedText>
                  </ProgrammedBox>
                </>
              )}
            </>
          )}
          {publishedAt &&
            status === "PUBLISHED" &&
            !publicationFailed &&
            !publicationFailData &&
            !isScheduled && (
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
          <ActionIcon
            src={
              isOpinionModules && !contentIsChanged
                ? statIconGreen
                : statIconGrey
            }
            onClick={() => {
              if (isOpinionModules && !contentIsChanged) {
                opinionLink.current.click();
              }
            }}
          />

          {!isManifesto && !isPage && (
            <Link
              onClick={() => dispatch(cleanContentState())}
              ref={opinionLink}
              to={`/article-results/${id}`}
              style={{ display: "none" }}
            />
          )}

          {!isManifesto && isPage && (
            <Link
              onClick={() => dispatch(cleanPageState())}
              ref={opinionLink}
              to={`/page-results/${id}`}
              style={{ display: "none" }}
            />
          )}

          {isManifesto && !isPage && (
            <Link
              onClick={() => dispatch(cleanContentState())}
              ref={opinionLink}
              to={`/manifesto-results/${manifestoLang}/${manifestoId}`}
              style={{ display: "none" }}
            />
          )}

          {isPreviewButton && (
            <ActionIcon
              src={eyeIcon}
              onClick={() => {
                if (!isPage) {
                  if (!isManifesto) {
                    openPreview(lang, slug);
                  }

                  if (isManifesto) {
                    openPreview(manifestoLang, slug);
                  }
                } else {
                  openPreview(lang, slug, "pages");
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
          <PublishButtonBox>
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
                disabled={!(id && !contentIsChanged)}
                type="button"
                onClick={() => {
                  if (id) {
                    if (
                      actionButtonContent === "PROGRAM" ||
                      actionButtonContent === "PROGRAM UPDATE"
                    ) {
                      dispatch(setIsOpenScheduleModal(true));
                    } else {
                      dispatch(setIsOpenPublishModal(true));
                    }
                  }
                }}
              >
                {actionButtonContent}
              </PublishButton>
            )}
            {id && !contentIsChanged && selectOptions.length > 0 && (
              <Selector
                placeholder=""
                classNamePrefix="select"
                options={selectOptions}
                onChange={(e) => {
                  if (!isOpenPublishModal) {
                    actionsSelectorButton(e, dispatch, setActionButtonContent);
                  }
                }}
              />
            )}
          </PublishButtonBox>
        </ActionsContainer>
      </ActionBarContainer>
    </>
  );
};

export default ActionBar;
