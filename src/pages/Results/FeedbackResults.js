import React, { useEffect, useRef, useState } from "react";
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
import useClickOutside from "../../helper/cutomHooks/useClickOutside";

const FeedBackResults = ({ feedbacks, question, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lineIsOpen, setLineIsOpen] = useState("");
  const listBoxRef = useRef();
  // const feedbacks = [
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant mais, j'aurais aimé avoir ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant mais, j'aurais aimé avoir ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. Duis euismod bibendum eros vitae tempus. Suspendisse semper aliquet hendrerit. Suspendisse in nibh lobortis, egestas odio eget, efficitur nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean elementum aliquam nibh ac tempus. Integer sagittis accumsan eros ac imperdiet. Proin a nibh orci. Mauris sit amet dolor ultricies, bibendum libero ut, hendrerit eros. Proin id velit molestie, pretium arcu ac, lacinia ipsum. Fusce et dolor sed mi sollicitudin finibus. Suspendisse non turpis vitae leo gravida maximus quis sit amet dui. Suspendisse massa massa, pellentesque ut velit vitae, imperdiet dapibus sapien. L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text: "L'article est très intéressant mais, j'aurais aimé avoir ",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  //   {
  //     pseudonym: "Anonymous",
  //     text:
  //       "L'article est très intéressant mais, j'aurais aimé avoir plus de détail sur certaines partie, comme la fonte de glaces 5",
  //     date: "2022-09-12T08:35:06.585Z",
  //   },
  // ];

  function onClickOutside() {
    setLineIsOpen("false");
  }
  useClickOutside(listBoxRef, onClickOutside);

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
        <FeedBackListBox
          ref={listBoxRef}
          isOpen={isOpen}
          needScroll={feedbacks.length > 15}
        >
          {feedbacks.map((feedback, index) => {
            return (
              <FeedBackLine
                onClick={() => setLineIsOpen(`${index + feedback.text}`)}
                lineIsOpen={lineIsOpen === `${index + feedback.text}`}
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
