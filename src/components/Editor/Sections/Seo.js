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

const Seo = ({ values, setValues, edit }) => {
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
        setValues={setValues}
        values={values}
        edit={edit ? edit.title : undefined}
      />
      <Field
        placeholder="Description"
        fieldType="textarea"
        name="description"
        section="seo"
        maxlength="155"
        infos="Maximum 155 characters & avoid tab or carrige return"
        setValues={setValues}
        values={values}
        edit={edit ? edit.description : undefined}
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
  values: PropTypes.shape({}).isRequired,
  setValues: PropTypes.func.isRequired,
  edit: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Seo;
