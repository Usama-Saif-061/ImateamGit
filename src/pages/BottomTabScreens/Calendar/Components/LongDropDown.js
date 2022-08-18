import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../../../common/colors";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";
import { FlatList } from "react-native-gesture-handler";

export default LongDropDown = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (props.popupOpen) {
      props.popupOpen(showPopup);
    }
  }, [showPopup]);

  const RenderSingleListItem = (item, i) => {
    return (
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          props.onSelect(item.item.name);
          setShowPopup(false);
        }}
      >
        <Text numberOfLines={1} style={styles.label}>
          {item.item.name}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: getWidthPixel(15),
        marginTop: getHeightPixel(15),
        ...props.style,
      }}
    >
      {!props.noTitle ? (
        <Text
          style={{
            fontFamily: "Segoe UI",
            fontSize: getHeightPixel(16),
            fontWeight: "700",
            color: colors.mineShaft,
          }}
        >
          {props.title}
        </Text>
      ) : null}
      <View style={{ zIndex: 1, marginTop: getHeightPixel(5) }}>
        <TouchableWithoutFeedback onPress={() => setShowPopup(!showPopup)}>
          <View
            style={{
              ...styles.formatToggle,
              ...props.style,
              backgroundColor: props.bgColor ? props.bgColor : "#e6f7ff",
              borderWidth: props.bgColor ? 1 : 0,
              borderColor: props.bgColor ? colors.accentGray : "",
            }}
          >
            <Text
              style={{
                fontFamily: "Segoe UI",
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
              }}
            >
              {props.item}
            </Text>
            <Image source={icons.DropDown} />
          </View>
        </TouchableWithoutFeedback>
        {showPopup && props.list ? (
          <View
            style={{
              backgroundColor: props.bgColor ? props.bgColor : "#e6f7ff",
              position: "absolute",
              right: 0,
              left: 0,
              top: getHeightPixel(10),
              zIndex: 20,
              alignSelf: "flex-end",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginTop: getHeightPixel(40),
              borderTopColor: colors.ironGray,
              borderTopWidth: 1,
              borderWidth: props.bgColor ? 1 : 0,
              borderColor: props.bgColor ? colors.accentGray : "",
              marginTop: props.style ? props.style.height : getHeightPixel(40),
              top: props.style ? props.style.top : getHeightPixel(10),
            }}
          >
            <View
              style={
                props.list.length < 8
                  ? { flex: 1 }
                  : {
                      height: props.listHeight
                        ? props.listHeight
                        : getHeightPixel(200),
                    }
              }
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={props.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, i) => RenderSingleListItem(item, i)}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formatToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#e6f7ff",
    // marginTop: 5,
    width: "100%",
    paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(50),
  },
  listContainer: {
    backgroundColor: "#e6f7ff",
    position: "absolute",
    right: 0,
    left: 0,
    top: getHeightPixel(10),
    zIndex: 20,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: getHeightPixel(40),
    borderTopColor: colors.ironGray,
    borderTopWidth: 1,
  },
  label: {
    color: colors.mineShaft,
    fontSize: getWidthPixel(16),
    marginLeft: getWidthPixel(10),
    paddingVertical: 5,
    fontFamily: "Segoe UI",
  },
});
