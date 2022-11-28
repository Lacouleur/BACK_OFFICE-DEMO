import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import {
  ActionIcons,
  InnerSectionDescritpion,
  InnerSectionTitle,
  InnerSectionTitleBox,
  Delete,
  FieldAndSwitchContainer,
  ModuleContainer,
  SeparatorWhite,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import CloseModal from "../../../../Modals/CloseModal";
import HideModal from "../../../../Modals/HideModal";
import {
  Gradient,
  SectionBox,
  SectionTitle,
  Thumbnail,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import {
  closeModule,
  setFeaturedLinkCta,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import Field from "../../../Field";
import HeaderSectionPage from "../HeaderSectionPage";
import SwitchButton from "../../../../Tools/Switch";
import {
  ColorFieldBox,
  ImageFieldBox,
  VisualiseColorStyle,
} from "../../../../../styles/styledComponents/global/Field.sc";
import { fetchAuthorsList } from "../../../../../store/actions/thunk/ArticlesActions.thunk";

const FeaturedModule = ({
  uuid,
  order,
  isOpenCloseModal,
  isNewModule,
  isChanged,
  title,
  subtitle,
  url,
  featuredTitle,
  featuredExcerpt,
  featuredImageAlt,
  featuredLinkCtaValue,
  featuredLinkCtaOpenNewTab,
  openNewTabHeader,
  featuredImageThumbnailUrl,
  featuredImageUuid,
  backgroundColor,
  sticker,
  featuredCategory,
  tags,
  categories,
  authors,
  slug,
}) => {
  const dispatch = useDispatch();
  const featuredModuleRef = useRef(null);
  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { hideModal } = actionBarState;

  const pageMainInformationState = useSelector(
    ({ pageMainInformationReducer }) => pageMainInformationReducer
  );

  const { articleId } = pageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturedImage, setIsFeaturedImage] = useState(false);
  const [featuredImageTitle, setFeaturedImageTitle] = useState(false);

  useEffect(() => {
    if (featuredImageUuid) {
      setFeaturedImageTitle(featuredImageUuid.split("/")[1]);
      setIsFeaturedImage(true);
    }
  }, [featuredImageUuid]);

  useEffect(() => {
    watchNewModules(isNewModule, featuredModuleRef, setIsOpen);
  }, []);

  useEffect(() => {
    dispatch(fetchAuthorsList());
  }, []);

  useEffect(() => {
    dispatch(setAModuleIsOpen(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (isOpenCloseModal) {
      setIsOpen(true);
    }
  }, [isOpenCloseModal]);

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

  useClickOutside(featuredModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={featuredModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={featuredModuleRef}
          articleId={articleId}
        />
      )}

      {hideModal?.isOpen && hideModal?.moduleId === uuid && <HideModal />}

      {!isOpen && <Gradient />}

      <SectionBox onClick={() => setIsOpen(true)} isOpen={isOpen}>
        <ActionIcons>
          <Delete
            src={trashIcon}
            onClick={() => {
              if (isNewModule) {
                dispatch(closeModule(uuid));
              }
              if (!isNewModule) {
                dispatch(showCloseModal({ value: true, id: uuid }));
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. HIGHLIGHT`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        {/* TITLE FIELD */}
        <Field
          placeholder="Custom Title"
          name="title"
          displayName="Custom Title"
          section="featured"
          edit={featuredTitle || ""}
          moduleId={uuid}
        />

        {/* EXCERPT FIELD */}
        <Field
          placeholder="Excerpt"
          name="excerpt"
          displayName="Excerpt"
          section="featured"
          edit={featuredExcerpt || ""}
          moduleId={uuid}
        />

        {/* FEATURED IMAGE FIELD & ALT */}
        <ImageFieldBox>
          <Field
            placeholder="Home Image"
            name="featuredImage"
            displayName="Featured Image"
            section="featured"
            fieldType="uploader"
            edit={featuredImageTitle || undefined}
            infos="Image size: 320x568px - 500ko maximum"
            moduleId={uuid}
          />

          {featuredImageThumbnailUrl && isFeaturedImage && (
            <Thumbnail src={featuredImageThumbnailUrl} />
          )}
        </ImageFieldBox>
        {isFeaturedImage && (
          <>
            <Field
              placeholder="Alternative text for Home-Image"
              name="featuredImageAlt"
              displayName=" Alt Featured Image"
              section="featured"
              edit={featuredImageAlt || ""}
              moduleId={uuid}
            />
          </>
        )}

        {/* BACKGROUND COLOR FIELD */}
        <ColorFieldBox>
          <Field
            placeholder="Background Color"
            name="featuredBackgroundColor"
            displayName="Featured Background Color"
            section="featured"
            fieldType="select"
            edit={backgroundColor || undefined}
            moduleId={uuid}
          />
          {backgroundColor && (
            <>
              <VisualiseColorStyle variant={backgroundColor} />
            </>
          )}
        </ColorFieldBox>

        {/* STICKERS FIELD */}
        <Field
          placeholder="Sticker"
          name="sticker"
          displayName="Sticker"
          section="featured"
          fieldType="select"
          edit={sticker || "new-article"}
          moduleId={uuid}
          isClearable={false}
          isDisabled
        />

        {/* FEATURED LINK FIELD AND SWITCH */}
        <FieldAndSwitchContainer>
          <Field
            placeholder="Custom Title"
            name="featuredLinkCta"
            displayName="Featured Link Cta"
            section="featured"
            edit={featuredLinkCtaValue || ""}
            moduleId={uuid}
            disabled
            clearable={false}
          />
          <SwitchButton
            action={() => {
              dispatch(
                setFeaturedLinkCta({
                  id: uuid,
                  openNewTab: !featuredLinkCtaOpenNewTab,
                })
              );
            }}
            isChecked={featuredLinkCtaOpenNewTab}
            componentId={`featured-cta-link-${uuid}`}
            displayedText="Open new tab ?"
          />
        </FieldAndSwitchContainer>

        {/* FEATURED CATEGORY FIELD */}
        <Field
          placeholder="Featured Category"
          name="featuredCategory"
          displayName="Feature Category"
          section="featured"
          edit={featuredCategory}
          moduleId={uuid}
        />

        {/* AUTOMATIC SECTION HEADER */}
        <SeparatorWhite />
        <InnerSectionTitleBox>
          <InnerSectionTitle> automatic -</InnerSectionTitle>
          <InnerSectionDescritpion>
            Content will be self generated folowing your selected filters
          </InnerSectionDescritpion>
        </InnerSectionTitleBox>

        {/* CATEGORY MULTI SELECTOR */}
        <Field
          placeholder="Category to call"
          name="categories"
          displayName="Categories"
          section="featured"
          fieldType="multi-value"
          moduleId={uuid}
          edit={categories || null}
        />

        {/* TAGS MULTI SELECTOR */}
        <Field
          placeholder="Tags to call"
          name="tags"
          displayName="Tags"
          section="featured"
          fieldType="multi-value"
          moduleId={uuid}
          edit={tags || ""}
        />

        {/* AUTHORS MULTI SELECTOR */}
        <Field
          placeholder="Authors to call"
          name="authors"
          displayName="Authors"
          section="featured"
          fieldType="multi-value"
          moduleId={uuid}
          edit={authors || ""}
        />

        {/* CUSTOM SECTION HEADER */}
        <SeparatorWhite />
        <InnerSectionTitleBox>
          <InnerSectionTitle> CUSTOM -</InnerSectionTitle>
          <InnerSectionDescritpion>
            Copy and past the slug of the article to highlight
          </InnerSectionDescritpion>
        </InnerSectionTitleBox>

        {/* CUSTOM SLUG FIELD */}
        <Field
          placeholder="article-slug"
          name="slug"
          displayName="Article Slug"
          section="featured"
          edit={slug}
          moduleId={uuid}
        />
      </SectionBox>
    </ModuleContainer>
  );
};

FeaturedModule.defaultProps = {
  featuredImageThumbnailUrl: undefined,
  featuredImageUuid: undefined,
  backgroundColor: "",
  sticker: undefined,
  featuredCategory: undefined,
  tags: undefined,
  categories: undefined,
  authors: undefined,
  slug: undefined,
  openNewTabHeader: false,
  featuredLinkCtaOpenNewTab: false,
};

FeaturedModule.propTypes = {
  uuid: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  isChanged: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  featuredTitle: PropTypes.string.isRequired,
  featuredExcerpt: PropTypes.string.isRequired,
  featuredImageAlt: PropTypes.string.isRequired,
  featuredLinkCtaValue: PropTypes.string.isRequired,
  featuredLinkCtaOpenNewTab: PropTypes.bool,
  openNewTabHeader: PropTypes.bool,
  featuredImageThumbnailUrl: PropTypes.string,
  featuredImageUuid: PropTypes.string,
  backgroundColor: PropTypes.string,
  sticker: PropTypes.string,
  featuredCategory: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
  authors: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string,
};

export default FeaturedModule;
