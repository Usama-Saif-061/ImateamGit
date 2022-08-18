import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Modal, TouchableOpacity, Platform } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import Video from 'react-native-video'
import Icon from "react-native-vector-icons/AntDesign";
import icons from '../../../../common/icons';
import moment from 'moment'
import images from '../../../../common/images'
import { useGetUserQuery } from '../../../../Reducers/usersApi'
import FullScreenModal from '../Components/FullScreenModal'

const IndividualSingleMessage = ({ obj, index }) => {
    const [paused, setPaused] = useState(true)
    const [duration, setDuration] = useState(0)
    const [value, setValue] = useState(0)
    const [isSender, setIsSender] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFile, setSelectedFile] = useState()

    const { data: userInfo, isFetching: fetch } = useGetUserQuery();

    useEffect(() => {
        if (userInfo && userInfo.id == obj.user.id) {
            setIsSender(true)
        }
    }, [])

    const renderDocument = (obj) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedFile({
                    name: obj.payload.filename,
                    url: obj.url,
                    type: 'pdf'
                })
                setModalVisible(true)
            }}>
                <View style={[styles.doc, {
                    backgroundColor: !isSender ? 'white' : '#E1F0FF',
                }]}>
                    <Text numberOfLines={1} style={styles.docText}>{obj.payload?.filename}</Text>
                    <Icon
                        name="file1"
                        size={22}
                        color={colors.primary}
                        style={{ marginHorizontal: getWidthPixel(10) }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderVideo = (obj) => {
        return (
            <View
                style={[styles.videoMainContainer, {
                    marginTop: obj.payload.message !== '' ? getHeightPixel(5) : 0
                }]}
            >
                <View style={{
                    flex: 1,
                    zIndex: 0
                }}>
                    <Video
                        ref={(ref) => {
                            if (ref) {
                                player = ref
                            }
                        }}
                        paused={paused}
                        source={{ uri: obj.url }}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        resizeMode={"cover"}
                        repeat={false}
                        style={styles.videoStyle}
                        onError={(err) => {
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
                <TouchableWithoutFeedback onPress={() => {
                    // setPaused(!paused)
                    setSelectedFile({
                        name: obj.payload.filename,
                        url: obj.url,
                        type: 'video'
                    })
                    setModalVisible(true)
                }} >
                    <View style={[styles.videoBtnMainContainer, {
                        backgroundColor: paused ? "rgba(0,0,0,0.5)" : "transparent",
                    }]}  >
                        {
                            paused ?
                                <View style={styles.videoBtnStyle}  >
                                    <Image
                                        source={paused == true ? icons.Play : icons.Pause}
                                        style={styles.videoBtnImageStyle} />
                                </View> :
                                null
                        }
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };

    const renderImage = (item) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedFile({
                    name: item.payload.filename,
                    url: item.url,
                    type: 'image'
                })
                setModalVisible(true)
            }}>
                <View style={[styles.container, {
                    borderTopLeftRadius: !isSender ? 0 : 10,
                    borderTopRightRadius: !isSender ? 10 : 0,
                    marginTop: getHeightPixel(5)
                }]}>
                    <Image source={{ uri: item.url }} style={styles.img} resizeMode='cover' />
                    {/* <TouchableOpacity style={{
                        position: 'absolute',
                        top: 10,
                        right: 10
                    }}>
                        <Image style={{ width: 20, height: 20 }} source={icons.DropDownOutlined} />
                    </TouchableOpacity> */}
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View key={index} style={{ ...styles.main, alignSelf: !isSender ? 'flex-start' : 'flex-end' }}>
            <Text style={styles.chatLabel}>{`${obj?.user?.display_name} | ${moment(new Date(obj.created_at)).format('MM/DD/YYYY, hh:mm:ss a')}`}</Text>
            <View style={{
                ...styles.msgBox,
                alignSelf: !isSender ? 'flex-start' : 'flex-end',
                backgroundColor: !isSender ? 'white' : '#E1F0FF',
                borderTopLeftRadius: !isSender ? 0 : 10,
                borderTopRightRadius: !isSender ? 10 : 0,
            }}>
                {obj.payload.message !== '' && <Text style={styles.msgText}>{obj?.payload?.message}</Text>}
                {
                    obj.attachments.length > 0 &&
                    <View style={{
                        borderTopColor: colors.grayLight,
                        borderTopWidth: obj.payload.message == '' ? 0 : 1,
                    }}>
                        {/* {Array of media to manage here} */}
                        {
                            obj.attachments.map((item, index) => <View key={index} style={{
                                paddingVertical: Platform.OS == 'android' ? getHeightPixel(5) : 0,
                                borderBottomColor: colors.ironGray,
                                borderBottomWidth: obj.attachments.length > 0 && index < obj.attachments.length - 1 ? 1 : 0
                            }}>
                                {
                                    item.payload.fileType.substring(0, 2) == 'im' ? // image/png
                                        renderImage(item) :
                                        item.payload.fileType.substring(0, 2) == 'ap' ? // application/pdf
                                            renderDocument(item) :
                                            item.payload.fileType.substring(0, 2) == 'vi' ? // video/mp4
                                                renderVideo(item)
                                                : null
                                }
                            </View>)
                        }
                    </View>
                }
            </View>
            {
                modalVisible &&
                <FullScreenModal
                    visible={modalVisible}
                    setVisible={(val) => { setModalVisible(val) }}
                    file={selectedFile}
                />
            }
        </View>
    )
}

export default IndividualSingleMessage

const styles = StyleSheet.create({
    main: {
        marginVertical: getHeightPixel(5)
    },
    chatLabel: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(12),
        color: colors.accentGray,
        marginBottom: getHeightPixel(5)
    },
    msgBox: {
        padding: getWidthPixel(10),
        borderRadius: 10,
        alignSelf: 'flex-start',
        width: '80%',
    },
    msgText: {
        color: '#58595B',
        fontFamily: 'Poppins-Regular',
        fontSize: getHeightPixel(14),
        marginBottom: getHeightPixel(5)
    },
    container: {
        borderRadius: 10,
    },
    img: {
        width: getWidthPixel(250),
        height: getWidthPixel(200),
        borderRadius: 10
    },
    doc: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getHeightPixel(10),
        paddingVertical: getHeightPixel(5),
        borderRadius: 10,
        width: getWidthPixel(240)
    },
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    videoBtnStyle: {
        height: getHeightPixel(50),
        width: getHeightPixel(50),
        backgroundColor: '#1C6AB0',
        alignSelf: "center",
        borderRadius: getHeightPixel(25),
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    videoBtnImageStyle: {
        height: getHeightPixel(35),
        width: 35,
        resizeMode: "center"
    },
    docText: {
        color: '#58595B',
        fontFamily: 'Poppins-Regular',
        fontSize: getHeightPixel(14),
        width: '80%'
    }
})