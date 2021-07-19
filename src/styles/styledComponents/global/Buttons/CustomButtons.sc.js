import colors from "../../../core/colors";

export const createNewContent = {
  width: "230px",
  marginLeft: "32px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  position: "absolute",
  left: "75%",
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
    pointerEvents: "none",
  },
};

export const editManifesto = {
  background: colors.darkGrey,
  border: `solid 1px ${colors.paleViolet}`,
  fontColor: `${colors.paleViolet} !important`,
  position: "absolute",
  left: "18%",
};
