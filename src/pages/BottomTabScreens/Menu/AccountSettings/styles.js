import { StyleSheet } from "react-native";
import { getHeightPixel, getWidthPixel, font } from "../../../../common/helper";
import colors from "../../../../common/colors";

const styles = StyleSheet.create({
  headingOne: {
    color: colors.mineShaft,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: getHeightPixel(15),
    borderBottomColor: colors.lightSilver,
    borderBottomWidth: 0.3,
    paddingHorizontal: getWidthPixel(17),
  },
  addressContainer: {
    marginVertical: getHeightPixel(10),
    paddingHorizontal: getWidthPixel(17),
  },
  addressHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: getHeightPixel(10),
  },
  paymentOptions: {
    flexDirection: "row",
    paddingHorizontal: getHeightPixel(17),
    justifyContent: "space-between",
  },
  options: {
    width: getWidthPixel(164.37),
    height: getHeightPixel(42),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightSilver,
    borderRadius: 5,
  },
  seletedOption: {
    width: getWidthPixel(164.37),
    height: getHeightPixel(42),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    borderRadius: 5,
  },

  cardContainer: {
    marginHorizontal: getWidthPixel(17),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.lightSilver,
    padding: getHeightPixel(20),
    marginVertical: getHeightPixel(19),
  },

  text: {
    color: colors.mineShaft,
    fontSize: 14,
  },
  lightText: {
    color: colors.gray,
  },
  buttonText: {
    color: colors.inputBlue,
    fontWeight: "700",
  },
});

export default styles;
