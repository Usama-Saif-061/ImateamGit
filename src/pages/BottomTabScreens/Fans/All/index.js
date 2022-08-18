import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import postData from "../../../Landing/pages/MainLanding/dummyData";
import colors from "../../../../common/colors";
import { font } from "../../../../common/helper";
import Icon from "react-native-vector-icons/Feather";
import CheckIcon from "react-native-vector-icons/Ionicons";
import icons from "../../../../common/icons";
const All = () => {
  const [statusList, setStatusList] = useState([]);
  const [value, setValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const showAlert = (pname, item) => {
    Alert.alert("Confirmation", "Do You Want to Block " + pname + "?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => setStatusList((pre) => [...pre, item]) },
    ]);
  };
  const renderList = ({ item }) => (
    <View style={styles.listWrapper}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.listImage} source={item.profileImage} />
        <View>
          <Text style={styles.listName}>{item.profileName}</Text>
          {statusList.some((e) => e.id === item.id) ? (
            <TouchableOpacity>
              <Text style={styles.listStatus}>Follow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginLeft: 14,
                alignItems: "center",
              }}
            >
              <CheckIcon
                name="checkmark-circle-sharp"
                color={colors.inputBlue}
                size={14}
              />
              <Text style={[styles.listStatus, { marginLeft: 3 }]}>
                Following
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {statusList.some((e) => e.id === item.id) ? (
        <TouchableOpacity
          onPress={() =>
            setStatusList((pre) => {
              return pre.filter((temp) => temp.id != item.id);
            })
          }
          style={[styles.selectionWrapper, { backgroundColor: colors.pink }]}
        >
          <Text style={[styles.selectionText, { color: colors.blockRed }]}>
            Unblock
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectionWrapper}
          onPress={() => {
            console.log("Block is pressed");
            showAlert(item.profileName, item);
          }}
        >
          <Text style={styles.selectionText}>Block</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  useEffect(() => {
    console.log(statusList);
  }, [statusList]);
  return (
    <View style={styles.container}>
      {/* <View>
        <View style={styles.fansSearchWrapper}>
          <TextInput
            style={styles.fansSearch}
            placeholder="Fans"
            placeholderTextColor={colors.mineShaft}
            width={100}
            onChangeText={(value) => {
                setFilteredList(() =>
                  postData.filter((item) =>
                    item.profileName.toLowerCase().includes(value.toLowerCase())
                  )
                );
              }
            }
          ></TextInput>
          <Image source={icons.SearchIcon} />
        </View>
      </View> */}
      <View style={styles.content2}>
        <FlatList
          data={filteredList.length ? filteredList : postData}
          renderItem={renderList}
          refreshing={true}
        />
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 60,
          backgroundColor: colors.inputBlue,
          alignSelf: "flex-end",
          marginRight: 20,
          zIndex: 1,
          position: "absolute",
          bottom: 20,
          right: 12,
          alignItems: "center",
        }}
      >
        <Icon name="plus" size={42} style={{ padding: 16, color: "#fff" }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content2: {
    flex: 2,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  listWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightSilver,
    paddingVertical: 15,
    flex: 1,
  },
  listImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listName: {
    marginLeft: 14,
    ...font(16, "600"),
  },
  listStatus: {
    marginLeft: 14,
    ...font(14),
    color: colors.accentGray,
  },
  selectionWrapper: {
    alignItems: "center",
    marginLeft: 13,
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 20,
  },
  selectionText: {
    paddingHorizontal: 12,
    paddingVertical: 4,

    ...font(14, "bold"),
    color: colors.mineShaft,
  },
  fansSearchWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  fansSearch: {
    ...font(18),
    color: colors.mineShaft,
    width: 225,
    paddingVertical: 0,
    textAlign: "center",
    paddingHorizontal: 20,
    marginRight: 2,
    flex: 1,
  },
});
export default All;
