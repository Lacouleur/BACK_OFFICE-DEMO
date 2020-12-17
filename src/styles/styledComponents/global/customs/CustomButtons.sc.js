import colors from "../../../core/colors";

export const createNewContent = {
  width: "230px",
  marginLeft: "40px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const loginButton = {
  clickable: {
    color: colors.black,
    background: colors.paleViolet,
    cursor: "pointer",
    marginTop: "auto",
  },
  unClickable: {
    color: colors.mediumGrey,
    background: colors.darkGrey,
    cursor: "not-allowed",
    marginTop: "auto",
  },
};
