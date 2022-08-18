import { StyleSheet } from "react-native";
import colors from "../../colors";
import { getHeightPixel, getWidthPercentage } from "../../helper";

export const styles = StyleSheet.create({
  Input: {
    backgroundColor: colors.white,
    borderBottomColor: colors.accentGray,
    height: getHeightPixel(46),
    marginBottom: getHeightPixel(5),
    borderRadius: 15,
    color: colors.primary,
  },
  InputWrapper: {
    flex: 1,
    width: "100%",
  },
  placeHolderText: {
    // fontFamily: "Segoe UI",
    fontWeight: "400",
    fontSize: 14,
  },
  icon: {
    color: colors.accentGray,
  },
  inputMainWrapper: {
    marginBottom: getHeightPixel(25),
  },
  inputMainWrapperAlt: {
    marginBottom: getHeightPixel(10),
  },
});
