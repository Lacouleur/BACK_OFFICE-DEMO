import styled from "styled-components";
import colors from "../../core/colors";

export const FieldContainer = styled.div`
  width: ${(props) => props.styles?.width || "50%"};
  flex-direction: column;
  margin-bottom: 30px;
  margin: 16px 0 16px 0;
  position: relative;
`;

export const FieldError = styled.div`
  color: ${(props) => props.color || colors.lightGrey};
  font-size: 12px;
  line-height: 14px;
  margin-left: 8px;
`;

export const ErrorIcon = styled.img`
  width: 12px;
  margin-left: 17px;
`;

export const FieldStyle = styled.input`
  width: ${(props) => props.styles.width || "100%"};
  height: ${(props) => props.styles.height || "100%"};
  background-color: ${colors.darkGrey};
  border: ${(props) => props.styles.border || "none"};
  padding-left: ${(props) => props.styles.paddingLeft || "20px"};
  color: ${(props) => props.styles.color};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;

  // customing the native CSS for autocomplet.
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${colors.darkGrey} inset;
  }
  &:-webkit-autofill::first-line {
    font-family: Arial;
    color: ${colors.lightGrey};
    font-size: 14px;
  }
`;

export const Select = styled.select`
  -webkit-appearance: none;
  width: 100%;
  height: 56px;
  background-color: ${colors.darkGrey};
  border: none;
  padding: 0 20px;
  color: ${(props) => props.color};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  option {
    color: ${(props) => props.color || colors.white};
  }
`;

export const FieldErrorBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3px;
`;

export const FieldInfosBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const FieldIcon = styled.img`
  position: absolute;
  left: ${(props) => (props.info === "eyeIcon" ? "90%" : "0")};
  margin: ${(props) => (props.info === "eyeIcon" ? "0" : "0 0 0 13px")};
  top: 50%;
  transform: translateY(-50%);
`;
