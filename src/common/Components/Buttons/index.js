import React from "react";

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../../colors";
import { styles } from "./styles";

const ButtonCommon = ({ color, title, method, loading, textColor }) => {
  const Container = loading ? View : TouchableOpacity;
  return (
    <Container
      disabled={loading}
      style={{
        ...styles.Button,
        backgroundColor: color,
        flexDirection: "row",
      }}
      activeOpacity={0.5}
      onPress={() => {
        method();
        console.log("main ithy aan");
      }}
    >
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Text
          style={{
            ...styles.ButtonText,
            color: textColor ? textColor : colors.white,
          }}
        >
          {title}
        </Text>
      )}
    </Container>
  );
};

export default ButtonCommon;
