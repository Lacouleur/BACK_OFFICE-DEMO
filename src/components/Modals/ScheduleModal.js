import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import {
  setIsOpenArchiveModal,
  setIsOpenscheduleModal,
} from "../../store/actions/actionBarActions";
import { archiveContent } from "../../store/actions/thunk/ArticlesActions.thunk";
import crossIcon from "../../styles/assets/icons/cross-white.svg";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  Cross,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";

const scheduleModal = ({ id }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = (link) => {
    history.push(link);
  };

  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { articleToDelete } = ActionBarState;
  const articleId = id || articleToDelete;

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenscheduleModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        <Message>Im the Schedule modal :)</Message>
        <Cross
          src={crossIcon}
          onClick={() => dispatch(setIsOpenscheduleModal(false))}
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
              dispatch(setIsOpenscheduleModal(false));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch(setIsOpenscheduleModal(false));
            }}
          >
            SCHEDULE
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

scheduleModal.defaultProps = {
  id: undefined,
};

scheduleModal.propTypes = {
  id: PropTypes.string,
};

export default scheduleModal;
