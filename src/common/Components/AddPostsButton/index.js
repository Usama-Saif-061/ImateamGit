import React from "react";
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Text,
  View,
  Platform,
} from "react-native";
import colors from "../../colors";
import { styles } from "./styles";

const Button = ({ navigation }) => {
  const TouchableWrapper =
    Platform.OS === "ios" ? TouchableWithoutFeedback : TouchableNativeFeedback;

  return (
    <View onPress={() => navigation.goBack()} style={[styles.container,{

      backgroundColor: colors.inputBlue,
      justifyContent : "center",
      alignItems : "center",
    }]}>
      <Text style={styles.text}>+ New Post</Text>
    </View>
  );
};

export default Button;
