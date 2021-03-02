import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
} from "../../../styles/styledComponents/editor/Sections.sc";
import exampleSeoImg from "../../../styles/assets/icons/exampleSeo.svg";
import { ExampleBox } from "../../../styles/styledComponents/editor/Seo.sc";

const Seo = () => {
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const { title: seoTitle, description, isEditing } = seoState;

  return (
    <SectionBox>
      <SectionTitle>
        <TitleIcon src={seoIcon} />
        <FormTitle>SEO</FormTitle>
      </SectionTitle>
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
