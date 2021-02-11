/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
import crossIcon from "../../../../styles/assets/icons/cross-white.svg";
import Field from "../../Field";
import { Close } from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";

const TextModule = ({ module, setModulesList }) => {
  const textModuleRef = useRef(null);

  useEffect(() => {
    textModuleRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <SectionBox ref={textModuleRef}>
        <Close
          src={crossIcon}
          onClick={() => {
            setModulesList((currentList) => {
              let newList = [];
              currentList.find((searchedModule, index) => {
                if (searchedModule?.id === module?.id) {
                  newList = currentList.splice(index, 1);
                }
                newList = [...currentList];
              });
              return newList;
            });
          }}
        />
        <SectionTitle>
          <TitleIcon src={homeIcon} />
          <FormTitle>
            Text Block
            {module.id}
          </FormTitle>
        </SectionTitle>
        <Field
          placeholder="textBlock"
          fieldType="textarea"
          name="text"
          section="text"
          maxlength="155"
        />
      </SectionBox>
    </>
  );
};

TextModule.propTypes = {
  module: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setModulesList: PropTypes.func.isRequired,
};
export default TextModule;
