import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  addSlug,
  addCategory,
} from "../../store/actions/homeScreenActions";
import { addSeoDescription, addSeoTitle } from "../../store/actions/seoActions";
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
import { fetchCategoriesList } from "../../store/actions/clientActions";

const Field = ({
  type,
  placeholder,
  maxlength,
  infos,
  name,
  error,
  fieldType,
  section,
  edit,
}) => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState();

  const contentListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const { categoriesList } = homeScreenState;

  const { articleStatus } = contentListState;

  useEffect(() => {
    if (categoriesList.length === 0) {
      dispatch(fetchCategoriesList());
    }
    if (categoriesList && edit) {
      categoriesList.map((option) => {
        if (edit === option.value) {
          setEditCategory(option);
        }
        return null;
      });
    }
  }, [edit]);

  return (
    <FieldContainer>
      {fieldType && fieldType === "select" && (
        <Selector
          value={editCategory}
          options={categoriesList}
          classNamePrefix="select"
          placeholder={name}
          isClearable
          onChange={(e) => {
            if (e?.value) {
              setEditCategory(e);
              dispatch(addCategory(e.value));
            } else {
              setEditCategory("");
              dispatch(addCategory(""));
            }
          }}
        />
      )}
      {fieldType && fieldType === "textarea" && (
        <TextArea
          placeholder={placeholder}
          maxLength={maxlength}
          defaultValue={edit ? `${edit}` : ""}
          onInput={(e) => {
            if (name === "description" && section === "seo") {
              dispatch(addSeoDescription(e.target.value));
            }
          }}
        />
      )}
      {!fieldType && (
        <FieldStyle
          type={type}
          placeholder={placeholder}
          maxLength={maxlength}
          disabled={
            name === "slug" && !(articleStatus === "DRAFT" || !articleStatus)
          }
          onInput={(e) => {
            if (name === "title" && section === "homeScreen") {
              dispatch(addTitle(e.target.value));
            }
            if (name === "slug" && section === "homeScreen") {
              dispatch(addSlug(e.target.value));
            }
            if (name === "title" && section === "seo") {
              dispatch(addSeoTitle(e.target.value));
            }
          }}
          defaultValue={edit ? `${edit}` : ""}
          styles={
            name === "slug" && !(articleStatus === "DRAFT" || !articleStatus)
              ? {
                  color: colors.placeholderGrey,
                  height: "56px",
                  border: `${
                    error ? `2px solid ${colors.paleViolet}` : `none`
                  }`,
                }
              : {
                  color: `${error ? colors.paleViolet : colors.white}`,
                  border: `${
                    error ? `2px solid ${colors.paleViolet}` : `none`
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
          <ErrorIcon src={error ? exclamationVioletIcon : exclamationIcon} />
          <FieldError color={error ? colors.paleViolet : colors.lightGrey}>
            {infos}
          </FieldError>
        </FieldInfosBox>
      )}
    </FieldContainer>
  );
};

Field.defaultProps = {
  type: "text",
  placeholder: "",
  maxlength: "",
  infos: undefined,
  error: undefined,
  fieldType: undefined,
  section: undefined,
  edit: undefined,
};

Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  infos: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  fieldType: PropTypes.string,
  section: PropTypes.string,
  edit: PropTypes.string,
};

export default Field;
