import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import SingleEventDetails from "./SingleEventDetails";
import moment from "moment";
import { getHeightPixel, getTranslatedTime, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";
import colors from "../../../../common/colors";

const AgendaView = (props) => {
  const isFocused = useIsFocused();
  const events = useSelector((state) => state.calendar.eventsList);
  const calendars = useSelector((state) => state.calendar.list);
  const timezone = useSelector((state) => state.calendar.timezone);
  const [showPopup, setShowPopup] = useState(false);
  const [arr, setArr] = useState([])
  const [lessItems, setLessItems] = useState(false)

  useLayoutEffect(() => {
    let arr = [];
    let newArr = []
    let calendarList = props.agendaCal ? [props.agendaCal] : calendars
    for (let i = 0; i < calendarList.length; i++) {
      let obj = {};
      obj["title"] = calendarList[i].name;
      let arr1 = [];
      for (let j = 0; j < events.length; j++) {
        if (calendarList[i].id == events[j].calendar) {
          arr1.push(events[j]);
        }
      }
      newArr.push(...arr1)
      if (arr1.length == 0) {
      } else {
        obj["data"] = arr1;
        if (isFocused) {
          arr.push(obj);
        }
      }
    }
    if (newArr.length < 2) setLessItems(true)
    setArr(arr)
  }, [props.agendaCal, props.flag, events, isFocused])

  const RenderItem = (item) => {
    return (
      <SingleEventDetails
        startTime={moment(getTranslatedTime(item.start_time, timezone)).format(
          "h:mm A"
        )}
        endTime={moment(getTranslatedTime(item.end_time, timezone)).format(
          "h:mm A"
        )}
        title={item.title}
        label={
          item.locations[0]?.address
            ? item.locations[0]?.address
            : "Event Location"
        }
        onPress={() => {
          let calObj = calendars.filter((el) => el.id == item.calendar)
          props.navigation.navigate("EventDetails", {
            eventObj: item,
            calObj: calObj[0],
          })
        }
        }
      />
    );
  };

  const HeaderComponent = () => {
    return (
      <View style={{ zIndex: 1, position: "absolute", top: 0, right: 10 }}>
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
    )
  }
  let firstTitle = arr[0]?.title
  return (
    <View style={{
      flex: 1,
      height: lessItems ? getHeightPixel(250) : '100%',
    }}>
      {HeaderComponent()}
      {
        arr.length > 0 ?
          <SectionList
            style={{ paddingTop: 10 }}
            sections={arr}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => RenderItem(item)}
            renderSectionHeader={({ section: { title } }) => (
              <Text numberOfLines={1} style={{ ...styles.header, textAlign: 'center', width: firstTitle == title ? '40%' : '100%' }}>{title}</Text>
            )}
          /> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.header, fontSize: 16, fontWeight: '400', textAlign: 'center', color: colors.mineShaft }}>No events found against your {`\n`} selected calendars.</Text>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontFamily: 'Segoe UI',
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "700",
    fontSize: getHeightPixel(18),
    backgroundColor: "#fff",
    marginVertical: getHeightPixel(5)
  },
  title: {
    fontSize: 24,
  },
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
});

export default AgendaView;
