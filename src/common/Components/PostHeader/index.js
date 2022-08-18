import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { styles } from "./../Post/styles";

import moment from "moment";
import colors from "../../colors";
import { getWidthPixel } from "../../helper";
import { ShowInitialsOfName } from "../ShowInitialsOfName";
import { Appearance } from "react-native";
const PostHeader = ({
  name,
  img,
  date,
  comment,
  type,
  userId,
  myId,
  navigation,
  modal,
}) => {
  const [UDModal, handleUDModal] = useState(false);
  //  console.log("user id is ", userId);

  const colorScheme = Appearance.getColorScheme();

  return (
    <View style={styles.headerWrapperContent1}>
      <TouchableOpacity
        onPress={() => {
          modal && modal(false);

          console.log("user id is", userId);
          navigation.navigate("GetPostList", {
            id: userId,
            type: "Member",
          });
        }}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <ShowInitialsOfName
          size={40}
          radius={20}
          fontSize={16}
          name={name}
          colors={colors.accentGray}
          imgUrl={img}
          userId={userId}
        />

        <View
          style={
            type === "repostheader"
              ? styles.repostCard
              : type === "commentheader" && comment
              ? styles.commentTextWrapper
              : styles.headerTextWrapper
          }
        >
          <View
            style={{ flexDirection: type == "postheader" ? "row" : "column" }}
          >
            <View
              style={{
                flexDirection: type == "postheader" ? "column" : "row",
              }}
            >
              <Text style={styles.nameText}>{name}</Text>

              {date ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[
                      styles.timeText,
                      {
                        paddingLeft:
                          type === "postheader" ? 0 : getWidthPixel(50),
                        flexDirection: "row",
                      },
                    ]}
                  >
                    {moment(date).format("MM/DD/YYYY, h:mm:ss") ===
                    "Invalid date"
                      ? date
                      : moment(date).format("MM/DD/YYYY, h:mm:ss")}
                  </Text>
                  {/* {type === "commentheader" && userId === myId ? (
                    <TouchableOpacity
                      onPress={() => {
                        console.log("edit comment pressed");
                      }}
                      style={styles.editIconWrapper2}
                    >
                      <EditIcon
                        name="edit"
                        size={12}
                        color={
                          colorScheme == "dark"
                            ? colors.black
                            : colors.accentGray
                        }
                      />
                    </TouchableOpacity>
                  ) : null} */}
                </View>
              ) : null}
            </View>
            <View>
              {comment ? (
                <Text style={styles.commentDescription}>{comment}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;
