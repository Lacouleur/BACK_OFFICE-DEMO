import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { setStatus } from "../../../store/actions/mainInformationActions";

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
  const {
    title,
    slug,
    titleError,
    slugError,
    regexSlugError,
    postingError,
    isChanged: MainInformationChanged,
    articleId,
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
  const [isOpinionModules, setIsOpinionModules] = useState(false);
  const [selectOptions, setSelectOptions] = useState([
    { value: "PUBLISH", label: "PUBLISH" },
    { value: "UNPUBLISH", label: "UNPUBLISH" },
  ]);

  const opinionLink = React.useRef(null);

  useEffect(() => {
    ModifiedModulesWatcher(
      modulesList,
      seoChanged,
      MainInformationChanged,
      homeNavIsChanged,
      setContentIsChanged
    );
  }, [seoChanged, MainInformationChanged, modulesState, homeNavIsChanged]);

  useEffect(() => {
    FieldsErrorWatcher(isManifesto, MainInformationState, setIsArticleError);
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
    setButtonContent(
      MainInformationState,
      setActionButtonContent,
      setSelectOptions,
      setIsDeleteButton,
      manifestoState,
      actionBarState
    );
  }, [MainInformationState]);

  useEffect(() => {
    if (isOpenPublishModal === false) {
      setButtonContent(
        MainInformationState,
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
        {isOpenArchiveModal && <ArchiveModal id={articleId} />}
        {isOpenScheduleModal && <ScheduleModal id={articleId} />}
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
          {!isManifesto && (
            <Link
              ref={opinionLink}
              to={`/opinion-results/${articleId}`}
              target="_blank"
              style={{ display: "none" }}
            />
          )}

          {isManifesto && (
            <Link
              ref={opinionLink}
              to={`/opinion-results/manifesto/${manifestoLang}/${manifestoId}`}
              target="_blank"
              style={{ display: "none" }}
            />
          )}

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
                disabled={!(articleId && !contentIsChanged)}
                type="button"
                onClick={() => {
                  if (articleId) {
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
            {articleId && !contentIsChanged && selectOptions.length > 0 && (
              <Selector
                placeholder=""
                classNamePrefix="select"
                options={selectOptions}
                onChange={(e) => {
                  actionsSelectorButton(e, dispatch, setActionButtonContent);
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
