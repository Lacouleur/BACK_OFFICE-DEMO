import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import {
  setIsOpenScheduleModal,
  setPublishScheduleFailData,
  setPublishScheduleFailed,
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
  MessageSmall,
} from "../../styles/styledComponents/modal/Modal.sc";
import { schedulePublication } from "../../store/actions/thunk/ActionBarActions.thunk";

const scheduleModal = () => {
  const ActionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const { isScheduled } = ActionBarState;
  const modal = useRef(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    isScheduled ? new Date(isScheduled) : new Date()
  );
  const { pageId, articleId } = useParams();

  const id = pageId || articleId;
  const actualDate = new Date();
  const DatePlusFiveMinutes = new Date(actualDate.getTime() + 5 * 60000);

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenScheduleModal(false));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox ref={modal}>
        <Message>Please, pick a date :)</Message>
        <Cross
          src={crossIcon}
          onClick={() => dispatch(setIsOpenScheduleModal(false))}
        />
        <MessageSmall>
          The selected date must be at least 5 minutes later than the current
          date.
        </MessageSmall>

        <DateContainer>
          <DatePicker
            value={date}
            onChange={setDate}
            disableClock
            calendarIcon={false}
            clearIcon={<DatePickerIcon src={clearIcon} />}
            minDate={DatePlusFiveMinutes}
          />
        </DateContainer>

        <ButtonsBox>
          <Button
            type="button"
            modalCancelButton
            onClick={() => {
              dispatch(setIsOpenScheduleModal(false));
            }}
          >
            CANCEL
          </Button>

          <Button
            type="button"
            disabled={!(date >= DatePlusFiveMinutes)}
            onClick={() => {
              if (date >= DatePlusFiveMinutes) {
                dispatch(schedulePublication(id, date));
                dispatch(setPublishScheduleFailed(null));
                dispatch(setPublishScheduleFailData(null));
                dispatch(setIsOpenScheduleModal(false));
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
