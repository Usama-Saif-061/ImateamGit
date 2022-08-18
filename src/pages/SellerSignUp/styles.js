import { StyleSheet } from "react-native";
import colors from "../../common/colors";
import { getHeightPixel, getWidthPixel, font } from "../../common/helper";

export const styles = StyleSheet.create({
  Input: {
    backgroundColor: colors.white,
    borderBottomColor: colors.accentGray,
    height: getHeightPixel(46),
    marginBottom: getHeightPixel(0),
    borderRadius: 18,
  },
  InputDescription: {
    backgroundColor: colors.white,
    borderBottomColor: colors.accentGray,
    height: getHeightPixel(76),

    borderRadius: 18,
    color: colors.primary,
    ...font(12, "400"),
    color: colors.mineShaft,
  },
  soldItemCatagories: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceItem: {
    color: colors.white,

    borderRadius: 20,
    fontWeight: "600",
    fontSize: 14,
    paddingVertical: getHeightPixel(3),
  },

  serviceItemWrapper: {
    backgroundColor: colors.accentGray,
    borderRadius: 20,
    paddingHorizontal: getWidthPixel(15),
    paddingVertical: getHeightPixel(4),

    marginHorizontal: getWidthPixel(3),
    marginVertical: getHeightPixel(2),
  },

  InputWrapper: {
    flex: 1,
    width: "100%",
  },
  placeHolderText: {
    // fontFamily: "Segoe UI",
    fontWeight: "400",
    fontSize: 14,
  },
  mailingAddress: {
    ...font(14, "400"),
    color: colors.silver,
  },
  icon: {
    color: colors.accentGray,
  },
  inputMainWrapper: {
    marginBottom: getHeightPixel(25),
  },

  SoldItemsType: {
    ...font(14, "600"),
    color: colors.mineShaft,
    marginTop: getHeightPixel(22),
    marginBottom: getHeightPixel(10),
  },
  dropDownItems: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#fff",
    borderBottomColor: colors.accentGray,
    borderBottomWidth: 1,
    textColor: "black",
    borderBottomColor: colors.lightGray,
  },
  BusinessType: {
    height: getHeightPixel(46),
    backgroundColor: colors.iconsBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: getWidthPixel(14),
    paddingRight: getWidthPixel(20),
    zIndex: 999,

    ...font(14, "600"),
    color: colors.mineShaft,
    width: getWidthPixel(300),
  },
  logoImage: {
    width: getWidthPixel(72),
    height: getHeightPixel(72),

    alignSelf: "center",
  },
  picker: {
    height: getHeightPixel(46),
    backgroundColor: colors.backgroundWhite,

    borderColor: colors.backgroundWhite,
    ...font(14, "600"),
  },
  listItemLabelStyle: {},
  dropDown: {
    backgroundColor: colors.backgroundWhite,
    width: getWidthPixel(80),
    borderColor: colors.backgroundWhite,
    marginBottom: getWidthPixel(10),
    ...font(14, "600"),
  },
});
