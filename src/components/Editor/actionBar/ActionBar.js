/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionBarContainer,
  BackIcon,
  backButton,
  saveButton,
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
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import colors from "../../../styles/core/colors";
import eyeIcon from "../../../styles/assets/icons/eye.svg";
import trashIcon from "../../../styles/assets/icons/trash.svg";
import { checkAndSend, saveModule } from "../../../store/actions/clientActions";
import {
  setErrorSlug,
  setErrorTitle,
  setUpdatedAt,
} from "../../../store/actions/homeScreenActions";

const ActionBar = () => {
  const dispatch = useDispatch();
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);

  const { updatedAt, programmedAt, publishedAt } = actionBarState;
  const {
    isEditing,
    isChanged,
    articleId,
    title,
    slug,
    slugError,
    postingError,
    regexSlugError,
  } = homeScreenState;
  const { modulesList } = modulesState;
  const history = useHistory();
  const [updateDate, setUpdateDate] = useState();
  const [programmedDate, setProgrammedDate] = useState();
  const [publishedDate, setPublishedDate] = useState();

  useEffect(() => {
    const options1 = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const options2 = {
      hours: "2-digit",
      minutes: "2-digit",
    };
    function buildDate(date) {
      return `${date.toLocaleDateString(
        navigator.language,
        options1
      )} - ${date.toLocaleTimeString(navigator.language, options2)}`;
    }

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

  function handleSubmit() {
    if (!isEditing && isChanged) {
      dispatch(checkAndSend());
    }

    if (isEditing && !isChanged) {
      dispatch(setUpdatedAt("create"));
    }

    if (isEditing && isChanged) {
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
            if (!isEditing) {
              if (!slug) {
                dispatch(setErrorSlug(true));
              }
              if (!title) {
                dispatch(setErrorTitle(true));
              }
              if (
                title &&
                slug &&
                !slugError &&
                !regexSlugError &&
                !postingError
              ) {
                handleSubmit();
              }
            } else {
              handleSubmit();
            }
          }}
          styles={saveButton}
          type="button"
        >
          save
        </Button>
      </ButtonsContainer>
      <StatusContainer>
        {isEditing && (
          <>
            <LastSavedBox>
              <LastSavedText>Last Saved</LastSavedText>
              <LastSavedText>{`${updateDate}`}</LastSavedText>
            </LastSavedBox>
          </>
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
        {publishedAt && (
          <>
            <Separator />
            <StatusBox>
              <ColorDot background={`${colors.turquoiseBlue}`} />
              <StatusText>Published</StatusText>
              <StatusText>{`${publishedDate}`}</StatusText>
            </StatusBox>
          </>
        )}
      </StatusContainer>
      <ActionsContainer>
        <ActionIcon src={eyeIcon} />
        <ActionIcon src={trashIcon} />
        <Selector classNamePrefix="select" placeholder="PUBLISH" />
      </ActionsContainer>
    </ActionBarContainer>
  );
};

export default ActionBar;
