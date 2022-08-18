import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  font,
  getHeightPixel,
  getWidthPixel,
} from "./../../../../common/helper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthPixel(17),
    backgroundColor: colors.white,
  },
  head: {
    ...font(16, "600"),
    marginBottom: getHeightPixel(4),
  },
  lightText: {
    ...font(12, "400"),
    color: colors.lightSilver,
    maxWidth: getWidthPixel(300)
  },
  section: {
    paddingVertical: getHeightPixel(17),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
