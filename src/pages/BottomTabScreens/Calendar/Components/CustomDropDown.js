import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import colors from "../../../../common/colors";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";

export default CustomDropDown = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const RenderSingleListItem = (item, i) => {
    return (
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          props.onSelect(item);
          setShowPopup(false);
        }}
      >
        <Text style={styles.singleItem}>{item}</Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={[styles.mainContainer, props.containerStyle]}>
      {props.title && (
        <Text style={[styles.heading, props.titleStyle]}>{props.title}</Text>
      )}
      <View style={{ zIndex: 1, marginTop: getHeightPixel(5) }}>
        <TouchableWithoutFeedback
          disabled={props.disabled ? true : false}
          onPress={() => {
            setShowPopup(!showPopup);
          }}
        >
          <View
            style={{
              ...styles.boxContainer,
              opacity: props.disabled ? 0.4 : 1,
            }}
          >
            <Text style={styles.boxText}>{props.item}</Text>
            <Image source={icons.DropDown} />
          </View>
        </TouchableWithoutFeedback>
        {showPopup && (
          <View style={styles.listView}>
            {props.list.map((item, i) => RenderSingleListItem(item, i))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: getWidthPixel(15),
    paddingTop: getHeightPixel(10),
  },
  heading: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "700",
    color: colors.mineShaft,
  },
  singleItem: {
    color: colors.mineShaft,
    fontSize: getWidthPixel(16),
    marginLeft: getWidthPixel(10),
    paddingVertical: 5,
    fontFamily: "Segoe UI",
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
    paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(50),
  },
  boxText: {
    fontFamily: "Segoe UI",
    color: colors.mineShaft,
    fontSize: getHeightPixel(16),
  },
  listView: {
    // backgroundColor: '#e6f7ff',
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.accentGray,
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 20,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: getHeightPixel(40),
    borderTopColor: colors.ironGray,
    borderTopWidth: 1,
    // marginTop: getHeightPixel(40),
    top: getHeightPixel(8),
  },
});
