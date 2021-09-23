import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { showHideModal } from "../../store/actions/actionBarActions";
import crossIcon from "../../styles/assets/icons/cross-white.svg";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  Cross,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";
import { setIsVisible } from "../../store/actions/moduleActions";

const HideModal = () => {
  const modal = useRef(null);
  const dispatch = useDispatch();

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { hideModal } = actionBarState;

  const { type, moduleId } = hideModal;

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(showHideModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer>
      <ModalBox hideModal ref={modal}>
        {type === "hide" && (
          <>
            <Message>
              If you hide this component, data will still valid.
            </Message>
            <Message>
              Please note that the component will be hide on front side on your
              next publishing action.
            </Message>
          </>
        )}
        {type === "show" && (
          <>
            <Message>
              If you show this component, data will still valid.
            </Message>
            <Message>
              Please note that the component will be displayed on front side on
              your next publishing action.
            </Message>
          </>
        )}

        <Cross
          src={crossIcon}
          onClick={() => {
            dispatch(showHideModal(false));
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
              dispatch(showHideModal(false));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              dispatch(showHideModal(false));
              dispatch(
                setIsVisible({
                  id: moduleId,
                  value: type !== "hide",
                })
              );
            }}
          >
            {type}
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default HideModal;
