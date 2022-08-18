import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import AppStatusBar from "../../../../statusBarColor";
import CommonHeader from "../../../../../common/Components/CommonHeader";
import BottomNavigation from "../../../../../common/Components/BottomNavigation";
import colors from "../../../../../common/colors";
import Icon from "react-native-vector-icons/AntDesign";
import {
  font,
  showInitials,
  getHeightPixel,
  getWidthPixel,
  generateRandomColor,
} from "../../../../../common/helper";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../../../../../common/Components/MainFrame";
import { useGetUserQuery } from "../../../../../Reducers/usersApi";
import shareToListAPI from "../../../Api/shareToListAPI";
import { ShowInitialsOfName } from "../../../../../common/Components/ShowInitialsOfName";
import { useSelector } from "react-redux";

const SharedPost = ({ navigation, route }) => {
  const [nameList, setNameList] = useState([]); //CONTAINS OBJECT OF EACH USER'S INFO
  const [done, setDone] = useState(false);

  const [loading, setLoading] = useState(false);
  const [shareToList, setShareToList] = useState([]);
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();

  // console.log("i am fans list", shareToListAPI());

  const checkList = (item) => {
    setNameList((pre) => {
      return pre.filter((temp) => temp.id != item);
    });
  };
  const itemStatus = (id) => {
    if (nameList.some((e) => e.id === id)) {
      return true;
    }
    return false;
  };
  const showToast = (name) => {
    Toast.show({
      type: "success",
      text1: `Ooops`,
      text2: `${name} is already selected 👋 `,
      visibilityTime: 1500,
    });
  };

  const renderList = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // CHECK IF THE NAME ALREADY SELECTED
        if (nameList?.some((e) => e.id === item.id)) {
          checkList(item.id);
          // showToast(item?.profileName);
        } else {
          setNameList((prev) => [...prev, item]);
        }
      }}
    >
      <View style={styles.listWrapper}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ShowInitialsOfName
            name={item.display_info.display_name}
            colors={item.color}
            size={40}
            radius={20}
            userId={item.id}
            imgUrl={item?.display_info?.avatar?.url}
          />

          <Text style={styles.listName}>{item.display_info.display_name}</Text>
        </View>
        <View
          style={[
            styles.listIcon,
            itemStatus(item.id) ? styles.checkedBox : styles.uncheckedBox,
          ]}
        >
          {itemStatus(item.id) ? (
            <Icon name="check" size={18} color="#fff" />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
  const callme = (list) => {
    navigation.navigate({
      name: "CreatePost",
      params: { nameList: list },
      merge: true,
    });
  };

  const userState = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // const userInterests = route?.params?.interests;
      const userInterests = userState?.interests

      const addedColorsInInterests = userInterests.map((item, index) => {
        return {
          color: generateRandomColor(index),
          id: item.id,
          profileName: item.name,
          display_info: {
            display_name: item.name,
            avatar: {
              url: item.avatar.upload,
            },
          },
        };
      });
      console.log("i am i am added colors ", addedColorsInInterests);
      const response = await shareToListAPI(route?.params?.userId);
      console.log("response list ", response);
      const addedColorsInConnections = response.map((item, index) => {
        return {
          color: generateRandomColor(index),
          id: item.id,
          profileName: item.display_info.display_name,
          display_info: {
            display_name: item.display_info.display_name,
            avatar: {
              url: item.display_info.avatar?.upload,
            },
          },
        };
      });

      const temp = addedColorsInConnections.concat(addedColorsInInterests);

      setNameList(route?.params?.selectedSendToList);
      setLoading(false);

      //console.log("i am id", userInfo.id);

      setShareToList(temp);
    };

    getData();
    console.log("i am after set to list");
    if (done) {
      callme(nameList);
    }
  }, [done]);

  return (
    <View style={styles.container}>
      <Loading isLoading={loading} backgroundColor={colors.white} />
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <CommonHeader
          navigation={navigation}
          centerText="Post To"
          endText="Done"
          onDone={setDone}
        />
      </SafeAreaView>
      <View style={styles.content1}>
        {nameList.length != 0 ? (
          <View style={styles.tagWrapper}>
            {nameList.map((item, index) => (
              <View style={styles.tag} key={index}>
                <ShowInitialsOfName
                  name={item.display_info.display_name}
                  colors={item.color}
                  size={20}
                  radius={10}
                  imgUrl={item?.display_info?.avatar?.url}
                  userId={item.id}
                />

                <Text style={styles.tagText}>
                  {item?.display_info?.display_name}
                </Text>
                <TouchableWithoutFeedback
                  onPress={
                    () => checkList(item.id) //REMOVE ITEM FROM NAMELIST....

                    // setNameList((pre) => pre.splice(pre.indexOf(item) + 1))
                  }
                >
                  <Icon name="close" size={12} color="#fff" />
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.content2}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={shareToList}
          ListHeaderComponent={() => (
            <View>
              <Text style={{ marginBottom: 16 }}>Post to....</Text>
            </View>
          )}
          renderItem={renderList}
          refreshing={true}
        />
      </View>

      {/* <View style={styles.navigation}>
        <BottomNavigation />
      </View> */}
      {/* CREATE POST HEADER */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content1: {
    backgroundColor: colors.silverWhite,
    paddingHorizontal: 17,
    paddingVertical: 14,
    minHeight: 50,
  },
  content2: {
    flex: 2,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: colors.accentGray,
    flexDirection: "row",
    paddingHorizontal: 4,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 4,
    marginVertical: 6,
    paddingVertical: 2,
  },
  tagImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginVertical: 3,
  },
  tagText: {
    ...font(14, "bold"),
    paddingHorizontal: 6,
    color: "#fff",
  },
  navigation: {
    // flex: 0.2,
    justifyContent: "center",
    backgroundColor: "pink",
    paddingHorizontal: 5,
  },
  listWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightSilver,
    paddingVertical: 15,
  },
  listImage: {
    width: getWidthPixel(40),
    height: getHeightPixel(40),
    borderRadius: 20,

    ...font(12),
  },
  listName: {
    marginLeft: 14,
    ...font(16),
  },
  listIcon: {
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  checkedBox: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  uncheckedBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.accentGray,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SharedPost;
