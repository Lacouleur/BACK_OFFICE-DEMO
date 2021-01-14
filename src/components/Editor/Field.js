/* eslint-disable no-unused-vars */
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
} from "../../styles/styledComponents/global/Field.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import { getCategories } from "../../services/client/contentClient";
import keyGenerator from "../../helper/KeyGenerator";
import { verifySlug } from "../../helper/auth/verifyFields";
/* import resetField from "../../helper/Editor/resetField"; */

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
      {!fieldType && (
        <FieldStyle
          type={type}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setError(false);
            }
            if (name === "slug") {
              if (verifySlug(e.target.value)) {
                setSpecialError(false);
                setter({
                  ...values,
                  [name]: e.target.value,
                });
              } else if (
                e.target.value.length > 0 &&
                !verifySlug(e.target.value)
              ) {
                setSpecialError(true);
              } else {
                setSpecialError(false);
              }
            } else {
              setter({
                ...values,
                [name]: e.target.value,
              });
            }
          }}
          styles={{
            ...fieldStyle,
            color: `${
              error || specialError ? colors.paleViolet : colors.white
            }`,
            border: `${
              error || specialError ? `2px solid ${colors.paleViolet}` : `none`
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
              error || specialError ? exclamationVioletIcon : exclamationIcon
            }
          />
          <FieldError
            color={error || specialError ? colors.paleViolet : colors.lightGrey}
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
};

Field.propTypes = {
  fieldStyle: PropTypes.shape({}),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  infos: PropTypes.string,
  setter: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  setError: PropTypes.func,
  fieldType: PropTypes.string,
  specialError: PropTypes.bool,
  setSpecialError: PropTypes.func,
};

export default Field;
