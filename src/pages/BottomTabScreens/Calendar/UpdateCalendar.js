import React, { useEffect, useLayoutEffect } from "react";
import useState from "react-usestateref";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import AppStatusBar from "../../statusBarColor";
import TopHeader from "../Components/TopHeader";
import { getHeightPixel, getWidthPixel } from "../../../common/helper";
import colors from "../../../common/colors";
import InputComponent from "./Components/InputComponent";
import DropDownComponent from "./Components/DropDownComponent";
import icons from "../../../common/icons";
import ButtonRound from "../Components/ButtonRound";
import {
  addCalendarApi,
  deleteCalendarApi,
  updateCalendarApi,
} from "./API/calendarsApi";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../Reducers/sidebarSlice";
import { useGetUserQuery } from "../../../Reducers/usersApi";
import { colorsConstantList } from "../Messages/constants";


export default UpdateCalendar = ({ navigation, route }) => {
  const [selected, setSelected, selectedRef] = useState();
  const [colorSelected, setColorSelected] = useState(
    route.params.calendarObj ? route.params.calendarObj.color : ""
  );
  const [calendarName, setCalendarName] = useState(
    route.params.calendarObj ? route.params.calendarObj.name : ""
  );
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();
  const [accountsList, setAccountsList] = useState([]);
  const [account, setAccount] = useState(
    userInfo?.org_accounts[0]?.display_name
  );
  console.log('enbf => ', userInfo)
  const [accountId, setAccountId] = useState(userInfo?.org_accounts[0]?.id);
  const dispatch = useDispatch();

  const [colorsList, setColorsList, ref] = useState(colorsConstantList);

  useLayoutEffect(() => {
    dispatch(toggleSidebar(false));
    if (route.params.calendarObj) {
      colorPreSelect();
    }
    if (userInfo) {
      let list = [];
      for (let i = 0; i < userInfo.org_accounts.length; i++) {
        list.push(userInfo.org_accounts[i].display_name);
      }
      setAccountsList(list);
    }
  }, []);

  const colorPreSelect = () => {
    let list = colorsList.filter((item, index) => {
      if (item.colorCode == route.params.calendarObj.color) {
        setSelected(index);
        return true;
      } else {
        return false;
      }
    });
    // if (list.length == 0) {
    //     setColorsList([...colorsList, {
    //         name: 'New',
    //         colorCode: route.params.calendarObj.color
    //     }])
    //     ref.current.filter((item, index) => {
    //         if (item.colorCode == route.params.calendarObj.color) {
    //             setSelected(index)
    //         }
    //     })
    // }
  };

  const addCalendarClicked = async () => {
    if (calendarName == "") {
      alert("Calendar name cannot be empty!");
      return;
    }
    if (colorSelected == "") {
      alert("Please select a color!");
      return;
    }
    setLoading(true);
    try {
      let body =
        route.params && route.params.addCalendar
          ? {
            values: {
              account: accountId,
              color: colorSelected,
              name: calendarName,
              type: "work",
            },
          }
          : {
            values: {
              account: accountId,
              color: colorSelected,
              name: calendarName,
              type: "work",
            },
            calendarId: route.params.calendarObj.id,
            active: true,
          };
      const response =
        route.params && route.params.addCalendar
          ? await addCalendarApi(body)
          : await updateCalendarApi(body);
      // console.log('response => ', response);
      if (response.resultCode == 200) {
        // alert('Calendar added successfully!')
        Alert.alert(
          "Alert",
          route.params && route.params.addCalendar
            ? "Calendar added successfully!"
            : "Calendar updated successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("CalendarHome"),
            },
          ]
        );
      } else {
        alert(
          response.message?.message
            ? response.message?.message
            : `Error while ${route.params.addCalendar ? "adding" : "updating"
            } Calendar.`
        );
      }
    } catch (err) {
      console.log("err => ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCalendarClicked = () => {
    let adminsArray = route.params.calendarObj.admins;
    let isUserAdmin = adminsArray.includes(userInfo.id);
    if (route.params.calendarObj.user == userInfo.id || isUserAdmin) {
      setShowPopup(true);
    } else {
      Alert.alert(
        "Alert",
        "Only calendar owner or admin can delete the calendar!"
      );
    }
  };

  const deleteCalendarApiFunc = async () => {
    const body = {
      calendarId: route.params.calendarObj.id,
    };
    setLoading(true);
    try {
      const res = await deleteCalendarApi(body);
      console.log("response delete Calendar api =>", res);
      if (res.resultCode == 200) {
        setLoading(false);
        Alert.alert("Success", "Calendar deleted successfully!", [
          {
            text: "OK",
            onPress: () => {
              setShowPopup(false);
              navigation.navigate("CalendarHome");
            },
          },
        ]);
      } else {
        alert(
          res.message?.message
            ? res.message?.message
            : "Error while deleting calendar."
        );
      }
    } catch (e) {
      console.log("Error: ", e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, zIndex: 0 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={{ flex: 1 }}>
            <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <TopHeader
              title={
                route.params && route.params.addCalendar
                  ? "Add Calendar"
                  : "Update Calendar"
              }
              isCross
              onPress={() => navigation.goBack()}
              isSubmit
              onUpdate={addCalendarClicked}
              loading={loading}
            />
            <ScrollView style={styles.mainContainer}>
              <View style={{ zIndex: 5 }}>
                <DropDownComponent
                  title="Account"
                  item={account}
                  list={accountsList}
                  onSelect={(item) => {
                    let obj = userInfo?.org_accounts?.filter(
                      (e, i) => e.display_name == item
                    );
                    setAccount(obj[0].display_name);
                    setAccountId(obj[0].id);
                  }}
                />
              </View>
              <InputComponent
                title="Name"
                value={
                  route.params.calendarObj ? route.params.calendarObj.name : ""
                }
                placeholder="My Calendar"
                placeholderColor={colors.accentGray}
                style={{ marginTop: getHeightPixel(15) }}
                onChangeText={(text) => setCalendarName(text)}
              />
              <Text style={{ ...styles.leftLabel, fontWeight: "700" }}>
                Color
              </Text>
              <View
                style={{
                  borderBottomColor: colors.ironGray,
                  borderBottomWidth: 1,
                }}
              />

              {/* {Colors Section here} */}
              <View
                style={{
                  paddingHorizontal: getWidthPixel(15),
                  marginTop: getHeightPixel(15),
                }}
              >
                {ref.current.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelected(index);
                        setColorSelected(item.colorCode);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor:
                            selected == index ? colors.accentGray : "white",
                          borderRadius: 15,
                          paddingHorizontal: getWidthPixel(10),
                          paddingVertical: getWidthPixel(5),
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: 10,
                              backgroundColor: item.colorCode,
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: "Segoe UI",
                              fontSize: getHeightPixel(16),
                              color: selected == index ? "white" : "#222222",
                              marginLeft: getWidthPixel(10),
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        {selected == index ? (
                          <Image source={icons.Tick} />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <ButtonRound
                title={
                  route.params && route.params.addCalendar
                    ? "ADD CALENDAR"
                    : "DELETE CALENDAR"
                }
                style={{ marginVertical: getHeightPixel(15) }}
                textStyle={{ fontFamily: "Segoe UI", fontWeight: "700" }}
                onPress={() => {
                  route.params && route.params.addCalendar
                    ? addCalendarClicked()
                    : deleteCalendarClicked();
                }}
                loading={loading}
              />
              {/* {Modal content here} */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => {
                  setShowPopup(!showPopup);
                }}
              >
                <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
                  <View style={styles.mainModalContainer}></View>
                </TouchableWithoutFeedback>
                <View style={styles.subContainer}>
                  <Text
                    style={{
                      color: colors.mineShaft,
                      fontSize: getWidthPixel(18),
                      fontFamily: "Segoe UI",
                    }}
                  >
                    Delete Calendar
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.lightSilver,
                      marginVertical: getHeightPixel(10),
                    }}
                  />
                  <Text
                    style={{
                      color: colors.accentGray,
                      fontSize: getWidthPixel(16),
                      fontFamily: "Segoe UI",
                    }}
                  >
                    When you delete this calendar, it will no longer be
                    accessible to anyone. This is a permanent and irreversible
                    action.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: getHeightPixel(15),
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <ButtonRound
                        title="KEEP CALENDAR"
                        onPress={() => setShowPopup(false)}
                        style={{
                          width: "90%",
                          backgroundColor: colors.accentGray,
                        }}
                        textStyle={{
                          fontFamily: "Segoe UI",
                          fontWeight: "800",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <ButtonRound
                        title="DELETE CALENDAR"
                        loading={loading}
                        onPress={deleteCalendarApiFunc}
                        style={{
                          width: "90%",
                          backgroundColor: colors.primary,
                        }}
                        textStyle={{
                          fontFamily: "Segoe UI",
                          fontWeight: "800",
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.ironGray,
  },
  leftLabel: {
    color: colors.mineShaft,
    marginHorizontal: getWidthPixel(15),
    marginTop: getHeightPixel(15),
    marginBottom: getHeightPixel(5),
    fontSize: getHeightPixel(16),
    fontWeight: "600",
    fontFamily: "Segoe UI",
  },
  mainModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  subContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: getWidthPixel(15),
    paddingBottom: getHeightPixel(25),
  },
});
