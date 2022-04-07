/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Fuse from "fuse.js";
import {
  FieldStyle,
  Selector,
  SelectorAuthor,
  MultiSelectorAndCreate,
  FieldError,
  ErrorIcon,
  FieldContainer,
  FieldInfosBox,
  TextArea,
  FieldBox,
  FieldButton,
  ButtonWarn,
  TextWarn,
  BoxWarnButton,
  TagBox,
  FieldTitle,
  Line,
  FieldTitleBox,
  WarningCreateContainer,
  WarnCreateBox,
  MultiSelector,
} from "../../styles/styledComponents/global/Field.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import {
  createTag,
  fetchCategoriesList,
  fetchTags,
} from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";

import {
  dispatchElementsValue,
  dispatchElementsId,
  dispatchFields,
  dispatchSelected,
  checkImage,
  onEdit,
  optionSelector,
  valueSelector,
  fuzzyOptions,
  loadOptions,
  initMultiSelectors,
} from "../../helper/fieldsHelper";
import {
  setAuthors,
  setTags,
  setNewTag,
} from "../../store/actions/mainInformationActions";
import {
  setSliderCategories,
  setSliderTags,
} from "../../store/actions/moduleActions";

// All necessary methods of "Field" are in "fieldsHelper.js"

/*
type : semantic type of the field
placeholder,
maxlength,
infos : text to display below the field
name : field name used to dispatch values
error : error text for the current field
fieldType : custom type of field used to display it (If undefined, a classic "type text" is displayed)
section: The group to which the field belongs
edit : fetched value to populate the field
moduleId : ID of the group to which the field belongs,
answerId : used for quizz,
lang,
*/

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsSlider, setSelectedTagsSlider] = useState([]);
  const [selectedSliderType, setSelectedSliderType] = useState();
  const [isOpenTagWarn, setIsOpenTagWarn] = useState();
  const animatedComponents = makeAnimated();
  const [fuse, setFuse] = useState(null);

  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { isPage } = PageMainInformationState;

  const { categoriesList, status, authorsList, tagsList, newTag, lang } = isPage
    ? PageMainInformationState
    : MainInformationState;

  // Fuse search -> dynamic tag search field
  useEffect(() => {
    setFuse(new Fuse(tagsList, fuzzyOptions));
    return () => setFuse(null);
  }, [tagsList]);

  // fuse search -> dynamic tag search field
  useEffect(() => {
    if ((tagsList, fuse)) {
      fuse.setCollection(tagsList);
    }
  }, [fuse, tagsList]);

  // Multi selector fiels
  useEffect(() => {
    if (fieldType === "select") {
      if (categoriesList?.length === 0 || !categoriesList) {
        dispatch(fetchCategoriesList(lang));
      }
    }

    if (fieldType === "multi-value" && lang) {
      if (
        (name === "tags" && tagsList?.length === 0) ||
        tagsList === undefined
      ) {
        dispatch(fetchTags(lang));
      }
      if (name === "categories" && categoriesList?.length === 0) {
        dispatch(fetchCategoriesList(lang));
      }
    }
  }, [fieldType, lang]);

  // Regular selector fields
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
      setSelectedColorStyle,
      setSelectedSliderType,
      selectedSliderType
    );

    initMultiSelectors(
      fieldType,
      name,
      edit,
      section,
      setSelectedTags,
      selectedTags,
      tagsList,
      setSelectedAuthors,
      selectedAuthors,
      authorsList,
      setSelectedCategories,
      selectedCategories,
      categoriesList,
      selectedTagsSlider,
      setSelectedTagsSlider
    );
  }, [edit, categoriesList, authorsList, tagsList]);

  // Next functions concern File Uploader fields
  const hiddenFileInput = React.useRef(null);
  function handleClick() {
    hiddenFileInput.current.click();
  }

  return (
    <FieldContainer>
      {!error && (
        <FieldTitleBox>
          <FieldTitle>{name}</FieldTitle>
          <Line />
        </FieldTitleBox>
      )}

      {/* regular selector fields */}

      {fieldType && fieldType === "select" && (
        <FieldBox>
          <Selector
            isDisabled={
              (name === "lang" || name === "category") &&
              !(status === "DRAFT" || !status)
            }
            value={valueSelector(
              name,
              editCategory,
              selectedLang,
              selectedReadTime,
              selectedColorStyle,
              selectedSliderType
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
                setSelectedColorStyle,
                setSelectedSliderType,
                moduleId
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

      {/* multi value Selector */}

      {fieldType && fieldType === "multi-value" && (
        <FieldBox>
          {/* tag selector */}

          {name === "tags" && section === "mainInformation" && (
            <>
              {/* Warn message on new tag creation */}
              {isOpenTagWarn && newTag?.label && (
                <>
                  <WarningCreateContainer>
                    <TextWarn violet margin>
                      Please note that the creation of a tag is final.
                    </TextWarn>
                    <WarnCreateBox>
                      <TextWarn width30>
                        Do you want to create the tag :
                      </TextWarn>
                      <TagBox>{`${newTag.label}`}</TagBox>
                      <BoxWarnButton>
                        <ButtonWarn
                          autoFocus
                          type="button"
                          onClick={() => {
                            dispatch(
                              createTag(
                                newTag.label,
                                lang,
                                setSelectedTags,
                                selectedTags,
                                setIsOpenTagWarn
                              )
                            );
                          }}
                        >
                          Yes
                        </ButtonWarn>
                        <ButtonWarn
                          type="button"
                          onClick={() => {
                            dispatch(setNewTag(undefined));
                            setIsOpenTagWarn(false);
                          }}
                        >
                          No
                        </ButtonWarn>
                      </BoxWarnButton>
                    </WarnCreateBox>
                  </WarningCreateContainer>
                </>
              )}

              {/* tag Selector with fuse dynamic search */}

              <MultiSelectorAndCreate
                isDisabled={!!isOpenTagWarn}
                classNamePrefix="select"
                isMulti
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                menuIsOpen={isOpenTagWarn ? false : undefined}
                placeholder={placeholder}
                defaultValue={selectedTags}
                value={selectedTags}
                getOptionValue={(option) => `${option.label}`}
                onCreateOption={(event) => {
                  dispatch(setNewTag({ label: event }));
                  setIsOpenTagWarn(true);
                }}
                fuzzyOptions={fuzzyOptions}
                autoCorrect="off"
                spellCheck="off"
                styles={{
                  /* Hack to stylize the create Button */
                  option: (provided, state) => ({
                    ...provided,
                    background:
                      state.data.__isNew__ && `${colors.matBlack} !important`,
                    color: state.data.__isNew__ && `${colors.green} !important`,
                  }),
                }}
                defaultOptions={tagsList}
                loadOptions={(value) => loadOptions(value, fuse)}
                onChange={(event) => {
                  setSelectedTags(event);
                  dispatch(setTags(dispatchElementsId(event || [])));
                }}
              />
            </>
          )}

          {/* authors selector */}

          {name === "authors" && (
            <>
              <SelectorAuthor
                classNamePrefix="select"
                isMulti
                components={animatedComponents}
                closeMenuOnSelect={false}
                placeholder={placeholder}
                defaultValue={selectedAuthors}
                value={selectedAuthors}
                options={optionSelector("authors", authorsList)}
                onChange={(event) => {
                  if (!event) {
                    setSelectedAuthors([]);
                  } else {
                    setSelectedAuthors(event);
                  }
                  dispatch(setAuthors(dispatchElementsValue(event || [])));
                }}
              />
            </>
          )}

          {/* category selector */}

          {name === "categories" && (
            <>
              <MultiSelector
                classNamePrefix="select"
                isMulti
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                placeholder={placeholder}
                defaultValue={selectedCategories}
                value={selectedCategories}
                getOptionValue={(option) => `${option.label}`}
                fuzzyOptions={fuzzyOptions}
                autoCorrect="off"
                spellCheck="off"
                defaultOptions={categoriesList}
                options={categoriesList}
                loadOptions={(value) => loadOptions(value, fuse)}
                onChange={(event) => {
                  if (!event) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories(event);
                  }
                  dispatch(
                    setSliderCategories({
                      id: moduleId,
                      value: dispatchElementsValue(event || []),
                    })
                  );
                }}
              />
            </>
          )}

          {/* Tag selector without creation */}
          {name === "tags" && section === "slider" && (
            <>
              <MultiSelector
                classNamePrefix="select"
                isMulti
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                placeholder={placeholder}
                defaultValue={selectedTagsSlider}
                value={selectedTagsSlider}
                getOptionValue={(option) => `${option.label}`}
                fuzzyOptions={fuzzyOptions}
                autoCorrect="off"
                spellCheck="off"
                defaultOptions={tagsList}
                options={tagsList}
                loadOptions={(value) => loadOptions(value, fuse)}
                onChange={(event) => {
                  if (!event) {
                    setSelectedTagsSlider([]);
                  } else {
                    setSelectedTagsSlider(event);
                  }
                  dispatch(
                    setSliderTags({
                      id: moduleId,
                      value: dispatchElementsId(event || []),
                    })
                  );
                }}
              />
            </>
          )}
        </FieldBox>
      )}

      {/* text area fields */}

      {fieldType && fieldType === "textarea" && (
        <TextArea
          placeholder={placeholder}
          maxLength={maxlength}
          defaultValue={edit ? `${edit}` : ""}
          onInput={(e) => {
            dispatchFields(name, section, dispatch, e.target.value, moduleId);
          }}
        />
      )}

      {/* uploaders fields */}

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
              checkImage(event, dispatch, setFileTitle, name, moduleId)
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
                answerId,
                lang
              );
            }}
            defaultValue={edit ? `${edit}` : ""}
            error
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
  edit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
  ]),
  moduleId: PropTypes.string,
  answerId: PropTypes.string,
};

export default Field;
