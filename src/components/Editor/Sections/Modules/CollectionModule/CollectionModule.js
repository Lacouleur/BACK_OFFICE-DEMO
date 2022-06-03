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
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import {
  setCollectionIsPaginated,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import CloseModal from "../../../../Modals/CloseModal";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import Field from "../../../Field";
import HeaderSectionPage from "../HeaderSectionPage";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { fetchTags } from "../../../../../store/actions/thunk/ArticlesActions.thunk";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import SwitchButton from "../../../../Tools/Switch";

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
}) => {
  const dispatch = useDispatch();
  const collectionModuleRef = useRef(null);
  const PageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { pageId, lang, tagsList } = PageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    watchNewModules(isNewModule, collectionModuleRef, setIsOpen);
  }, [isNewModule]);

  useEffect(() => {
    if (!tagsList) {
      dispatch(fetchTags(lang));
    }
  }, []);

  function onClickOutside() {
    if (!isOpenCloseModal) {
      setIsOpen(false);
      if (isChanged && isNewModule) {
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
        <FieldAndSwitchContainer>
          <Field
            placeholder="Collection Format"
            name="collectionFormat"
            section="collection"
            fieldType="select"
            moduleId={uuid}
            edit={collectionFormat || "carousel"}
            infos="Choose if you want your collection displayed as a Grid or as a Slider"
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
            componentId={`collection-switch-${uuid}`}
            displayedText="Paginate ?"
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
          moduleId={uuid}
          edit={limit || 6}
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
};
export default CollectionModule;
