import React, { useRef, useEffect, useState } from "react";

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
  const [messages, setMessages] = useState();

  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { errorMessage } = ActionBarState;

  function setErrorsList() {
    if (Array.isArray(errorMessage)) {
      setMessages(errorMessage);
    } else {
      setMessages([{ message: errorMessage }]);
    }
  }

  useEffect(() => {
    setErrorsList();
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(showErrorModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox
        ref={modal}
        height={messages && messages.length > 3 ? "27%" : "280px"}
      >
        {errorMessage && (
          <Message>
            Please check or report the following errors before trying again :
          </Message>
        )}
        {errorMessage &&
          messages &&
          messages.map((error, index) => {
            if (index < 5) {
              return <Message key={error.message}>{error.message}</Message>;
            }
            return null;
          })}
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
