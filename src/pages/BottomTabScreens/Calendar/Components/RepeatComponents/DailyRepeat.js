import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../../../../../common/colors";
import { getHeightPixel } from "../../../../../common/helper";
import CustomDropDown from "../CustomDropDown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default DailyRepeat = (props) => {
  const endList = ["Never", "On Date", "Occurences"];
  const [endListItem, setEndListItem] = useState(props.endItem);
  const [dailyDate, setDailyDate] = useState(props.until);
  const [showDateModal, setShowDateModal] = useState(false);
  console.log(props.daysInterval);
  const [countDays, setCountDays] = useState(props.daysInterval);
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    props.setData(value);
    props.setRr(
      `Repeats every ${countDays ? `${countDays} ` : ""}day${countDays > 1 ? "s" : ""
      } ${endListItem == "On Date"
        ? `until ${moment(dailyDate).format("MMMM DD, YYYY")}`
        : ""
      }${endListItem == "Occurences"
        ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
        : ""
      }`
    );
  }, [countDays, count, endListItem, dailyDate]);
  let value = `RRULE: FREQ=${"DAILY"};`;
  if (endListItem == "Occurences") {
    value = `RRULE: FREQ=${"DAILY"};COUNTDAYS=${countDays};COUNT=${count}`;
  } else if (endListItem == "On Date") {
    value = `RRULE: FREQ=${"DAILY"};COUNTDAYS=${countDays};DATE=${moment(
      new Date(dailyDate)
    ).toISOString()}`;
  } else if (endListItem == "Never") {
    value = `RRULE: FREQ=${"DAILY"};COUNTDAYS=${countDays}`;
  }
  console.log('count', countDays);
  return (
    <View style={{ width: "70%", alignSelf: "center" }}>
      <Text style={{ ...styles.heading, marginVertical: 5 }}>
        Every How Many Days
      </Text>
      <View style={styles.boxContainer}>
        <TextInput
          value={countDays.toString()}
          placeholder="0"
          onChangeText={(e) => {
            setCountDays(e);
            props.setDaysInterval(e)
          }}
          keyboardType="numeric"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View style={{ zIndex: 5 }}>
        <CustomDropDown
          title={"End"}
          containerStyle={{ paddingHorizontal: 0 }}
          item={endListItem}
          list={endList}
          onSelect={(item) => {
            setEndListItem(item);
            props.setEndItem(item)
            if (item == "On Date") setShowDateModal(true);
          }}
        />
      </View>
      {endListItem == "Occurences" && (
        <View>
          <Text style={{ ...styles.heading, marginVertical: 5 }}>Count</Text>
          <View style={styles.boxContainer}>
            <TextInput
              value={count.toString()}
              placeholder="0"
              onChangeText={(e) => {
                setCount(e);
                props.setCount(e)
              }}
              keyboardType="numeric"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </View>
      )}
      <Text
        style={{
          ...styles.heading,
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {`Repeats every ${countDays ? `${countDays} ` : ""}day${countDays > 1 ? "s" : ""
          } ${endListItem == "On Date"
            ? `until ${moment(dailyDate).format("MMMM DD, YYYY")}`
            : ""
          }${endListItem == "Occurences"
            ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
            : ""
          }`}
      </Text>
      <DateTimePickerModal
        isVisible={showDateModal}
        mode="date"
        onConfirm={(date) => {
          setDailyDate(date);
          props.setUntil(date)
          setShowDateModal(false);
        }}
        onCancel={() => setShowDateModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "700",
    color: colors.mineShaft,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-end",
    // backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: colors.accentGray,
    // marginTop: 5,
    // paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(50),
  },
});
