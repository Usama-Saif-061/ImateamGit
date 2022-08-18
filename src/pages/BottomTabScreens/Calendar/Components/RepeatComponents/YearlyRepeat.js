import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { getHeightPixel, getWidthPixel } from "../../../../../common/helper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../../../../common/colors";

export default YearlyRepeat = (props) => {
  const endList = ["Never", "On Date", "Occurences"];
  const [endListItem, setEndListItem] = useState(props.endItem);
  const [yearlyDate, setYearlyDate] = useState(props.until);
  const [showDateModal, setShowDateModal] = useState(false);
  const [count, setCount] = useState(props.count);

  useEffect(() => {

    let value = `RRULE: FREQ=${"YEARLY"};INTERVAL=${1};`;
    if (endListItem == "On Date") {
      value = `RRULE: FREQ=${"YEARLY"};INTERVAL=${1};Date=${moment(
        new Date(yearlyDate)
      ).toISOString()}`;
    } else if (endListItem == "Occurences") {
      value = `RRULE: FREQ=${"YEARLY"};INTERVAL=${1};COUNT=${count}`;
    }
    props.setData(value);

    props.setRr(
      `Repeats every year ${endListItem == "On Date"
        ? `until ${moment(yearlyDate).format("MMMM DD, YYYY")}`
        : ""
      }${endListItem == "Occurences"
        ? `for ${count ? count : 0} time${count > 1 ? "s" : ""}`
        : ""
      }`
    );
  }, [endListItem, count, yearlyDate]);

  return (
    <View
      style={{
        paddingHorizontal: getWidthPixel(25),
      }}
    >
      <View style={{ zIndex: 5 }}>
        <CustomDropDown disabled={true} title={"How Often"} item={"Never"} />
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
                setCount(e)
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
        {`Repeats every year ${endListItem == "On Date"
          ? `until ${moment(yearlyDate).format("MMMM DD, YYYY")}`
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
          setYearlyDate(date);
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
