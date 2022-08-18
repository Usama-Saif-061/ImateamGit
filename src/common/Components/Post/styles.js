import colors from "../../colors";
import {
  font,
  getHeightPixel,
  getWidthPixel,
  getWidthPercentage,
} from "../../helper";
import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 3,
    borderWidth: 0.1,
  },
  headerWrapper: {
    flexDirection: "row",
    marginHorizontal: getWidthPixel(16),
    marginTop: getHeightPixel(10),
    alignItems: "center",
    flex: 8,
  },
  headerWrapperContent1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    // backgroundColor: "red",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderColor: "#fff",
    borderRadius: 20,
  },
  headerTextWrapper: {
    marginLeft: 5,
  },
  commentTextWrapper: {
    marginLeft: 5,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(8),
    width: getWidthPercentage(75),
    borderRadius: 5,
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  closeButton: {
    justifyContent: "flex-end",
    flex: 1,
  },

  repostStyles: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    ...font(16, "bold"),
    paddingBottom: 2,
  },
  timeText: {
    ...font(12),
    color: colors.accentGray,
  },
  editIconWrapper: {
    backgroundColor: colors.ironGray,
    padding: 7,
    borderRadius: 20,
  },
  editIconWrapper2: {
    backgroundColor: colors.ironGray,
    padding: 7,
    borderRadius: 20,
    flexDirection: "row",
    marginLeft: getWidthPixel(5),
  },
  editIconWrapper: {
    backgroundColor: colors.ironGray,
    padding: 7,
    borderRadius: 20,
  },
  editIcon: {
    width: 12,
    height: 12,
  },

  descriptionWrapper: {
    width: getWidthPixel(335.16),
    marginHorizontal: 16,
    margin: 9,
  },

  description: {
    ...font(14),
    lineHeight: 18.62,
    color: colors.accentGray,
  },
  postContentWrapper: {
    marginTop: 10,
  },

  postImage: {
    marginTop: getHeightPixel(1),
    resizeMode: "cover",
    width: windowWidth,
    height: getHeightPixel(250),
  },
  postAnalyticWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWidthPixel(16),
    paddingVertical: getHeightPixel(11),
    borderBottomWidth: getWidthPixel(1),
    borderColor: colors.ironGray,
  },

  likeText: {
    ...font(14),
    color: colors.accentGray,
  },

  postActionsWrapper: {
    flexDirection: "row",
    paddingHorizontal: getWidthPixel(17),
    paddingVertical: getHeightPixel(10.37),
    // backgroundColor: "red",
    borderBottomWidth: getHeightPixel(1),
    justifyContent: "space-between",
    borderBottomColor: colors.ironGray,
  },

  likeIcon: {},

  commentIcon: {
    marginLeft: getHeightPixel(25.08),
  },
  shareIcon: {
    // marginLeft: 260,
  },

  centeredView: {
    flex: 1,
    //   marginTop: 22,
    backgroundColor: "black"
  },
  modalView: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  commentShareWrapper: {
    flexDirection: "row",
  },
  likeShareContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  repostInfo: {
    marginTop: getHeightPixel(14),
    marginLeft: getWidthPixel(16),
    paddingRight: getWidthPixel(5),
  },
  repostComment: {
    ...font(14),
    lineHeight: 18.62,
    color: colors.accentGray,
  },
  repostof: {
    color: colors.black,
    ...font(12),
    fontWeight: "bold",

    marginTop: getHeightPixel(7),
  },
  repostCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: getWidthPixel(5),
    marginTop: getHeightPixel(7),
    alignItems: "center",
    paddingHorizontal: getHeightPixel(11),
    backgroundColor: "rgba(16, 110, 191, 0.1)",
    height: getHeightPixel(45),
    width: getWidthPixel(300),
    // backgroundColor: "green",
  },
  commentDescription: {
    ...font(14),
    lineHeight: 18.62,
    color: colors.accentGray,
    paddingRight: getWidthPixel(25),
  },

  commentheaderTextWrapper: {
    marginLeft: 5,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(8),
    width: getWidthPercentage(75),
    borderRadius: 5,
    backgroundColor: "yellow",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reshareImage: {
    borderColor: "pink",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    height: getHeightPixel(30),
    width: getWidthPixel(30),
    resizeMode: "contain",
    borderRadius: getHeightPixel(40),
  },

  reshareDisplayName: {
    marginLeft: getWidthPixel(7),
    color: colors.black,
    ...font(12, "500"),
  },
});
