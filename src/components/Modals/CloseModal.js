import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { deleteModule } from "../../store/actions/clientActions";
import { showCloseModal } from "../../store/actions/moduleActions";
import crossIcon from "../../styles/assets/icons/cross-white.svg";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  Cross,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";

const CloseModal = ({ moduleId, moduleRef, articleId }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(showCloseModal({ value: false, id: moduleId }));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer>
      <ModalBox closeModal ref={modal}>
        <Message>If you remove this module, content will be lost.</Message>
        <Cross
          src={crossIcon}
          onClick={() => {
            dispatch(showCloseModal({ value: false, id: moduleId }));
          }}
        />
        <ButtonsBox>
          <Button
            type="button"
            styles={{
              background: "transparent",
              fontColor: "white",
              border: "1px solid white",
            }}
            onClick={() => {
              moduleRef?.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
              dispatch(showCloseModal({ value: false, id: moduleId }));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              moduleRef?.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
              dispatch(showCloseModal({ value: false, id: moduleId }));
              dispatch(deleteModule(articleId, moduleId));
            }}
          >
            DELETE
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

CloseModal.propTypes = {
  moduleId: PropTypes.string.isRequired,
  moduleRef: PropTypes.shape({
    current: PropTypes.shape({
      scrollIntoView: PropTypes.func,
    }),
  }).isRequired,
  articleId: PropTypes.string.isRequired,
};

export default CloseModal;
