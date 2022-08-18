import React from "react";
import { View, Image, StyleSheet } from "react-native";
import images from "../../icons";
import { styles } from "./styles";

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logoBlue} style={styles.logoImage} />
    </View>
  );
};
