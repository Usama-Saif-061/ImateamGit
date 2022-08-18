import { StyleSheet } from "react-native";
import colors from "../../colors";
import { font, getWidthPercentage, getHeightPercentage } from "./../../helper";

const mainFrameStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: getWidthPercentage(100),
    height: getHeightPercentage(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});

export default mainFrameStyles;
