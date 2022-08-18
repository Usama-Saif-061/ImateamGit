import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../../../../../common/colors";
import { getWidthPixel, getHeightPixel } from "../../../../../common/helper";
import icons from "../../../../../common/icons";
import CustomDropDown from "../CustomDropDown";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const WeeklyRepeat = (props) => {
  const freqList = ["Every Week", "Every 2 Weeks", "Every 3 Weeks"];
  const [freqItem, setFreqItem] = useState(props.freqItem);
  const [freqData, setFreqData] = useState(1);
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const endList = ["Never", "On Date", "Occurences"];
  const [endListItem, setEndListItem] = useState(props.endItem);
  const [daysArray, setDaysArray] = useState(props.daysArray);
  const [weeklyDate, setWeeklyDate] = useState(props.until);
  const [showDateModal, setShowDateModal] = useState(false);
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    // ["TUE", "MON"]
    let list = []
    if (props.daysList) {
      props.daysList.map((item, index) => {
        if (item == 0) {
          list.push('SUN')
        } else if (item == 1) {
          list.push('MON')
        } else if (item == 2) {
          list.push('TUE')
        } else if (item == 3) {
          list.push('WED')
        } else if (item == 4) {
          list.push('THU')
        } else if (item == 5) {
          list.push('FRI')
        } else if (item == 6) {
          list.push('SAT')
        }
      })
    }
    if (list.length > 0) {
      setDaysArray(list)
      // props.setDaysList(list)
    }
  }, [])

  useEffect(() => {
    props.setData(value);
    props.setRr(
      `Repeats ${freqItem} ${endListItem == "On Date" ? "until" : daysArray.length > 0 ? "on" : ""
      }${endListItem == "On Date"
        ? ` ${moment(weeklyDate).format("MMMM DD, YYYY")}`
        : daysArray.map((item) => ` ${item}`)
      } ${endListItem == "Occurences"
        ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
        : ""
      }`
    );
  }, [count, endListItem, freqItem, daysArray, weeklyDate]);
  let value = "";
  if (freqData) {
    let subValue = "";
    subValue = `RRULE: FREQ=${"WEEKLY"};INTERVAL=${freqData};BYDAY=${daysArray.map(
      (item) => item.substring(0, 2)
    )};ENDITEM=${endListItem};`;
    if (endListItem == "Occurences") {
      value = `${subValue}COUNT=${count}`;
    } else if (endListItem == "On Date") {
      value = `${subValue}DATE=${moment(new Date(weeklyDate)).toISOString()}`;
    } else if (endListItem == "Never") {
      value = `${subValue}`;
    }
  }
  console.log("weekly===>", moment(new Date(weeklyDate)).toISOString());

  const SingleWeekItem = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: getWidthPixel(5),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (daysArray.includes(item)) {
              let arr = daysArray.filter((el) => el !== item);
              props.setDaysList(arr)
              setDaysArray(arr);
            } else {
              setDaysArray([...daysArray, item]);
              props.setDaysList([...daysArray, item])
            }
          }}
        >
          <Image
            source={
              daysArray.includes(item)
                ? icons.iconsMini.checked
                : icons.iconsMini.unchecked
            }
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Segoe UI",
            fontSize: getHeightPixel(16),
            fontWeight: "600",
            color: colors.mineShaft,
            marginLeft: 2,
          }}
        >
          {item.substring(0, 3)}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: getWidthPixel(15),
        zIndex: 3999,
      }}
    >
      {/* <Text>Weekly repeat</Text> */}
      <View style={{ zIndex: 999 }}>
        <CustomDropDown
          title={"How Often"}
          item={freqItem}
          list={freqList}
          onSelect={(item) => {
            if (item == "Every Week") {
              setFreqData(1);
            } else if (item == "Every 2 Weeks") {
              setFreqData(2);
            } else if (item == "Every 3 Weeks") {
              setFreqData(3);
            }
            setFreqItem(item);
            props.setFreqItem(item)
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: getWidthPixel(15),
          marginTop: getHeightPixel(10),
        }}
      >
        <Text style={styles.heading}>Days</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {weekDays.map((item, index) => SingleWeekItem(item, index))}
        </View>
        <View style={{ zIndex: 998 }}>
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
          style={{ ...styles.heading, textAlign: "center", marginTop: 5 }}
        >{`Repeats ${freqItem} ${endListItem == "On Date" ? "until" : daysArray.length > 0 ? "on" : ""
          }${endListItem == "On Date"
            ? ` ${moment(weeklyDate).format("MMMM DD, YYYY")}`
            : daysArray.map((item) => ` ${item}`)
          } ${endListItem == "Occurences"
            ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
            : ""
          }`}</Text>
      </View>
      <DateTimePickerModal
        isVisible={showDateModal}
        mode="date"
        onConfirm={(date) => {
          setWeeklyDate(date);
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
    width: "100%",
    // paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(50),
  },
});

export default WeeklyRepeat;
