import styled from "styled-components";
import colors from "../../core/colors";

export const FieldContainer = styled.div`
  width: 100%;
  height: 52px;
  margin: 16px 0 16px 0;
  position: relative;
`;

export const FieldStyle = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  border: none;
  padding-left: 52px;
  color: ${(props) => props.color};
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
