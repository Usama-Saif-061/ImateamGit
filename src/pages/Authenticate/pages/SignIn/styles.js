import { StyleSheet } from "react-native";
import colors from ".././../../../common/colors";

import { getWidthPixel, getHeightPixel, font } from "../../../../common/helper";
export const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.white,
  },
  container: {
    width: getWidthPixel(283),

    alignSelf: "center",
    flexDirection: "column",
    height: "100%",
  },
  HeadingContainer: {
    alignItems: "center",
    marginTop: getHeightPixel(4),
  },
  mainHeading: {
    // fontSize: 22,
    // fontWeight: "700",
    ...font(26, "700"),
    color: colors.mineShaft,
  },
  SignupButton: {
    marginBottom: getHeightPixel(35),
  },
  subHeading: {
    ...font(14, "400"),
    color: colors.accentGray,
    paddingBottom: getHeightPixel(23),
    marginBottom: getHeightPixel(1),
  },
  forgetPassword: {
    flexDirection: "row-reverse",
  },
  Text: {
    textAlign: "right",
    ...font(14, "400"),
    color: colors.primary,
    marginTop: getHeightPixel(11),
    marginBottom: getHeightPixel(33),
  },
  alreadyHaveAccount: {
    ...font(13, "400"),
    // fontFamily: "Segoe UI",

    alignSelf: "center",
    color: colors.mineShaft,
  },
  bottomText: {
    width: "90%",
    alignSelf: "center",
    ...font(13, "700"),
    marginTop: getHeightPixel(23),
    color: colors.silver,
  },
  signIn: {
    textDecorationLine: "underline",
    ...font(13, "700"),
    color: colors.primary2,
  },
});
