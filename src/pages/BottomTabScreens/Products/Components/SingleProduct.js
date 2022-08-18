import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Image, Text, Dimensions } from "react-native";
import images from "../../../../common/images";
import WebView from "react-native-webview";
const SingleProduct = ({ product, onEdit, onDelete }) => {
    const singleWidth = Dimensions.get("screen").width / 2 - 20
    return (
        <View
            style={{
                ...style.shadowView
            }}
        >
            <View
                style={{
                    ...style.mainView,
                    width: singleWidth,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        paddingBottom: 5
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {
                            product.attachments.length > 0 ?
                                <WebView
                                    style={{
                                        flex: 1,
                                        borderTopLeftRadius: 6,
                                        borderTopRightRadius: 6
                                    }}
                                    source={{
                                        uri: product.attachments[0].url
                                    }}
                                /> : <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flex: 1,
                                        backgroundColor: "rgba(16,110,191,0.1)",
                                        borderTopLeftRadius: 6,
                                        borderTopRightRadius: 6
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            textAlignVertical: "center",
                                            color: "#363636"
                                        }}
                                    >
                                        No Attachment
                                    </Text>
                                </View>
                        }

                        {/* <Image
                source={images.profileImage}
                style = {{
                    width : 64,
                    height : 64,
                    resizeMode : "contain",
                    borderRadius : 32,
                    backgroundColor : "black"
                }}
                /> */}
                    </View>
                    <Text
                        style={{
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            color: "#363636",
                            marginTop: 5,
                            textAlign: "center"
                        }}
                    >
                        {
                            product.name
                        }
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            color: "#115895",
                            marginTop: 2,
                            textAlign: "center"
                        }}
                    >
                        {product.payload.salePrice ? `$${product.payload.salePrice}` : ""}
                    </Text>
                </View>
                <View
                    style={{
                        ...style.bottomView
                    }}
                >
                    <TouchableWithoutFeedback onPress={onEdit}>
                        <Image
                            style={{
                                ...style.commonIcon
                            }}
                            source={images.miniEdit}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Image
                            style={{
                                ...style.commonIcon
                            }}
                            source={images.miniCalendar}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={onDelete}>
                        <Image
                            style={{
                                ...style.commonIcon
                            }}
                            source={images.delete}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    shadowView: {
        shadowColor: "rgba(0,0,0,0.1)",
        elevation: 3,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        marginTop: 10
    },
    mainView: {
        height: 170,
        backgroundColor: "white",
        borderRadius: 8,
        width: 170,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    bottomView: {
        height: 25,
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#EAECED",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15
    },
    commonIcon: {
        width: 13,
        height: 13,
        resizeMode: "contain"
    }
})
export default SingleProduct