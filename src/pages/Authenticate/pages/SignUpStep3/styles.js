import { StyleSheet } from "react-native";
import colors from ".././../../../common/colors";
import { getHeightPixel, getWidthPixel, font } from "../../../../common/helper";

export const SignUpStep3Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingLeft: getWidthPixel(45),
    paddingRight: getWidthPixel(45),
  },
  backButtonWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: getHeightPixel(10),
    marginLeft: 0,
  },
  backButtonText: {
    ...font(18, "700"),
  },
  imgWrapper: {
    marginTop: getHeightPixel(43),
    alignItems: "center",
  },
  img: {
    resizeMode: "cover",
  },

  Heading: {
    textAlign: "left",
    marginTop: getHeightPixel(71),
    ...font(22, "700"),


  },
  text: {
    ...font(14, "300"),
    marginTop: getHeightPixel(11),
    textAlign: "left",
  },

  phoneNumberInput: {
    marginTop: getHeightPixel(40),
    marginBottom: getHeightPixel(30),
  },

  Button: {
    marginTop: getHeightPixel(30),
  },
});
