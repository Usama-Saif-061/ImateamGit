import React, { useState } from 'react'
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    SafeAreaView,
    Image,
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet
} from 'react-native'
import colors from '../../../../common/colors';
import { getHeightPercentage, getHeightPixel, getWidthPercentage, getWidthPixel } from '../../../../common/helper';
import icons from '../../../../common/icons';
import FullScreenModalHeader from './FullScreenModalHeader';
import WebView from 'react-native-webview';
import Video from 'react-native-video'

const FullScreenModal = ({ visible, setVisible, file }) => {
    const [loading, setLoading] = useState(file.type == 'image' ? true : false)
    const [paused, setPaused] = useState(false)
    const [duration, setDuration] = useState(0)
    const [value, setValue] = useState(0)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}>
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <SafeAreaView />
                <FullScreenModalHeader
                    title={file.name}
                    setVisible={(val) => setVisible(val)}
                />
                <View style={{
                    // flex: 1,
                    // alignItems: 'center',
                    backgroundColor: 'black',
                    height: getHeightPercentage(100),
                    width: getWidthPercentage(100),
                    // backgroundColor: colors.white,
                    flexDirection: "column",
                }}>
                    {
                        loading &&
                        <View
                            style={{
                                height: 500,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator
                                size={"large"}
                                color={'white'}
                            />
                        </View>
                    }
                    {
                        file.type == 'image' ?
                            <Image source={{
                                uri: file.url
                            }}
                                onLoad={() => setLoading(false)}
                                resizeMode='contain'
                                style={{
                                    // flex: 1
                                    height: '80%',
                                }}
                            /> :
                            file.type == 'pdf' ?
                                <WebView
                                    // style={{ flex: 1, backgroundColor: 'white' }}
                                    source={{
                                        uri: file.url,
                                        // uri: "https://docs.google.com/gview?embedded=true&url=https://s3.us-west-2.amazonaws.com/media.imateam/web-assets/docs/PrivacyPolicy.pdf",
                                    }}
                                    startInLoadingState={true}
                                />
                                :
                                file.type == 'video' ?
                                    <View style={{
                                        // flex: 1,
                                        height: '80%',
                                        // height: '70%',

                                        zIndex: 0,
                                        // overflow: "hidden",
                                    }}>
                                        <Video
                                            ref={(ref) => {
                                                if (ref) {
                                                    player = ref
                                                }
                                            }}
                                            paused={paused}
                                            source={{ uri: file.url }}
                                            rate={1.0}
                                            volume={1.0}
                                            muted={false}
                                            controls={true}
                                            // resizeMode={"cover"}
                                            resizeMode={"contain"}

                                            repeat={false}
                                            style={styles.videoStyle}
                                            onError={(err) => {
                                                Alert.alert('Error!', err?.error?.localizedFailureReason ? err?.error?.localizedFailureReason : 'Some problem while playing the video')
                                                console.log(err)
                                                setPaused(true)
                                            }}
                                            onLoad={(data) => {
                                                setDuration(data.duration)
                                            }}
                                            onProgress={(data) => {
                                                setValue(data.currentTime)
                                            }}
                                        />
                                    </View>
                                    :
                                    <Text style={{
                                        color: 'white',
                                        fontFamily: 'Segoe UI',
                                        fontSize: getHeightPixel(14),
                                    }}>File Url is invalid</Text>
                    }
                </View>
            </View>
        </Modal>
    )
}
export default FullScreenModal

const styles = StyleSheet.create({
    video: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 15,
        overflow: "hidden",
        marginTop: getHeightPixel(5),
        marginBottom: getHeightPixel(10)
    },
    videoMainContainer: {
        marginHorizontal: getWidthPixel(5),
        overflow: "hidden",
        borderRadius: getWidthPixel(8),
        backgroundColor: "black",
        height: getHeightPixel(200),
        width: getWidthPixel(200),
    },
    videoBtnMainContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    videoStyle: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        // height: '80%',
        // width: '100%',
        flex: 1,
    },
    videoBtnStyle: {
        height: getHeightPixel(70),
        width: getHeightPixel(70),
        backgroundColor: '#1C6AB0',
        alignSelf: "center",
        borderRadius: getHeightPixel(35),
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    videoBtnImageStyle: {
        height: getHeightPixel(70),
        width: getWidthPixel(70),
        resizeMode: "center"
    },
})