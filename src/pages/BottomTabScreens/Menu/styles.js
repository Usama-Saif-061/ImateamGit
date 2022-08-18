import colors from "../../../common/colors";
import { font, getHeightPixel, getWidthPixel } from "../../../common/helper";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavigation: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },

  header: {
    height: getHeightPixel(56),
    paddingLeft: getWidthPixel(16),
    flexDirection: "row",

    //    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: colors.accentGray,

    alignItems: "center",
  },
  Menu: {
    marginLeft: getWidthPixel(106),
    ...font(18, "400"),
  },
  profileSection: {
    flexDirection: "row",

    paddingLeft: getWidthPixel(9),
    height: getHeightPixel(70),
    alignItems: "center",
    backgroundColor: colors.silverWhite,
  },
  profileImage: {
    width: getWidthPixel(51),
    height: getHeightPixel(51),
    borderRadius: 25,
  },
  profileTextWrapper: {
    marginLeft: getWidthPixel(14),
  },
  name: {
    ...font(16, "500"),
  },
  profileLink: {
    ...font(12, "400"),
    color: colors.gray,
  },
  accountsAndSellerPanel: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    height: getHeightPixel(144),

    justifyContent: "space-between",
    paddingLeft: getWidthPixel(30),
    paddingRight: getWidthPixel(30),
  },
  ItemWrapper: {
    alignItems: "center",

    paddingTop: getHeightPixel(20),
  },
  menuImg: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 65,
    width: getWidthPixel(80),
    height: getHeightPixel(80),
  },
  ItemText: {
    ...font(15, "600"),
    color: colors.white,
  },
  infoPagesMenu: {
    flex: 2,
    backgroundColor: colors.white,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.accentGray,
    borderBottomWidth: 0.4,
  },
  pageLinkText: {
    flex: 2,
    paddingTop: getHeightPixel(20),
    paddingBottom: getHeightPixel(20),
    paddingLeft: getWidthPixel(17),
    ...font(15, "400"),
  },
  icon: {
    justifyContent: "flex-end",
    paddingRight: getWidthPixel(17),
  },
});
