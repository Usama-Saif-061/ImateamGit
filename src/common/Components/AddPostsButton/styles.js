import { StyleSheet } from "react-native";
import color from "../../colors";
import { font, getHeightPixel } from "../../helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...font(14),
    color: "#fff",
  },
});
