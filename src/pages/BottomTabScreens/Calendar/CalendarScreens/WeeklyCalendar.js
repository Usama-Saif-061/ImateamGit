import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableWithoutFeedback, Image, Modal } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getTranslatedTime, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'
import { useSelector } from 'react-redux'
import moment from 'moment'
import WeekView from 'react-native-week-view';
import { ScrollView } from 'react-native-gesture-handler'
import useState from 'react-usestateref'

export default WeeklyCalendar = (props) => {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [eventsListFiltered, setEventsListFiltered, ref] = useState([])

    // const currentCalendar = useSelector((state) => state.calendar.currentCalendar)
    const eventsList = useSelector((state) => state.calendar.eventsList)
    const calendarList = useSelector((state) => state.calendar.list)
    const timezone = useSelector(state => state.calendar.timezone)

    useEffect(() => {
        if (eventsList.length > 0) {
            eventsList.map((item) => {
                setEventsListFiltered([
                    ...ref.current,
                    {
                        id: item.id,
                        description: item.title.charAt(0),
                        startDate: new Date(item.start_time),
                        endDate: new Date(item.start_time),
                        color: item.color
                    },
                ])
            })
        }
    }, [])

    // let eventFlag;
    // if (Object.keys(currentCalendar).length == 0) {
    //     eventFlag = [{ color: 'grey', label: 'A' }]
    // } else {
    //     eventFlag = [{ color: currentCalendar.color, label: currentCalendar.name.charAt(0) }]
    // }
    const HeaderComponent = () => {
        return (
            <View style={{ flex: 1 }}>
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
    const getFormattedDate = (date, format) => {
        return moment(date).format(format);
    };
    const [eventObj, setEventObj, listRef] = useState([])
    const [showModal, setShowModal] = useState(false);
    // const [calObj, setCalObj] = useState()
    console.log('selected Date => ', selectedDate);
    const dayPressed = (date) => {
        let newDate = date
        setSelectedDate(moment(newDate).toDate())
        props.onChangeDate(moment(newDate).toDate())
        let newEventObj = eventsList.filter((item) => moment(item.start_time).format('YYYY-MM-DD') == moment(newDate).format('YYYY-MM-DD'))
        console.log('eventObj => ', eventObj);
        setEventObj(newEventObj)
        if (listRef.current.length > 0) {
            setShowModal(true)
        }
        // let calObj = calendarList.filter((item) => item.id == eventObj[0].calendar)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                {HeaderComponent()}
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <WeekView
                        // events={[
                        //     {
                        //         id: 20,
                        //         description: 'B',
                        //         startDate: new Date(2022, 4, 12, 1, 0),
                        //         endDate: new Date(2022, 4, 12, 1, 0),
                        //         color: '#F6BF26',
                        //     },
                        //     {
                        //         id: 22,
                        //         description: 'E',
                        //         startDate: new Date(2022, 4, 12, 1, 0),
                        //         endDate: new Date(2022, 4, 12, 1, 0),
                        //         color: '#F13030',
                        //     },
                        //     {
                        //         id: 21,
                        //         description: 'D',
                        //         startDate: new Date(2022, 4, 14, 1, 0),
                        //         endDate: new Date(2022, 4, 14, 1, 0),
                        //         color: '#33B679',
                        //     },
                        // ]}
                        events={eventsListFiltered}
                        selectedDate={selectedDate}
                        numberOfDays={7}
                        onGridClick={(data, hour, date) => {
                            let dateStr = moment(date).toString()
                            console.log("gridClick", dateStr)
                            if (
                                moment(date).isBefore(moment(new Date())) &&
                                moment(date).format("YYYY-MM-DD") !==
                                moment(new Date()).format("YYYY-MM-DD")
                            ) {
                                alert("Event cannot be added before current day!");
                                return;
                            } else {
                                props.navigation.navigate('UpdateEventScreen', {
                                    day: moment(date).toString(),
                                    isCreate: true,
                                    weekly: true
                                })
                            }
                        }}
                        onEventPress={(event) => {
                            console.log("eventClick", event)
                            let eventObj = eventsList.filter((item) => event.id == item.id)
                            let calObj = calendarList.filter((item) => item.id == eventObj[0].calendar)
                            // props.navigation.navigate('UpdateEventScreen', {
                            //     day: moment(event.startDate).toString(),
                            //     obj: calObj[0],
                            //     eventObj: eventObj[0],
                            //     weekly: true,
                            //     startDate: event.startDate
                            // })
                            props.navigation.navigate('EventDetails', {
                                eventObj: eventObj[0],
                                calObj: calObj[0]
                            })
                        }}
                        onDayPress={(date) => dayPressed(date)}
                        DayHeaderComponent={(obj) => {
                            let date = moment(obj.date).toDate()
                            let isSelected = date.toDateString() == selectedDate.toDateString()
                            return (
                                <View style={{ ...styles.dayHeaderBox, backgroundColor: isSelected ? "rgba(16, 110, 191, 0.1)" : "transparent" }}>
                                    <Text
                                        style={{
                                            color: isSelected ? "#0C4B81" : "#222222",
                                            fontFamily: "Segoe Ui",
                                            fontWeight: isSelected ? "bold" : "500",
                                            fontSize: 11
                                        }}
                                    >
                                        {
                                            getFormattedDate(obj.date, "dd DD")
                                        }
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View style={styles.mainModalContainer}>
                        <View style={styles.subContainer}>
                            <View
                                style={styles.modalRow}
                            >
                                <Text style={styles.modalRowTxt}>
                                    Event List
                                </Text>

                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setShowModal(false);
                                        props.navigation.navigate("UpdateEventScreen", {
                                            day: selectedDate,
                                            isCreate: true,
                                        });
                                    }}
                                >
                                    <View style={styles.touchableBox}>
                                        <Text style={styles.touchableLabel} >
                                            Add new event
                                        </Text>
                                        <Image
                                            source={icons.Plus1}
                                            style={{ height: getHeightPixel(15), width: getHeightPixel(15) }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: colors.lightSilver,
                                    marginVertical: getHeightPixel(10),
                                }}
                            />
                            <FlatList
                                data={eventObj}
                                renderItem={({ item }) => {
                                    // console.log("Item====>", item);
                                    return (
                                        <View>
                                            <TouchableWithoutFeedback
                                                onPress={() => {
                                                    let calObj = calendarList.filter(
                                                        (v) => v.id == item.calendar
                                                    );
                                                    setShowModal(false);
                                                    props.navigation.navigate("EventDetails", {
                                                        eventObj: item,
                                                        calObj: calObj[0],
                                                    });
                                                }}
                                            >
                                                <View
                                                    style={styles.modalEvent}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: getHeightPixel(16),
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                    <Text style={styles.title}>
                                                        {moment(getTranslatedTime(item.start_time, timezone)).format("MM/DD/YYYY")}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: colors.ironGray,
        marginTop: getHeightPixel(5),
    },
    dayTitle: {
        flexDirection: 'row',
        // width: width - getWidthPixel(100),
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginRight: getWidthPixel(5)
    },
    calendarContainer: {
        width: '100%',
        marginRight: getWidthPixel(5),
        alignSelf: 'flex-end',
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
    mainModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignContent: "center",
    },
    subContainer: {
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: getWidthPixel(15),
    },
    headerContainer: {
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.ironGray,
        paddingBottom: getHeightPixel(10),
        position: "absolute",
        right: 10,
        left: 10,
        paddingHorizontal: 0,
    },
    scrollContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
    dayHeaderBox: {
        height: "100%",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    modalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalRowTxt: {
        color: colors.mineShaft,
        fontSize: getWidthPixel(18),
        fontFamily: "Segoe UI",
    },
    touchableBox: {
        backgroundColor: "#0C4B81",
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    touchableLabel: {
        color: "white",
        fontSize: getHeightPixel(14),
        fontWeight: "500",
        fontFamily: "Segoe UI",
        marginHorizontal: 5,
    },
    modalEvent: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: colors.ironGray,
        borderBottomWidth: 1,
        marginVertical: 15,
        paddingBottom: 15,
    }
})