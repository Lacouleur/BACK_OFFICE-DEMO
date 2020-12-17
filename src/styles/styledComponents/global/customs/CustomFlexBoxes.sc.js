/* eslint-disable import/prefer-default-export */
import colors from "../../../core/colors";

export const contentList = {
  ContentsPageContainer: {
    width: "80%",
    height: "100%",
    flexDirection: "column",
  },
  titleBox: {
    marginTop: "50px",
    marginBottom: "20px",
    height: "36px",
  },
  listContainer: {
    flexDirection: "column",
    height: "90%",
    width: "100%",
    padding: "30px",
    backgroundColor: colors.mediumGrey,
    overflow: "scroll",
  },
  lineContentBox: {
    width: "100%",
    minHeight: "59px",
    maxHeight: "59px",
    alignItems: "center",
    margin: "0 0",
    justifyContent: "space-between",
  },
  paginationBox: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: "auto",
    minHeight: "60px",
    maxHeight: "60px",
  },
};
