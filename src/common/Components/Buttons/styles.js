import { StyleSheet } from "react-native";
import colors from "../../colors";
import { font, getHeightPixel, getWidthPixel } from "../../helper";

export const styles = StyleSheet.create({
  Button: {
    width: "100%",
    alignSelf: "center",
    height: getHeightPixel(46),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    color: colors.white,
  },
  ButtonText: {
    ...font(16, "600"),
    marginTop: getHeightPixel(10),
    marginBottom: getHeightPixel(10),
    color: colors.white,
  },
});
