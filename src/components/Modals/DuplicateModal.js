import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useClickOutside from "../../helper/cutomHooks/useClickOutside";
import { setIsOpenDuplicateModal } from "../../store/actions/contentListActions";

import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import {
  DuplicateTitle,
  ModalBox,
  ModalContainer,
  ButtonsBox,
  Text,
  ChoiceContainer,
  OptionBox,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
  TradContainer,
  Separator,
} from "../../styles/styledComponents/modal/Modal.sc";
import { Selector } from "../../styles/styledComponents/global/Field.sc";
import langList from "../../helper/langList";
import { convertLang, handleCheck } from "../../helper/modalsHelper";

const DuplicateModal = () => {
  const modal = useRef(null);
  const checkSimple = useRef(null);
  const history = useHistory();
  const checkTrad = useRef(null);
  const dispatch = useDispatch();
  const [simpleChecked, setSimpleChecked] = useState(true);
  const [tradChecked, setTradChecked] = useState(false);
  const [selectedLang, setSelectedLang] = useState();

  const contentsListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );

  const { id, lang } = contentsListState.isOpenDuplicateModal;

  useEffect(() => {
    modal.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    convertLang(lang, setSelectedLang);
  }, []);

  function onClickOutside() {
    dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
  }

  useClickOutside(modal, onClickOutside);

  return (
    <ModalContainer height="200vh">
      <ModalBox height={!tradChecked ? "270px" : "400px"} ref={modal}>
        <DuplicateTitle>Duplicate a content</DuplicateTitle>
        <Text>What do you want to do by duplicating this article ?</Text>
        <ChoiceContainer>
          <OptionBox
            onClick={() => {
              checkSimple.current.click();
            }}
          >
            <CheckboxContainer>
              <HiddenCheckbox
                ref={checkSimple}
                onChange={() => {
                  setSimpleChecked(!simpleChecked);
                  setTradChecked(false);
                }}
                checked={simpleChecked}
              />
              <StyledCheckbox checked={simpleChecked}>
                <Icon />
              </StyledCheckbox>
            </CheckboxContainer>
            <Text>It&apos;s a simple duplication</Text>
          </OptionBox>
          <OptionBox
            onClick={() => {
              checkTrad.current.click();
            }}
          >
            <CheckboxContainer>
              <HiddenCheckbox
                ref={checkTrad}
                onChange={() => {
                  setTradChecked(!tradChecked);
                  setSimpleChecked(false);
                }}
                checked={tradChecked}
              />
              <StyledCheckbox checked={tradChecked}>
                <Icon />
              </StyledCheckbox>
            </CheckboxContainer>
            <Text>It&apos;s a traduction</Text>
          </OptionBox>
        </ChoiceContainer>

        {tradChecked && (
          <>
            <Separator />
            <TradContainer>
              <p>What language do you want to translate into?</p>
              <Selector
                value={selectedLang}
                options={langList}
                classNamePrefix="select"
                placeholder="Select a language"
                isClearable={false}
                onChange={(e) => {
                  setSelectedLang(e);
                }}
              />
            </TradContainer>
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
              dispatch(setIsOpenDuplicateModal({ value: false, id: "" }));
            }}
          >
            CANCEL
          </Button>
          <Button
            type="button"
            disabled={!!(!selectedLang && tradChecked)}
            onClick={() => {
              handleCheck(
                dispatch,
                simpleChecked,
                id,
                tradChecked,
                selectedLang,
                history
              );
            }}
          >
            {tradChecked ? "TRANSLATE" : "DUPLICATE"}
          </Button>
        </ButtonsBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default DuplicateModal;
