/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
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
  FieldTitle,
  Line,
  FieldTitleBox,
  CancelImageCross,
} from "../../styles/styledComponents/global/Field.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";
import {
  fetchAuthorsList,
  fetchCategoriesList,
  fetchTags,
} from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";

import {
  dispatchFields,
  dispatchSelected,
  checkImage,
  onEdit,
  optionSelector,
  valueSelector,
  fuzzyOptions,
  initMultiSelectors,
  findImageId,
  deleteImage,
} from "../../helper/fieldsHelper";
import crossIcon from "../../styles/assets/icons/cross-purple.svg";

import MultiSelectorFields from "./MultiSelectorsFields";

// Field.js is a unique file for all types of fields in the app.

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
subId : used for questions in a quizz or cards in a collection (elements in a module),
lang,
isDisabled : bool to disable field modification,
isClearable : bool to create a cross in the field,
*/

const Field = ({
  type,
  placeholder,
  maxlength,
  infos,
  name,
  displayName,
  error,
  fieldType,
  section,
  edit,
  moduleId,
  subId,
  isDisabled,
  isClearable,
}) => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState();
  const [selectedLang, setSelectedLang] = useState();
  const [selectedReadTime, setSelectedReadTime] = useState();
  const [selectedColorStyle, setSelectedColorStyle] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCtaType, setSelectedCtaType] = useState();
  const [fileTitle, setFileTitle] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsCollection, setSelectedTagsCollection] = useState([]);
  const [selectedCollectionType, setSelectedCollectionType] = useState();
  const [selectedCollectionFormat, setSelectedCollectionFormat] = useState();
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState();
  const [selectedResourceType, setSelectedResourceType] = useState();
  const [
    selectedFeaturedBackgroundColor,
    setSelectedFeaturedBackgroundColor,
  ] = useState();
  const [selectedSticker, setSelectedSticker] = useState();

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

      if (name === "authors" && authorsList?.length === 0) {
        dispatch(fetchAuthorsList(lang));
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
      selectedColorStyle,
      setSelectedColorStyle,
      setSelectedCollectionType,
      selectedCollectionType,
      setSelectedCollectionFormat,
      selectedCollectionFormat,
      setSelectedCtaType,
      selectedCtaType,
      selectedBackgroundColor,
      setSelectedBackgroundColor,
      selectedFeaturedBackgroundColor,
      setSelectedFeaturedBackgroundColor,
      selectedSticker,
      setSelectedSticker,
      selectedResourceType,
      setSelectedResourceType
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
      selectedTagsCollection,
      setSelectedTagsCollection
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
          <FieldTitle>{displayName || name}</FieldTitle>
          <Line />
        </FieldTitleBox>
      )}
      {/* selector fields */}
      {fieldType && fieldType === "select" && (
        <FieldBox>
          <Selector
            isDisabled={isDisabled}
            value={valueSelector(
              name,
              editCategory,
              selectedLang,
              selectedReadTime,
              selectedColorStyle,
              selectedCollectionType,
              selectedCollectionFormat,
              selectedCtaType,
              selectedBackgroundColor,
              selectedFeaturedBackgroundColor,
              selectedSticker,
              selectedResourceType
            )}
            options={optionSelector(name, categoriesList)}
            classNamePrefix="select"
            placeholder={name}
            isClearable={isClearable}
            onChange={(event) => {
              dispatchSelected(
                event,
                dispatch,
                name,
                setEditCategory,
                setSelectedLang,
                setSelectedReadTime,
                setSelectedColorStyle,
                setSelectedCollectionType,
                setSelectedCollectionFormat,
                setSelectedCtaType,
                setSelectedBackgroundColor,
                setSelectedFeaturedBackgroundColor,
                setSelectedSticker,
                setSelectedResourceType,
                moduleId
              );
            }}
          />
          {name === "lang" && !(status === "DRAFT" || !status) && (
            <Tooltip>
              <TooltipText>
                The lang can be modified on draft content only.
              </TooltipText>
            </Tooltip>
          )}
          {name === "sticker" && (
            <Tooltip>
              <TooltipText>
                Only one option of sticker for the time beeing, we are working
                to add more of them.
              </TooltipText>
            </Tooltip>
          )}
        </FieldBox>
      )}
      {/* multi value Selector */}
      {fieldType && fieldType === "multi-value" && (
        <MultiSelectorFields
          name={name}
          section={section}
          newTagLabel={newTag?.label}
          lang={lang}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
          placeholder={placeholder}
          fuzzyOptions={fuzzyOptions}
          tagsList={tagsList}
          fuse={fuse}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
          authorsList={authorsList}
          moduleId={moduleId}
          selectedCategories={selectedCategories}
          categoriesList={categoriesList}
          setSelectedCategories={setSelectedCategories}
          selectedTagsCollection={selectedTagsCollection}
          setSelectedTagsCollection={setSelectedTagsCollection}
        />
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
          maxheight={section}
        />
      )}

      {/* uploaders fields */}
      {fieldType && fieldType === "uploader" && (
        <>
          <FieldBox
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <FieldStyle
              uploaderField
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
                checkImage(event, dispatch, setFileTitle, name, moduleId, subId)
              }
              style={{ display: "none" }}
            />

            <FieldButton>UPLOAD</FieldButton>
          </FieldBox>
          {fileTitle && (
            <>
              <CancelImageCross
                field
                src={crossIcon}
                onClick={() =>
                  // when adding new image field you have to add it in the delete function below
                  deleteImage(dispatch, setFileTitle, name, moduleId, subId)
                }
              />
            </>
          )}
        </>
      )}

      {/* regular fields */}
      {!fieldType && (
        <FieldBox>
          <FieldStyle
            type={type}
            placeholder={placeholder}
            maxLength={maxlength}
            disabled={isDisabled}
            onInput={(e) => {
              if (type === "number" && e.target.value > 15) {
                e.target.value = 15;
              }

              dispatchFields(
                name,
                section,
                dispatch,
                e.target.value,
                moduleId,
                subId,
                lang
              );
            }}
            defaultValue={edit ? `${edit}` : ""}
            error
          />
          {name === "slug" && isDisabled && (
            <Tooltip>
              <TooltipText>
                The slug can be modified on draft content only.
              </TooltipText>
            </Tooltip>
          )}
        </FieldBox>
      )}
      {infos && (
        <FieldInfosBox>
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
  subId: undefined,
  isDisabled: false,
  isClearable: true,
  displayName: undefined,
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
  subId: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  displayName: PropTypes.string,
};

export default Field;
