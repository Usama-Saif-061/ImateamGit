import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../../../common/colors";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";

const SingleChatHeader = (props) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ padding: getWidthPixel(10) }}
      >
        <Image source={icons.Back} style={{ tintColor: colors.accentGray }} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
      <View />
      {/* <Image source={icons.iconsMini.MembersChat} /> */}
    </View>
  );
};

export default SingleChatHeader;

const styles = StyleSheet.create({
  mainContainer: {
    height: getHeightPixel(60),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: getWidthPixel(15),
    backgroundColor: "white",
  },
  title: {
    color: "#222222",
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "bold",
  },
});
