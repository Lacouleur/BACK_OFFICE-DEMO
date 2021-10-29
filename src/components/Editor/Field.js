/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { addSeoDescription } from "../../store/actions/seoActions";
import {
  FieldStyle,
  Selector,
  SelectorTag,
  FieldError,
  ErrorIcon,
  FieldContainer,
  FieldInfosBox,
  TextArea,
  FieldBox,
  FieldButton,
} from "../../styles/styledComponents/global/Field.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import { fetchCategoriesList } from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";

import { setOpinionExplain } from "../../store/actions/moduleActions";

import {
  dispatchAuthors,
  dispatchFields,
  dispatchSelected,
  handleChange,
  initAuthorsSelector,
  onEdit,
  optionSelector,
  valueSelector,
} from "../../helper/fieldsHelper";
import { setAuthors } from "../../store/actions/mainInformationActions";

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
  moduleId,
  answerId,
}) => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState();
  const [selectedLang, setSelectedLang] = useState();
  const [selectedReadTime, setSelectedReadTime] = useState();
  const [selectedColorStyle, setSelectedColorStyle] = useState();
  const [fileTitle, setFileTitle] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { categoriesList, status, authorsList } = MainInformationState;

  // Next functions concern File Select fields

  useEffect(() => {
    if (
      name === "category" &&
      (categoriesList?.length === 0 || !categoriesList)
    ) {
      dispatch(fetchCategoriesList());
    }
  }, []);

  useEffect(() => {
    onEdit(
      edit,
      categoriesList,
      setFileTitle,
      setEditCategory,
      selectedLang,
      setSelectedLang,
      selectedReadTime,
      setSelectedReadTime,
      selectedColorStyle,
      setSelectedColorStyle
    );

    if (fieldType === "select-tag") {
      initAuthorsSelector(
        edit,
        setSelectedAuthors,
        selectedAuthors,
        authorsList
      );
    }
  }, [edit, categoriesList, authorsList]);

  // Next functions concern File Uploader fields
  const hiddenFileInput = React.useRef(null);
  function handleClick() {
    hiddenFileInput.current.click();
  }

  return (
    <FieldContainer>
      {fieldType && fieldType === "select" && (
        <FieldBox>
          <Selector
            isDisabled={name === "lang" && !(status === "DRAFT" || !status)}
            value={valueSelector(
              name,
              editCategory,
              selectedLang,
              selectedReadTime,
              selectedColorStyle
            )}
            options={optionSelector(name, categoriesList)}
            classNamePrefix="select"
            placeholder={name}
            isClearable={!(name === "lang" || name === "colorStyle")}
            onChange={(event) => {
              dispatchSelected(
                event,
                dispatch,
                name,
                setEditCategory,
                setSelectedLang,
                setSelectedReadTime,
                setSelectedColorStyle
              );
            }}
          />
          {name === "lang" && !(status === "DRAFT" || !status) && (
            <Tooltip>
              <TooltipText>
                The language of a published content cannot be changed.
              </TooltipText>
            </Tooltip>
          )}
        </FieldBox>
      )}
      {fieldType && fieldType === "select-tag" && (
        <FieldBox>
          <SelectorTag
            classNamePrefix="select"
            isMulti
            value={selectedAuthors}
            options={optionSelector("authors", authorsList)}
            onChange={(event) => {
              setSelectedAuthors(event);
              dispatch(setAuthors(dispatchAuthors(event)));
            }}
          />
        </FieldBox>
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
            if (name === "explanation" && section === "opinion") {
              dispatch(
                setOpinionExplain({ id: moduleId, value: e.target.value })
              );
            }
          }}
        />
      )}
      {fieldType && fieldType === "uploader" && (
        <FieldBox
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <FieldStyle
            styles={{
              height: "56px",
              cursor: "pointer",
              paddingRight: "104px",
              textOverflow: "ellipsis",
            }}
            placeholder={placeholder}
            defaultValue={fileTitle}
            type="text"
            maxLength={maxlength}
            disabled
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(event) =>
              handleChange(event, dispatch, setFileTitle, name, moduleId)
            }
            style={{ display: "none" }}
          />
          <FieldButton>UPLOAD</FieldButton>
        </FieldBox>
      )}
      {!fieldType && (
        <FieldBox>
          <FieldStyle
            type={type}
            placeholder={placeholder}
            maxLength={maxlength}
            disabled={name === "slug" && !(status === "DRAFT" || !status)}
            onInput={(e) => {
              dispatchFields(
                name,
                section,
                dispatch,
                e.target.value,
                moduleId,
                answerId
              );
            }}
            defaultValue={edit ? `${edit}` : ""}
            styles={
              name === "slug" && !(status === "DRAFT" || !status)
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
          {name === "slug" && !(status === "DRAFT" || !status) && (
            <Tooltip>
              <TooltipText>
                The slug of a published content cannot be changed.
              </TooltipText>
            </Tooltip>
          )}
        </FieldBox>
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
  moduleId: undefined,
  answerId: undefined,
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
  edit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  moduleId: PropTypes.string,
  answerId: PropTypes.string,
};

export default Field;
