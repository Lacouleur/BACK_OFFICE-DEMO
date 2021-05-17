import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { setIsOpenPublishModal } from "../../store/actions/actionBarActions";
import { publishAction } from "../../store/actions/clientActions";
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

  function handlePublish() {
    dispatch(publishAction(articleId, actionName));
  }

  useEffect(() => {
    modal.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenPublishModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        <Message>{`Are you sure you want to ${actionName} this content ?`}</Message>
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
              handlePublish(actionName === "UPDATE" ? "PUBLISH" : actionName);
              dispatch(setIsOpenPublishModal(false));
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
