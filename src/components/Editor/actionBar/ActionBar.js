/* eslint-disable no-unused-vars */
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
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

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
    isEditing,
    title,
    slug,
    titleError,
    slugError,
    regexSlugError,
    postingError,
    isChanged: homeScreenChanged,
    articleId,
    modified,
    status,
  } = homeScreenState;

  const { modulesList } = modulesState;
  const history = useHistory();
  const [updateDate, setUpdateDate] = useState();
  const [programmedDate, setProgrammedDate] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [contentIsChanged, setContentIsChanged] = useState(false);
  const [actionButtonContent, setActionButtonContent] = useState("");
  const [isDeleteButton, setIsDeleteButton] = useState(false);
  const [isArticleError, setIsArticleError] = useState("");
  const selectOptions = [{ value: "UNPUBLISH", label: "UNPUBLISH" }];

  useEffect(() => {
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
  }, [titleError, slugError, regexSlugError, postingError, title, slug]);

  useEffect(() => {
    const modifiedModules = [];
    modulesList.map((module) => {
      if (module.isChanged) {
        modifiedModules.push(module);
        return null;
      }
      return null;
    });

    if (seoChanged || homeScreenChanged || modifiedModules.length > 0) {
      setContentIsChanged(true);
    } else {
      setContentIsChanged(false);
    }
  }, [seoChanged, homeScreenChanged, modulesState]);

  useEffect(() => {
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
  }, [updatedAt, programmedAt, publishedAt]);

  useEffect(() => {
    if (status === "PUBLISHED" && modified) {
      setActionButtonContent("UPDATE");
      /* setIsDeleteButton(false); */
    } else if (status === "PUBLISHED" && !modified) {
      setActionButtonContent("UNPUBLISH");
      /* setIsDeleteButton(false); */
    } else {
      setActionButtonContent("PUBLISH");
      setIsDeleteButton(true);
    }
  }, [homeScreenState]);

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
    <ActionBarContainer>
      {isOpenErrorModal && <ErrorModal />}
      {isOpenPublishModal && (
        <PublishModal action={actionButtonContent} articleId={articleId} />
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
            if (isEditing) {
              handleSubmit();
            }
          }}
          styles={
            contentIsChanged && !isArticleError ? saveButton : saveButtonDisable
          }
          type="button"
        >
          {contentIsChanged ? "save" : "saved"}
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
        <ActionIcon src={eyeIcon} />
        {isDeleteButton ? (
          <ActionIcon
            src={trashIcon}
            /* onClick={() => dispatch(setIsOpenArchiveModal(true))} */
          />
        ) : (
          <>
            <ActionIcon src={trashGreyIcon} />
            {/* <Tooltip centred>
              <TooltipText>A published content cannot be archived</TooltipText>
            </Tooltip> */}
          </>
        )}
        <PublishButton
          isActive={!!(articleId && !contentIsChanged)}
          type="button"
          onClick={() => {
            if (articleId) {
              dispatch(setIsOpenPublishModal(true));
            }
          }}
        >
          {actionButtonContent}
        </PublishButton>
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
  );
};

export default ActionBar;
