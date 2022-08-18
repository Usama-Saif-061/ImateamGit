import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getHeightPixel, getWidthPixel } from "../../helper";
import images from "../../images";

const LogoMini = () => {
  return (
    <View>
      <Image source={images.logoBlue} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: getHeightPixel(45),
    width: getWidthPixel(45),
  },
});
export default LogoMini;
