import { View, Text, Image, StyleSheet, Linking, SafeAreaView, Modal, TouchableWithoutFeedback, ScrollView, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AppStatusBar from "../../statusBarColor";
import ProfileHeader from "../../../common/Components/ProfileHeader";
import TopHeader from '../Components/TopHeader'
import { getHeightPixel, getTranslatedTime, getWidthPixel } from "../../../common/helper";
import colors from "../../../common/colors";
import icons from "../../../common/icons";
import ButtonRound from "../Components/ButtonRound";
import moment from "moment";
import { useGetUserQuery } from '../../../Reducers/usersApi'
import { deleteEventApi } from "./API/calendarsApi";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from "react-redux";
import EventFileView from "./Components/EventFileView";
import MediaModel from "./Components/MediaModel";

const EventDetails = ({ navigation, route }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data: userInfo, isFetching: fetch } = useGetUserQuery();
    const [showFileModal, setShowFileModal] = useState(false)
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const timezone = useSelector(state => state.calendar.timezone)
    const [showMedia, setShowMedia] = useState(false)
    const [attach, setAttach] = useState()
    // console.log('Events obj => ', JSON.stringify(route.params?.eventObj))
    const toggleNumberOfLines = () => {
        //To toggle the show text or hide it
        setTextShown(!textShown);
    };
    const openUrlBtn = async () => {
        let url = route.params.eventObj.payload.url;
        if (url.substring(0, 4) !== 'http') {
            url = `https://${url}`
        }
        const supported = await Linking.canOpenURL(url);
        try {
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${route.params.eventObj.payload.url}`);
            }
        } catch (e) {
            console.log('Error while opening link, ', e)
        }
    }

    const updateEvent = () => {
        let adminsArray = route.params.calObj.admins;
        let isUserAdmin = adminsArray.includes(userInfo.id)
        if (route.params.eventObj.user == userInfo.id || isUserAdmin) {
            navigation.navigate('UpdateEventScreen', {
                day: route.params.eventObj.start_time,
                obj: route.params.calObj,
                eventObj: route.params.eventObj
            })
        } else {
            Alert.alert('Alert', 'Only event owner or admin can delete the event!')
        }
    }

    const deleteEventFunc = async () => {
        const body = {
            eventId: route.params.eventObj.id
        }
        setLoading(true)
        try {
            const res = await deleteEventApi(body)
            console.log('response delete api =>', res);
            if (res.resultCode == 200) {
                setLoading(false)
                Alert.alert('Success', 'Event deleted successfully!', [
                    {
                        text: 'OK',
                        onPress: () => {
                            setShowPopup(false)
                            navigation.navigate('CalendarHome')
                        }
                    }
                ])
            }
        } catch (e) {
            console.log('Error: ', e);
            Alert.alert('Error', 'Some error')
            setLoading(false)
        }
    }
    const [region, setRegion] = useState(route.params.eventObj ? {
        latitude: route.params.eventObj.locations[0] ?
            route.params.eventObj.locations[0].lat_lon[0] : 37.78825,
        longitude: route.params.eventObj.locations[0] ?
            route.params.eventObj.locations[0].lat_lon[1] : -122.4324,
        longitudeDelta: 0.765,
        latitudeDelta: 0.765,
    } : null)

    useEffect(() => {
        if (route.params.eventObj.locations[0]) {
            if (route.params.eventObj.locations[0].lat_lon[0] != region.latitude) {
                let minX, maxX, minY, maxY;
                minX = route.params.eventObj.locations[0].lat_lon[0];
                maxX = route.params.eventObj.locations[0].lat_lon[0];
                minY = route.params.eventObj.locations[0].lat_lon[1];
                maxY = route.params.eventObj.locations[0].lat_lon[1];
                minX = Math.min(minX, route.params.eventObj.locations[0].lat_lon[0]);
                maxX = Math.max(maxX, route.params.eventObj.locations[0].lat_lon[0]);
                minY = Math.min(minY, route.params.eventObj.locations[0].lat_lon[1]);
                maxY = Math.max(maxY, route.params.eventObj.locations[0].lat_lon[1]);
                const midX = (minX + maxX) / 2;
                const midY = (minY + maxY) / 2;
                const deltaX = (maxX - minX);
                const deltaY = (maxY - minY);
                console.log(deltaX)
                console.log(deltaY)
                setRegion({
                    latitude: midX,
                    longitude: midY,
                    longitudeDelta: deltaY,
                    latitudeDelta: deltaX,
                })
            }
        }
        if (route.params && route.params.eventObj) {
            console.log("obj data is ", JSON.stringify(route.params.eventObj))
        }
    }, [])
    const setText = () => {
        let text = ""
        if (route.params.eventObj?.payload?.notes.length > 50 && !textShown) {
            for (let i = 0; i < 50; i++) {
                text += route.params.eventObj?.payload?.notes[i]
            }
        }
        else {
            text = route.params.eventObj?.payload?.notes
        }
        return text
    }
    return (
        <View style={{ flex: 1 }}>
            <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ProfileHeader navigation={navigation} />
            <TopHeader
                title='Event Details'
                isBack
                isEdit
                onPress={() => navigation.goBack()}
                onUpdate={updateEvent}
            />
            <ScrollView style={styles.mainContainer}>
                <View style={styles.appointmentSection}>
                    <View style={styles.centeredRow}>
                        <Text style={styles.mainFont}>{route.params.eventObj?.title}</Text>
                        {/* <Text style={styles.grayFont}>Tuesday, 07 Nov 2021</Text> */}
                        <Text style={styles.grayFont}>{moment(getTranslatedTime(route.params.eventObj?.start_time, timezone)).format('dddd, MMM DD, YYYY')}</Text>
                    </View>
                    <View style={styles.centeredRowNoMargin}>
                        {/* <Text style={styles.grayFont}>New jersey’s office, Elizabeth</Text> */}
                        <Text style={{ ...styles.grayFont, width: '50%' }}>{route.params.eventObj.locations[0] ? route.params.eventObj.locations[0].address : 'Event Location'}</Text>
                        <Text style={[styles.grayFont, {
                            alignSelf: 'flex-end'
                        }]}>from {moment(getTranslatedTime(route.params.eventObj.start_time, timezone)).format('ha')} to {moment(getTranslatedTime(route.params.eventObj.end_time, timezone)).format('ha')}</Text>
                    </View>
                </View>
                {/* {Calendar alert section here} */}
                <View style={{ paddingHorizontal: getWidthPixel(15), paddingTop: getHeightPixel(20) }}>
                    <View style={styles.centeredRow}>
                        <Text style={styles.mainFont}>Calendar</Text>
                        <View style={styles.centeredRowNoMargin}>
                            <Text style={{ color: colors.gray, marginRight: getWidthPixel(15), fontFamily: 'Segoe UI' }}>{route.params.calObj?.name}</Text>
                            <Image source={icons.ArrowForward} resizeMode='contain' />
                        </View>
                    </View>
                    <View style={styles.centeredRow}>
                        <Text style={styles.mainFont}>URL</Text>
                        <TouchableOpacity disabled={route.params.eventObj.payload.url == '' ? true : false} onPress={openUrlBtn}>
                            <View style={[styles.centeredRowNoMargin, {
                                justifyContent: 'flex-end'
                            }]}>
                                <Text numberOfLines={1} style={{ maxWidth: '80%', marginRight: 5, color: colors.gray, fontFamily: 'Segoe UI' }}>{route.params.eventObj.payload.url !== '' ? route.params.eventObj.payload.url : 'None'}</Text>
                                <Image source={icons.ArrowForward} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    route.params.eventObj && route.params.eventObj.attachments && route.params.eventObj.attachments.length > 0 &&
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 15,
                            marginVertical: 5
                        }}
                    >
                        <Text
                            style={{
                                ...styles.mainFont,
                                marginBottom: 8
                            }}
                        >
                            Files
                        </Text>
                        <ScrollView
                            horizontal={true}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingRight: 10
                                }}
                            >
                                <Image
                                    style={{
                                        height: 15,
                                        width: 15,
                                        resizeMode: "contain",
                                    }}
                                    source={icons.iconsMini.attachPlaceholder}
                                />
                                {
                                    route.params.eventObj.attachments.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                onPress={() => {
                                                    setAttach(item)
                                                    setShowMedia(true)
                                                }}
                                                key={`${index}`}
                                            >
                                                <View
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: "#778899",
                                                        height: 30,
                                                        width: 110,
                                                        marginLeft: 10,
                                                        borderRadius: 4,
                                                        backgroundColor: "white",
                                                        flexDirection: "row",
                                                        paddingHorizontal: 5,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            height: 15,
                                                            width: 15,
                                                            resizeMode: "contain",
                                                        }}
                                                        source={item.payload.fileType == "application/pdf" ? icons.iconsMini.pdfPlaceholder : item.payload.fileType == "video/mp4" ? icons.iconsMini.videoPlaceholder : icons.iconsMini.imagePlaceholder}
                                                    />
                                                    <Text
                                                        style={{
                                                            ...styles.grayFont,
                                                            fontSize: 12,
                                                            color: "#778899",
                                                            marginLeft: 4
                                                        }}
                                                    >
                                                        {
                                                            item.payload.filename
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                }
                {/* {Notes Section Here} */}
                <View style={{ paddingHorizontal: getWidthPixel(15) }}>
                    <Text style={styles.mainFont}>Notes</Text>
                    <Text style={styles.grayFont}>{route.params.eventObj?.payload?.notes !== '' ? setText() : "Some notes..."}
                        {route.params.eventObj?.payload?.notes.length > 50 ?
                            <Text
                                onPress={toggleNumberOfLines}
                                style={{ lineHeight: 21, marginTop: 5, color: colors.inputBlue }}
                            >
                                {textShown ? " Read less..." : " Read more..."}
                            </Text>
                            : null}
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: getWidthPixel(15),
                    paddingVertical: getHeightPixel(10),
                }}>
                    <MapView
                        maxZoomLevel={65}
                        style={{
                            flex: 1,
                            height: getHeightPixel(230)
                        }}
                        region={region}
                        onRegionChangeComplete={(region) => {
                        }}
                    >
                        {
                            route.params.eventObj.locations[0] ?
                                <Marker
                                    key={`${route.params.eventObj.locations[0].lat_lon[0]}`}
                                    coordinate={region}
                                />
                                :
                                null
                        }
                    </MapView>
                </View>
                <ButtonRound title='DELETE EVENT' onPress={() => {
                    if (route.params.eventObj.user == userInfo.id) {
                        setShowPopup(true);
                    } else {
                        Alert.alert('Alert', 'Only event owner or admin can delete the event!')
                    }
                }}
                    style={{
                        width: '60%',
                        alignSelf: 'center',
                        marginBottom: 20
                    }}
                    textStyle={{ fontFamily: 'Segoe UI', fontWeight: '700' }} />
            </ScrollView>
            {/* {Modal content here} */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => {
                    setShowPopup(!showPopup)
                }}
            >
                <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
                    <View style={styles.mainModalContainer}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.subContainer}>
                    <Text style={{ color: colors.mineShaft, fontSize: getWidthPixel(18), fontFamily: 'Segoe UI' }}>Delete Event</Text>
                    <View style={{ height: 1, backgroundColor: colors.lightSilver, marginVertical: getHeightPixel(10) }} />
                    <Text style={{ color: colors.accentGray, fontSize: getWidthPixel(16), fontFamily: 'Segoe UI' }}>When you delete this event, the event page will no longer be accessible to anyone. This is a permanent and irreversible action.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: getHeightPixel(15) }}>
                        <View
                            style={{
                                flex: 1,
                            }}>
                            <ButtonRound
                                title='KEEP EVENT'
                                onPress={() => setShowPopup(false)}
                                style={{
                                    width: '90%',
                                    backgroundColor: colors.accentGray,
                                }}
                                textStyle={{ fontFamily: 'Segoe UI', fontWeight: '800' }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                            }}>
                            <ButtonRound
                                title='DELETE EVENT'
                                loading={loading}
                                onPress={deleteEventFunc}
                                style={{
                                    width: '90%',
                                    backgroundColor: colors.primary
                                }}
                                textStyle={{ fontFamily: 'Segoe UI', fontWeight: '800' }}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
            {
                showFileModal && <EventFileView
                    attachment={route.params.eventObj.attachments[0]}
                    onClose={() => setShowFileModal(false)}
                />
            }
            {
                showMedia && <MediaModel
                    attach={attach}
                    onClose={() => setShowMedia(false)}
                />
            }
        </View>
    );
};

export default EventDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: getHeightPixel(12),
        backgroundColor: '#fff',
    },
    appointmentSection: {
        borderBottomColor: colors.ironGray,
        borderBottomWidth: 1,
        paddingVertical: getHeightPixel(20),
        paddingHorizontal: getWidthPixel(15),
    },
    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: getHeightPixel(5)
    },
    centeredRowNoMargin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainFont: {
        fontFamily: 'Segoe UI',
        fontWeight: '800',
        color: colors.mineShaft
    },
    grayFont: {
        color: colors.gray,
        fontFamily: 'Segoe UI'
    },
    mainModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    subContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: getWidthPixel(15),
        paddingBottom: getHeightPixel(25)
    }
})
