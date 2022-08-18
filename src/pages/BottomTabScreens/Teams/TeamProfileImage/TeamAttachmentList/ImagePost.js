import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Image } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import images from "../../../../../common/images";
const ImagePost = ({ item, size }) => {
  const [showLoader, setShowLoader] = useState(false)
  const loaderSpin = useSharedValue(0)
  useEffect(() => {
    startLoader()
  }, [showLoader])
  const startLoader = () => {
    loaderSpin.value = withTiming(loaderSpin.value + 360, {
      duration: 1000
    }, () => {

    })
    setTimeout(() => {
      if (showLoader) {
        startLoader()
      }
    }, 1000);
  }
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${loaderSpin.value}deg` }
      ]
    }
  })
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: "black",
      }}
    >
      <FastImage
        onLoadStart={() => setShowLoader(true)}
        onLoadEnd={() => setShowLoader(false)}
        source={{
          uri: item?.url ? item.url : item?.path,
          priority: FastImage.priority.high,
        }}
        style={{
          resizeMode: "contain",
          flex: 1
        }}
      />
      {
        showLoader &&
        <View
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E5E5EA"
          }}
        >
          <Animated.View
            style={[animatedStyle]}
          >
            <Image
              source={images.loader}
              style={{
                height: 40,
                width: 40,
                resizeMode: "contain"
              }}
            />
          </Animated.View>
        </View>
      }
    </View>
  );
};
export default ImagePost