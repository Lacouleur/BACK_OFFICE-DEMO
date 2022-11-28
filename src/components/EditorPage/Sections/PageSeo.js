import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleIcon,
  FormTitle,
  FieldTitle,
} from "../../../styles/styledComponents/global/Titles.sc";
import seoIcon from "../../../styles/assets/icons/seo.svg";
import Field from "../../Editor/Field";
import {
  SectionBox,
  ExampleSeo,
  SectionTitle,
  CollapsedText,
  Gradient,
} from "../../../styles/styledComponents/editor/Sections.sc";
import exampleSeoImg from "../../../styles/assets/icons/exampleSeo.svg";
import { ExampleBox } from "../../../styles/styledComponents/editor/Seo.sc";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";
import { pageCheckAndSend } from "../../../store/actions/thunk/PageActions.thunk";

const PageSeo = () => {
  const seoRef = useRef();
  const pageSeoState = useSelector(({ pageSeoReducer }) => pageSeoReducer);
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { title: seoTitle, description, isChanged } = pageSeoState;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { pageId } = PageMainInformationState;

  function onClickOutside() {
    setIsOpen(false);
    if (isChanged) {
      dispatch(pageCheckAndSend("update", pageId));
    }
  }

  useClickOutside(seoRef, onClickOutside);

  return (
    <SectionBox
      onClick={() => {
        setIsOpen(true);
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
            displayName="Title"
            section="pageSeo"
            edit={seoTitle || undefined}
          />
          <Field
            placeholder="Description"
            fieldType="textarea"
            name="description"
            displayName="Description"
            section="pageSeo"
            maxlength="155"
            infos="Maximum 155 characters & avoid tab or carrige return"
            edit={description || undefined}
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

PageSeo.defaultProps = {
  edit: undefined,
};

PageSeo.propTypes = {
  edit: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default PageSeo;
