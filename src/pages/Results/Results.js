import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Footer from "../../components/Navigation/Footer";
import Header from "../../components/Navigation/Header";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import PageContainer from "../../styles/styledComponents/global/PageContainer.sc";
import {
  ModulesContainer,
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
  NoElement,
} from "../../styles/styledComponents/global/Results.sc";
import {
  H1,
  MainTitleBox,
} from "../../styles/styledComponents/global/Titles.sc";
import pen from "../../styles/assets/icons/pen-violet.svg";
import surveyIcon from "../../styles/assets/icons/opinion-white-no-circle.svg";
import arrow from "../../styles/assets/icons/arrow-left.svg";
import homeIcon from "../../styles/assets/icons/home.svg";
import { fetchContent } from "../../store/actions/thunk/ArticlesActions.thunk";
import { fetchManifesto } from "../../store/actions/thunk/ManifestoActions.thunk";

import {
  cleanContentState,
  cleanPageState,
} from "../../store/actions/commonsActions";
import { consolePage } from "../../helper/consoleStyles";
import { getData } from "../../helper/resultsHelper";
import { openPreview } from "../../helper/fieldsHelper";
import { fetchFeedBackResults } from "../../store/actions/thunk/ModulesActions.thunk";
import keyGenerator from "../../helper/keyGenerator";
import FeedBackResults from "./FeedbackResults";
import { fetchPage } from "../../store/actions/thunk/PageActions.thunk";
import QuizzResults from "./QuizzResults";

// this is the main page of result section, it is used to display results from quizz, feedback, reaction comming from users of the front website

const Results = () => {
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState("opinions");
  const dispatch = useDispatch();
  const { resourceId, manifestoId, manifestoLang, resultType } = useParams();
  const history = useHistory();
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { title, lang, slug, feedBackResults } =
    resultType === "page" ? PageMainInformationState : MainInformationState;

  const { modulesList } = modulesState;

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { manifestoData } = manifestoState;

  useEffect(() => {
    setData([]);
    getData(
      resourceId,
      modulesList,
      manifestoData,
      manifestoId,
      setData,
      isActive
    );
  }, [isActive, modulesList, manifestoData]);

  useEffect(() => {
    // Just indicative line to keep clear logs
    console.log(`%cPAGE: QUIZZ RESULTS`, `${consolePage}`);

    dispatch(fetchFeedBackResults(resourceId, resultType));

    if (!manifestoId && resultType === "article") {
      dispatch(fetchContent(resourceId));
    }

    if (!manifestoId && resultType === "page") {
      dispatch(fetchPage(resourceId));
    }

    if (manifestoId) {
      dispatch(fetchManifesto(manifestoLang));
    }
  }, []);

  return (
    <PageContainer position="absolute">
      <Header />

      {/* Article Edit link, preview  and info */}
      {/* Module Header */}

      <ModulesContainer>
        {/* Bread Crumb */}
        <ActionHeadContainer>
          <Link to={resultType === "page" ? "/pages" : "/dashboard"}>
            <BreadCrumBox>
              <HomeIcon src={homeIcon} />
              <BreadCrumLink>
                {resultType === "page" ? "Page list" : "Content List"}
              </BreadCrumLink>
              <BreadCrumArrow src={arrow} />
            </BreadCrumBox>
          </Link>

          <Link
            to={
              resultType === "page"
                ? `/page-editor/${resourceId}`
                : `/editor/${resourceId}`
            }
            onClick={() => {
              dispatch(cleanContentState());
              dispatch(cleanPageState());
            }}
          >
            <BreadCrumBox>
              <BreadCrumLink>{title}</BreadCrumLink>
              <BreadCrumArrow src={arrow} />
            </BreadCrumBox>
          </Link>

          <BreadCrumBox>
            <BreadCrumLink selected>Results</BreadCrumLink>
          </BreadCrumBox>
        </ActionHeadContainer>

        {/* Module Title */}
        <MainTitleBox resultTitle>
          <ButtonsAndInfosContainer>
            {/* Edition Button */}
            <Button
              modifyButton
              onClick={() => {
                dispatch(cleanContentState());
                history.push(
                  resultType === "page"
                    ? `/page-editor/${resourceId}`
                    : `/editor/${resourceId}`
                );
              }}
            >
              <ButtonImage src={pen} />
              {resultType === "page" ? "Page Edition" : "Article Edition"}
            </Button>

            {/* Preview Button */}
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

        {/* Tabs menu */}
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

        {/* Feedback results list component */}
        {isActive === "feedback" &&
          feedBackResults.length !== 0 &&
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

        {/* Reaction & Opinions results component */}
        {(isActive === "reaction" || isActive === "opinions") &&
          data.length !== 0 &&
          data.map((question) => {
            return (
              <QuizzResults
                key={question.id}
                id={question.id}
                question={question.question}
                isVisible={question.isVisible}
                participantsCount={question.participantsCount}
                answers={question.answers}
                showRight={question.showRight}
                isActive={isActive}
              />
            );
          })}
        {(isActive === "reaction" || isActive === "opinions") &&
          data.length === 0 && (
            <NoElement>{`- No ${isActive} to display yet -`}</NoElement>
          )}
        {isActive === "feedback" && feedBackResults.length === 0 && (
          <NoElement>{`- No ${isActive} to display yet -`}</NoElement>
        )}
      </ModulesContainer>

      {/*       <Footer /> */}
    </PageContainer>
  );
};

export default Results;
