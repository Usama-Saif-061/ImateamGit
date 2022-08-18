import { StyleSheet } from "react-native";
import colors from "../../colors";
import {
  font,
  generateRandomColor,
  getHeightPixel,
  getWidthPixel,
} from "./../../helper";

export const styles = StyleSheet.create({
  noOfPosts: {
    position: "absolute",
    right: getWidthPixel(6),
    overflow: "hidden",
    top: getHeightPixel(-2),

    backgroundColor: colors.secondary,
    paddingHorizontal: getHeightPixel(5),
    paddingVertical: getWidthPixel(2),
    borderRadius: 10,
    ...font(12, "400"),
    color: colors.white,
  },
  icon: {
    position: "absolute",
    right: 10,
    overflow: "hidden",
  },
});
