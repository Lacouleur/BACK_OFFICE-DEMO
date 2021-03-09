import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
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
import {
  ModuleBox,
  ModulesContainer,
  ModuleText,
  ModuleIcon,
  Close,
} from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";
import { setNewModule } from "../../../../store/actions/moduleCreatorActions";
import keyGenerator from "../../../../helper/keyGenerator";

const ModuleCreator = ({ setIsOpen }) => {
  const DefaultModules = [
    { type: "text", icon: textIcon },
    { type: "quiz", icon: quizIcon },
    { type: "survey", icon: surveyIcon },
    { type: "button", icon: buttonIcon },
  ];

  const moduleRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    moduleRef.current.scrollIntoView();
  }, []);

  return (
    <>
      <SectionBox ref={moduleRef}>
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>CREATE NEW MODULE</FormTitle>
        </SectionTitle>
        <Close src={crossIcon} onClick={() => setIsOpen(false)} />
        <ModulesContainer>
          {DefaultModules &&
            DefaultModules.map((module) => (
              <ModuleBox
                key={keyGenerator(module.type)}
                onClick={() => {
                  setIsOpen(false);
                  dispatch(setNewModule(module.type));
                }}
              >
                <ModuleIcon src={module.icon} />
                <ModuleText>{module.type}</ModuleText>
              </ModuleBox>
            ))}
        </ModulesContainer>
      </SectionBox>
    </>
  );
};

ModuleCreator.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
export default ModuleCreator;
