import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  font,
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
} from "../../../../common/helper";

const styles = StyleSheet.create({
  modal: {
    position: "relative",
  },
  modalContainer: {
    position: "absolute",
    width: getWidthPercentage(100),
    left: 0,
    bottom: getHeightPixel(-10),
    backgroundColor: colors.white,
    paddingVertical: getHeightPixel(10),
    borderRadius: 25,
    overflow: "hidden",
  },
  heading: {
    backgroundColor: colors.white,
    ...font(16),
    paddingVertical: getHeightPixel(8),
    marginHorizontal: getWidthPixel(30),
    borderBottomWidth: 0.5,
  },
  headingText: {
    ...font(16, "600"),
  },
  confirmNote: {
    backgroundColor: colors.white,
    paddingVertical: getHeightPixel(10),
    paddingHorizontal: getWidthPixel(30),
  },
  noteText: {
    ...font(14, "300"),
    color: colors.accentGray,
  },
  buttonContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: getHeightPixel(7),
    marginBottom: getHeightPixel(29),
    width: getWidthPercentage(90),
    alignSelf: "center",
  },
  cencelBtnWrapper: {
    width: getWidthPercentage(40),
  },
  deleteBtnWrapper: {
    width: getWidthPercentage(40),
  },
});

export default styles;
