/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FieldStyle,
  Select,
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
import keyGenerator from "../../helper/KeyGenerator";
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
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    const res = await getCategories();
    const labels = [];
    const opts = [];

    // eslint-disable-next-line no-unused-vars
    Object.entries(res).map(([key, value]) => {
      labels.push({ label: value.label, id: value._id });
    });
    opts.push(
      labels.map((label) => (
        <option value={label.id} key={keyGenerator(label.label)}>
          {label.label}
        </option>
      ))
    );
    setOptions(opts);
  }, []);

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
        <Select
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedValue(selected);
            if (e.target.value !== "") {
              setter({
                ...values,
                [name]: e.target.value,
              });
            } else {
              const vals = { ...values };
              delete vals[name];
              setter({ ...vals });
            }
          }}
          color={
            !selectedValue || !values?.[name]
              ? colors.placeholderGrey
              : colors.white
          }
        >
          <option value="" defaultValue="">
            {placeholder}
          </option>
          {options.map((option) => option)}
        </Select>
      )}
      {fieldType && fieldType === "textarea" && (
        <TextArea
          placeholder={placeholder}
          maxLength={maxlength}
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
};

export default Field;
