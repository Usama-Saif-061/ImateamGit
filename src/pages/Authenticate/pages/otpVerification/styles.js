import { StyleSheet } from "react-native";
import colors from ".././../../../common/colors";
import { getHeightPixel, getWidthPixel, font } from "../../../../common/helper";

export const OtpVerficationStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingLeft: getWidthPixel(46),
    paddingRight: getWidthPixel(46),
  },
  imgWrapper: {
    marginTop: getHeightPixel(125),
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

  OTPContainer: {
    width: "100%",
    height: getHeightPixel(46),
    marginTop: getHeightPixel(34),
    marginBottom: getHeightPixel(30),
  },
  Button: {
    marginTop: getHeightPixel(30),
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: getWidthPixel(40),
    height: getHeightPixel(46),
    borderWidth: 1,
    borderColor: colors.accentGray,
    borderRadius: 6,
    color: colors.black,
  },

  underlineStyleHighLighted: {
    borderColor: colors.black,
  },
});
