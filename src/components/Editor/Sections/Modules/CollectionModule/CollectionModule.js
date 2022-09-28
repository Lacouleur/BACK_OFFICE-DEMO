/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../../../../styles/css/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import {
  SectionBox,
  SectionTitle,
  Gradient,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  ModuleContainer,
  Delete,
  ActionIcons,
  FieldAndSwitchContainer,
  SeparatorWhite,
  CollectionSectionTitleBox,
  CollectionSectionTitle,
  CollectionSectionDescritpion,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  closeModule,
  setCollectionIsPaginated,
  setCollectionSearchInput,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import HeaderSectionPage from "../HeaderSectionPage";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import SwitchButton from "../../../../Tools/Switch";
import DragAndDropCustomList from "./DragAndDropCustomList";
import {
  FilterFieldContainer,
  FilterInput,
} from "../../../../../styles/styledComponents/global/FilterField.sc";

const CollectionModule = ({
  isPage,
  title,
  subtitle,
  url,
  openNewTabHeader,
  uuid,
  isChanged,
  isOpenCloseModal,
  isNewModule,
  order,
  categories,
  tags,
  limit,
  collectionType,
  collectionFormat,
  paginate,
  isPined,
  customIdsList,
  searchedInput,
  pinnedContents,
  ids,
  cumulatedContentsList,
  fetchedCustomList,
  currentPage,
  nextPage,
  lastPage,
}) => {
  const dispatch = useDispatch();
  const collectionModuleRef = useRef(null);
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { pageId, lang } = PageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    watchNewModules(isNewModule, collectionModuleRef, setIsOpen);
  }, [isNewModule]);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isNewModule && isChanged) {
        dispatch(saveModule(uuid, "save"));
      }
      if (isChanged && !isNewModule) {
        dispatch(saveModule(uuid, "update"));
      }
    }
  }

  useClickOutside(collectionModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={collectionModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={collectionModuleRef}
          articleId={pageId}
        />
      )}

      {!isOpen && <Gradient />}

      <SectionBox isOpen={isOpen} onClick={() => setIsOpen(true)}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (isNewModule) {
                dispatch(closeModule(uuid));
              }
              if (status !== "PUBLISHED" && uuid) {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>
        <SectionTitle>
          <FormTitle>{`${order}. collection`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}
        {isPage && (
          <HeaderSectionPage
            uuid={uuid}
            title={title}
            subtitle={subtitle}
            url={url}
            openNewTabHeader={openNewTabHeader}
          />
        )}

        <CollectionSectionTitleBox>
          <CollectionSectionTitle>
            COLLECTION MAIN SETTING -
          </CollectionSectionTitle>
          <CollectionSectionDescritpion>
            choose your collection type
            {/* choose if your collection is a slider or a gird */}
          </CollectionSectionDescritpion>
        </CollectionSectionTitleBox>

        <FieldAndSwitchContainer>
          <Field
            placeholder="Collection Format"
            name="collectionFormat"
            section="collection"
            fieldType="select"
            moduleId={uuid}
            edit={collectionFormat || "carousel"}
            /*  infos="Choose if you want your collection displayed as a Grid or as a Slider" */
          />
          <SwitchButton
            action={() => {
              dispatch(
                setCollectionIsPaginated({
                  id: uuid,
                  value: !paginate,
                })
              );
            }}
            isChecked={paginate}
            componentId={`collection-switch-paginate-${uuid}`}
            displayedText="Paginate ?"
            tooltipMessage="By default the collection display selected images only, in -paginate- mode it will display to user a button to load more content"
          />
        </FieldAndSwitchContainer>

        <Field
          placeholder="Collection Type"
          name="collectionType"
          section="collection"
          fieldType="select"
          moduleId={uuid}
          edit={collectionType || "secondary"}
          infos="Primary is only for Main Page"
        />

        <SeparatorWhite />
        <CollectionSectionTitleBox>
          <CollectionSectionTitle>
            AUTOMATIC COLLECTION -
          </CollectionSectionTitle>
          <CollectionSectionDescritpion>
            A collection will be self generated folowing your selected filters :
            category, tags, limit.
          </CollectionSectionDescritpion>
        </CollectionSectionTitleBox>

        <Field
          placeholder="Category to call"
          name="categories"
          section="collection"
          fieldType="multi-value"
          moduleId={uuid}
          edit={categories || null}
        />
        <Field
          placeholder="Tags to call"
          name="tags"
          section="collection"
          fieldType="multi-value"
          moduleId={uuid}
          edit={tags || ""}
          lang={lang}
        />
        <Field
          placeholder="Limit criteria"
          name="limit"
          section="collection"
          type="number"
          moduleId={uuid}
          edit={limit || 6}
        />

        <SeparatorWhite />
        <CollectionSectionTitleBox>
          <CollectionSectionTitle>CUSTOM COLLECTION -</CollectionSectionTitle>
          <CollectionSectionDescritpion>
            Please note that &quot;automatic&quot; section filters will be
            ignored if you have items in your custom list
          </CollectionSectionDescritpion>
        </CollectionSectionTitleBox>

        <FilterFieldContainer>
          <FilterInput
            type="search"
            placeholder="Search articles"
            onChange={(e) => {
              dispatch(
                setCollectionSearchInput({ id: uuid, value: e.target.value })
              );
            }}
          />
        </FilterFieldContainer>

        <DragAndDropCustomList
          uuid={uuid}
          customIdsList={customIdsList}
          cumulatedContentsList={cumulatedContentsList}
          fetchedCustomList={fetchedCustomList}
          currentPage={currentPage}
          nextPage={nextPage}
          lastPage={lastPage}
          isPined={isPined}
          lang={lang}
          pinnedContents={pinnedContents}
          ids={ids}
          searchedInput={searchedInput}
        />
      </SectionBox>
    </ModuleContainer>
  );
};

CollectionModule.defaultProps = {
  title: "",
  subtitle: "",
  url: "",
  openNewTabHeader: true,
  isPage: undefined,
  categories: undefined,
  tags: undefined,
  limit: 6,
  customIdsList: undefined,
  cumulatedContentsList: [],
  fetchedCustomList: [],
  currentPage: undefined,
  nextPage: undefined,
  lastPage: undefined,
  isPined: false,
  pinnedContents: undefined,
  ids: undefined,
  searchedInput: undefined,
};

CollectionModule.propTypes = {
  isPage: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  collectionType: PropTypes.string.isRequired,
  collectionFormat: PropTypes.string.isRequired,
  paginate: PropTypes.bool.isRequired,
  customIdsList: PropTypes.string,
  cumulatedContentsList: PropTypes.arrayOf(PropTypes.shape({})),
  fetchedCustomList: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  nextPage: PropTypes.number,
  lastPage: PropTypes.number,
  isPined: PropTypes.bool,
  pinnedContents: PropTypes.string,
  ids: PropTypes.string,
  searchedInput: PropTypes.string,
};
export default CollectionModule;
