import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import { setAModuleIsOpen } from "../../../../../store/actions/actionBarActions";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import {
  ActionIcons,
  Delete,
  FieldAndSwitchContainer,
  ModuleContainer,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import CloseModal from "../../../../Modals/CloseModal";
import HideModal from "../../../../Modals/HideModal";
import {
  Gradient,
  SectionBox,
  SectionTitle,
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
  altHomeImage,
  featuredLinkCtaValue,
  featuredLinkCtaOpenNewTab,
  openNewTabHeader,
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

  const { articleId, status } = pageMainInformationState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    watchNewModules(isNewModule, featuredModuleRef, setIsOpen);
  }, [isNewModule]);

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
          {status === "DRAFT" && (
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
          )}
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. HIGHLIGHT`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        <HeaderSectionPage
          uuid={uuid}
          title={title}
          subtitle={subtitle}
          url={url}
          openNewTabHeader={openNewTabHeader}
        />

        <Field
          placeholder="Custom Title"
          name="title"
          section="featured"
          edit={featuredTitle || ""}
          moduleId={uuid}
        />

        <Field
          placeholder="Custom Title"
          name="excerpt"
          section="featured"
          edit={featuredExcerpt || ""}
          moduleId={uuid}
        />

        <Field
          placeholder="Custom Title"
          name="altHomeImage"
          section="featured"
          edit={altHomeImage || ""}
          moduleId={uuid}
        />
        <FieldAndSwitchContainer>
          <Field
            placeholder="Custom Title"
            name="featuredLinkCta"
            section="featured"
            edit={featuredLinkCtaValue || ""}
            moduleId={uuid}
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
      </SectionBox>
    </ModuleContainer>
  );
};

/* FeaturedModule.defaultProps = {
  position: undefined,
}; */

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
  altHomeImage: PropTypes.string.isRequired,
  featuredLinkCtaValue: PropTypes.string.isRequired,
  featuredLinkCtaOpenNewTab: PropTypes.bool.isRequired,
  openNewTabHeader: PropTypes.bool.isRequired,
};

export default FeaturedModule;
