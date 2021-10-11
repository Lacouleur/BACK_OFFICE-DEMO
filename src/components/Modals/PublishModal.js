import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { setIsOpenPublishModal } from "../../store/actions/actionBarActions";
import {
  cancelScheduledPublication,
  publishAction,
} from "../../store/actions/thunk/ActionBarActions.thunk";
import { getStatus } from "../../store/actions/thunk/ArticlesActions.thunk";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";

const PublishModal = ({ actionName, articleId }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );
  const { isManifesto, manifestoId } = manifestoState;

  function handlePublish() {
    if (!isManifesto) {
      dispatch(publishAction(articleId, actionName));
    }
    if (isManifesto) {
      dispatch(publishAction(manifestoId, actionName));
    }
  }

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenPublishModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        {actionName === "CANCEL" && (
          <Message>
            Are you sure you want to cancel the scheduled publication of this
            content ?
          </Message>
        )}
        {actionName !== "CANCEL" && (
          <Message>
            {`Are you sure you want to ${actionName} this content ?`}
          </Message>
        )}
        <ButtonsBox>
          <Button
            type="button"
            styles={{
              background: "transparent",
              fontColor: "white",
              border: "1px solid white",
            }}
            onClick={() => {
              dispatch(setIsOpenPublishModal(false));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (actionName === "CANCEL") {
                dispatch(cancelScheduledPublication(articleId));
                dispatch(getStatus(articleId));
                dispatch(setIsOpenPublishModal(false));
              } else {
                handlePublish(actionName === "UPDATE" ? "PUBLISH" : actionName);
                dispatch(setIsOpenPublishModal(false));
              }
            }}
          >
            {actionName}
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

PublishModal.propTypes = {
  actionName: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default PublishModal;
