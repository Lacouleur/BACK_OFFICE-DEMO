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
  NavBarContainer,
  NavElement,
  NavLine,
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
import { getData, percentage } from "../helper/resultsHelper";

const Results = () => {
  console.log("%cPAGE: QUIZZ RESULTS", `${consolePage}`);
  const modulesState = useSelector(({ modulesReducer }) => modulesReducer);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState("opinions");
  const dispatch = useDispatch();
  const { articleId, manifestoId, manifestoLang } = useParams();
  const history = useHistory();

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

        <NavBarContainer>
          <NavElement
            onClick={() => {
              setIsActive("opinions");
            }}
            isActive={isActive === "opinions"}
          >
            OPINIONS
          </NavElement>
          {/*    <NavElement
            onClick={() => {
              setIsActive("feedback");
            }}
            isActive={isActive === "feedback"}
          >
            FEEDBACK
          </NavElement> */}
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
