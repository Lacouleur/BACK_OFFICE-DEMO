/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  addSlug,
  addCategory,
  addLang,
} from "../../store/actions/mainInformationActions";
import { addSeoDescription, addSeoTitle } from "../../store/actions/seoActions";
import {
  FieldStyle,
  Selector,
  FieldError,
  ErrorIcon,
  FieldContainer,
  FieldInfosBox,
  TextArea,
  FieldBox,
  FieldButton,
} from "../../styles/styledComponents/global/Field.sc";
import { Br } from "../../styles/styledComponents/modal/Modal.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import {
  fetchCategoriesList,
  saveImage,
} from "../../store/actions/clientActions";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import { showErrorModal } from "../../store/actions/actionBarActions";
import convertBytes from "../../helper/convertBytes";
import { sizeOrFormatError } from "../../helper/errorMessages";
import { setAltImage } from "../../store/actions/moduleActions";

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
}) => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState();
  const [selectedLang, setSelectedLang] = useState();
  const [fileTitle, setFileTitle] = useState("");
  const langList = [
    {
      label: "French",
      value: "fr",
    },
    {
      label: "German",
      value: "de",
    },
  ];

  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { errorMessage } = actionBarState;
  const { categoriesList, status } = MainInformationState;

  // Next functions concern File Uploader fields
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

    if (!selectedLang) {
      langList.map((option) => {
        if (edit === option.value) {
          setSelectedLang(option);
          return null;
        }
        return null;
      });
    }
  }, [edit]);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.size < 500000 &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/gif" ||
        file.type === "image/jpeg")
    ) {
      dispatch(saveImage(file, moduleId));
      setFileTitle(file.name);
    } else {
      dispatch(showErrorModal(sizeOrFormatError(file)));
      setFileTitle("");
    }
  };

  return (
    <FieldContainer>
      {fieldType && fieldType === "select" && (
        <FieldBox langSelector>
          <Selector
            isDisabled={name === "lang" && !(status === "DRAFT" || !status)}
            value={name === "lang" ? selectedLang : editCategory}
            options={name === "lang" ? langList : categoriesList}
            classNamePrefix="select"
            placeholder={name}
            isClearable
            onChange={(e) => {
              if (e?.value) {
                if (name === "category") {
                  setEditCategory(e);
                  dispatch(addCategory(e.value));
                }
                if (name === "lang") {
                  setSelectedLang(e);
                  dispatch(addLang(e.value));
                }
              } else if (name === "category") {
                setEditCategory("");
                dispatch(addCategory(""));
              }
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
            defaultValue={edit ? `${edit}` : fileTitle}
            type="text"
            maxLength={maxlength}
            disabled
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
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
              if (name === "title" && section === "mainInformation") {
                dispatch(addTitle(e.target.value));
              }
              if (name === "slug" && section === "mainInformation") {
                dispatch(addSlug(e.target.value));
              }
              if (name === "title" && section === "seo") {
                dispatch(addSeoTitle(e.target.value));
              }
              if (name === "altImage" && section === "imageModule") {
                dispatch(setAltImage({ id: moduleId, value: e.target.value }));
              }
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
  moduleId: PropTypes.string,
};

export default Field;
