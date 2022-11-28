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
import { actualizeManifesto } from "../../../store/actions/thunk/ManifestoActions.thunk";
import { checkAndSend } from "../../../store/actions/thunk/ArticlesActions.thunk";
import useClickOutside from "../../../helper/cutomHooks/useClickOutside";

const Seo = () => {
  const seoRef = useRef();
  const seoState = useSelector(({ seoReducer }) => seoReducer);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );
  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const { title: seoTitle, description, isChanged } = seoState;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { articleId } = MainInformationState;
  const { manifestoId, isManifesto } = manifestoState;

  function onClickOutside() {
    setIsOpen(false);
    if (isChanged) {
      if (!isManifesto) {
        dispatch(checkAndSend("update", articleId));
      }

      if (isManifesto && manifestoId) {
        dispatch(actualizeManifesto(manifestoId));
      }
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
            section="seo"
            edit={seoTitle || undefined}
          />
          <Field
            placeholder="Description"
            fieldType="textarea"
            name="description"
            displayName="Description"
            section="seo"
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
