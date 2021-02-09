import React from "react";
import PropTypes from "prop-types";
import {
  TitleIcon,
  FormTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import homeIcon from "../../../styles/assets/icons/home.svg";
import {
  SectionBox,
  SectionTitle,
} from "../../../styles/styledComponents/editor/Sections.sc";
import {
  ModuleBlock,
  ModuleImg,
  ModulesListContainer,
} from "../../../styles/styledComponents/editor/modules/ModuleCreator.sc";
import keyGenerator from "../../../helper/keyGenerator";
import buttonIcon from "../../../styles/assets/icons/button.svg";
import surveyIcon from "../../../styles/assets/icons/survey.svg";
import quizIcon from "../../../styles/assets/icons/quiz.svg";
import textIcon from "../../../styles/assets/icons/text.svg";

const ModuleCreator = ({ listSetter, editorStatus }) => {
  const modulesList = [
    { name: "text", image: textIcon },
    { name: "survey", image: surveyIcon },
    { name: "quiz", image: quizIcon },
    { name: "button", image: buttonIcon },
  ];

  return (
    <>
      <SectionBox>
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>SELECT NEW MODULE</FormTitle>
        </SectionTitle>
        <ModulesListContainer>
          {modulesList &&
            modulesList.map((module, index) => {
              return (
                <ModuleBlock
                  onClick={() => {
                    editorStatus(false);
                    listSetter((list) => [...list, module.name]);
                  }}
                  title={module.name}
                  key={keyGenerator(index)}
                >
                  <ModuleImg src={module.image} />
                </ModuleBlock>
              );
            })}
        </ModulesListContainer>
      </SectionBox>
    </>
  );
};
/* ModuleCreator.defaultProps = {}; */

ModuleCreator.propTypes = {
  listSetter: PropTypes.func.isRequired,
  editorStatus: PropTypes.func.isRequired,
};

export default ModuleCreator;
