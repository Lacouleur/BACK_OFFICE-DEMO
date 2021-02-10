import React from "react";
import PropTypes from "prop-types";
import {
  DeleteModule,
  DeleteIcon,
  SectionBox,
  SectionTitle,
} from "../../../../styles/styledComponents/editor/Sections.sc";
import {
  TitleIcon,
  FormTitle,
} from "../../../../styles/styledComponents/global/Titles.sc";
import textIcon from "../../../../styles/assets/icons/text.svg";
import trashIcon from "../../../../styles/assets/icons/trash.svg";

const TextModule = (listSetter) => {
  return (
    <>
      <SectionBox>
        <SectionTitle>
          <TitleIcon src={textIcon} />
          <FormTitle>Text</FormTitle>
        </SectionTitle>
        <DeleteModule onClick={listSetter((list) => [...list, module.name])}>
          <DeleteIcon src={trashIcon} />
        </DeleteModule>
      </SectionBox>
    </>
  );
};

TextModule.propTypes = {
  listSetter: PropTypes.func.isRequired,
};

export default TextModule;
