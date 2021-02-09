/* eslint-disable consistent-return */
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TitleIcon,
  FormTitle,
} from "../../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../../styles/assets/icons/home.svg";
import {
  SectionBox,
  SectionTitle,
} from "../../../../styles/styledComponents/editor/Sections.sc";
import textIcon from "../../../../styles/assets/icons/text.svg";
import quizIcon from "../../../../styles/assets/icons/quiz.svg";
import surveyIcon from "../../../../styles/assets/icons/survey.svg";
import buttonIcon from "../../../../styles/assets/icons/button.svg";
import crossIcon from "../../../../styles/assets/icons/cross-white.svg";
import keyGenerator from "../../../../helper/keyGenerator";
import TextModule from "./TextModule";
import {
  ModuleBox,
  ModulesContainer,
  ModuleText,
  ModuleIcon,
  Close,
} from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";

const ModuleCreator = ({ setModulesList, editorStatus }) => {
  const DefaultModules = [
    { name: "text", icon: textIcon, id: keyGenerator("txt") },
    { name: "quiz", icon: quizIcon, id: keyGenerator("quiz") },
    { name: "survey", icon: surveyIcon, id: keyGenerator("survey") },
    { name: "button", icon: buttonIcon, id: keyGenerator("button") },
  ];

  const moduleRef = useRef(null);

  useEffect(() => {
    moduleRef.current.scrollIntoView();
  }, []);

  return (
    <>
      <SectionBox ref={moduleRef}>
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>CREAT NEW MODULE</FormTitle>
        </SectionTitle>
        <Close src={crossIcon} onClick={() => editorStatus(false)} />
        <ModulesContainer>
          {DefaultModules &&
            DefaultModules.map((module) => (
              <ModuleBox
                key={module.id}
                onClick={() => {
                  editorStatus(false);
                  if (module.name === "text") {
                    setModulesList((currentList) => [
                      ...currentList,
                      {
                        id: module.id,
                        component: (
                          <TextModule
                            key={keyGenerator("txt")}
                            module={module}
                            setModulesList={setModulesList}
                          />
                        ),
                      },
                    ]);
                  }
                }}
              >
                <ModuleIcon src={module.icon} />
                <ModuleText>{module.name}</ModuleText>
              </ModuleBox>
            ))}
        </ModulesContainer>
      </SectionBox>
    </>
  );
};

/* HomeScreen.defaultProps = {}; */

ModuleCreator.propTypes = {
  setModulesList: PropTypes.func.isRequired,
  editorStatus: PropTypes.func.isRequired,
};
export default ModuleCreator;
