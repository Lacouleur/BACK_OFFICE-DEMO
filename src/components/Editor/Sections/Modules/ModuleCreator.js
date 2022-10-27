import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
import highlightIcon from "../../../../styles/assets/icons/highlight.svg";
import collectionIcon from "../../../../styles/assets/icons/collection-black.svg";
import feedBackIcon from "../../../../styles/assets/icons/talkbubbles-black.svg";
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
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { isPage } = PageMainInformationState;

  const DefaultModules = [];

  if (isPage) {
    DefaultModules.push(
      { type: "text", icon: textIcon, name: "TEXT", editor: "page" },
      { type: "cta-button", icon: ctaIcon, name: "CTA", editor: "page" },
      {
        type: "collection",
        icon: collectionIcon,
        name: "COLLECTION",
        editor: "page",
      },
      {
        type: "feedback",
        icon: feedBackIcon,
        name: "FEEDBACK",
        editor: "page",
      },
      { type: "opinion", icon: quizzIcon, name: "OPINION", editor: "page" },
      { type: "image", icon: imageIcon, name: "IMAGE", editor: "page" },
      {
        type: "featured",
        icon: highlightIcon,
        name: "HIGHLIGHT",
        editor: "page",
      }
    );
  } else {
    DefaultModules.push(
      { type: "text", icon: textIcon, name: "TEXT", editor: "article" },
      { type: "opinion", icon: quizzIcon, name: "OPINION", editor: "article" },
      { type: "image", icon: imageIcon, name: "IMAGE", editor: "article" },
      { type: "cta-button", icon: ctaIcon, name: "CTA", editor: "article" },
      {
        type: "feedback",
        icon: feedBackIcon,
        name: "FEEDBACK",
        editor: "article",
      }
    );
  }

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
                  dispatch(setNewModule(module));
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

ModuleCreator.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
export default ModuleCreator;
