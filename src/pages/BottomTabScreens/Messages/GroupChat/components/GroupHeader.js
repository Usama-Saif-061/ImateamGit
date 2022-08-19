import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../../../../common/colors";
import icons from "../../../../../common/icons";
import {
  getHeightPixel,
  getWidthPixel,
  showInitials,
} from "../../../../../common/helper";
import { useDispatch } from "react-redux";
import { updateChatList } from "../../../../../Reducers/CommonReducers/chatSlice";

const GroupHeader = (props) => {
  const dispatch = useDispatch();
  // let list = MessageList.length > 4 ? MessageList.slice(0, 4) : MessageList
  let list =
    props.chatObj?.users?.length > 3
      ? props.chatObj?.users.slice(0, 3)
      : props.chatObj.users;
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ padding: getWidthPixel(10) }}
      >
        <Image source={icons.Back} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.groupName}>
        {props.title}
      </Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("GroupMembers", {
            chatObj: props.chatObj,
          })
        }
      >
        <View style={styles.moreSection}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {list.map((item, index) => {
              return (
                <View key={index} style={styles.singleImgView}>
                  {/* <Image source={images.profileImage} style={styles.singleImg} /> */}
                  {item.avatar.url !== "" ? (
                    <Image
                      source={{ uri: item.avatar.url }}
                      style={styles.singleImg}
                    />
                  ) : (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.primary,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getHeightPixel(16),
                          fontFamily: "Segoe UI",
                          color: "white",
                        }}
                      >
                        {showInitials(item.display_name)}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          {props.chatObj.users.length > 3 && (
            <Text style={styles.moreText}>{`+ ${
              props.chatObj.users.length - 3
            } ${"\n"} More`}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroupHeader;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: getHeightPixel(60),
    paddingHorizontal: getWidthPixel(15),
  },
  groupName: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "700",
    color: "#222222",
    maxWidth: "50%",
  },
  moreSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(12),
    color: colors.accentGray,
    textAlign: "center",
  },
  singleImgView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  singleImg: {
    height: 35,
    width: 35,
    borderRadius: 20,
  },
});
