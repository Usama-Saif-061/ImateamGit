import { StyleSheet } from "react-native";
import {
  getHeightPixel,
  getWidthPixel,
  font,
  getWidthPercentage,
} from "../../../../common/helper";
import colors from "../../../../common/colors";

const styles = StyleSheet.create({
  profileInfo: {
    paddingVertical: getHeightPixel(20),
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  userName: {
    ...font(18, "500"),
    fontSize: getHeightPixel(18),
    marginTop: getHeightPixel(8),
  },
  userSocial: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.silverWhite,
    paddingVertical: getHeightPixel(12),
  },
  socialData: {
    display: "flex",
    alignItems: "center",
    color: colors.inputBlue,
    flex: 1,
  },
  social: {
    color: colors.inputBlue,
  },
  dimText: {
    fontSize: 12, 
    color: colors.accentGray,
    marginTop: 5,
  },
  profileBio: {
    ...font(14),
    paddingLeft: getWidthPixel(16),
    paddingVertical: getHeightPixel(10),
    borderBottomColor: colors.silverWhite,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  // email: {},
  boldNumbers: {
    ...font(20, "600"),
    color: colors.inputBlue,
  },
  bioText: {
    color: colors.accentGray,
  },
  listing: {
    height: getHeightPixel(400),
    overflow: "hidden",
  },
  imgSkeleton: {
    paddingVertical: getHeightPixel(20),
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  imgSkull: {
    height: getHeightPixel(90),
    width: getWidthPixel(90),
    borderRadius: 45,
    backgroundColor: colors.lightGray,
  },
  imgTextSkull: {
    height: getHeightPixel(18),
    width: getWidthPixel(100),
    backgroundColor: colors.lightGray,
    marginTop: getHeightPixel(10),
    borderRadius: 9,
  },
  imgTextSkulldim: {
    height: getHeightPixel(12),
    width: getWidthPixel(90),
    backgroundColor: colors.lightGray,
    marginTop: getHeightPixel(10),
    borderRadius: 6,
  },
  skullContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.silverWhite,
  },
  skullHead: {
    flex: 1,
    height: getHeightPixel(65),
    backgroundColor: colors.white,
  },
  skull: {
    height: getHeightPixel(50),
    margin: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
  TextSkull: {
    height: getHeightPixel(16),
    width: getWidthPixel(250),
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  }
});

export default styles;
