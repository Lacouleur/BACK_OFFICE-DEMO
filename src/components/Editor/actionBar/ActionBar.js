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
} from "../../../styles/styledComponents/editor/ActionBar.sc";
import backArrow from "../../../styles/assets/icons/arrow-left.svg";
import Button from "../../../styles/styledComponents/global/Buttons/Buttons.sc";
import colors from "../../../styles/core/colors";
import eyeIcon from "../../../styles/assets/icons/eye.svg";
import trashIcon from "../../../styles/assets/icons/trash.svg";
import { checkAndSend, saveModule } from "../../../store/actions/clientActions";
import buildDate from "../../../helper/buildDate";

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

  const { updatedAt, programmedAt, publishedAt } = actionBarState;
  const { isChanged: seoChanged } = seoState;
  const {
    isEditing,
    isChanged: homeScreenChanged,
    articleId,
  } = homeScreenState;
  const { modulesList } = modulesState;
  const history = useHistory();
  const [updateDate, setUpdateDate] = useState();
  const [programmedDate, setProgrammedDate] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [contentIsChanged, setContentIsChanged] = useState(false);

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
              /* if (!slug) {
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
              } */
            }
          }}
          styles={contentIsChanged ? saveButton : saveButtonDisable}
          type="button"
        >
          {contentIsChanged ? "save" : "saved"}
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
