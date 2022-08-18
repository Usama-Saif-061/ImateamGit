import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import { getHeightPercentage, getHeightPixel } from "../../../../common/helper";

export const SignUpStep1Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: getHeightPixel(812),
  },
});
