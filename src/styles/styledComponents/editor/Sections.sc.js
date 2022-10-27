import styled, { css } from "styled-components";
import colors from "../../core/colors";

export const SectionTitle = styled.div`
  z-index: 20;
  display: flex;
`;

export const ExampleSeo = styled.img``;

export const CollapsedText = styled.p`
  margin-top: 12px;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  min-height: 18px;
  white-space: nowrap;
`;

const SectionBoxClosedMixin = css`
  height: 160px;
  overflow: hidden;
  padding: 30px;
  border-bottom: 0px solid ${colors.paleViolet};
  transition: all 0.3s ease;

  &:hover {
    height: 200px;
  }
`;

const SectionBoxOpenMixin = css`
  height: 100%;
  padding: 30px;
  overflow: visible;
  border-bottom: 2px solid ${colors.paleViolet};
`;

const SectionBoxNoWrap = css`
  height: 100%;
  padding: 30px;
  overflow: visible;
  border-bottom: 0px solid ${colors.paleViolet};

  &:hover {
    transition: border-bottom 0.3s ease;
    border-bottom: 2px solid ${colors.paleViolet};
  }
`;

export const SectionBox = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  background-color: ${colors.mediumGrey};
  min-width: 900px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;

  ${(props) => {
    if (props.isOpen) return SectionBoxOpenMixin;
    if (props.isOpen === false) return SectionBoxClosedMixin;
    if (props.noWrap) return SectionBoxNoWrap;
    return null;
  }};
`;

export const Form = styled.form`
  width: 100%;
  margin-bottom: 200px;
`;

export const FormContainer = styled.div`
  padding-top: ${(props) =>
    props.userPage ? " 170px" : "calc(56px + 93px + 12px);"};
  width: 70%;
  margin: auto;
  max-width: 2000px;
  position: relative;
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
    rgba(56, 56, 56, 0.8) 0%,
    rgba(149, 149, 149, 0) 100%
  );

  &:hover {
    border-bottom: 2px solid ${colors.paleViolet};
  }
`;

export const NewBlockButtonBox = styled.div`
  width: 100%;
  min-width: 900px;
  position: relative;
`;

const ctaPageImageMixin = css`
  top: calc(100% - 150px);
  right: 40%;
  transition: all 0.3s;

  &:hover {
    height: 150px;
  }
`;

const navPreviewMixin = css`
  position: absolute;
  transform: translate(50%, 50%);
  max-width: 150px;
  max-height: 244px;
  border-radius: 50%;
  right: 30%;
  cursor: not-allowed;
  top: 40px;
  height: 100px;
  box-shadow: 0px 0px 31px 2px ${colors.shadow};
`;

const avatarMixin = css`
  position: absolute;
  max-width: 150px;
  max-height: 244px;
  border-radius: 50%;
  right: 30%;
  cursor: not-allowed;
  box-shadow: 0px 0px 31px 2px ${colors.shadow};
  bottom: 260px;
  transform: translate(50%, 50%);
`;

export const Thumbnail = styled.img`
  height: 100px;
  width: 100px;
  cursor: not-allowed;
  transition: height 0.3s ease;
  z-index: 2;
  margin-left: 25px;
  transform: translateY(-6%);

  ${(props) => (props.ctaPageImage ? ctaPageImageMixin : "")};
`;

export const RoundThumbnail = styled.img`
  height: 100px;
  width: 100px;
  cursor: not-allowed;
  transition: height 0.3s ease;
  z-index: 2;
  margin-left: 25px;
  transform: translateY(-6%);
  border-radius: 50%;

  ${(props) => (props.preview ? navPreviewMixin : "")};
  ${(props) => (props.avatar ? avatarMixin : "")};
`;

export const HideContent = styled.div`
  background-color: #1b182190;
  z-index: 98;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.7;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const Separator = styled.div`
  margin: 40px auto;
  height: 2px;
  background-color: ${colors.mediumGrey};
  width: 80%;
`;
