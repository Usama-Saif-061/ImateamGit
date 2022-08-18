import { StyleSheet } from "react-native";
import colors from "../../../../../../common/colors";
import {
  font,
  generateRandomColor,
  getHeightPixel,
  getWidthPixel,
} from "../../../../../../common/helper";

export const styles = StyleSheet.create({
  peopleWrapper: {
    flexDirection: "row",
    paddingHorizontal: getWidthPixel(17),
    paddingVertical: getHeightPixel(14),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1.5,
    alignContent: "center",
    alignItems: "center",
  },
  header: {
    paddingLeft: getWidthPixel(15),
    paddingVertical: getHeightPixel(8),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1.5,
  },

  headerText: {
    ...font(16, "400"),

    color: colors.black,
  },
  name: {
    ...font(15, "600"),
  },
  location: {
    ...font(14, "400"),
    color: colors.accentGray,
  },
  icon: {
    position: "absolute",
    right: 10,
    overflow: "hidden",
  },
  noOfPosts: {
    position: "absolute",
    right: getWidthPixel(7),
    overflow: "hidden",
    top: getHeightPixel(15),

    backgroundColor: colors.secondary,
    paddingHorizontal: getHeightPixel(5),
    paddingVertical: getWidthPixel(2),
    borderRadius: 10,
    ...font(12, "400"),
    color: colors.white,
  },
  postCount: {
    ...font(10, "300"),
    backgroundColor: generateRandomColor(78),
    color: colors.white,
    textAlign: "center",

    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: generateRandomColor(78),
    bottom: -15,
  },
  teamDesciption: {},
});
