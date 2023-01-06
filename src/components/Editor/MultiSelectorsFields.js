/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import colors from "../../styles/core/colors";
import {
  BoxWarnButton,
  ButtonWarn,
  FieldBox,
  MultiSelector,
  MultiSelectorAndCreate,
  SelectorAuthor,
  TagBox,
  TextWarn,
  WarnCreateBox,
  WarningCreateContainer,
} from "../../styles/styledComponents/global/Field.sc";
import {
  setModuleCategories,
  setModuleTags,
  setModuleAuthors,
} from "../../store/actions/moduleActions";
import {
  setTags,
  setNewTag,
  setAuthors,
} from "../../store/actions/mainInformationActions";
import { createTag } from "../../store/actions/thunk/ArticlesActions.thunk";
import {
  buildCatSubcatLabels,
  dispatchElementsId,
  dispatchElementsValue,
  loadOptions,
  optionSelector,
  removeSubcatIfNeeded,
} from "../../helper/fieldsHelper";

const MultiSelectorFields = ({
  name,
  section,
  newTagLabel,
  lang,
  setSelectedTags,
  selectedTags,
  placeholder,
  fuzzyOptions,
  tagsList,
  fuse,
  selectedAuthors,
  setSelectedAuthors,
  authorsList,
  moduleId,
  selectedCategories,
  categoriesList,
  originalCategoriesList,
  setSelectedCategories,
  selectedTagsCollection,
  setSelectedTagsCollection,
}) => {
  const dispatch = useDispatch();
  const [isOpenTagWarn, setIsOpenTagWarn] = useState();
  const animatedComponents = makeAnimated();

  return (
    <FieldBox>
      {/* tag selector */}
      {name === "tags" && section === "mainInformation" && (
        <>
          {/* Warn message on new tag creation */}
          {isOpenTagWarn && newTagLabel && (
            <>
              <WarningCreateContainer>
                <TextWarn violet margin>
                  Please note that the creation of a tag is final.
                </TextWarn>
                <WarnCreateBox>
                  <TextWarn width30>Do you want to create the tag :</TextWarn>
                  <TagBox>{`${newTagLabel}`}</TagBox>
                  <BoxWarnButton>
                    <ButtonWarn
                      autoFocus
                      type="button"
                      onClick={() => {
                        setIsOpenTagWarn(false);
                        dispatch(
                          createTag(
                            newTagLabel,
                            lang,
                            setSelectedTags,
                            selectedTags
                          )
                        );
                      }}
                    >
                      Yes
                    </ButtonWarn>
                    <ButtonWarn
                      type="button"
                      onClick={() => {
                        setIsOpenTagWarn(false);
                        dispatch(setNewTag(undefined));
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
              if (moduleId) {
                dispatch(
                  setModuleAuthors({
                    value: dispatchElementsValue(event || []),
                    moduleId,
                  })
                );
              }
              if (!moduleId) {
                dispatch(setAuthors(dispatchElementsValue(event)));
              }
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
            value={buildCatSubcatLabels(selectedCategories)}
            getOptionValue={(option) => `${option.label}`}
            fuzzyOptions={fuzzyOptions}
            autoCorrect="off"
            spellCheck="off"
            defaultOptions={buildCatSubcatLabels(categoriesList)}
            options={buildCatSubcatLabels(categoriesList)}
            loadOptions={(value) => loadOptions(value, fuse)}
            onChange={(event) => {
              if (!event) {
                setSelectedCategories([]);
              } else {
                setSelectedCategories(
                  removeSubcatIfNeeded(originalCategoriesList, event)
                );
              }
              dispatch(
                setModuleCategories({
                  id: moduleId,
                  value: dispatchElementsValue(event || []),
                })
              );
            }}
          />
        </>
      )}

      {/* Tag selector without creation */}
      {name === "tags" && (section === "collection" || section === "featured") && (
        <>
          <MultiSelector
            classNamePrefix="select"
            isMulti
            isSearchable
            components={animatedComponents}
            closeMenuOnSelect={false}
            placeholder={placeholder}
            defaultValue={selectedTagsCollection}
            value={selectedTagsCollection}
            getOptionValue={(option) => `${option.label}`}
            fuzzyOptions={fuzzyOptions}
            autoCorrect="off"
            spellCheck="off"
            defaultOptions={tagsList}
            options={tagsList}
            loadOptions={(value) => loadOptions(value, fuse)}
            onChange={(event) => {
              if (!event) {
                setSelectedTagsCollection([]);
              } else {
                setSelectedTagsCollection(event);
              }
              dispatch(
                setModuleTags({
                  id: moduleId,
                  value: dispatchElementsId(event || []),
                })
              );
            }}
          />
        </>
      )}
    </FieldBox>
  );
};

MultiSelectorFields.defaultProps = {
  newTagLabel: undefined,
  fuse: null,
  selectedTags: null,
  selectedAuthors: null,
  selectedTagsCollection: null,
  selectedCategories: null,
  moduleId: null,
  tagsList: [],
  authorsList: [],
  categoriesList: [],
  originalCategoriesList: [],
};

MultiSelectorFields.propTypes = {
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  newTagLabel: PropTypes.string,
  lang: PropTypes.string.isRequired,
  setSelectedTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.shape({})),
  placeholder: PropTypes.string.isRequired,
  fuzzyOptions: PropTypes.shape({}).isRequired,
  tagsList: PropTypes.arrayOf(PropTypes.shape({})),
  fuse: PropTypes.shape({}),
  selectedAuthors: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedAuthors: PropTypes.func.isRequired,
  authorsList: PropTypes.arrayOf(PropTypes.shape({})),
  moduleId: PropTypes.string,
  selectedCategories: PropTypes.arrayOf(PropTypes.shape({})),
  categoriesList: PropTypes.arrayOf(PropTypes.shape({})),
  originalCategoriesList: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedCategories: PropTypes.func.isRequired,
  selectedTagsCollection: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedTagsCollection: PropTypes.func.isRequired,
};

export default MultiSelectorFields;
