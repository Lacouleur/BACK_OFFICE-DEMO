/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
/* import JoditEditor from "jodit-react"; */
import {
  FieldStyle,
  Selector,
  FieldError,
  ErrorIcon,
  FieldContainer,
  FieldInfosBox,
  TextArea,
} from "../../styles/styledComponents/global/Field.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import { getCategories } from "../../services/client/contentClient";
import fieldDispatcher from "../../helper/Editor/fieldDispatcher";
/* import { CKWraper } from "../../styles/styledComponents/editor/modules/TextModule.sc"; */

const Field = ({
  fieldStyle,
  type,
  placeholder,
  maxlength,
  infos,
  setValues,
  values,
  name,
  error,
  setError,
  fieldType,
  specialError,
  setSpecialError,
  section,
  setPostingError,
  postingError,
  edit,
  contentState,
}) => {
  const [options, setOptions] = useState([]);
  const [editCategory, setEditCategory] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategories();
      const labels = [];

      // eslint-disable-next-line no-unused-vars
      Object.entries(res).map(([key, value]) => {
        labels.push({ label: value.label, value: value._id });
      });

      setOptions(labels);

      if (labels && edit) {
        labels.map((option) => {
          if (edit === option.value) {
            setEditCategory(option);
          }
        });
      }
    }

    fetchCategories();
  }, [edit]);

  function dispatchFields(e) {
    fieldDispatcher(
      setEditCategory,
      setError,
      setSpecialError,
      setValues,
      section,
      setPostingError,
      values,
      name,
      e
    );
  }

  return (
    <FieldContainer>
      {fieldType && fieldType === "select" && (
        <Selector
          value={editCategory}
          options={options}
          classNamePrefix="Select"
          placeholder="Category"
          isClearable
          onChange={(e) => dispatchFields(e)}
        />
      )}
      {fieldType && fieldType === "textarea" && (
        <TextArea
          placeholder={placeholder}
          maxLength={maxlength}
          defaultValue={edit ? `${edit}` : ""}
          onInput={(e) => dispatchFields(e)}
        />
      )}
      {/*       {fieldType && fieldType === "textEditor" && (
        <CKWraper>
          {console.log("EDIT =>", edit)}
          <JoditEditor
            ref={joditEditor}
            value={textModuleValue}
            onBlur={(e) => {
              setTextModuleValue(e.target.innerHTML);
              /*  dispatchFields(e); 
            }}
          />
        </CKWraper>
      )} */}
      {!fieldType && (
        <FieldStyle
          type={type}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={
            name === "slug" && !(contentState === "DRAFT" || !contentState)
          }
          onInput={(e) => {
            dispatchFields(e);
          }}
          defaultValue={edit ? `${edit}` : ""}
          styles={
            name === "slug" && !(contentState === "DRAFT" || !contentState)
              ? {
                  ...fieldStyle,
                  color: colors.placeholderGrey,
                  height: "56px",
                }
              : {
                  ...fieldStyle,
                  color: `${
                    error || specialError || postingError?.isError
                      ? colors.paleViolet
                      : colors.white
                  }`,
                  border: `${
                    error || specialError || postingError?.isError
                      ? `2px solid ${colors.paleViolet}`
                      : `none`
                  }`,
                  height: "56px",
                }
          }
        />
      )}
      {infos && (
        <FieldInfosBox
          styles={{
            marginTop: "8px",
          }}
        >
          <ErrorIcon
            src={
              error || specialError || postingError?.isError
                ? exclamationVioletIcon
                : exclamationIcon
            }
          />
          <FieldError
            color={
              error || specialError || postingError?.isError
                ? colors.paleViolet
                : colors.lightGrey
            }
          >
            {infos}
          </FieldError>
        </FieldInfosBox>
      )}
    </FieldContainer>
  );
};

Field.defaultProps = {
  fieldStyle: {},
  type: "text",
  placeholder: "",
  maxlength: "",
  infos: undefined,
  error: undefined,
  setError: undefined,
  fieldType: undefined,
  specialError: undefined,
  setSpecialError: undefined,
  section: undefined,
  values: PropTypes.shape({}),
  setPostingError: undefined,
  postingError: undefined,
  edit: undefined,
  contentState: undefined,
};

Field.propTypes = {
  fieldStyle: PropTypes.shape({}),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  infos: PropTypes.string,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape({
    state: PropTypes.string,
    seo: PropTypes.shape({}),
  }),
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  setError: PropTypes.func,
  fieldType: PropTypes.string,
  specialError: PropTypes.bool,
  setSpecialError: PropTypes.func,
  section: PropTypes.string,
  setPostingError: PropTypes.func,
  postingError: PropTypes.shape({
    isError: PropTypes.bool,
  }),
  edit: PropTypes.string,
  contentState: PropTypes.string,
};

export default Field;
