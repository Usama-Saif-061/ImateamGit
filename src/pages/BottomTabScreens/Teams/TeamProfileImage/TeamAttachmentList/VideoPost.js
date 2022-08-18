import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Video from "react-native-video";
import colors from "../../../../../common/colors";
import { getHeightPercentage, getWidthPercentage } from "../../helper";

const VideoPost = ({ item, size, onPress }) => {
    return (
        <View
            style={{
                width: size.width,
                height: size.height,
                backgroundColor: 'black'
            }}
        >
            {(
                <Icon
                    name="play"
                    size={50}
                    color={colors.primary}
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: size.height / 2 - 25,
                        left: size.width / 2 - 25

                    }}
                    onPress={() => {
                        onPress()
                    }}
                />
            )}
            {
                item?.upload &&
                <View
                    style={{
                        width: size.width,
                        height: size.height,
                    }}
                >
                    <Video
                        source={{ uri: item?.upload }}
                        minLoadRetryCount={3}
                        controls={false}
                        paused={true}
                        fullscreen={true}
                        resizeMode="cover"
                        style={{
                            width: size.width,
                            height: size.height,
                            backgroundColor: "black"
                        }}
                    />
                </View>}
        </View>
    );
};
export default VideoPost