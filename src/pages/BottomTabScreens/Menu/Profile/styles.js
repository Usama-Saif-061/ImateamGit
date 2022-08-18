import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  font,
  getHeightPixel,
  getWidthPixel,
} from "./../../../../common/helper";
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    borderTopWidth: 0,
    backgroundColor: colors.white,
    paddingLeft: getWidthPixel(16),
    paddingRight: getWidthPixel(16),
    justifyContent: "space-between",
    alignItems: "center",
    height: getHeightPixel(56),
    borderBottomColor: colors.accentGray,
    borderBottomWidth: 0.2,
  },
  title: {
    paddingVertical: 10,
    ...font(18, "600"),
    color: colors.mineShaft,
  },
  post: {
    ...font(18, "600"),
    color: colors.inputBlue,
  },
  profileSection: {
    flexDirection: "row",
    paddingLeft: getWidthPixel(9),
    height: getHeightPixel(70),
    alignItems: "center",
    backgroundColor: colors.white,
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
    ...font(14, "400"),
    color: colors.gray,
  },
  EditIcon: {
    backgroundColor: colors.lightGray,
    marginLeft: -15,
    marginTop: getHeightPixel(20),
    borderRadius: 20,
    padding: 5,
  },
  TabsMenu: {
    backgroundColor: "red",

    borderRadius: 0,
  },
  TabMenuLabel: {
    fontSize: 16,
    backgroundColor: "yellow",

    borderRadius: 30,
    padding: 0,
  },
  TabMenuItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    marginHorizontal: getWidthPixel(5),
    width: getWidthPixel(85),
    display: "flex",
    justifyContent: "center",
  },
  bottomNavigation: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
});
export default styles;
