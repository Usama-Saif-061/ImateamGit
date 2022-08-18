import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import colors from "../../../../common/colors";
import Icon from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import moment from "moment";
import TeamAttachmentList from "./TeamAttachmentList";
import { font, getHeightPixel, getWidthPercentage, getWidthPixel } from "../../../../common/helper";
const FullOrgModal = ({
  post,
  index,
  closeModal,
  avatar,
  id,
  text,
  image,
  name,
  createdAt,
  type,
  attachments,
  currentTabIndex
}) => {
  const [show, setShow] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [singleImg, setSingleImg] = useState(image);
  console.log("i am full post image", attachments);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const setHandler = () => {
    setShow(!show);
  };
  useEffect(() => { }, [show]);

  return (
    <View style={styles.centeredView}>

      <SafeAreaView />
      {/* PROFILE IMAGE */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.headerWrapper}>
          <Pressable style={styles.headerWrapperDown}>
            <FastImage
              source={{
                uri: avatar,
                priority: FastImage.priority.high,
              }}
              style={styles.profileImage}
            />
          </Pressable>

          <View style={styles.headerTextWrapper}>
            <Text style={[styles.nameText, { color: "#fff" }]}>{name}</Text>
            <Text style={[styles.timeText, { color: "#fff" }]}>
              {moment(createdAt).format("MM/DD/YYYY, h:mm:ss")}
            </Text>
          </View>
        </View>
        <View style={styles.closeButton}>
          <Icon
            name="close"
            size={22}
            color={colors.white}
            onPress={() => {
              closeModal(false);
              setSingleImg("");
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={[
            styles.modalView,
            {
              flex: 1,
              alignItems: "center",
              backgroundColor: "black",
              marginTop: 50,
              overflow: "hidden",
              zIndex: 0,
              elevation: 0
            },
          ]}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <TeamAttachmentList
              attachmentWidth={100}
              data={attachments}
              onAttachmentPressed={() => null}
              openingFrom="FullPost"
              scrollIndex={currentTabIndex}
            />
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            elevation: 3
          }}
        >
          <View style={styles.descriptionWrapper}>
            <Text
              // onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 1}
              style={[styles.description, { color: "#fff" }]}
            >
              {text}
            </Text>

            {text?.split(" ").length >= 6 ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 5,
                  color: colors.inputBlue,
                }}
              >
                {textShown ? "Read less..." : "Read more..."}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

    </View>
  );
};

export default FullOrgModal;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
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