/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import { verifySlug } from "../../helper/auth/verifyFields";

const Field = ({
  fieldStyle,
  type,
  placeholder,
  maxlength,
  infos,
  setter,
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

  function textFieldDispatcher(e) {
    switch (section) {
      case "seo":
        if (name === "title") {
          setter({
            ...values,
            seo: {
              ...values.seo,
              [name]: e.target.value,
            },
          });
        }
        break;
      case "main":
        if (
          (name === "title" || name === "slug") &&
          e.target.value.length > 0
        ) {
          setError(false);
        }
        if (name === "slug") {
          if (e.target.value.length > 0) {
            setPostingError({
              isError: false,
              text: "",
            });
          }
          if (verifySlug(e.target.value)) {
            setSpecialError(false);
            setter({
              ...values,
              [name]: e.target.value,
            });
          } else if (e.target.value.length > 0 && !verifySlug(e.target.value)) {
            setSpecialError(true);
          } else {
            setter({
              ...values,
              [name]: e.target.value,
            });
            setSpecialError(false);
          }
        } else if (name === "htag") {
          setter({
            ...values,
            header: { [name]: e.target.value },
          });
        } else {
          setter({
            ...values,
            [name]: e.target.value,
          });
        }
        break;
      default:
    }
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
          onChange={(e) => {
            if (e?.value) {
              setEditCategory(e);
              setter({
                ...values,
                [name]: e.value,
              });
            } else {
              setEditCategory("");
              const vals = { ...values };
              delete vals[name];
              setter({ ...vals });
            }
          }}
        />
      )}
      {fieldType && fieldType === "textarea" && (
        <TextArea
          placeholder={placeholder}
          maxLength={maxlength}
          defaultValue={edit ? `${edit}` : ""}
          onChange={(e) => {
            if (section === "seo") {
              setter({
                ...values,
                seo: {
                  ...values.seo,
                  [name]: e.target.value,
                },
              });
            }
          }}
        />
      )}
      {!fieldType && (
        <FieldStyle
          type={type}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={(e) => textFieldDispatcher(e)}
          defaultValue={edit ? `${edit}` : ""}
          styles={{
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
          }}
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
};

Field.propTypes = {
  fieldStyle: PropTypes.shape({}),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  infos: PropTypes.string,
  setter: PropTypes.func.isRequired,
  values: PropTypes.shape({
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
};

export default Field;