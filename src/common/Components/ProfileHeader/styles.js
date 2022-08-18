import color from "../../colors";
import { Platform, StyleSheet } from "react-native";
import {
  font,
  getHeightPercentage,
  getHeightPixel,
  getWidthPixel,
} from "../../helper";
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    // marginTop: Platform.OS === 'ios' ? 0 : -40,
    height: getHeightPixel(65),
    justifyContent: "space-between",
    paddingHorizontal: getWidthPixel(15),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.lightGray,
    // borderTopColor: color.lightGray
  },
  logo: {
    width: getWidthPixel(40),
    height: getHeightPixel(40),
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: color.searchBlue,
    paddingVertical: 9,
    paddingBottom: 10,
  },
  search: {
    ...font(12, "bold"),
    width: getWidthPixel(225),
    paddingVertical: 0,

    paddingHorizontal: getWidthPixel(20),
    color: color.accentGray,
  },
  searchIcon: {
    paddingLeft: getWidthPixel(15),
    width: getWidthPixel(15),
    height: getHeightPixel(18),
  },
  notification: {
    width: getWidthPixel(20),
    height: getHeightPixel(23),
  },
  profile: {},
});
