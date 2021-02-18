/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import JoditEditor from "jodit-react";
import {
  TitleIcon,
  FormTitle,
} from "../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
} from "../../../../styles/styledComponents/editor/Sections.sc";
import crossIcon from "../../../../styles/assets/icons/cross-white.svg";
import textIcon from "../../../../styles/assets/icons/text.svg";
import { Close } from "../../../../styles/styledComponents/editor/modules/ModuleCreator.sc";
import { CKWraper } from "../../../../styles/styledComponents/editor/modules/TextModule.sc";

const TextModule = ({ module, setModulesList, setValues, values, edit }) => {
  const textModuleRef = useRef(null);
  const joditEditor = useRef(null);
  const [textModuleValue, setTextModuleValue] = useState("");

  useEffect(() => {
    textModuleRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    /*    textModuleRef.current.scrollIntoView({ behavior: "smooth" });
    if (joditEditor?.current?.value !== textModuleValue) {
      joditEditor.current.value = textModuleValue;
    } */
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
          <TitleIcon src={textIcon} />
          <FormTitle>Text module</FormTitle>
        </SectionTitle>
        <CKWraper>
          <JoditEditor
            ref={joditEditor}
            /* value={values.components[0].text} */
            onChange={(e) => {
              setValues({
                ...values,
                components: [{ type: "text", text: `${e}` }],
              });
              console.log(e);
            }}
          />
        </CKWraper>
      </SectionBox>
    </>
  );
};

TextModule.defaultProps = {
  edit: undefined,
};

TextModule.propTypes = {
  module: PropTypes.shape({
    type: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setModulesList: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape([]).isRequired,
  edit: PropTypes.shape({}),
};
export default TextModule;
