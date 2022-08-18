import { StyleSheet } from "react-native";
import {
  getHeightPixel,
  getWidthPixel,
  font,
  getWidthPercentage,
} from "../../../../common/helper";
import colors from "../../../../common/colors";

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: getWidthPixel(17),
  },
  text: {
    fontSize: 14,
    color: colors.mineShaft,
    fontWeight: "600",
    marginBottom: getHeightPixel(6),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightSilver,
    paddingVertical: getHeightPixel(6),
    paddingHorizontal: getWidthPixel(12),
    borderRadius: 5,
  },
  inputView: {
    marginBottom: getHeightPixel(20),
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputView_: {
    width: getWidthPercentage(44),
  },
});

export default styles;
