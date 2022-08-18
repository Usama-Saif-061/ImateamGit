import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  font,
  getHeightPercentage,
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
} from "../../../../common/helper";

const styles = StyleSheet.create({
  headingContainer: {
    height: getHeightPixel(56),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderTopColor: colors.lightSilver,
    borderBottomColor: colors.lightSilver,
  },
  heading: {
    ...font(18, "bold"),
  },
  icon: {
    position: "absolute",
    left: getWidthPixel(20),
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.accentGray,
    paddingVertical: getHeightPixel(10),
    paddingHorizontal: getWidthPixel(12),
    marginHorizontal: getWidthPixel(30),
    marginTop: getHeightPixel(15),
    ...font(14)
  },
  buttonWrapper:{
    width: getWidthPercentage(100),
    backgroundColor: colors.white,
    bottom: 0,
    paddingVertical: getHeightPixel(20)
  },
  buttonContainer: {
    width: getWidthPercentage(80),
    alignSelf: "center",
  },
  fanWrapper: {
    marginHorizontal: getWidthPixel(30),
    marginTop: getHeightPixel(15),
    paddingHorizontal: getHeightPixel(10),
    maxHeight: getHeightPercentage(49),
  },
  fanComponent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: getHeightPixel(6),
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 0.5,
  },
  fanName: {
    ...font(14),
    marginLeft: getWidthPixel(6),
  },
  profileImage: {
    height: getHeightPixel(40),
    width: getWidthPixel(40),
    borderRadius: 20,
    marginRight: getWidthPixel(6)
  }, 
  tagWrapper:{
    maxHeight: getHeightPixel(100),
    marginTop: getHeightPixel(18),
  },
  tagContainer: {
    flexDirection: "row",
    marginHorizontal: getWidthPixel(30),
    flexWrap: "wrap",
  },
  fanTag: {
    flexDirection: "row",
    display:"flex",
    alignItems: "center",
    paddingHorizontal: getWidthPixel(5),
    paddingVertical: getHeightPixel(4),
    backgroundColor: colors.accentGray,
    borderRadius: 20,
    margin: 4,
  },
  deleteIcon: {
    color: colors.white,
    marginLeft: getWidthPixel(4),
    paddingRight: getWidthPixel(1)
  },
  tagImage: {
    height: getHeightPixel(20),
    width: getWidthPixel(20),
    borderRadius: 10,
    marginRight: getWidthPixel(6)
  },
});

export default styles;
