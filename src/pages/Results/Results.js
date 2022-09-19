import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Footer from "../../components/Navigation/Footer";
import Header from "../../components/Navigation/Header";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import {
  BoldText,
  LightText,
  TotalInfo,
  ResponseList,
  ElementBox,
  ModulesContainer,
  IsRightIcon,
  Section,
  PercentBox,
  IconBox,
  NavBarContainer,
  NavElement,
  NavLine,
  ActionHeadContainer,
  BreadCrumBox,
  HomeIcon,
  BreadCrumLink,
  BreadCrumArrow,
  ButtonImage,
  ButtonsAndInfosContainer,
  ResultTitleBox,
  ResultTitleIcon,
} from "../../styles/styledComponents/global/Results.sc";
import {
  H1,
  FormTitle,
  MainTitleBox,
} from "../../styles/styledComponents/global/Titles.sc";
import pen from "../../styles/assets/icons/pen-violet.svg";
import checkIcon from "../../styles/assets/icons/check-circle-green.svg";
import surveyIcon from "../../styles/assets/icons/opinion-white-no-circle.svg";
import crossIcon from "../../styles/assets/icons/cross-circle-red.svg";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import homeIcon from "../../styles/assets/icons/home.svg";
import { fetchContent } from "../../store/actions/thunk/ArticlesActions.thunk";
import { fetchManifesto } from "../../store/actions/thunk/ManifestoActions.thunk";
import eyeIcon from "../../styles/assets/icons/eye-white.svg";
import eyeIconDisabled from "../../styles/assets/icons/eye-white-disabled.svg";
import { IsVisibleIcon } from "../../styles/styledComponents/editor/modules/Modules.sc";
import { cleanContentState } from "../../store/actions/commonsActions";
import { consolePage } from "../../helper/consoleStyles";
import { getData, percentage } from "../../helper/resultsHelper";
import { openPreview } from "../../helper/fieldsHelper";
import { fetchFeedBackResults } from "../../store/actions/thunk/ModulesActions.thunk";
import keyGenerator from "../../helper/keyGenerator";
import FeedBackResults from "./FeedbackResults";

// this is the main page of result section, it is used to display results from quizz, feedback, reaction comming from users of the front website

const Results = () => {
  console.log("%cPAGE: QUIZZ RESULTS", `${consolePage}`);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const [data, setData] = useState([]);

  const [isActive, setIsActive] = useState("opinions");
  const dispatch = useDispatch();
  const { articleId, manifestoId, manifestoLang } = useParams();
  const history = useHistory();

  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { title, lang, slug, feedBackResults } = mainInformationState;

  const { modulesList } = modulesState;

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { manifestoData } = manifestoState;

  useEffect(() => {
    setData([]);

    getData(
      articleId,
      modulesList,
      manifestoData,
      manifestoId,
      setData,
      isActive
    );
  }, [isActive, modulesList, manifestoData]);

  useEffect(() => {
    dispatch(fetchFeedBackResults(articleId));

    setData([]);
    if (!manifestoId) {
      dispatch(fetchContent(articleId));
    }

    if (manifestoId) {
      dispatch(fetchManifesto(manifestoLang));
    }
  }, []);

  return (
    <PageContainer position="absolute">
      <Header />

      {/* Article Edit link, preview  and info */}
      {/* title */}

      <ModulesContainer>
        {/* Fil d'ariane */}
        <ActionHeadContainer>
          <Link to="/editor">
            <BreadCrumBox>
              <HomeIcon src={homeIcon} />
              <BreadCrumLink>Content list</BreadCrumLink>
              <BreadCrumArrow src={arrow} />
            </BreadCrumBox>
          </Link>

          <Link to={`/editor/${articleId}`}>
            <BreadCrumBox>
              <BreadCrumLink>{title}</BreadCrumLink>
              <BreadCrumArrow src={arrow} />
            </BreadCrumBox>
          </Link>

          <BreadCrumBox>
            <BreadCrumLink selected>Results</BreadCrumLink>
          </BreadCrumBox>
        </ActionHeadContainer>

        <MainTitleBox resultTitle>
          <ButtonsAndInfosContainer>
            <Button
              modifyButton
              onClick={() => {
                dispatch(cleanContentState());
                history.push(`/editor/${articleId}`);
              }}
            >
              <ButtonImage src={pen} />
              article edition
            </Button>

            <Button
              previewArticleButton
              onClick={() => {
                openPreview(lang, slug);
              }}
            >
              preview article
            </Button>
          </ButtonsAndInfosContainer>

          <ResultTitleBox margin="32px 0">
            <ResultTitleIcon src={surveyIcon} />
            <H1>{`OPINIONS RESULTS - ${title}`}</H1>
          </ResultTitleBox>
        </MainTitleBox>
        <NavBarContainer>
          <NavElement
            onClick={() => {
              setIsActive("opinions");
            }}
            isActive={isActive === "opinions"}
          >
            OPINIONS
          </NavElement>
          <NavElement
            onClick={() => {
              setIsActive("feedback");
            }}
            isActive={isActive === "feedback"}
          >
            FEEDBACK
          </NavElement>
          <NavElement
            onClick={() => {
              setIsActive("reaction");
            }}
            isActive={isActive === "reaction"}
          >
            REACTION
          </NavElement>
          <NavLine />
        </NavBarContainer>

        {isActive === "feedback" &&
          feedBackResults.map((result) => {
            return (
              <FeedBackResults
                key={keyGenerator(result.feedbackId)}
                feedbacks={result.feedbacks}
                question={result.question}
                isVisible={result.isVisible}
              />
            );
          })}

        {(isActive === "reaction" || isActive === "opinions") &&
          isActive !== "feedback" &&
          data.map((question) => {
            return (
              <Section key={question.id} isOpen>
                <FormTitle>{question.question || "Empty question"}</FormTitle>
                <IsVisibleIcon
                  src={question.isVisible ? eyeIcon : eyeIconDisabled}
                />
                {question.question !== "" && (
                  <>
                    <TotalInfo>{`Total = ${question.participantsCount} answers`}</TotalInfo>
                    <ResponseList>
                      {question.answers.map((answer) => {
                        return (
                          <ElementBox key={`${answer.uuid}`}>
                            <PercentBox>
                              <BoldText>
                                {answer.text
                                  ? `${String.fromCharCode(
                                      8226
                                    )}${String.fromCharCode(160)}${percentage(
                                      answer.responsesCount,
                                      question.participantsCount
                                    )}%`
                                  : "Empty"}
                              </BoldText>
                              <LightText>
                                {`${String.fromCharCode(160)}(${
                                  answer.responsesCount
                                })`}
                              </LightText>
                            </PercentBox>
                            {answer.text !== "" && question.showRight && (
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
                            <LightText>
                              {answer.text || "Empty response"}
                            </LightText>
                          </ElementBox>
                        );
                      })}
                    </ResponseList>
                  </>
                )}
              </Section>
            );
          })}
      </ModulesContainer>

      <Footer />
    </PageContainer>
  );
};

export default Results;
