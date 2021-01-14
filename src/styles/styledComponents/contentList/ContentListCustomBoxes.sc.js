import colors from "../../core/colors";

const contentList = {
  ContentsPageContainer: {
    width: "80%",
    height: "100%",
    flexDirection: "column",
    minWidth: "740px",
  },
  titleBox: {
    marginTop: "50px",
    marginBottom: "20px",
    height: "36px",
    flexGrow: 1,
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
    justifyContent: "space-between",
    margin: "0 0",
  },
  paginationBox: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: "auto",
    minHeight: "60px",
    maxHeight: "60px",
  },
  statusBox: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: "1",
    maxWidth: "5%",
    minWidth: "125px",
  },
  actionsBox: {
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "10%",
    minWidth: "205px",
    marginRight: "20px",
  },
};

export default contentList;
