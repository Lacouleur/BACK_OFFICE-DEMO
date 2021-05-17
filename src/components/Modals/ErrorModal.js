import React, { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { showErrorModal } from "../../store/actions/actionBarActions";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";

const ErrorModal = () => {
  const modal = useRef(null);
  const dispatch = useDispatch();

  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { errorMessage } = ActionBarState;

  useEffect(() => {
    modal.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  function onClickOutside() {
    dispatch(showErrorModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        {errorMessage && <Message>{errorMessage}</Message>}
        {!errorMessage && (
          <Message>
            Oups, something went wrong.
            <p>Please try again or contact administrator.</p>
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
              dispatch(showErrorModal(false));
            }}
          >
            OK
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default ErrorModal;
