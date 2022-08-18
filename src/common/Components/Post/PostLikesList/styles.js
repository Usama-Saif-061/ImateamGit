import { StyleSheet } from "react-native";
import colors from "../../../colors";
import { font, getHeightPixel, getWidthPixel } from "../../../helper";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  innerContainer: {
    backgroundColor: colors.accentGray,
    width: "100%",
    height: "100%",
    // borderRadius: 50,
    // alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  commentLink: {
    paddingHorizontal: getWidthPixel(10),
  },
  header: {
    marginTop: getHeightPixel(20),
    marginLeft: getWidthPixel(25),
    marginBottom: getHeightPixel(20),
    flexDirection: "row",
  },
  headerText: {
    ...font(20, "400"),
    flex: 2,
  },
  closeButton: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  listWrapper: {
    flexDirection: "row",
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightSilver,
    // alignContent: "center",
    alignItems: "center",
  },
  name: {
    marginLeft: getWidthPixel(10),
    ...font(16, "600"),
  },
  row: {
    // borderBottomColor: colors.accentLightGray,
  },
  listName: {
    marginLeft: 14,
    ...font(16),
  },
});
export default styles;
