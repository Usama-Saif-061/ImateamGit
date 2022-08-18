import { StyleSheet } from "react-native";
import { getHeightPixel, getWidthPixel, font } from "../../helper";
import colors from "../../colors";

const styles = StyleSheet.create({
  header: {
    height: getHeightPixel(56),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderTopColor: colors.lightSilver,
    borderBottomColor: colors.lightSilver,
  },
  heading: {
      ...font(18, "bold"),
    },

  closeIcon: {
    position: "absolute",
    left: getWidthPixel(20),
  },
  buttonContainer: {
    position: "absolute",
    right: getWidthPixel(20),
  },
  buttonText: {
    ...font(16, "700"),
    color: colors.inputBlue,
  },
});

export default styles;