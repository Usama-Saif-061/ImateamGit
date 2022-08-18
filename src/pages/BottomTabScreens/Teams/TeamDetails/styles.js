import { StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import {
  getHeightPixel,
  getWidthPixel,
  font,
  getWidthPercentage,
} from "../../../../common/helper";

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    paddingHorizontal: getWidthPixel(20),
    paddingVertical: getHeightPixel(12),
    borderBottomWidth: 0.3,
    borderBottomColor: colors.lightSilver,
    ...font(15),
  },
  searchIcon: {
    position: "absolute",
    right: getWidthPixel(15),
    ...font(15),
  },
  addMember: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: getWidthPixel(20),
    paddingVertical: getHeightPixel(4),
    borderBottomWidth: .5,
    borderBottomColor: colors.lightSilver,
  },
  tagWrapper:{
    maxHeight: getHeightPixel(100),
    marginTop: getHeightPixel(18),
  },
  tagContainer: {
    flexDirection: "row",
    marginHorizontal: getWidthPixel(15),
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
  deleteIcon1: {
    color: colors.white,
    marginLeft: getWidthPixel(4),
    paddingRight: getWidthPixel(1)
  },
  addFanBtn: {
    width: getWidthPixel(98),
    paddingVertical: getHeightPixel(6),
    backgroundColor: colors.inputBlue,
    alignItems: "center",
    borderRadius: 20,
    marginVertical: getHeightPixel(18),
    marginLeft: getWidthPixel(15),
  },
  btnText: {
    color: colors.white,
  },
  
  memberCount: {
    ...font(15),
    marginLeft: getWidthPixel(15),
  },
  countNum: {
    ...font(16, "600"),
  },
  inputContainer: {
    marginTop: getHeightPixel(10),
    marginHorizontal: getWidthPixel(15),
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  fans: {
    marginHorizontal: getWidthPixel(15),
    ...font(14, "400"),
    paddingVertical: getHeightPixel(5),
  },
  searchName: {
    width: getWidthPercentage(44),
  },
  searchType: {
    width: getWidthPercentage(44),
  },
  nameInput: {
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(7),
    borderWidth: 1,
    borderColor: colors.accentGray,
    borderRadius: 7,
    marginTop: getHeightPixel(5),
    ...font(15),
  },
  typeInput: {
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(7),
    borderWidth: 1,
    borderColor: colors.accentGray,
    borderRadius: 7,
    marginTop: getHeightPixel(5),
    ...font(15),
  },
  memberContainer: {
    marginTop: getHeightPixel(20),
  },
  member: {
    flexDirection: "row",
    height: getHeightPixel(70),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: getWidthPixel(20),
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  text: {
    ...font(15),
  },
  deleteIcon: {
    color: colors.blockRed,
    marginLeft: getWidthPixel(12),
  },
  memIcon: {
    width: getWidthPercentage(45),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  memType: {
    width: getWidthPercentage(30),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  memButtons: {
    width: getWidthPercentage(20),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  typeText: {
    ...font(15),
    marginRight: getWidthPixel(17),
  },

});

export default styles;
