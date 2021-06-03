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
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/clientActions";
import Field from "../../../Field";
import quizzIcon from "../../../../../styles/assets/icons/quizz.svg";
import checkIcon from "../../../../../styles/assets/icons/check.svg";
import plusIcon from "../../../../../styles/assets/icons/plus-violet-in-cirlce.svg";
import trashIconViolet from "../../../../../styles/assets/icons/trash-violet-no-circle.svg";
import trashIconGrey from "../../../../../styles/assets/icons/trash-grey-no-circle.svg";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";

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
}) => {
  const dispatch = useDispatch();
  const opinionModuleRef = useRef(null);
  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const [isOpen, setIsOpen] = useState(false);

  const { articleId } = mainInformationState;

  useEffect(() => {
    if (isNewModule) {
      opinionModuleRef.current.scrollIntoView({ behavior: "smooth" });
      setIsOpen(true);
    }
    dispatch(showCloseModal(false));
  }, [isNewModule]);

  function onClickOutside() {
    setIsOpen(false);
    if (isChanged && isNewModule) {
      dispatch(saveModule(uuid, "save"));
    }
    if (isChanged && !isNewModule) {
      dispatch(saveModule(uuid, "update"));
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

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen}>
        <Delete
          src={trashIcon}
          onClick={() => {
            dispatch(showCloseModal({ value: true, id: uuid }));
          }}
        />
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
              <p>Don&apos;t show results</p>
            </QuestionLabel>
          </QuestionSettingboxOne>
        </QuestionSettingContainer>

        <Field
          placeholder="Question"
          maxlength="61"
          infos="Maximum 61 characters"
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
                  maxlength="34"
                  infos="Maximum 34 characters"
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
                    src={answers.length > 2 ? trashIconViolet : trashIconGrey}
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
  answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default OpinionModule;
