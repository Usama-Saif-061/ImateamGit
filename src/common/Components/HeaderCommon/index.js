import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style";
import colors from "../../colors";
import { ActivityIndicator } from "react-native-paper";
import { Appearance } from "react-native";

const Header = ({
  navigation,
  flushArr,
  heading,
  btnTitle,
  isNewPost,
  isNewOrg,
  onPressSubmit,
  onDone,
  loading,
  Submit,
  teams
}) => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <View style={styles.header}>
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => {
          flushArr && flushArr();
          navigation.goBack();
        }}
        style={styles.closeIcon}
      >
        <Icon name="close" size={22} color={colors.mineShaft} />
      </TouchableOpacity>
      {/* Center aligned heading */}
      <Text style={styles.heading}>{heading}</Text>
      {/* Conditional button rendering */}
      {btnTitle ? (
        loading ? (
          <ActivityIndicator
            color={colors.inputBlue}
            style={styles.buttonContainer}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              isNewPost || isNewOrg || Submit ? onPressSubmit() : onDone(true);
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>{btnTitle}</Text>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default Header;
