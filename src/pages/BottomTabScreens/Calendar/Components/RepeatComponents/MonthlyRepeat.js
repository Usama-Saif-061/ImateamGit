import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { getHeightPixel, getWidthPixel } from "../../../../../common/helper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LongDropDown from "../LongDropDown";
import colors from "../../../../../common/colors";

export default MonthlyRepeat = (props) => {
  const freqList = [
    "Every Month",
    "Every 2 Month",
    "Every 3 Month",
    "Every 4 Month",
    "Every 5 Month",
    "Every 6 Month",
  ];
  const [freqItem, setFreqItem] = useState(props.freqItem ? props.freqItem : "Every Month");
  const [freqData, setFreqData] = useState(1);
  const howList = ["On Day", "On The"];
  const [howItem, setHowItem] = useState(props.monthBy);
  const everyList = ["First", "Second", "Third", "Fourth", "Fifth", "Last"];
  const [everyItem, setEveryItem] = useState(
    props.positionBy == 1 ? "First" :
      props.positionBy == 2 ? "Second" :
        props.positionBy == 3 ? "Third" :
          props.positionBy == 4 ? "Fourth" :
            props.positionBy == 5 ? "Fifth" :
              "Last"
  );
  const daysList = [
    { name: 1 },
    { name: 2 },
    { name: 3 },
    { name: 4 },
    { name: 5 },
    { name: 6 },
    { name: 7 },
    { name: 8 },
    { name: 9 },
    { name: 10 },
    { name: 11 },
    { name: 12 },
    { name: 13 },
    { name: 14 },
    { name: 15 },
    { name: 16 },
    { name: 17 },
    { name: 18 },
    { name: 19 },
    { name: 20 },
    { name: 21 },
    { name: 22 },
    { name: 23 },
    { name: 24 },
    { name: 25 },
    { name: 26 },
    { name: 27 },
    { name: 28 },
    { name: 29 },
    { name: 30 },
    { name: 31 },
    { name: "Last Day" },
  ];
  const [day, setDay] = useState(props.monthDay);
  const endList = ["Never", "On Date", "Occurences"];
  const [endListItem, setEndListItem] = useState(props.endItem);
  const [monthlyDate, setMonthlyDate] = useState(props.until);
  const [showDateModal, setShowDateModal] = useState(false);
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    props.setData(value);
    props.setRr(
      `Repeats every ${freqItem.toLowerCase()}${freqItem == "Every Month" ? "" : "s"
      } on the ${howItem == "On Day"
        ? day == "Last Day"
          ? "last"
          : moment.localeData().ordinal(day)
        : `${everyItem} Monday`
      } ${endListItem == "On Date"
        ? `until ${moment(monthlyDate).format("MMMM DD, YYYY")}`
        : ""
      } ${endListItem == "Occurences"
        ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
        : ""
      }`
    );
  }, [
    freqData,
    howItem,
    day,
    everyItem,
    monthlyDate,
    endListItem,
    count,
    value,
  ]);
  let value = "";
  console.log('FreqData -> ', freqData);
  if (freqData) {
    let subValue = "";
    if (howItem == "On Day") {
      subValue = `RRULE: FREQ=${"MONTHLY"};INTERVAL=${freqData};BYMONTHDAY=${day == 'Last Day' ? -1 : day};`;
    } else if (howItem == "On The") {
      console.log('everyItem', everyItem);
      subValue = `RRULE: FREQ=${"MONTHLY"};INTERVAL=${freqData};BYDAY=${everyItem == 'First' ? '+1TU' : everyItem == 'Second' ? '+2TU' : everyItem == 'Third' ? '+3TU' : everyItem == 'Fourth' ? '+4TU' : everyItem == 'Fifth' ? '+5TU' : '-1TU'}`;
    }
    if (endListItem == "Occurences") {
      value = `${subValue};COUNT=${count}`;
    } else if (endListItem == "On Date") {
      value = `${subValue};DATE=${moment(
        new Date(monthlyDate)
      ).toISOString()}`;
    } else if (endListItem == "Never") {
      value = `${subValue}`;
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: getWidthPixel(25),
      }}
    >
      <View style={{ zIndex: 5 }}>
        <CustomDropDown
          title={"How Often"}
          item={freqItem}
          list={freqList}
          onSelect={(item) => {
            if (item == "Every Month") {
              setFreqData(1);
            } else if (item == "Every 2 Month") {
              setFreqData(2);
            } else if (item == "Every 3 Month") {
              setFreqData(3);
            } else if (item == "Every 4 Month") {
              setFreqData(4);
            } else if (item == "Every 5 Month") {
              setFreqData(5);
            } else if (item == "Every 6 Month") {
              setFreqData(6);
            }
            setFreqItem(item);
            props.setFreqItem(item)
          }}
        />
      </View>
      <View style={{ zIndex: 4 }}>
        <CustomDropDown
          title={"How"}
          item={howItem}
          list={howList}
          onSelect={(item) => {
            setHowItem(item);
            props.setMonthBy(item)
          }}
        />
      </View>
      <View style={{ zIndex: 3 }}>
        {howItem == "On Day" ? (
          <LongDropDown
            bgColor={"white"}
            list={daysList}
            item={day}
            title="Day of the Month"
            onSelect={(item) => {
              setDay(item);
              props.setMonthDay(item)
            }}
            listHeight={200}
          />
        ) : (
          <CustomDropDown
            title={"Every"}
            item={everyItem}
            list={everyList}
            onSelect={(item) => {
              setEveryItem(item);
              props.setPositionBy(item)
            }}
          />
        )}
      </View>
      <View style={{ zIndex: 2 }}>
        <CustomDropDown
          title={"End"}
          containerStyle={{ paddingHorizontal: getWidthPixel(15) }}
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
        <View style={{ paddingHorizontal: getWidthPixel(15) }}>
          <Text style={styles.heading}>Count</Text>
          <View style={styles.countInputContainer}>
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
          paddingHorizontal: getWidthPixel(15),
        }}
      >
        {`Repeats ${freqItem.toLowerCase()}${freqItem == "Every Month" ? "" : "s"
          } on the ${howItem == "On Day"
            ? day == "Last Day"
              ? "last"
              : moment.localeData().ordinal(day)
            : `${everyItem} Monday`
          } ${endListItem == "On Date"
            ? `until ${moment(monthlyDate).format("MMMM DD, YYYY")}`
            : ""
          } ${endListItem == "Occurences"
            ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
            : ""
          }`}
      </Text>
      <DateTimePickerModal
        isVisible={showDateModal}
        mode="date"
        onConfirm={(date) => {
          setMonthlyDate(date);
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
    marginVertical: 5,
  },
  countInputContainer: {
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
