import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";

import colors from "../../../colors";
import PostAttachmentList from "../../PostAttachmentList/";

// import LikeIcon from "react-native-vector-icons/AntDesign";
// import CommentIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import moment from "moment";
import { getHeightPixel } from "../../../helper";
const FullPost = ({
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
              overflow : "hidden",
              zIndex : 0,
              elevation : 0
            },
          ]}
        >
          <View
            style={{
              flex : 1
          }}
          >
            <PostAttachmentList
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
            elevation : 3
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

export default FullPost;
