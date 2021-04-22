import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const SectionTitle = styled.div`
  z-index: 20;
  display: flex;
`;

export const ExampleSeo = styled.img``;

export const CollapsedText = styled.p`
  margin-top: 18px;
`;

const SectionBoxClosedMixin = css`
  max-height: 160px;
  height: 160px;
  padding: 30px 30px 8px 30px;
  overflow: hidden;
`;

const SectionBoxOpenMixin = css`
  height: 100%;
  padding: 30px;
  overflow: visible;
`;

export const SectionBox = styled.div`
  ${(props) => (props.isOpen ? SectionBoxOpenMixin : SectionBoxClosedMixin)};
  position: relative;
  width: 100%;
  background-color: ${colors.mediumGrey};
  min-width: 900px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
`;

export const Form = styled.form`
  width: 100%;
  margin-bottom: 200px;
`;

export const FormContainer = styled.div`
  padding-top: calc(56px + 93px + 12px);
  width: 70%;
  margin: auto;
`;

export const DeleteIcon = styled.img`
  width: 70%;
`;

export const Gradient = styled.div`
  display: ${(props) => props.styles?.display};
  width: 100%;
  min-width: 900px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: ${colors.darkGrey};
  background: linear-gradient(
    0deg,
    rgba(56, 56, 56, 1) 0%,
    rgba(149, 149, 149, 0) 100%
  );
`;

export const NewBlockButtonBox = styled.div`
  width: 100%;
  min-width: 900px;
`;
