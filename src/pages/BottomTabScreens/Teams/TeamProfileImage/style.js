import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
  font
} from "../../../../common/helper";

const styles = StyleSheet.create({
  teamName: {
    marginHorizontal: getWidthPixel(20),
    marginVertical: getHeightPixel(20),
  },

  imageContainer: {
    height: getHeightPixel(200),
    marginHorizontal: getWidthPixel(20),
    borderWidth: 1,
    borderColor: colors.inputBlue,
    borderStyle: "dotted",
    borderRadius: 5,
    backgroundColor: colors.silverWhite,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    color: colors.accentGray,
  },
  image: {
    height: getHeightPixel(200),
    width: getWidthPercentage(100),
    position: "relative"
  },
  imageDeleteBtn: {
    backgroundColor: colors.inputBlue,
    width: getWidthPixel(26),
    height: getHeightPixel(26),
    borderRadius: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 30,
    zIndex: 10,
    borderWidth: 1.4,
    borderColor: colors.white
  },
  orgName: {
    ...font(18, "700"),
    marginBottom: 3,
  },
  adminName: {
    color: colors.accentGray,
  },
  upload: {
    ...font(15, "500")
  },
});

export default styles;
