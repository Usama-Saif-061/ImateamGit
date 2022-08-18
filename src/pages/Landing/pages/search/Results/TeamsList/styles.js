import { StyleSheet } from "react-native";
import colors from "../../../../../../common/colors";
import {
  font,
  getHeightPixel,
  getWidthPixel,
} from "../../../../../../common/helper";

export const styles = StyleSheet.create({
  postsSection: {
    borderWidth: 1,
    borderColor: colors.ironGray,
    paddingVertical: getHeightPixel(18),
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
  peopleWrapper: {
    flexDirection: "row",
    paddingHorizontal: getWidthPixel(17),
  },
  name: {
    ...font(15, "600"),
  },
  icon: {
    position: "absolute",
    right: 10,
    overflow: "hidden",
  },

  members: {
    ...font(14, "400"),
    color: colors.accentGray,
  },

  teamDesciption: {
    paddingTop: getHeightPixel(8),
    paddingHorizontal: getWidthPixel(20),
    ...font(14, "400"),
    color: colors.accentGray,
  },
});
