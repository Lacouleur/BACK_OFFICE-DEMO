import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { handleButton } from "../../helper/modalsHelper";
import { setIsOpenPublishModal } from "../../store/actions/actionBarActions";
import {
  setContentIsMovedToTop,
  setContentOriginalDate,
} from "../../store/actions/mainInformationActions";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  ButtonsBox,
} from "../../styles/styledComponents/modal/Modal.sc";
import SwitchButton from "../Tools/Switch";

const PublishModal = ({ actionName, id, articleStatus }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();

  const manifestoState = useSelector(
    ({ manifestoReducer }) => manifestoReducer
  );

  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const {
    isMovedToTop,
    canUndoMoveToTop,
    undoMoveToTop,
  } = mainInformationState;

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
    <ModalContainer height="200vh" ref={modal}>
      <ModalBox>
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

        {articleStatus &&
          articleStatus !== "DRAFT" &&
          actionName !== "UNPUBLISH" && (
            <>
              <SwitchButton
                disable={undoMoveToTop}
                styleVariant="publishModal-toTop"
                action={() => {
                  dispatch(setContentIsMovedToTop(!isMovedToTop));
                  dispatch(
                    setContentOriginalDate(isMovedToTop ? false : undoMoveToTop)
                  );
                }}
                isChecked={!!(isMovedToTop === true && undoMoveToTop === false)}
                componentId="switch-publishmodal-moveToTop"
                displayedText="Move article to top"
              />

              {canUndoMoveToTop && (
                <SwitchButton
                  styleVariant="publishModal-toBottom"
                  action={() => {
                    dispatch(setContentOriginalDate(!undoMoveToTop));
                    dispatch(
                      setContentIsMovedToTop(
                        undoMoveToTop ? false : isMovedToTop
                      )
                    );
                  }}
                  isChecked={undoMoveToTop}
                  componentId="switch-publishModal-toBottom"
                  displayedText="Move to first Publish date"
                />
              )}
            </>
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
              dispatch(setContentOriginalDate(false));
              dispatch(setContentIsMovedToTop(false));
              dispatch(setIsOpenPublishModal(false));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              handleButton(dispatch, actionName, id, manifestoState);
            }}
          >
            {actionName}
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

PublishModal.defaultProps = {
  articleStatus: undefined,
};

PublishModal.propTypes = {
  actionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  articleStatus: PropTypes.string,
};

export default PublishModal;
