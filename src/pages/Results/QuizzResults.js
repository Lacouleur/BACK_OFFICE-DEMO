import React from "react";
import PropTypes from "prop-types";
import {
  BoldText,
  ElementBox,
  IconBox,
  IsRightIcon,
  LightText,
  PercentBox,
  ResponseList,
  Section,
  TotalInfo,
} from "../../styles/styledComponents/global/Results.sc";
import { FormTitle } from "../../styles/styledComponents/global/Titles.sc";
import { IsVisibleIcon } from "../../styles/styledComponents/editor/modules/Modules.sc";
import { percentage } from "../../helper/resultsHelper";
import eyeIcon from "../../styles/assets/icons/eye-white.svg";
import eyeIconDisabled from "../../styles/assets/icons/eye-white-disabled.svg";
import crossIcon from "../../styles/assets/icons/cross-circle-red.svg";
import checkIcon from "../../styles/assets/icons/check-circle-green.svg";

const QuizzResults = ({
  id,
  question,
  isVisible,
  participantsCount,
  answers,
  showRight,
  isActive,
}) => {
  return (
    <Section key={id} isOpen>
      <FormTitle>{question || "Empty question"}</FormTitle>
      <IsVisibleIcon src={isVisible ? eyeIcon : eyeIconDisabled} />
      {question !== "" && (
        <>
          <TotalInfo>{`Total = ${participantsCount} answers`}</TotalInfo>
          <ResponseList>
            {answers.map((answer) => {
              return (
                <ElementBox key={`${answer.uuid}`}>
                  <PercentBox>
                    <BoldText>
                      {answer.text
                        ? `${String.fromCharCode(8226)}${String.fromCharCode(
                            160
                          )}${percentage(
                            answer.responsesCount,
                            participantsCount
                          )}%`
                        : "Empty"}
                    </BoldText>
                    <LightText>
                      {`${String.fromCharCode(160)}(${answer.responsesCount})`}
                    </LightText>
                  </PercentBox>
                  {answer.text !== "" && showRight && (
                    <IconBox>
                      {isActive !== "reaction" && (
                        <>
                          <IsRightIcon
                            src={answer.right ? checkIcon : crossIcon}
                          />
                        </>
                      )}
                    </IconBox>
                  )}
                  <LightText>{answer.text || "Empty response"}</LightText>
                </ElementBox>
              );
            })}
          </ResponseList>
        </>
      )}
    </Section>
  );
};

QuizzResults.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  participantsCount: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showRight: PropTypes.bool.isRequired,
  isActive: PropTypes.string.isRequired,
};

export default QuizzResults;
