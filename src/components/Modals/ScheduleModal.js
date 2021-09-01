import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import {
  setIsOpenscheduleModal,
  setIsScheduled,
} from "../../store/actions/actionBarActions";
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
import { schedulePublication } from "../../store/actions/thunk/ActionBarActions.thunk";

const scheduleModal = () => {
  const modal = useRef(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const { articleId } = useParams();
  const actualDate = new Date();

  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { scheduledTime } = ActionBarState;

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

  /*   function (datee, minutes) {
    return new Date(date.getTime() + 5 * 60000);
  } */

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
            minDate={new Date(date.getTime() + 5 * 60000)}
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
            disabled={!(date >= new Date(actualDate.getTime() + 5 * 60000))}
            onClick={() => {
              if (date >= new Date(actualDate.getTime() + 5 * 60000)) {
                dispatch(schedulePublication(articleId, date));
                dispatch(setIsOpenscheduleModal(false));
              } else {
                dispatch(setIsOpenscheduleModal(false));
              }
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
