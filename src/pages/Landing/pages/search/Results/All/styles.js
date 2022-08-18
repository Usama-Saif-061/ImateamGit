import { StyleSheet } from "react-native";
import colors from "../../../../../../common/colors";
import {
  font,
  generateRandomColor,
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
} from "../../../../../../common/helper";

export const styles = StyleSheet.create({
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
  postContainer: {
    marginVertical: getHeightPixel(10),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1.5,
    paddingVertical: getHeightPixel(5),
  },
  postHeader: {
    paddingHorizontal: getWidthPixel(10),
  },
  postText: {
    ...font(14, "400"),
    paddingHorizontal: getWidthPixel(10),
    color: colors.accentGray,
    paddingVertical: getHeightPixel(12),
  },
  postImage: {
    resizeMode: "contain",
    width: getWidthPercentage(100),
    height: getHeightPixel(300),
  },
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
