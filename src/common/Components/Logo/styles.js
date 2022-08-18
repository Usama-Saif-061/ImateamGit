import { View, Image, StyleSheet } from "react-native";
import {
  fullWidth,
  getHeightPercentage,
  getHeightPixel,
  getWidthPixel,
} from "../../helper";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: getHeightPixel(56),
  },
  logoImage: {
    width: getWidthPixel(115),
    height: getHeightPixel(115),
    resizeMode: "contain",
  },
});
