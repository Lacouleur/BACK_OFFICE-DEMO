import styled from "styled-components";
import colors from "../../core/colors";

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  min-width: 900px;
  height: ${(props) => props.height || "auto"};
  background-color: #1b182190;
  z-index: 99;
`;
export const ModalBox = styled.div`
  background-color: ${colors.mediumGrey};
  position: relative;
  transform: translate(-50%);
  margin-top: 170px;
  margin-left: 50%;
  height: 260px;
  width: 807px;
`;

export const Message = styled.p`
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  max-width: 90%;
  margin-left: 27px;
  padding-top: 27px;
`;

export const Br = styled.br`
  margin-top: 12px;
`;

export const ButtonsBox = styled.div`
  position: absolute;
  bottom: 27px;
  right: 27px;
  left: 27px;
  display: flex;
  justify-content: space-between;
`;

export const Cross = styled.img`
  width: 20px;
  height: 20px;
  transition: 0.3s;
  position: absolute;
  right: 27px;
  top: 27px;

  &:hover {
    transform: rotate(90deg);
  }
`;
