import { StyleSheet } from "react-native";
import {
  getHeightPixel,
  getHeightPercentage,
  getWidthPercentage,
  font,
  getWidthPixel,
} from "../../helper";
import colors from "../../colors";

export default TermsOfUseModalStyles = StyleSheet.create({
  ModalContainer: {
    height: getHeightPercentage(100),
    width: getWidthPercentage(100),
    backgroundColor: colors.white,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "white",

    alignItems: "center",

    flexDirection: "row",
  },
  closeButton: {
    flex: 1,
    alignItems: "center",
    height: getHeightPixel(56),
    justifyContent: "center",
  },
  closeButtonText: {
    ...font(20, "400"),
    color: colors.accentLightGray,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    flex: 8,
    height: getHeightPixel(56),
  },
  titleText: {
    ...font(18, "400"),
  },
  SuggestedSports: {
    marginLeft: getWidthPixel(24),
    marginTop: getHeightPixel(24),
    color: colors.silver,
  },
  tagsContainer: {
    marginTop: getHeightPixel(23),
    marginLeft: getWidthPixel(25),

    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 25,
    height: getHeightPixel(40),
    borderColor: colors.accentGray,

    borderWidth: 1,

    paddingLeft: getWidthPixel(21),
    paddingRight: getWidthPixel(21),

    justifyContent: "center",

    margin: 2,
  },
  AddSports: {
    marginLeft: getWidthPixel(27),
    marginTop: getHeightPixel(20),
    color: colors.primary2,
    ...font(16, "700"),
  },
  TagsText: {
    ...font(14, "600"),
  },
  saveButton: {
    justifyContent: "flex-end",
    marginBottom: getHeightPixel(40),
    paddingRight: getWidthPixel(45),
    paddingLeft: getWidthPixel(45),
  },
});
