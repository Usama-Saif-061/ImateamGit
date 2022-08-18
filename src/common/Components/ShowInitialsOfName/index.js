import React from "react";
import { View, Text, Image } from "react-native";

import {
  showInitials,
  getHeightPixel,
  getWidthPixel,
  generateRandomColor,
} from "../../helper";
import FastImage from "react-native-fast-image";

export const ShowInitialsOfName = ({
  name,
  colors,
  size,
  radius,
  imgUrl,
  fontSize,
  userId,
}) => {
  return (
    <View>
      {imgUrl && imgUrl !== "n/a" ? (
        <FastImage
          style={{
            width: getWidthPixel(size),
            height: getWidthPixel(size),
            marginRight: getWidthPixel(9),
            borderRadius: getWidthPixel(radius),
          }}
          source={{ uri: imgUrl, priority: FastImage.priority.high }}
        />
      ) : (
        <View
          style={{
            backgroundColor: generateRandomColor(userId),
            borderRadius: getWidthPixel(radius),
            alignItems: "center",
            justifyContent: "center",
            marginRight: getWidthPixel(9),
            width: getWidthPixel(size),
            height: getWidthPixel(size),
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: fontSize,
            }}
          >
            {showInitials(name)}
          </Text>
        </View>
      )}
    </View>
  );
};
