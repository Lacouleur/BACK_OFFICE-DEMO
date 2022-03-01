import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";
import { ButtonIcon } from "../styles/styledComponents/contentList/Content.sc";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import {
  BoldText,
  LightText,
  TotalInfo,
  ResponseList,
  ElementBox,
  ModulesContainer,
  returnButton,
  modifyButton,
  ReturnText,
  IsRightIcon,
  Section,
  PercentBox,
  IconBox,
} from "../styles/styledComponents/global/Results.sc";
import {
  MainTitleBox,
  H1,
  FormTitle,
} from "../styles/styledComponents/global/Titles.sc";
import pen from "../styles/assets/icons/pen.svg";
import backArrow from "../styles/assets/icons/arrow-left.svg";
import { BackIcon } from "../styles/styledComponents/editor/ActionBar.sc";
import checkIcon from "../styles/assets/icons/check-circle-green.svg";
import crossIcon from "../styles/assets/icons/cross-circle-red.svg";
import { fetchContent } from "../store/actions/thunk/ArticlesActions.thunk";
import { fetchManifesto } from "../store/actions/thunk/ManifestoActions.thunk";
import eyeIcon from "../styles/assets/icons/eye-white.svg";
import eyeIconDisabled from "../styles/assets/icons/eye-white-disabled.svg";
import { IsVisibleIcon } from "../styles/styledComponents/editor/modules/Modules.sc";
import { cleanContentState } from "../store/actions/commonsActions";
import { consolePage } from "../helper/consoleStyles";

const Results = () => {
  console.log("%cPAGE => QUIZZ RESULTS", `${consolePage}`);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { articleId, manifestoId, manifestoLang } = useParams();
  const history = useHistory();

  const { modulesList } = modulesState;

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { manifestoData } = manifestoState;

  function getData() {
    const storedData = [];
    if (articleId) {
      modulesList.map((module) => {
        if (module.type === "opinion" && articleId) {
          storedData.push({
            id: module.uuid,
            question: module.question,
            participantsCount: module.participantsCount,
            answers: module.answers,
            showRight: module.showRight,
            isVisible: module.isVisible,
          });
        }
        return null;
      });
    }

    if (manifestoData.components && manifestoId) {
      manifestoData.components.map((module) => {
        if (module.type === "opinion") {
          storedData.push({
            id: module.uuid,
            question: module.question,
            participantsCount: module.participantsCount,
            answers: module.answers,
            showRight: module.showRight,
            isVisible: module.isVisible,
          });
        }
        return null;
      });
    }
    setData(storedData);
  }

  function percentage(partialValue, totalValue) {
    const calc = Math.floor((100 * partialValue) / totalValue);
    if (Number.isNaN(calc)) {
      return "0";
    }
    return calc;
  }

  useEffect(() => {
    setData([]);
    getData();
  }, [modulesList, manifestoData]);

  useEffect(() => {
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
      <Button
        type="button"
        styles={returnButton}
        onClick={() => history.push(`/dashboard`)}
      >
        <BackIcon src={backArrow} />
        <ReturnText>CONTENT LIST</ReturnText>
      </Button>
      <ModulesContainer>
        <MainTitleBox margin="32px 0">
          <H1>OPINIONS RESULTS</H1>
          <Button
            styles={modifyButton}
            onClick={() => {
              dispatch(cleanContentState());
              history.push(`/editor/${articleId}`);
            }}
          >
            Modify
            <ButtonIcon src={pen} />
          </Button>
        </MainTitleBox>

        {data.map((question) => {
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
                              <IsRightIcon
                                src={answer.right ? checkIcon : crossIcon}
                              />
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
