import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import colors from "../../../../common/colors";
import { getHeightPixel, getTranslatedTime, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";
import { useSelector } from "react-redux";
import useState from "react-usestateref";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
export default MainCalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventList, setEventList, refList] = useState([]);

  const [eventSelectedDate, setEventSelectedDate] = useState(null);
  const isFocused = useIsFocused();
  // const calendarsList = useSelector((state) => state.calendar.calendarsList)
  const eventsList = useSelector((state) => state.calendar.eventsList);
  const currentCalendar = useSelector(
    (state) => state.calendar.currentCalendar
  );
  const calendarList = useSelector((state) => state.calendar.list);
  let dotColor = 'rgba(59, 157, 231, 1)'
  const timezone = useSelector(state => state.calendar.timezone)
  useEffect(() => {
    updateEventsList();
  }, [isFocused, eventsList]);
  const [markedList, setMarkedList, refMarkedList] = useState({});
  const updateEventsList = () => {
    console.log("updating list")
    let newDatesObj = {};
    var dummyList = [
      {
        start_time : new Date(),
        color : "blue"
      },
      {
        start_time : new Date(),
        color : "green"
      },
      {
        start_time : new Date(),
        color : "red"
      },
      {
        start_time : new Date(),
        color : "black"
      },
      {
        start_time : new Date(),
        color : "yellow"
      },
      {
        start_time : new Date(),
        color : "brown"
      },
      {
        start_time : new Date(),
        color : "yellow"
      },
      {
        start_time : new Date(),
        color : "brown"
      },
    ]
    for (let i = 0; i < eventsList.length; i++) {
      let item = eventsList[i];
      let date = `${[moment(getTranslatedTime(item.start_time, timezone)).format("YYYY-MM-DD")]}`
      if (newDatesObj[date]) {
        let newObj = {
          ...newDatesObj[date]
        }
        let colorList = [...newDatesObj[date].colorList]
        colorList.push(item.color !== "" ? item.color : dotColor)
        newObj.colorList = colorList
        newDatesObj[date] = newObj
      }
      else {
        newDatesObj[date] = {
          selected: false,
          marked: true,
          selectedColor: colors.secondary,
          dotColor: item.color !== "" ? item.color : dotColor,
          colorList : [item.color !== "" ? item.color : dotColor]
        };
      }
    }
    setMarkedList(newDatesObj);
  };

  const HeaderComponent = () => {
    return (
      <View style={{ zIndex: 1, position: "absolute", top: 0, right: 0 }}>
        <TouchableWithoutFeedback onPress={() => setShowPopup(!showPopup)}>
          <View style={styles.formatToggle}>
            <Text
              style={{ fontSize: getHeightPixel(16), fontFamily: "Segoe UI", color: colors.mineShaft }}
            >
              {props.format}
            </Text>
            <Image source={icons.DropDown} />
          </View>
        </TouchableWithoutFeedback>
        {showPopup ? (
          <View style={styles.listContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.onFormatChange("Month");
                setShowPopup(false);
              }}
            >
              <Text style={styles.label}>Month</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                props.onFormatChange("Week");
                setShowPopup(false);
              }}
            >
              <Text style={styles.label}>Week</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                props.onFormatChange("Day");
                setShowPopup(false);
              }}
            >
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
          </View>
        ) : null}
      </View>
    );
  };
  const dayPressed = (day) => {
    setSelectedDate({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: colors.secondary,
        dotColor: dotColor,
      },
    });
    console.log('day pressed => ', day.dateString);
    props.onChangeDate(day.dateString);
    if (day.dateString in markedList) {
      console.log('The day already has an event!');
      let eventObj = eventsList.filter(
        (item) => day.dateString == moment(getTranslatedTime(item.start_time, timezone)).format("YYYY-MM-DD")
      );

      setEventList(eventObj);
      if (refList.current.length > 0) {
        console.log("Modal===>", showModal);
        setShowModal(true);
        setEventSelectedDate(day.dateString);
      }
      console.log("eventObj[]===>", eventObj);
    } else if (
      moment(day.dateString).isBefore(moment(new Date())) &&
      moment(day.dateString).format("YYYY-MM-DD") !==
      moment(new Date()).format("YYYY-MM-DD")
    ) {
      alert("Event cannot be added before current day!");
      return;
    } else {
      console.log("The day has no Event");
      props.navigation.navigate("UpdateEventScreen", {
        day: moment(day.dateString).toDate(),
        isCreate: true,
      });
    }
  };
  console.log("EventSelected DTE===>", eventSelectedDate);
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      {HeaderComponent()}
      <Calendar
        markingType={"custom"}
        onDayPress={(day) => dayPressed(day)}
        theme={{
          selectedDayTextColor: "black",
          dotStyle: {
            height: 9,
            width: 9,
            borderRadius: 4.5,
          },
          textDayStyle: {
            fontFamily: "Segoe UI",
            color: "rgba(119, 136, 153, 1)",
            fontSize: 14,
            fontWeight: "400",
          },
          textDisabledColor: "rgba(204, 215, 226, 1)",
          textDayHeaderFontFamily: "Segoe UI",
          textDayHeaderFontSize: 11,
          textDayFontWeight: "bold",
          textSectionTitleColor: "black",
          textMonthFontFamily: "Segoe UI",
          textMonthFontWeight: "bold",
          textMonthFontSize: 24,
          arrowColor: "rgba(119, 136, 153, 1)",
        }}
        enableSwipeMonths={true}
        markedDates={{
          ...selectedDate,
          ...markedList,
          // '2022-04-18': { selected: false, marked: true, selectedColor: colors.secondary },
        }}
      />

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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.mineShaft,
                    fontSize: getWidthPixel(18),
                    fontFamily: "Segoe UI",
                  }}
                >
                  Event List
                </Text>

                <TouchableWithoutFeedback
                  onPress={() => {
                    setShowModal(false);
                    props.navigation.navigate("UpdateEventScreen", {
                      day: eventSelectedDate,
                      isCreate: true,
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#0C4B81",
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        fontSize: getHeightPixel(14),
                        fontWeight: "500",
                        fontFamily: "Segoe UI",
                        marginHorizontal: 5,
                      }}
                    >
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
                data={eventList}
                renderItem={({ item }) => {
                  // console.log("Item====>", item);
                  console.log('item.start_time => ', item.start_time);
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
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottomColor: colors.ironGray,
                            borderBottomWidth: 1,
                            marginVertical: 15,
                            paddingBottom: 15,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.mineShaft,
                              fontSize: getHeightPixel(16),
                              fontWeight: "500",
                              fontFamily: 'Segoe UI'
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text style={{ color: colors.mineShaft, fontFamily: 'Segoe UI' }}>
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
  );
};
const styles = StyleSheet.create({
  formatToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#E6F7FF",
    marginTop: 5,
    width: getWidthPixel(90),
    paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(40),
  },
  listContainer: {
    backgroundColor: "#E6F7FF",
    position: "absolute",
    zIndex: 5,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: getWidthPixel(90),
    marginTop: getHeightPixel(40),
    paddingHorizontal: 10,
    borderTopColor: colors.ironGray,
    borderTopWidth: 1,
  },
  label: {
    paddingVertical: 5,
    fontSize: getHeightPixel(16),
    fontFamily: "Segoe UI",
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
});
