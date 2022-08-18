import React from "react";
import { SafeAreaView, TouchableWithoutFeedback, View, Image, Dimensions } from "react-native";
import icons from "../../../../common/icons";
import WebView from "react-native-webview";
import Video from "react-native-video";
import Pdf from 'react-native-pdf';
import ImageZoom from 'react-native-image-pan-zoom';
import PhotoView from 'react-native-photo-view';
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../../common/colors";
import FastImage from "react-native-fast-image";
import { getHeightPercentage } from "../../../../common/helper";
const MediaModel = (props) => {
    const renderVideo = (url) => {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Video
                    source={{ uri: url }}
                    minLoadRetryCount={3}
                    controls={true}
                    paused={false}
                    fullscreen={true}
                    resizeMode="contain"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                />
            </View>
        );
    };

    const renderImage = (url) => {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {
                    Platform.OS == "android" ?
                        <PhotoView
                            source={{ uri: url }}
                            minimumZoomScale={1}
                            maximumZoomScale={3}
                            androidScaleType="center"
                            onLoad={() => console.log("Image loaded!")}
                            style={{ width: Dimensions.get('window').width, height: "100%" }} />
                        :
                        <ImageZoom
                            cropWidth={Dimensions.get('screen').width}
                            cropHeight={getHeightPercentage(90)}
                            imageWidth={Dimensions.get('screen').width}
                            imageHeight={getHeightPercentage(90)}>
                            <FastImage
                                source={{
                                    uri: url,
                                    priority: FastImage.priority.high,
                                }}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                resizeMode='contain'
                            />
                        </ImageZoom>}
            </View>
        );
    };

    const renderDocument = (url) => {
        return (
                <Pdf
                    singlePage={false}
                    enablePaging={true}
                    source={{ uri: url, cache: true }}
                    trustAllCerts={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor : "white",
                    }}
                />
        );
    };
    return (
        <View
            style={{
                zIndex: 3,
                elevation: 3,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                position: 'absolute'
            }}
        >
            <SafeAreaView />
            <TouchableWithoutFeedback
                onPress={() => {
                    props.onClose()
                }}
            >
                <Image
                    style={{
                        alignSelf: "flex-end",
                        marginHorizontal: 15,
                        height: 20,
                        width: 20,
                        resizeMode: "contain",
                        tintColor: "white",
                        marginTop: 10
                    }}
                    source={icons.Cross}
                />
            </TouchableWithoutFeedback>
            <View
                    style={{
                        flex: 1,
                        backgroundColor : "black",
                        marginTop : 15
                    }}
                >
                   
                    {
                        props.attach.payload.fileType == "application/pdf" ?
                            renderDocument(props.attach.url)
                            : props.attach.payload.fileType == "video/mp4" ?
                                renderVideo(props.attach.url)
                                :
                                renderImage(props.attach.url)
                    }
                </View>
        </View>
    )
}
export default MediaModel