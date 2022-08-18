import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../colors";
import { font } from "../../helper";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

//ACCEPTS FIVE PROPS 1) navigation 2) centerText 3) endText (optional) 4) onDone Function (optional) 5) icon bool (true = "Back Icon")
const CommonHeader = (props) => {
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
        <Icon
          name={props.icon ? "left" : "close"}
          size={21}
          color={colors.mineShaft}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.newPost}>{props.centerText}</Text>
      {/* PARENT FUNCTION.. CHANGES THE STATE TO TRUE TO COMPLETE THE ACTION IN USESTATE */}

      <TouchableOpacity
        onPress={() => {
          props.isNewPost ? props.onPressPost() : props.onDone(true);
        }}
      >
        <Text style={styles.post}>{props.endText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },
  newPost: {
    paddingVertical: 10,
    ...font(18, "bold"),
    color: colors.mineShaft,
  },
  post: {
    ...font(16, "700"),
    color: colors.inputBlue,
  },
});

export default CommonHeader;
