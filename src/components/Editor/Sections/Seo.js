import React, { useRef } from "react";
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
} from "../../../styles/styledComponents/editor/Sections.sc";
import exampleSeoImg from "../../../styles/assets/icons/exampleSeo.svg";
import { ExampleBox } from "../../../styles/styledComponents/editor/Seo.sc";
import { checkAndSend } from "../../../store/actions/clientActions";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";

const Seo = () => {
  const seoRef = useRef();
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const { isEditing, articleId } = homeScreenState;
  const { title: seoTitle, description, isChanged } = seoState;
  const dispatch = useDispatch();

  function onClickOutside() {
    if (!isEditing && isChanged) {
      dispatch(checkAndSend());
    } else if (isEditing && isChanged) {
      dispatch(checkAndSend("update", articleId));
    }
  }
  useClickOutside(seoRef, onClickOutside);

  return (
    <SectionBox ref={seoRef}>
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
