import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FeedBackResultContainer,
  FeedBackTitleBox,
  FeedBackTitle,
  FeedBackEyeIcon,
  FeedBackListContainer,
  FeedBackListInfos,
  FeedBackColumnName,
  FeedBackListBox,
  FeedBackLine,
  FeedbackLineNumber,
  FeedBackUserText,
  FeedBackCopy,
  FeedBackTime,
  FeedbackCopyIcon,
  FeedbackCopyBox,
  FeedBackSeeMore,
  FeedbackTotalsResults,
} from "../../styles/styledComponents/global/Results.sc";
import keyGenerator from "../../helper/keyGenerator";
import eyeIcon from "../../styles/assets/icons/eye-white.svg";
import copyIcon from "../../styles/assets/icons/copy-white.svg";
import eyeIconDisabled from "../../styles/assets/icons/eye-white-disabled.svg";
import buildDate from "../../helper/buildDate";

const FeedBackResults = ({ feedbacks, question, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FeedBackResultContainer>
      <FeedBackTitleBox>
        <FeedBackTitle>{question}</FeedBackTitle>
        <FeedBackEyeIcon src={isVisible ? eyeIcon : eyeIconDisabled} />
      </FeedBackTitleBox>

      <FeedBackListContainer>
        <FeedbackTotalsResults>{`Total feedbacks : ${feedbacks.length}`}</FeedbackTotalsResults>
        {isOpen && (
          <FeedBackSeeMore onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? `Fold the list` : `Unfold the list`}
          </FeedBackSeeMore>
        )}
        <FeedBackListInfos>
          <FeedBackColumnName>feedback</FeedBackColumnName>
          <FeedBackColumnName>date</FeedBackColumnName>
        </FeedBackListInfos>
        <FeedBackListBox isOpen={isOpen} needScroll={feedbacks.length > 15}>
          {feedbacks.map((feedback, index) => {
            return (
              <FeedBackLine
                odd={index % 2 === 0}
                key={keyGenerator(`${feedback.date}${feedback.text}${index}`)}
              >
                <FeedbackLineNumber>{`#${index}`}</FeedbackLineNumber>
                <FeedBackUserText>{feedback.text}</FeedBackUserText>
                <FeedbackCopyBox
                  onClick={() => {
                    navigator.clipboard.writeText(feedback.text);
                  }}
                >
                  <FeedbackCopyIcon src={copyIcon} />
                  <FeedBackCopy>Copy feedback</FeedBackCopy>
                </FeedbackCopyBox>
                <FeedBackTime>
                  {buildDate(new Date(feedback.date))}
                </FeedBackTime>
              </FeedBackLine>
            );
          })}
        </FeedBackListBox>
      </FeedBackListContainer>
      {feedbacks.length > 15 && (
        <FeedBackSeeMore onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? `Fold the list` : `Unfold the list`}
        </FeedBackSeeMore>
      )}
    </FeedBackResultContainer>
  );
};

/* FeedBackResults.defaultProps = {
  position: undefined,
}; */

FeedBackResults.propTypes = {
  feedbacks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  question: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default FeedBackResults;
