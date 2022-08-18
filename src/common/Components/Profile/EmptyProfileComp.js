import { View, Text } from "react-native";
import React from "react";
import { generateRandomColor, getWidthPixel, showInitials } from "../../helper";

const EmptyProfileComp = (props) => {
  return (
    <View
      style={[{
        backgroundColor: generateRandomColor(props.userId),
        borderRadius: getWidthPixel(20),
        alignItems: "center",
        justifyContent: "center",
        marginRight: getWidthPixel(9),
        width: getWidthPixel(35),
        height: getWidthPixel(35),
      }, props.containerStyle]}
    >
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontSize: 15,
        }}
      >
        {showInitials(props.name)}
      </Text>
    </View>
  );
};

export default EmptyProfileComp;
