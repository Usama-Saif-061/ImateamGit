import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import icons from "../../../../common/icons";
import colors from "../../../../common/colors";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import { useDispatch } from "react-redux";
import {
  allCalendarsList,
  currentCalendar,
} from "../../../../Reducers/CommonReducers/calendarSlice";
import { getCallendars, updateCalendarApi } from "../API/calendarsApi";

export default SingleCalendarItem = ({
  obj,
  navigation,
  toggleBar,
  setLoading,
  changeFlag,
  onShowCalendar,
  type,
  onUnfollow
}) => {
  const [selected, setSelected] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [checked, setChecked] = useState(obj.active);
  const getCalenderApiCall = async () => {
    let res = await getCallendars();
    dispatch(allCalendarsList(res.data));
  };

  const dispatch = useDispatch();
  const updatedCalenderEventList = async () => {
    const body = {
      calendarId: obj.id,
      active: !checked,
    };

    setLoading(true);
    console.log("checked Value===>", !checked);
    const res = await updateCalendarApi(body);
    console.log("res====> ", res);
    await getCalenderApiCall();
    setLoading(false);
  };

  const updateCalendar = (obj) => {
    console.log("calendar update screen");
    navigation.navigate("UpdateCalendar", {
      calendarObj: obj,
    });
  };

  const addEvent = async () => {
    navigation.navigate("UpdateEventScreen", {
      day: new Date(),
      obj: obj,
      isCreate: true,
    });
  }

  return (
    <View key={obj.id}>
      <TouchableOpacity
        onPress={() => {
          setSelected(obj.id);
          setShowPopup(!showPopup);
          dispatch(currentCalendar(obj));
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: getHeightPixel(8),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                updatedCalenderEventList();
                setChecked(!checked);
                changeFlag();
              }}
            >
              <Image source={checked ? icons.TickBlueFilled : icons.TickBlue} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Segoe UI",
                marginLeft: getWidthPixel(10),
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
              }}
            >
              {obj.name}
            </Text>
          </View>
          <Image source={icons.ArrowForward} />
        </View>
      </TouchableOpacity>
      {obj.id == selected && showPopup ? (
        type !== 'subscriber' ?
          <View
            style={{
              paddingLeft: getWidthPixel(25),
            }}
          >
            <TouchableOpacity
              onPress={addEvent}
            >
              <View style={styles.centeredRow}>
                <Image source={icons.iconsMini.Add} />
                <Text style={styles.insideLabel}>Add Event</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ShareCalendar', {
              calObj: obj
            })}>
              <View style={styles.centeredRow}>
                <Image source={icons.iconsMini.Share} />
                <Text style={styles.insideLabel}>Share</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateCalendar(obj)}>
              <View style={styles.centeredRow}>
                <Image source={icons.iconsMini.Settings} />
                <Text style={styles.insideLabel}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShowCalendar}>
              <View style={styles.centeredRow}>
                <Image source={icons.iconsMini.Notes} />
                <Text style={styles.insideLabel}>Show calendar</Text>
              </View>
            </TouchableOpacity>
          </View> : // for Subscriber UI
          <View
            style={{
              paddingLeft: getWidthPixel(25),
            }}
          >
            <TouchableOpacity onPress={onShowCalendar}>
              <View style={styles.centeredRow}>
                <Image source={icons.iconsMini.Notes} />
                <Text style={styles.insideLabel}>Show calendar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onUnfollow}>
              <View style={[styles.centeredRow, {
                marginLeft: -2
              }]}>
                <Image style={{
                  tintColor: colors.accentGray,
                }} source={icons.iconsMini.Exit} />
                <Text style={styles.insideLabel}>Unsubscribe</Text>
              </View>
            </TouchableOpacity>
          </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeightPixel(5),
  },
  insideLabel: {
    fontFamily: "Segoe UI",
    color: colors.mineShaft,
    marginLeft: getWidthPixel(10),
  },
});
