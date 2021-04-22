import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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

  useEffect(() => {
    modal.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <ModalContainer ref={modal} height="200vh">
      <ModalBox>
        <Message>
          Oups, something went wrong.
          <p>Please try again or contact administrator.</p>
        </Message>
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
