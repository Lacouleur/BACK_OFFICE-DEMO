import React from "react";
import PropTypes from "prop-types";
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

const Seo = ({ values, setValues }) => {
  return (
    <SectionBox>
      <SectionTitle>
        <TitleIcon src={seoIcon} />
        <FormTitle>SEO</FormTitle>
      </SectionTitle>
      <FieldTitle>Text and category</FieldTitle>
      <Field
        placeholder="Title"
        name="title"
        section="seo"
        setter={setValues}
        values={values}
      />
      <Field
        placeholder="Description"
        fieldType="textarea"
        name="description"
        section="seo"
        maxlength="155"
        infos="Maximum 155 characters & avoid tab or carrige return"
        setter={setValues}
        values={values}
      />
      <ExampleBox>
        <FieldTitle>Example</FieldTitle>
        <ExampleSeo src={exampleSeoImg} />
      </ExampleBox>
    </SectionBox>
  );
};

Seo.propTypes = {
  values: PropTypes.shape({}).isRequired,
  setValues: PropTypes.func.isRequired,
};

export default Seo;
