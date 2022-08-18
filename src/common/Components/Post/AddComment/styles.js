import { StyleSheet } from "react-native";
import colors from "../../../colors";
import {
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
} from "../../../helper";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: getWidthPixel(15),
    borderBottomColor: colors.lightSilver,
    borderBottomWidth: 1,
    backgroundColor: "#F6F6F6",
  },
  wrapper: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center"
  },
  input: {
    width: getWidthPercentage(65),
    height: getHeightPixel(42),
    paddingLeft: getWidthPixel(4),
    color: colors.black,
  },
});

export default styles;
