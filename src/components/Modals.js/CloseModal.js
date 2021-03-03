/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
} from "../../styles/styledComponents/modal/CloseModal.sc";

const CloseModal = ({ moduleId, moduleRef, articleId }) => {
  console.log("UUID IN CLOSE MODAL", moduleId);
  const modal = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    modal.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <ModalContainer ref={modal}>
      <ModalBox>
        <Message>If you remove this module, content will be lost.</Message>
        <Cross
          src={crossIcon}
          onClick={() =>
            // eslint-disable-next-line prettier/prettier
            dispatch(showCloseModal({ value: false, id: moduleId }))}
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
              moduleRef?.current.scrollIntoView({ behavior: "smooth" });
              dispatch(showCloseModal({ value: false, id: moduleId }));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={() => {
              moduleRef?.current.scrollIntoView({ behavior: "smooth" });
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
