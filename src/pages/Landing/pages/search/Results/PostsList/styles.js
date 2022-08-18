import { StyleSheet } from "react-native";
import colors from "../../../../../../common/colors";
import {
  font,
  generateRandomColor,
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
} from "../../../../../../common/helper";

export const styles = StyleSheet.create({
  header: {
    paddingLeft: getWidthPixel(15),
    paddingVertical: getHeightPixel(8),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1.5,
  },

  headerText: {
    ...font(16, "400"),

    color: colors.black,
  },
  postContainer: {
    marginVertical: getHeightPixel(10),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1.5,
    paddingVertical: getHeightPixel(5),
  },
  postHeader: {
    paddingHorizontal: getWidthPixel(10),
  },
  postText: {
    ...font(14, "400"),
    paddingHorizontal: getWidthPixel(10),
    color: colors.accentGray,
    paddingVertical: getHeightPixel(12),
  },
  postImage: {
    resizeMode: "contain",
    width: getWidthPercentage(100),
    height: getHeightPixel(300),
  },
});
