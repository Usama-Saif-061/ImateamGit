import React from "react";
import { View, ImageBackground, KeyboardAvoidingView, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import colors from "../../../../common/colors";

export const AttachmentListComp = (props) => {
    const { Uri, updateArray } = props;
    const TouchableWrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

    return (
        <TouchableWrapper behavior="padding">
            {Uri.length !== 0 ? (
                <View style={styles.container}>
                    {Uri.map((item, index) => (
                        <View
                            key={index}
                            style={styles.singleItem}
                        >
                            {
                                (console.log("i am file type", item?.fileInfo?.fileType),
                                    item?.fileInfo?.fileType === "video/mp4" || item?.payload?.fileType === "video/mp4" ? (
                                        <>
                                            <View
                                                style={styles.attachmentView}
                                                onPress={() => updateArray(item)}
                                            />
                                            <Icon
                                                name="play"
                                                size={22}
                                                color={colors.primary}
                                                onPress={() => updateArray(item)}
                                                style={styles.attachmentIcon}
                                            />
                                            <View
                                                style={styles.attachInnerIconView}
                                            >
                                                <Icon
                                                    name="close"
                                                    size={18}
                                                    color="white"
                                                    onPress={() => updateArray(item)}
                                                />
                                            </View>
                                        </>
                                    ) : item?.fileInfo?.fileType === "application/pdf" || item?.payload?.fileType === "application/pdf" ? (
                                        <>
                                            <View
                                                style={styles.attachmentView}
                                                onPress={() => updateArray(item)}
                                            // onPress={() => setUri(Uri.slice(index + 1))}
                                            />
                                            <Icon
                                                name="file1"
                                                size={22}
                                                color={colors.primary}
                                                onPress={() => updateArray(item)}
                                                // onPress={() => setUri(Uri.slice(index + 1))}
                                                style={styles.attachmentIcon}
                                            />
                                            <View
                                                style={styles.attachInnerIconView}
                                            >
                                                <Icon
                                                    name="close"
                                                    size={18}
                                                    color="white"
                                                    onPress={() => updateArray(item)}
                                                />
                                            </View>
                                        </>
                                    ) : (
                                        <ImageBackground
                                            style={styles.singleAttachment}
                                            source={{ uri: item.path ? item.path : item.url }}
                                        >
                                            <View
                                                style={styles.attachInnerView}
                                            />
                                            <View
                                                style={styles.attachInnerIconView}
                                            >
                                                <Icon
                                                    name="close"
                                                    size={18}
                                                    color="white"
                                                    onPress={() => updateArray(item)}
                                                />
                                            </View>
                                        </ImageBackground>
                                    ))
                            }
                        </View>
                    ))}
                </View>
            ) : null}
        </TouchableWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // overflow: "hidden",
        flexDirection: "row",
        // flexWrap: "wrap",
    },
    singleItem: {
        marginHorizontal: getWidthPixel(5),
        marginVertical: getHeightPixel(5),
    },
    attachmentView: {
        width: getWidthPixel(60),
        height: getHeightPixel(60),
        backgroundColor: "#fff",
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: colors.inputBlue,
        marginRight: 2,
    },
    attachmentIcon: {
        position: "absolute",
        right: getWidthPixel(20),
        left: getWidthPixel(20),
        bottom: 20,
    },
    singleAttachment: {
        width: 60,
        height: 60,
        backgroundColor: "red",
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: colors.inputBlue,
        marginRight: 2,
    },
    attachInnerView: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    attachInnerIconView: {
        position: "absolute",
        right: -10,
        top: -8,
        borderRadius: 10,
        backgroundColor: colors.primary,
    }
})