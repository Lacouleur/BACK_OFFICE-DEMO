import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionIcons,
  Delete,
  Hide,
  ModuleContainer,
} from "../../../../../styles/styledComponents/editor/modules/Modules.sc";
import CloseModal from "../../../../Modals/CloseModal";
import {
  Gradient,
  SectionBox,
  SectionTitle,
} from "../../../../../styles/styledComponents/editor/Sections.sc";
import trashIcon from "../../../../../styles/assets/icons/trash.svg";
import {
  closeModule,
  showCloseModal,
} from "../../../../../store/actions/moduleActions";
import { FormTitle } from "../../../../../styles/styledComponents/global/Titles.sc";
import Field from "../../../Field";
import {
  setAModuleIsOpen,
  showHideModal,
} from "../../../../../store/actions/actionBarActions";
import { watchNewModules } from "../../../../../helper/modulesHelper";
import useClickOutside from "../../../../../helper/cutomHooks/useClickOutside";
import { saveModule } from "../../../../../store/actions/thunk/ModulesActions.thunk";
import eyeIcon from "../../../../../styles/assets/icons/eye-circle-green.svg";
import eyeUnabled from "../../../../../styles/assets/icons/eye-circle-green-unabled.svg";
import HideModal from "../../../../Modals/HideModal";

const FeedBackModule = ({
  uuid,
  order,
  isOpenCloseModal,
  isNewModule,
  isChanged,
  question,
  isVisible,
}) => {
  const dispatch = useDispatch();
  const feedBackModuleRef = useRef(null);
  const MainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { articleId } = MainInformationState;

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { hideModal } = actionBarState;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    watchNewModules(isNewModule, feedBackModuleRef, setIsOpen);
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
        console.log("MUOIE");
        dispatch(saveModule(uuid, "update"));
      }
    }
  }

  useClickOutside(feedBackModuleRef, onClickOutside);

  return (
    <ModuleContainer ref={feedBackModuleRef}>
      {isOpenCloseModal && (
        <CloseModal
          moduleId={uuid}
          moduleRef={feedBackModuleRef}
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
          <Hide
            src={isVisible ? eyeIcon : eyeUnabled}
            onClick={() => {
              if (isVisible) {
                dispatch(
                  showHideModal({ value: true, id: uuid, type: "hide" })
                );
              } else {
                dispatch(
                  showHideModal({ value: true, id: uuid, type: "show" })
                );
              }
            }}
          />
        </ActionIcons>

        <SectionTitle>
          <FormTitle>{`${order}. FEEDBACK`}</FormTitle>
        </SectionTitle>
        {!isOpen && <Gradient />}

        <Field
          placeholder="What question do you want to ask ?"
          name="question"
          displayName="Question"
          section="feedback"
          edit={question || ""}
          maxlength="110"
          infos="Maximum 110 characters"
          moduleId={uuid}
        />
      </SectionBox>
    </ModuleContainer>
  );
};

FeedBackModule.defaultProps = {
  question: undefined,
  isVisible: true,
};

FeedBackModule.propTypes = {
  uuid: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  isOpenCloseModal: PropTypes.bool.isRequired,
  isNewModule: PropTypes.bool.isRequired,
  isChanged: PropTypes.bool.isRequired,
  question: PropTypes.string,
  isVisible: PropTypes.bool,
};

export default FeedBackModule;
