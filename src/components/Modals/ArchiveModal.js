import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { setIsOpenArchiveModal } from "../../store/actions/actionBarActions";
import { archiveContent } from "../../store/actions/clientActions";
import crossIcon from "../../styles/assets/icons/cross-white.svg";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  Cross,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";

const ArchiveModal = ({ articleId }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = (link) => {
    history.push(link);
  };

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenArchiveModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        <Message>Are you sure you want to archive this content ?</Message>
        <Cross
          src={crossIcon}
          onClick={() => dispatch(setIsOpenArchiveModal(false))}
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
              dispatch(setIsOpenArchiveModal(false));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch(setIsOpenArchiveModal(false));
              dispatch(archiveContent(articleId, redirectTo));
            }}
          >
            DELETE
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

ArchiveModal.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default ArchiveModal;
