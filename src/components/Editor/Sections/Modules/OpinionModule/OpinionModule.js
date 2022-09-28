/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
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
  FieldAndSwitchContainer,
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
  setOpinionIsReaction,
  closeModule,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import HideModal from "../../../../Modals/HideModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import checkIcon from "../../../../../styles/assets/icons/check.svg";
import plusIcon from "../../../../../styles/assets/icons/plus-violet-in-cirlce.svg";
import trashIconViolet from "../../../../../styles/assets/icons/trash-violet-no-circle.svg";
import trashIconGreyNoCircle from "../../../../../styles/assets/icons/trash-grey-no-circle.svg";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import eyeIcon from "../../../../../styles/assets/icons/eye-circle-green.svg";
import eyeUnabled from "../../../../../styles/assets/icons/eye-circle-green-unabled.svg";
import {
  setAModuleIsOpen,
  showHideModal,
} from "../../../../../store/actions/actionBarActions";
import TextEditor from "../TextEditor";
import {
  manageReactionAnswers,
  setTextHTMLContent,
} from "../../../../../helper/modulesHelper";
import SwitchButton from "../../../../Tools/Switch";
import { TextOpinion } from "../../../../../styles/styledComponents/global/Field.sc";

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
  order,
  isReaction,
}) => {
  const dispatch = useDispatch();
  const opinionModuleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editorState, setEditorState] = useState();

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { articleId, status } = mainInformationState;
  const { hideModal } = actionBarState;
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isReaction === false) {
      setTextHTMLContent(
        "opinionModule",
        uuid,
        editorState,
        explanation,
        setEditorState,
        dispatch
      );
    }
  }, [editorState, isReaction]);

  useEffect(() => {
    if (isReaction) {
      manageReactionAnswers(answers, dispatch, uuid);
    }
  }, [isReaction]);

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

  useEffect(() => {
    if (isReaction && explanation) {
      if (explanation === "<p></p>") {
        setDescription("");
      } else {
        setDescription(explanation);
      }
    }
  }, [explanation]);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isChanged || isNewModule) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }
  useClickOutside(opinionModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={opinionModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={opinionModuleRef}
          articleId={articleId}
        />
      )}

      {hideModal?.isOpen && hideModal?.moduleId === uuid && <HideModal />}

      {!isOpen && <Gradient />}

      <SectionBox onClick={() => setIsOpen(true)} isOpen={isOpen}>
        <ActionIcons>
          {status === "DRAFT" && (
            <>
              <Delete
                src={trashIcon}
                onClick={() => {
                  if (isNewModule) {
                    dispatch(closeModule(uuid));
                  }
                  if (!isNewModule) {
                    dispatch(showCloseModal({ value: true, id: uuid }));
                  }
                }}
              />
            </>
          )}
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
        </ActionIcons>

        <SectionTitle>
          <FormTitle>
            {`${order}. opinion ${isReaction ? "(reaction)" : "(Quizz)"}`}
          </FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        {isReaction === undefined && (
          <>
            <TextOpinion>
              What type of opinion do you want to create ?
            </TextOpinion>
            <SwitchButton
              styleVariant="isReaction"
              action={() => {
                dispatch(setOpinionIsReaction({ id: uuid, value: true }));
              }}
              isChecked={false}
              componentId="switch-is-reaction"
              displayedText="Reaction"
            />

            <SwitchButton
              styleVariant="isReaction"
              action={() => {
                dispatch(setOpinionIsReaction({ id: uuid, value: false }));
              }}
              isChecked={false}
              componentId="switch-is-quizz"
              displayedText="Quizz"
            />
          </>
        )}
        {isReaction !== undefined && (
          <>
            {answers && !isReaction && (
              <QuestionSettingContainer>
                <QuestionSettingboxOne>
                  <QuestionLabel
                    htmlFor="r/w"
                    onClick={() => {
                      dispatch(
                        SetOpinionShowRightAnswer({
                          id: uuid,
                          value: !showRight,
                        })
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
                        setOpinionshowPercentage({
                          id: uuid,
                          value: !showPercentage,
                        })
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
                        setOpinionShowResponse({
                          id: uuid,
                          value: !showResponse,
                        })
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
            )}

            <Field
              placeholder="Question"
              maxlength="70"
              infos="Maximum 70 characters"
              name="question"
              section="opinion"
              moduleId={uuid}
              edit={question}
            />

            {isReaction === true && (
              <>
                <Field
                  placeholder="Emoji Theme"
                  infos="Only one Emoji set for the time being, more soon"
                  name="emojiTheme"
                  section="opinion"
                  maxlength="5"
                  moduleId={uuid}
                  edit="😍🤔👏😥😡"
                />
                <Field
                  placeholder="Description"
                  fieldType="textarea"
                  maxlength="150"
                  infos="Maximum 150 characters"
                  name="description"
                  section="opinion"
                  moduleId={uuid}
                  edit={description}
                />
              </>
            )}
            {answers &&
              !isReaction &&
              answers.map((answer) => {
                return (
                  <FieldAndSwitchContainer key={answer.uuid}>
                    <Field
                      placeholder="Answer"
                      maxlength="90"
                      infos="Maximum 90 characters"
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
                          )
                        }
                        src={
                          answers.length > 2
                            ? trashIconViolet
                            : trashIconGreyNoCircle
                        }
                        unactive={answers.length > 2}
                      />
                    </IconBox>

                    {showRight && (
                      <SwitchButton
                        action={() =>
                          dispatch(
                            SetOpinionRightAnswer({
                              moduleId: uuid,
                              answerId: answer.uuid,
                              value: !answer.right,
                            })
                          )
                        }
                        isChecked={!!answer?.right || false}
                        componentId={`switch-${answer.uuid}}`}
                        displayedText="Right answer"
                      />
                    )}
                  </FieldAndSwitchContainer>
                );
              })}
            {answers && !isReaction && (
              <AddAnswerBox
                onClick={() =>
                  dispatch(createOpinionNewAnswer({ moduleId: uuid }))
                }
              >
                <AddAnswerIcon src={plusIcon} />
                <AddAnswerText>Add an answer</AddAnswerText>
              </AddAnswerBox>
            )}
            {typeof explanation === "string" && editorState && !isReaction && (
              <>
                <TextEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                  isOpen={isOpen}
                />
              </>
            )}
          </>
        )}
      </SectionBox>
    </ModuleContainer>
  );
};

OpinionModule.defaultProps = {
  explanation: null,
  isVisible: true,
  isReaction: undefined,
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
  order: PropTypes.number.isRequired,
  isReaction: PropTypes.bool,
};
export default OpinionModule;
