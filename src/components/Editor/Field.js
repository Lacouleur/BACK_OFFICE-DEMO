/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addTitle,
  addSlug,
  addCategory,
  addLang,
  setColorStyle,
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
/* import convertBytes from "../../helper/convertBytes"; */
import { sizeOrFormatError } from "../../helper/errorMessages";
import {
  setAltImage,
  setOpinionExplain,
  setOpinionQuestion,
  setOpinionTextAnswer,
} from "../../store/actions/moduleActions";
import {
  setReadingTime,
  addHomeTitle,
  setHomeImageAlt,
  setNavImageAlt,
} from "../../store/actions/homeNavigationActions";
import langList from "../../helper/langList";

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

  const readingTimeList = [
    {
      label: "1 min",
      value: 1,
    },
    {
      label: "2 min",
      value: 2,
    },
    {
      label: "3 min",
      value: 3,
    },
    {
      label: "5 min",
      value: 5,
    },
    {
      label: "10 min",
      value: 10,
    },
    {
      label: "15 min",
      value: 15,
    },
    {
      label: "20 min",
      value: 20,
    },
    {
      label: "25 min",
      value: 25,
    },
    {
      label: "30 min",
      value: 30,
    },
  ];

  const colorStyleList = [
    {
      label: "Blue",
      value: 1,
    },
    {
      label: "Yellow",
      value: 2,
    },
  ];

  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { categoriesList, status } = MainInformationState;

  // Next functions concern File Select fields

  function onEdit() {
    if (edit) {
      setFileTitle(edit);
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

    if (!selectedReadTime) {
      readingTimeList.map((option) => {
        if (parseInt(edit, 10) === option.value) {
          setSelectedReadTime(option);
          return null;
        }
        return null;
      });
    }

    if (!selectedColorStyle) {
      colorStyleList.map((option) => {
        if (edit === option.value) {
          console.log("EGALE");
          setSelectedColorStyle(option);
          return null;
        }
        return null;
      });
    }
  }

  useEffect(() => {
    if (categoriesList?.length === 0 || !categoriesList) {
      dispatch(fetchCategoriesList());
    }
  }, []);

  useEffect(() => {
    onEdit();
  }, [edit, categoriesList]);

  // Next functions concern File Uploader fields
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
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
      dispatch(saveImage(name, file, moduleId));
      setFileTitle(file.name);
    } else {
      dispatch(showErrorModal(sizeOrFormatError(file)));
      setFileTitle("");
    }
  };

  function valueSelector() {
    switch (name) {
      case "category":
        return editCategory;

      case "lang":
        return selectedLang;

      case "readTime":
        return selectedReadTime;

      case "colorStyle":
        return selectedColorStyle;

      default:
        return null;
    }
  }

  function optionSelector() {
    switch (name) {
      case "category":
        return categoriesList;

      case "lang":
        return langList;

      case "readTime":
        return readingTimeList;

      case "colorStyle":
        return colorStyleList;

      default:
        return null;
    }
  }

  return (
    <FieldContainer>
      {fieldType && fieldType === "select" && (
        <FieldBox>
          <Selector
            isDisabled={name === "lang" && !(status === "DRAFT" || !status)}
            value={valueSelector(name)}
            options={optionSelector(name)}
            classNamePrefix="select"
            placeholder={name}
            isClearable={!(name === "lang" || name === "colorStyle")}
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
                if (name === "readTime") {
                  setSelectedReadTime(e);
                  dispatch(setReadingTime(e.value));
                }
                if (name === "colorStyle") {
                  setSelectedColorStyle(e);
                  dispatch(setColorStyle(e.value));
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
              if (name === "title" && section === "homeNavigation") {
                dispatch(addHomeTitle(e.target.value));
              }
              if (name === "title" && section === "seo") {
                dispatch(addSeoTitle(e.target.value));
              }
              if (name === "altImage" && section === "imageModule") {
                dispatch(setAltImage({ id: moduleId, value: e.target.value }));
              }
              if (name === "altHomeImage" && section === "homeNavigation") {
                dispatch(setHomeImageAlt(e.target.value));
              }
              if (name === "altNavImage" && section === "homeNavigation") {
                dispatch(setNavImageAlt(e.target.value));
              }
              if (name === "question" && section === "opinion") {
                dispatch(
                  setOpinionQuestion({ id: moduleId, value: e.target.value })
                );
              }
              if (name === "answer" && section === "opinion") {
                dispatch(
                  setOpinionTextAnswer({
                    moduleId,
                    answerId,
                    value: e.target.value,
                  })
                );
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
  edit: PropTypes.string,
  moduleId: PropTypes.string,
  answerId: PropTypes.string,
};

export default Field;
