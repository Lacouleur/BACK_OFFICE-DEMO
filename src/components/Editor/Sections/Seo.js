import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import seoIcon from "../../../styles/assets/icons/seo.svg";
import Field from "../Field";
import {
  SectionBox,
  ExampleSeo,
  SectionTitle,
  CollapsedText,
  Gradient,
} from "../../../styles/styledComponents/editor/Sections.sc";
import exampleSeoImg from "../../../styles/assets/icons/exampleSeo.svg";
import { ExampleBox } from "../../../styles/styledComponents/editor/Seo.sc";
import { checkAndSend } from "../../../store/actions/clientActions";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import {
  setErrorSlug,
  setErrorTitle,
} from "../../../store/actions/mainInformationActions";

const Seo = () => {
  const seoRef = useRef();
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const { isEditing, articleId, title: mainTitle, slug } = MainInformationState;
  const { title: seoTitle, description, isChanged } = seoState;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function onClickOutside() {
    setIsOpen(false);
    if (!isEditing && isChanged) {
      dispatch(checkAndSend());
    } else if (isEditing && isChanged) {
      dispatch(checkAndSend("update", articleId));
    }
  }
  useClickOutside(seoRef, onClickOutside);

  return (
    <SectionBox
      onClick={() => {
        if (isEditing) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
          if (!mainTitle) {
            dispatch(setErrorTitle(true));
          }
          if (!slug) {
            dispatch(setErrorSlug(true));
          }
        }
      }}
      ref={seoRef}
      isOpen={isOpen}
    >
      {!isOpen && <Gradient />}
      <SectionTitle>
        <TitleIcon src={seoIcon} />
        <FormTitle>SEO</FormTitle>
      </SectionTitle>
      {!isOpen && (
        <>
          <CollapsedText>
            {seoTitle || "Click on the block to start editing SEO infos"}
          </CollapsedText>
          <CollapsedText>{description}</CollapsedText>
        </>
      )}
      {isOpen && (
        <>
          <Field
            placeholder="Title"
            name="title"
            section="seo"
            edit={isEditing ? seoTitle : undefined}
          />
          <Field
            placeholder="Description"
            fieldType="textarea"
            name="description"
            section="seo"
            maxlength="155"
            infos="Maximum 155 characters & avoid tab or carrige return"
            edit={isEditing ? description : undefined}
          />
          <ExampleBox>
            <FieldTitle>Example</FieldTitle>
            <ExampleSeo src={exampleSeoImg} />
          </ExampleBox>
        </>
      )}
    </SectionBox>
  );
};

Seo.defaultProps = {
  edit: undefined,
};

Seo.propTypes = {
  edit: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Seo;
