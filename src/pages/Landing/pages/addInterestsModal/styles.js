import { StyleSheet } from "react-native";
import {
  getHeightPixel,
  getHeightPercentage,
  getWidthPercentage,
  font,
  getWidthPixel,
} from "../../../../common/helper";
import colors from "../../../../common/colors";

export const AddInterestModalStyles = StyleSheet.create({
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
    marginRight: getWidthPixel(50),
  },
  titleText: {
    ...font(18, "400"),
    alignItems: "center",
    justifyContent: "center",
  },
  SuggestedSports: {
    marginLeft: getWidthPixel(24),
    marginTop: getHeightPixel(24),
    color: colors.silver,
  },
  tagsContainer: {
    marginTop: getHeightPixel(23),
    marginLeft: getWidthPixel(20),

    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 25,
    height: getHeightPixel(35),
    borderColor: colors.accentGray,

    borderWidth: 1,

    paddingLeft: getWidthPixel(13),
    paddingRight: getWidthPixel(13),

    margin: 1,
    flexDirection: "row",

    alignItems: "center",
  },
  AddSports: {
    marginLeft: getWidthPixel(27),
    marginTop: getHeightPixel(20),
    color: colors.primary2,
    ...font(16, "700"),
  },
  TagsText: {
    ...font(14, "600"),
    alignSelf: "center",
  },
  saveButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: getHeightPixel(60),
    paddingRight: getWidthPixel(45),
    paddingLeft: getWidthPixel(45),
  },
  dropDownContainer: {
    flexDirection: "row",
    height: getHeightPixel(40),
    marginHorizontal: getWidthPixel(10),
  },
  sports: {
    marginLeft: getHeightPixel(17),
    marginBottom: getHeightPixel(7),
    ...font(16, "600"),
  },
  Button: {},
});
