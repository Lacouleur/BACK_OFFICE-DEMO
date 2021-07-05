import styled, { css } from "styled-components";
import ReactSelect from "react-select";
import colors from "../../core/colors";

export const ActionBarContainer = styled.div`
  width: 100%;
  min-width: 1250px;
  height: 93px;
  top: 56px;
  margin-bottom: 32px;
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${colors.black};
  transition: 0.3s;
  z-index: 100;
  border-top: 1px solid ${colors.paleVioletTransp};

  &:hover {
    opacity: 1;
    border-top: 1px solid ${colors.paleViolet};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 250px;
  width: 20%;
  margin-right: 25px;
`;

export const backButton = {
  height: "42px",
  width: "124px",
  display: "flex",
  background: "transparent",
  position: "relative",
  marginRight: "20px",
  marginLeft: "20px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "9px 26px",
  border: `1px solid ${colors.white}`,
};

export const saveButton = {
  height: "42px",
  width: "79px",
  position: "absolute",
  left: "15%",
  transform: "translateY(-50%)",
  top: "50%",
};

export const saveButtonDisable = {
  height: "42px",
  width: "79px",
  position: "absolute",
  left: "15%",
  transform: "translateY(-50%)",
  top: "50%",
  background: `${colors.mediumGrey}`,
};

export const BackIcon = styled.img`
  width: 8px;
`;

export const BackText = styled.p`
  font-size: 14px;
  width: 48px;
  text-transform: uppercase;
  line-height: 24px;
  color: ${colors.white};
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 500px;
  width: 30%;
  justify-content: flex-start;
  align-items: center;
  margin-left: 16px;
`;

export const LastSavedBox = styled.div``;
export const LastSavedText = styled.div`
  font-size: 12px;
  line-height: 24px;
  color: ${colors.lightGrey};
  font-style: italic;
`;
export const Separator = styled.div`
  width: 3px;
  height: 52px;
  margin: 0 32px 0 16px;
  background-color: ${colors.mediumGrey};
`;
export const ProgrammedBox = styled.div`
  position: relative;
`;

export const ColorDot = styled.div`
  position: absolute;
  left: -17px;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50px;
  background: ${(props) => props.background};
`;

export const ProgrammedText = styled.div`
  font-size: 12px;
  line-height: 24px;
  font-style: italic;
  font-weight: 700;
`;
export const StatusBox = styled.div`
  position: relative;
`;
export const StatusText = styled.div`
  font-size: 12px;
  line-height: 24px;
  font-style: italic;
  font-weight: 700;
`;

export const ArchiveBox = styled.div`
  position: relative;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;

  &:hover {
    & div {
      visibility: visible;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 15%;
  width: 20%;
  min-width: 300px;
  justify-content: flex-end;
`;

export const ActionIcon = styled.img`
  width: 31px;
  cursor: pointer;
`;

export const HoverBox = styled.div``;

const publishButtonDisable = css`
  color: ${colors.mediumGrey};
  border-bottom: 1px solid ${colors.mediumGrey};
`;

const publishButtonEnabled = css`
  color: ${colors.paleViolet};
  border-bottom: 1px solid ${colors.paleViolet};
`;

export const PublishButton = styled.button`
  ${(props) => {
    return props.disabled ? publishButtonDisable : publishButtonEnabled;
  }};
  width: 118px;
  height: 43px;
  background-color: ${colors.darkGrey};
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  border-top-left-radius: 5px;
`;

export const Selector = styled(ReactSelect)`
  & .select {
    &__indicator &__dropdown-indicator {
      border-color: transparent transparent red;
    }

    &__indicator {
      &-separator {
        margin: 0;
        height: 100%;
        background-color: ${colors.paleViolet};
      }
    }

    &__control {
      height: 43px;
      width: 37px;
      background-color: ${colors.darkGrey};
      border: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px solid ${colors.paleViolet};

      &--is-focused {
        border: none;
        box-shadow: none;
      }
    }

    &__placeholder {
      color: ${colors.paleViolet};
    }

    &__menu {
      margin-top: 0px;
      background-color: ${colors.darkGrey};
      border: none;
      box-shadow: none;
      border-radius: 0;
      left: -118px;
      width: 155px;
    }

    &__option {
      background-color: ${colors.darkGrey};
      color: ${(props) => props.color || colors.white};
    }

    &__option {
      &--is-focused {
        background-color: ${colors.paleViolet};
      }
    }

    &__single {
      &-value {
        color: white;
      }
    }

    &__clear {
      &-indicator {
        color: ${colors.paleVioletTransp};
        &:hover {
          color: ${colors.paleViolet};
        }
      }
    }

    &__value {
      &-container {
        padding: 0;
      }
    }
  }
`;
