import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import { font, getHeightPixel, getWidthPixel } from "../../../../common/helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: getWidthPixel(16),
    backgroundColor: colors.white,
  },

  label: {
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(7),
    ...font(14, "600"),
  },
  input: {
    borderColor: colors.accentGray,
    borderRadius: 6,
    borderWidth: 1,
    height: getHeightPixel(36),
    paddingLeft: getWidthPixel(13),
    color: colors.accentGray,
  },
  invalidInput: {
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(7),
    ...font(14, "600"),
    color: "red",
  },
  dropDown: {
    borderColor: colors.accentGray,
    borderWidth: 1,
    paddingVertical: getHeightPixel(10),
    paddingLeft: getWidthPixel(13),
    borderRadius: 6,
  },
  dropDownItems: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#fff",
    borderBottomColor: colors.accentGray,
    borderBottomWidth: 1,
    textColor: "black",
    borderBottomColor: colors.lightGray,
    zIndex: 999,
  },
  errorMsg: {
    fontSize: 12,
    color: "red",
    paddingLeft: 5,
    marginTop: 3,
  },
});
export default styles;
