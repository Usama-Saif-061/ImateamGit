import { StyleSheet } from "react-native";
import {
  getHeightPixel,
  getHeightPercentage,
  getWidthPercentage,
  font,
  getWidthPixel,
} from "../../../../common/helper";
import colors from "../../../../common/colors";

export const SearchInterestModalStyles = StyleSheet.create({
  ModalContainer: {
    height: getHeightPercentage(100),
    width: getWidthPercentage(100),

    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    paddingRight: getWidthPixel(5),
  },
  headerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  closeButton: {
    justifyContent: "center",
    flex: 1,

    alignItems: "center",
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
  search: { flex: 9 },
  done: {
    marginRight: getWidthPixel(16),
    marginTop: getHeightPixel(20),
    color: colors.primary2,
    ...font(16, "700"),
  },
  Input: {
    ...font(12, "bold"),
    color: colors.accentGray,
    height: getHeightPixel(38),
    backgroundColor: colors.white,
  },
  item: {
    borderBottomColor: colors.accentGray,
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: "center",
    borderBottomWidth: 0.5,
    flexDirection: "row",

    alignItems: "center",
  },
  itemText: {
    marginBottom: getHeightPixel(11),
    marginTop: getHeightPixel(16),
    textAlign: "left",
  },
  bottombar: {
    flex: 1,
    height: 0.5,
    borderColor: "#EAECED",
    marginLeft: getWidthPixel(20),
    marginRight: getWidthPixel(50),
    alignSelf: "center",
  },
  icon: {
    justifyContent: "flex-end",

    flexDirection: "row",
    flex: 1,
  },
  searchPeople: {
    flexDirection: "row",
    paddingHorizontal: getWidthPixel(16),
    paddingBottom: getHeightPixel(16),

    width: getWidthPercentage(100),
  },
  peopleName: {
    ...font(16, "600"),
    color: colors.mineShaft,
    paddingLeft: getWidthPixel(5),
  },
  resultType: {
    color: colors.mineShaft,
    ...font(14, "300"),
  },
  peopleImage: {
    height: getHeightPixel(30),
    width: getHeightPixel(30),
    borderRadius: 15,
  },
});
