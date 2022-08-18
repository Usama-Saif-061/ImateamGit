import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import postData from "../../../Landing/pages/MainLanding/dummyData";
import colors from "../../../../common/colors";
import { font } from "../../../../common/helper";
import Icon from "react-native-vector-icons/Feather";
const All = () => {
  const [statusList, setStatusList] = useState([]);

  const renderList = ({ item }) => (
    <View style={styles.listWrapper}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.listImage} source={item.profileImage} />
        <View>
          <Text style={styles.listName}>{item.profileName}</Text>
          <Text style={styles.listStatus}>Follow</Text>
        </View>
      </View>
      {statusList.some((e) => e.id === item.id) ? (
        <TouchableOpacity
          onPress={() =>
            setStatusList((pre) => {
              return pre.filter((temp) => temp.id != item.id);
            })
          }
          style={[styles.selectionWrapper, { backgroundColor: "pink" }]}
        >
          <Text style={styles.selectionText}>Unblock</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.selectionWrapper}
          onPress={() => {
            console.log("Block is pressed");
            setStatusList((pre) => [...pre, item]);
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
      <View style={styles.content2}>
        <FlatList data={postData} renderItem={renderList} refreshing={true} />
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
    color: colors.mineShaft,
    ...font(14, "bold"),
  },
});
export default All;
