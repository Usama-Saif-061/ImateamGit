import React from "react";
import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { getHeightPixel, getWidthPixel } from "../../../helper";
import colors from "../../../colors";

import styles from "./../../../../pages/Landing/pages/CreatePost/CreatePost/styles";
export const AttachmentList = (props) => {
  const { Uri, updateArray } = props;
  const TouchableWrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

  return (
    <TouchableWrapper behavior="padding" style={styles.content3}>
      {Uri.length !== 0 ? (
        <View
          style={{
            alignItems: "flex-start",
            flex: 1,
            paddingVertical: 10,
            overflow: "hidden",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {Uri.map((item, index) => (
            <View
              key={index}
              style={{
                marginHorizontal: getWidthPixel(5),
                marginVertical: getHeightPixel(5),
              }}
            >
              {
                (console.log("i am file type", item?.fileInfo?.fileType),
                  item?.fileInfo?.fileType === "video/mp4" ? (
                    <>
                      <View
                        style={{
                          width: getWidthPixel(60),
                          height: getHeightPixel(60),
                          backgroundColor: "#fff",
                          resizeMode: "cover",
                          borderWidth: 1,
                          borderColor: colors.inputBlue,
                          marginRight: 2,
                        }}
                        onPress={() => updateArray(item)}
                      />
                      <Icon
                        name="play"
                        size={22}
                        color={colors.primary}
                        onPress={() => updateArray(item)}
                        style={{
                          position: "absolute",
                          right: getWidthPixel(20),
                          left: getWidthPixel(20),
                          bottom: 20,
                        }}
                      />
                    </>
                  ) : item?.fileInfo?.fileType === "application/pdf" ? (
                    <>
                      <View
                        style={{
                          width: getWidthPixel(60),
                          height: getHeightPixel(60),
                          backgroundColor: "#fff",
                          resizeMode: "cover",
                          borderWidth: 1,
                          borderColor: colors.inputBlue,
                          marginRight: 2,
                        }}
                        onPress={() => updateArray(item)}
                      // onPress={() => setUri(Uri.slice(index + 1))}
                      />
                      <Icon
                        name="file1"
                        size={22}
                        color={colors.primary}
                        onPress={() => updateArray(item)}
                        // onPress={() => setUri(Uri.slice(index + 1))}
                        style={{
                          position: "absolute",
                          right: getWidthPixel(20),
                          left: getWidthPixel(20),
                          bottom: 20,
                        }}
                      />
                    </>
                  ) : (
                    <ImageBackground
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "red",
                        resizeMode: "cover",
                        borderWidth: 1,
                        borderColor: colors.inputBlue,
                        marginRight: 2,
                      }}
                      source={{ uri: item.path }}
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                        }}
                      />
                    </ImageBackground>
                  ))
              }
              <View
                style={{
                  position: "absolute",
                  right: -7.5,
                  top: -7.5,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.primary,
                }}
              >
                <Icon
                  name="close"
                  size={18}
                  color="white"
                  onPress={() => updateArray(item)}
                />
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </TouchableWrapper>
  );
};
