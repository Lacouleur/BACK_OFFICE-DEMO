/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleIcon,
  FormTitle,
} from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
} from "../../../../../styles/styledComponents/editor/Sections.sc";

import {
  ModuleContainer,
  Delete,
  QuestionSettingContainer,
  QuestionSettingboxOne,
  QuestionLabel,
  CheckBox,
  CheckMark,
  HiddenCheckbox,
  CheckboxContainer,
  SwitchBox,
  SwitchLabel,
  Switch,
  AnswerContainer,
  AnswerTrashIcon,
  IconBox,
  AddAnswerBox,
  AddAnswerIcon,
  AddAnswerText,
  Hide,
  ActionIcons,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  setOpinionExplain,
  SetOpinionRightAnswer,
  setOpinionshowPercentage,
  setOpinionShowResponse,
  SetOpinionShowRightAnswer,
  showCloseModal,
  createOpinionNewAnswer,
  deleteOpinionAnswer,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import HideModal from "../../../../Modals/HideModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import quizzIcon from "../../../../../styles/assets/icons/quizz.svg";
import checkIcon from "../../../../../styles/assets/icons/check.svg";
import plusIcon from "../../../../../styles/assets/icons/plus-violet-in-cirlce.svg";
import trashIconViolet from "../../../../../styles/assets/icons/trash-violet-no-circle.svg";
import trashIconGreyNoCircle from "../../../../../styles/assets/icons/trash-grey-no-circle.svg";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import eyeIcon from "../../../../../styles/assets/icons/eye-circle-green.svg";
import eyeUnabled from "../../../../../styles/assets/icons/eye-circle-green-unabled.svg";
import {
  showErrorModal,
  showHideModal,
} from "../../../../../store/actions/actionBarActions";
import { NoDeleteOpinionIfPublished } from "../../../../../helper/errorMessages";

const OpinionModule = ({
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  question,
  showPercentage,
  showResponse,
  showRight,
  explanation,
  answers,
  isVisible,
}) => {
  const dispatch = useDispatch();
  const opinionModuleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { articleId, status } = mainInformationState;
  const { hideModal } = actionBarState;

  useEffect(() => {
    if (isNewModule) {
      opinionModuleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      setIsOpen(true);
    }
  }, [isNewModule]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isChanged && isNewModule) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }
  useClickOutside(opinionModuleRef, onClickOutside);

  return (
    <ModuleContainer onClick={() => setIsOpen(true)} ref={opinionModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={opinionModuleRef}
          articleId={articleId}
        />
      )}

      {hideModal?.isOpen && hideModal?.moduleId === uuid && <HideModal />}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen}>
        <ActionIcons>
          <Hide
            src={isVisible ? eyeIcon : eyeUnabled}
            onClick={() => {
              if (isVisible) {
                dispatch(
                  showHideModal({ value: true, id: uuid, type: "hide" })
                );
              } else {
                dispatch(
                  showHideModal({ value: true, id: uuid, type: "show" })
                );
              }
            }}
          />
          <Delete
            src={trashIcon}
            onClick={() => {
              if (status !== "PUBLISHED") {
                dispatch(showCloseModal({ value: true, id: uuid }));
              } else {
                dispatch(
                  showErrorModal({
                    value: true,
                    message: NoDeleteOpinionIfPublished(),
                  })
                );
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <TitleIcon src={quizzIcon} />
          <FormTitle>Opinion module</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        <QuestionSettingContainer>
          <QuestionSettingboxOne>
            <QuestionLabel
              htmlFor="r/w"
              onClick={() => {
                dispatch(
                  SetOpinionShowRightAnswer({ id: uuid, value: !showRight })
                );
              }}
            >
              <CheckboxContainer checked={showRight} readOnly>
                <HiddenCheckbox checked={showRight} readOnly />
                <CheckBox id="r/w">
                  <CheckMark src={checkIcon} />
                </CheckBox>
              </CheckboxContainer>
              <p>Right/Wrong</p>
            </QuestionLabel>

            <QuestionLabel
              htmlFor="%"
              onClick={() => {
                dispatch(
                  setOpinionshowPercentage({ id: uuid, value: !showPercentage })
                );
              }}
            >
              <CheckboxContainer checked={showPercentage} readOnly>
                <HiddenCheckbox checked={showPercentage} readOnly />
                <CheckBox id="%">
                  <CheckMark src={checkIcon} />
                </CheckBox>
              </CheckboxContainer>
              <p>Show %</p>
            </QuestionLabel>

            <QuestionLabel
              htmlFor="addTxt"
              onClick={() => {
                if (explanation === null) {
                  dispatch(setOpinionExplain({ id: uuid, value: "" }));
                } else {
                  dispatch(setOpinionExplain({ id: uuid, value: null }));
                }
              }}
            >
              <CheckboxContainer
                checked={typeof explanation === "string"}
                readOnly
              >
                <HiddenCheckbox
                  checked={typeof explanation === "string"}
                  readOnly
                />
                <CheckBox id="addTxt">
                  <CheckMark src={checkIcon} />
                </CheckBox>
              </CheckboxContainer>
              <p>Add a text</p>
            </QuestionLabel>

            <QuestionLabel
              htmlFor="showResult"
              onClick={() => {
                dispatch(
                  setOpinionShowResponse({ id: uuid, value: !showResponse })
                );
              }}
            >
              <CheckboxContainer checked={showResponse} readOnly>
                <HiddenCheckbox checked={showResponse} readOnly />
                <CheckBox id="showResult">
                  <CheckMark src={checkIcon} />
                </CheckBox>
              </CheckboxContainer>
              <p>Show results</p>
            </QuestionLabel>
          </QuestionSettingboxOne>
        </QuestionSettingContainer>

        <Field
          placeholder="Question"
          maxlength="70"
          infos="Maximum 70 characters"
          name="question"
          section="opinion"
          moduleId={uuid}
          edit={question}
          /* error={titleError} */
        />
        {question &&
          answers &&
          answers.map((answer) => {
            return (
              <AnswerContainer key={answer.uuid}>
                <Field
                  placeholder="Answer"
                  maxlength="60"
                  infos="Maximum 60 characters"
                  name="answer"
                  section="opinion"
                  moduleId={uuid}
                  answerId={answer.uuid}
                  edit={answer.text}
                />
                <IconBox>
                  <AnswerTrashIcon
                    onClick={() =>
                      dispatch(
                        deleteOpinionAnswer({
                          moduleId: uuid,
                          answerId: answer.uuid,
                        })
                        // eslint-disable-next-line prettier/prettier
                      )}
                    src={
                      answers.length > 2
                        ? trashIconViolet
                        : trashIconGreyNoCircle
                    }
                    unactive={answers.length > 2}
                  />
                </IconBox>

                <SwitchBox
                  htmlFor={`switch-${answer.uuid}`}
                  onChange={() => {
                    dispatch(
                      SetOpinionRightAnswer({
                        moduleId: uuid,
                        answerId: answer.uuid,
                        value: !answer.right,
                      })
                    );
                  }}
                >
                  <p>Right answer</p>
                  <Switch
                    className="Switch"
                    id={`switch-${answer.uuid}`}
                    type="checkbox"
                    checked={!!answer.right}
                    readOnly
                  />
                  <SwitchLabel
                    className="SwitchLabel"
                    htmlFor={`switch-${answer.uuid}`}
                  />
                </SwitchBox>
              </AnswerContainer>
            );
          })}

        <AddAnswerBox onClick={() => dispatch(createOpinionNewAnswer(uuid))}>
          <AddAnswerIcon src={plusIcon} />
          <AddAnswerText>Add an answer</AddAnswerText>
        </AddAnswerBox>

        {typeof explanation === "string" && question && (
          <Field
            placeholder="Type the explanation here."
            fieldType="textarea"
            name="explanation"
            section="opinion"
            moduleId={uuid}
            edit={explanation}
          />
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

OpinionModule.defaultProps = {
  explanation: null,
  isVisible: true,
};

OpinionModule.propTypes = {
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  showPercentage: PropTypes.bool.isRequired,
  showResponse: PropTypes.bool.isRequired,
  showRight: PropTypes.bool.isRequired,
  explanation: PropTypes.string,
  isVisible: PropTypes.bool,
  answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default OpinionModule;
