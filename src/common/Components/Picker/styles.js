import { StyleSheet } from "react-native";
import colors from "../../colors";
import { getHeightPixel, getWidthPixel } from "../../helper";

import { font } from "../../helper";

export const styles = StyleSheet.create({
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
