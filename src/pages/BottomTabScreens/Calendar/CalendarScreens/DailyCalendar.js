import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import colors from '../../../../common/colors'
import { filterDailyTime, getHeightPixel, getTranslatedTime, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import useState from 'react-usestateref'
import { timesList } from '../../Messages/constants'

export default Daily = (props) => {
    const timeList = timesList
    const eventsList = useSelector((state) => state.calendar.eventsList)
    const calendarList = useSelector((state) => state.calendar.list)
    const timezone = useSelector(state => state.calendar.timezone)
    const [showPopup, setShowPopup] = useState(false)
    const [dateNow, setDateNow, refDate] = useState(props.date ? props.date : new Date())

    const HeaderComponent = () => {
        return (
            <View style={{ zIndex: 1, position: "absolute", bottom: getHeightPixel(10), right: getWidthPixel(10) }}>
                <TouchableWithoutFeedback onPress={() => setShowPopup(!showPopup)}>
                    <View style={styles.formatToggle}>
                        <Text style={{ fontSize: getHeightPixel(16), fontFamily: 'Segoe UI', color: colors.mineShaft }}>{props.format}</Text>
                        <Image source={icons.DropDown} />
                    </View>
                </TouchableWithoutFeedback>
                {
                    showPopup ?
                        <View style={styles.listContainer}>
                            <TouchableWithoutFeedback onPress={() => { props.onFormatChange('Month'); setShowPopup(false) }}>
                                <Text style={styles.label}>Month</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => { props.onFormatChange('Week'); setShowPopup(false) }}>
                                <Text style={styles.label}>Week</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => { props.onFormatChange('Day'); setShowPopup(false) }}>
                                <Text style={styles.label}>Day</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    props.onFormatChange("Agenda");
                                    setShowPopup(false);
                                }}
                            >
                                <Text style={styles.label}>Agenda</Text>
                            </TouchableWithoutFeedback>
                        </View> : null
                }
            </View>
        )
    }
    // console.log('eventsList => ', eventsList);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const subtractDay = () => {
        setDateNow(moment(dateNow).subtract(1, 'day'))
        props.onChangeDate(refDate.current)
    }

    const addDay = () => {
        setDateNow(moment(dateNow).add(1, 'day'))
        props.onChangeDate(refDate.current)
    }

    const daySelected = (time, update) => {
        let newDate = filterDailyTime(time, dateNow)
        if (newDate.substring(11, 16) == '24:00') {
            newDate = moment(newDate).subtract(1, 'day');
        }
        console.log('newDate here -> ', moment(newDate).format('YYYY-MM-DD hh:mm a'))
        if (!update) {
            if (
                moment.utc(new Date(newDate)).isBefore(moment.utc(new Date())) &&
                moment(new Date(newDate)).format("YYYY-MM-DD") !==
                moment(new Date()).format("YYYY-MM-DD")
            ) {
                alert("Event cannot be added before current day!");
                return;
            }
            else {
                props.navigation.navigate('UpdateEventScreen', {
                    day: newDate,
                    isCreate: true
                })
            }
        } else {
            // console.log('eventsList: ', eventsList);
            let eventObj
            if (moment(newDate).format('HH:mm') == '00:00') {
                eventObj = eventsList.filter((item) => newDate.substring(0, 11) + '00:00' == moment(getTranslatedTime(item.start_time, timezone)).format('YYYY-MM-DDTHH:00'))
            } else {
                eventObj = eventsList.filter((item) => newDate == moment(getTranslatedTime(item.start_time, timezone)).format('YYYY-MM-DDTHH:00'))
            }
            let calObj = calendarList.filter((item) => item.id == eventObj[0]?.calendar)
            if (eventObj.length > 0 && calObj.length > 0) {
                props.navigation.navigate('EventDetails', {
                    day: newDate,
                    eventObj: eventObj[0],
                    calObj: calObj[0]
                })
            } else {
                console.log('No event/data found under this event');
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={subtractDay}>
                        <Image source={icons.Back}
                            resizeMode='contain' style={styles.backImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addDay}>
                        <Image source={icons.ArrowForward} resizeMode='contain' style={styles.arrowForward} />
                    </TouchableOpacity>
                    <Text style={styles.dateNow}>{moment(dateNow).format('MMMM YYYY')}</Text>
                </View>
                {HeaderComponent()}
            </View >
            <View style={styles.dayHeader}>
                <Text style={styles.leftHead}>{moment(dateNow).format('DD')} <Text style={styles.rightHead}>{moment(dateNow).format('dddd')}</Text></Text>
            </View>
            <GestureRecognizer
                onSwipeRight={subtractDay}
                onSwipeLeft={addDay}
                config={config}
            >
                <View style={styles.dailyContainer}>
                    <View style={styles.listContainer1}>
                        <FlatList
                            data={timeList}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                let currentDate = moment.utc(dateNow).toDate()
                                let newList = eventsList.filter((v) => {
                                    if (item.time == moment(v.start_time).format('h:00 A') &&
                                        moment(v.start_time).format('YYYY-MM-DD') == moment(currentDate).format('YYYY-MM-DD')
                                    ) {
                                        return v
                                    }
                                })
                                return (
                                    <View style={styles.singleDailyContainer}>
                                        <View style={{ width: '18%' }}>
                                            <Text style={styles.rightHead}>{item.time}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => daySelected(item.time)}
                                            style={styles.singleTouchable}>
                                            <View>
                                                {
                                                    newList[0] && (moment(newList[0]?.start_time).format('YYYY-MM-DD') == moment(currentDate).format('YYYY-MM-DD')) &&
                                                        (moment(newList[0]?.start_time).format('h:mm A') !== item.time) &&
                                                        (moment(newList[0]?.start_time).format('h:00 A') == item.time)
                                                        ?
                                                        <View style={styles.eventItem}>
                                                            <Text style={styles.eventLabel}>{moment(getTranslatedTime(newList[0]?.start_time, timezone)).format('h:mm A')}</Text>
                                                        </View> : null
                                                }
                                                {
                                                    newList[0] && (moment(newList[0]?.start_time).format('YYYY-MM-DD') == moment(currentDate).format('YYYY-MM-DD')) &&
                                                        (moment(newList[0]?.start_time).format('h:00 A') == item.time) ?
                                                        <TouchableOpacity
                                                            onPress={() => daySelected(item.time, update = true)}
                                                            style={styles.eventTouchable}>
                                                            <View>
                                                                <Text style={styles.eventTouchableLabel}>{newList[0]?.title ? newList[0]?.title : 'Task'}</Text>
                                                            </View>
                                                        </TouchableOpacity> : null
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </GestureRecognizer>
        </View >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: colors.ironGray,
        marginTop: getHeightPixel(15),
    },
    dayHeader: {
        paddingHorizontal: getWidthPixel(15),
        paddingVertical: getHeightPixel(10)
    },
    leftHead: {
        fontSize: getHeightPixel(20),
        color: colors.mineShaft,
        fontWeight: '600'
    },
    rightHead: {
        fontSize: getHeightPixel(12),
        color: colors.mineShaft
    },
    listContainer1: {
        width: '100%',
        height: '100%',
    },
    formatToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#e6f7ff',
        marginTop: 5,
        width: getWidthPixel(90),
        paddingVertical: getHeightPixel(5),
        paddingHorizontal: 10,
        borderRadius: 5,
        height: getHeightPixel(40),
    },
    listContainer: {
        backgroundColor: '#e6f7ff',
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: getWidthPixel(90),
        marginTop: getHeightPixel(40),
        paddingHorizontal: 10,
        borderTopColor: colors.ironGray,
        borderTopWidth: 1
    },
    label: {
        paddingVertical: 5,
        fontSize: getHeightPixel(16),
        fontFamily: 'Segoe UI',
        color: colors.mineShaft
    },
    subContainer: {
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.ironGray,
        marginVertical: getHeightPixel(10),
        paddingBottom: getHeightPixel(10),
    },
    rowContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: getWidthPixel(15)
    },
    backImg: {
        height: getHeightPixel(15),
        width: getWidthPixel(15),
        marginRight: getWidthPixel(10)
    },
    arrowForward: {
        height: getHeightPixel(15),
        width: getWidthPixel(15)
    },
    dateNow: {
        color: colors.mineShaft,
        fontSize: getHeightPixel(20),
        marginLeft: getWidthPixel(15),
        fontFamily: 'Segoe UI',
        fontWeight: '700'
    },
    dailyContainer: {
        borderTopColor: colors.ironGray,
        borderTopWidth: 1,
        paddingHorizontal: getWidthPixel(15),
        paddingVertical: getHeightPixel(20),
    },
    singleDailyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: getHeightPixel(10)
    },
    singleTouchable: {
        borderBottomColor: colors.ironGray,
        borderBottomWidth: 1,
        marginLeft: getWidthPixel(5),
        width: '80%',
    },
    eventItem: {
        marginLeft: getWidthPixel(-68),
        marginTop: getHeightPixel(35),
        marginBottom: getHeightPixel(5),
        borderBottomColor: 'red',
        borderBottomWidth: 0.5
    },
    eventLabel: {
        fontFamily: 'Segoe UI',
        color: 'red',
        fontSize: getHeightPixel(12)
    },
    eventTouchable: {
        flex: 1,
        backgroundColor: colors.inputBlue,
        paddingVertical: getHeightPixel(10),
        paddingLeft: getWidthPixel(10),
        borderRadius: 5,
    },
    eventTouchableLabel: {
        fontFamily: 'Segoe UI',
        color: colors.white,
        fontSize: getHeightPixel(12)
    }
}) 
