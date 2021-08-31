import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { setIsOpenscheduleModal } from "../../store/actions/actionBarActions";
import crossIcon from "../../styles/assets/icons/cross-white.svg";
import clearIcon from "../../styles/assets/icons/cross-white-light.svg";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  Message,
  ModalBox,
  ModalContainer,
  Cross,
  ButtonsBox,
  DatePicker,
  DateContainer,
  DatePickerIcon,
} from "../../styles/styledComponents/modal/Modal.sc";

const scheduleModal = ({ id }) => {
  const modal = useRef(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

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
        <Message>Please, pick a date :)</Message>
        <Cross
          src={crossIcon}
          onClick={() => dispatch(setIsOpenscheduleModal(false))}
        />
        <DateContainer>
          <DatePicker
            value={date}
            onChange={setDate}
            disableClock
            calendarIcon={false}
            clearIcon={<DatePickerIcon src={clearIcon} />}
          />
        </DateContainer>
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
