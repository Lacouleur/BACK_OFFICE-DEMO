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
import quizzIcon from "../../../../styles/assets/icons/quizz-dark.svg";
import imageIcon from "../../../../styles/assets/icons/image-black.svg";
import crossIcon from "../../../../styles/assets/icons/cross-white.svg";
import ctaIcon from "../../../../styles/assets/icons/cta.svg";
import {
  ModuleBox,
  ModulesContainer,
  ModuleText,
  ModuleIcon,
  Close,
} from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";
import { setNewModule } from "../../../../store/actions/moduleActions";
import keyGenerator from "../../../../helper/keyGenerator";

const ModuleCreator = ({ setIsOpen }) => {
  const DefaultModules = [
    { type: "text", icon: textIcon },
    { type: "opinion", icon: quizzIcon },
    { type: "image", icon: imageIcon },
    { type: "cta", icon: ctaIcon },
  ];

  const moduleRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    moduleRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  return (
    <>
      <SectionBox ref={moduleRef} isOpen>
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
