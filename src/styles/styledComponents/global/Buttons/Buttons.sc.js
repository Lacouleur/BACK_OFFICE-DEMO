import styled, { css } from "styled-components";
import colors from "../../../core/colors";

const disabledMixin = css`
  background-color: ${colors.lightGrey}!important;

  &:hover {
    opacity: 0.8 !important;
    cursor: not-allowed !important;
    box-shadow: 0px 0px 10px 1px ${colors.mediumGrey}!important;
  }
`;

const backButtonMixin = css`
  height: 42px;
  width: 124px;
  display: flex;
  background: transparent;
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 9px 26px;
  border: 1px solid ${colors.white};
`;

const saveButtonMixin = css`
  height: 42px;
  width: 79px;
  position: absolute;
  left: 15%;
  transform: translateY(-50%);
  top: 50%;
`;

const saveButtonDisableMixin = css`
  height: 42px;
  width: 79px;
  position: absolute;
  left: 15%;
  transform: translateY(-50%);
  top: 50%;
  background: ${colors.mediumGrey};
`;

const modalCancelButtonMixin = css`
  background-color: ${colors.mediumGrey};
  border: 1px solid white;
  color: white;
`;

const modalAlreadyTranslatedButtonMixin = css`
  width: 50%;
  margin-top: 18px;
`;

const createNewContentButtonMixin = css`
  width: 230px;
  height: 44px;
  align-items: center;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  margin-left: 32px;
  display: flex;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  justify-content: space-evenly;
  background-color: ${colors.paleViolet};
  color: ${colors.black};
`;

const addNewBlockButtonMixin = css`
  width: 200px;
  margin-top: 18px;
  margin-left: auto;
  margin-right: 0;
  background: ${colors.paleViolet};
`;

const addNewCollectionCardButtonMixin = css`
  width: 200px;
  margin-bottom: 18px;
  margin-left: auto;
  margin-right: 0;
  background: ${colors.paleViolet};
`;

const loginButtonClickableMixin = css`
  color: ${colors.black};
  background: ${colors.paleViolet};
  cursor: pointer;
  margin-top: auto;
`;

const loginButtonUnClickableMixin = css`
  color: ${colors.mediumGrey};
  background: ${colors.darkGrey};
  cursor: not-allowed;
  margin-top: auto;
  cursor: not-allowed;
`;

const editManifestoButtonMixin = css`
  background: ${colors.darkGrey};
  border: solid 1px ${colors.paleViolet};
  color: ${colors.paleViolet};
  position: absolute;
  left: 18%;
`;

const returnButtonMixin = css`
  height: 42px;
  width: 176px;
  display: flex;
  background: transparent;
  position: absolute;
  top: 88px;
  left: 24px;
  justify-content: space-between;
  align-items: center;
  padding: 9px 26px;
  border: 1px solid ${colors.white};
`;

const modifyButtonMixin = css`
  background: transparent;
  color: ${colors.paleViolet};
  border: 1px solid ${colors.paleViolet};
  font-weight: 700;
  width: 180px;
  padding-left: 16px;
  position: relative;
`;

const previewArticleButtonMixin = css`
  width: 150px;
  margin-left: 16px;
`;

const editButtonMixin = css`
  width: 70px;
  height: 44px;
  background-color: transparent;
  border: 1px solid ${colors.paleViolet};
  border-radius: 5px;
  color: ${colors.paleViolet};
  opacity: 0.8;

  &::active {
    background-color: ${colors.paleVioletTransp};
    box-shadow: inset 0px 0px 13px 4px #000000;
  }
`;

const buttonHoverMixin = css`
  box-shadow: 0px 0px 13px 4px ${colors.paleVioletTransp};
`;

const Button = styled.button`
  background-color: ${colors.paleViolet};
  color: ${colors.black};
  cursor: pointer;
  border-radius: 5px;
  border: none;
  width: 100px;
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  font-family: arial;
  display: box;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
  transition: 0.3s;
  opacity: 0.8;

  ${(props) => props.disabled && disabledMixin};
  ${(props) => props.backButton && backButtonMixin};
  ${(props) => props.saveButton && saveButtonMixin};
  ${(props) => props.saveButtonDisable && saveButtonDisableMixin};
  ${(props) => props.modalCancelButton && modalCancelButtonMixin};
  ${(props) =>
    props.modalAlreadyTranslatedButton && modalAlreadyTranslatedButtonMixin};
  ${(props) => props.createNewContentButton && createNewContentButtonMixin};
  ${(props) => props.loginButtonClickable && loginButtonClickableMixin};
  ${(props) => props.loginButtonUnClickable && loginButtonUnClickableMixin};
  ${(props) => props.editManifestoButton && editManifestoButtonMixin};
  ${(props) => props.modifyButton && modifyButtonMixin};
  ${(props) => props.previewArticleButton && previewArticleButtonMixin};
  ${(props) => props.returnButton && returnButtonMixin};
  ${(props) => props.addNewBlockButton && addNewBlockButtonMixin};
  ${(props) =>
    props.addNewCollectionCardButton && addNewCollectionCardButtonMixin};
  ${(props) => props.editButton && editButtonMixin};
  &:active {
    background-color: ${colors.paleVioletTransp};
  }
  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 1px ${colors.paleVioletTransp};
    ${(props) => props.buttonHover && buttonHoverMixin};
  }
`;

export default Button;
