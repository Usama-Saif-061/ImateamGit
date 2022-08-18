import { StyleSheet } from "react-native";
import colors from "../../../colors";
import {
  font,
  getHeightPixel,
  getWidthPixel,
  getWidthPercentage,
} from "../../../helper";

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: getWidthPixel(20),
    marginTop: getHeightPixel(8),
    marginBottom: getHeightPixel(8),
  },
  profileImage: {
    width: getWidthPixel(40),
    height: getHeightPixel(40),
    borderColor: "#fff",
    borderRadius: 20,
    // width: getWidthPercentage(25),
  },
  headerTextWrapper: {
    //hello
    marginLeft: 5,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(8),
    width: getWidthPercentage(75),
    borderRadius: 5,
    // backgroundColor: "yellow",
  },
  nameText: {
    ...font(16, "bold"),
    paddingBottom: 2,
  },
  timeText: {
    ...font(12),
    color: colors.accentGray,
  },
  description: {
    ...font(14),
    lineHeight: 18.62,
    color: colors.accentGray,
    paddingRight: getWidthPixel(25),
  },
  commentLinks: {
    flexDirection: "row",
    marginLeft: getWidthPixel(53),
    marginTop: getHeightPixel(4),
    // backgroundColor: "#F6F6F6",
  },
  commentLikedColor: {
    flexDirection: "row",
    marginLeft: getWidthPixel(13),
    marginTop: getHeightPixel(4),
  },

  commentLink: {
    paddingHorizontal: getWidthPixel(10),
  },
  repliesContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    left: 50,
  },
  showReplies: {
    ...font(14),
    color: colors.inputBlue,
    textDecorationLine: "underline",
  },
});

export default styles;
