import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getHeightPixel, getWidthPixel } from "../../../common/helper";
import icons from "../../../common/icons";
import colors from "../../../common/colors";
import ButtonRound from "../Components/ButtonRound";
import SingleCalendarItem from "./Components/SingleCalendarItem";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../../Reducers/sidebarSlice";
import { getCallendars, unfollowCalendarApi } from "./API/calendarsApi";
import { allCalendarsList, setTimezone } from "../../../Reducers/CommonReducers/calendarSlice";
import { timeZonesList } from '../../../common/TimeZonesList'
import LongDropDown from "./Components/LongDropDown";
import moment from "moment";
import 'moment-timezone'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserQuery } from '../../../Reducers/usersApi'

const { width } = Dimensions.get("window");
export default Sidebar = (props) => {
  const [barVisible, setBarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleMyCalTab, setToggleMyCalTab] = useState(true)
  const [toggleAdminTab, setToggleAdminTab] = useState(false)
  const [toggleSubTab, setToggleSubTab] = useState(false)
  const [followLoader, setFollowLoader] = useState(false)

  const { data: userInfo, isFetching: fetch } = useGetUserQuery()

  let calendarList = useSelector((state) => state.calendar.list);
  const myCalendars = calendarList.filter((item, index) => item.user_info?.id == userInfo?.id)
  const adminCalendars = calendarList.filter((item, index) => item.admins?.includes(userInfo?.id) && !myCalendars?.includes(item))
  const subCalendars = calendarList.filter((item, index) => item.subscribers?.includes(userInfo?.id))
  const timezone = useSelector(state => state.calendar.timezone)
  const dispatch = useDispatch();

  const [currentTimeZone, setCurrentTimeZone] = useState(timezone)

  const animatedX = useSharedValue(barVisible ? 1 : getWidthPixel(100) - width);

  const selectTimeZoneFunc = async (item) => {
    setCurrentTimeZone(item)
    await AsyncStorage.setItem('timezone', item)
    dispatch(setTimezone(item))
  }

  useEffect(() => {
    sidebarAnimation();
  }, []);

  const sidebarAnimation = () => {
    animatedX.value = withTiming(barVisible ? getWidthPixel(100) - width : 0, {
      duration: 500,
    });
    setBarVisible(!barVisible);
  };

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedX.value,
        },
      ],
    };
  });

  const toggleBarFunc = () => {
    sidebarAnimation();
    setTimeout(() => {
      dispatch(toggleSidebar(false));
    }, 500);
  };
  const getUpdatedCalender = async () => {
    try {
      const response = await getCallendars();
      // console.log("response from all calender==>", JSON.stringify(response));
      if (response.resultCode == 200) {
        dispatch(allCalendarsList(response.data));
      }
    } catch (e) {
      console.log('Error getting update Calendar ', e)
    }
  };
  const unfollowCal = async (item) => {
    let body = {
      calendarId: item.id,
      unsubscribeId: userInfo.id
    }
    try {
      setFollowLoader(true)
      const response = await unfollowCalendarApi(body)
      if (response.resultCode == 200) {
        console.log('Calendar unfollowed')
        await getUpdatedCalender()
        setFollowLoader(false)
      }
      setFollowLoader(false)
    } catch (e) {
      setFollowLoader(false)
      console.log('Error unfollowing calendar')
    }
  }
  useEffect(() => {
    getUpdatedCalender();
  }, [loading]);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => toggleBarFunc()}>
        <View style={styles.bg}></View>
      </TouchableWithoutFeedback>
      {/* Main Side Bar */}
      <Animated.View style={[styles.mainBar, sidebarStyle]}>
        <FlatList
          data={['temp']}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => toggleBarFunc()}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: getWidthPixel(15),
                    }}
                  >
                    <Image
                      source={icons.Back}
                      style={{ tintColor: colors.mineShaft }}
                    />
                    <Text
                      style={{
                        fontFamily: "Segoe UI",
                        fontSize: getHeightPixel(18),
                        color: colors.mineShaft,
                        fontWeight: "700",
                        marginLeft: getWidthPixel(10),
                      }}
                    >
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ paddingHorizontal: getWidthPixel(15) }}>
                  <ButtonRound
                    title="ADD CALENDAR"
                    onPress={() =>
                      props.navigation.navigate("UpdateCalendar", {
                        addCalendar: true,
                      })
                    }
                    style={styles.roundButton}
                  />
                </View>
                <View style={{ zIndex: 888 }}>
                  <LongDropDown
                    list={timeZonesList}
                    item={currentTimeZone !== '' ?
                      currentTimeZone :
                      moment.tz.guess()}
                    title="Time Zone"
                    onSelect={(item) => selectTimeZoneFunc(item)}
                    listHeight={300}
                  />
                </View>
                <View style={{
                  borderBottomColor: colors.ironGray,
                  borderBottomWidth: toggleMyCalTab ? 0 : 1,
                }}>
                  <TouchableOpacity onPress={() => setToggleMyCalTab(!toggleMyCalTab)}>
                    <View style={{ paddingHorizontal: getWidthPixel(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text
                        style={{ ...styles.boldText, fontFamily: 'Segoe UI', fontWeight: '700' }}
                      >
                        My Calendars
                      </Text>
                      <Image source={icons.DropDown} />
                    </View>
                  </TouchableOpacity>
                  {!loading ? (
                    toggleMyCalTab ?
                      <View style={{ ...styles.calendarItems, paddingHorizontal: getWidthPixel(15) }}>
                        {myCalendars.map((item) => (
                          <SingleCalendarItem
                            obj={item}
                            changeFlag={() => props.changeFlag()}
                            navigation={props.navigation}
                            toggleBar={() => toggleBarFunc()}
                            key={item.id}
                            setLoading={(flag) => setLoading(flag)}
                            onShowCalendar={() => {
                              toggleBarFunc()
                              props.setAgendaCal(item)
                            }}
                          />
                        ))}
                      </View> : null
                  ) : myCalendars.length !== 0 ? (
                    toggleMyCalTab && <ActivityIndicator color={colors.primary} />
                  ) : null}
                </View>
                <View
                  style={{
                    borderBottomColor: colors.ironGray,
                    borderBottomWidth: 1,
                  }}
                >
                  <TouchableOpacity style={{ paddingHorizontal: getWidthPixel(15) }} onPress={() => setToggleAdminTab(!toggleAdminTab)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontFamily: "Segoe UI",
                          color: colors.mineShaft,
                          fontSize: getHeightPixel(16),
                          fontWeight: "700",
                          marginVertical: getHeightPixel(15),
                        }}
                      >
                        Admin
                      </Text>
                      <Image source={icons.DropDown} />
                    </View>
                  </TouchableOpacity>
                  {!loading ? (
                    toggleAdminTab ?
                      <View style={{ ...styles.calendarItems, paddingHorizontal: getWidthPixel(15), borderBottomWidth: 0 }}>
                        {adminCalendars.map((item) => (
                          <SingleCalendarItem
                            obj={item}
                            changeFlag={() => props.changeFlag()}
                            navigation={props.navigation}
                            toggleBar={() => toggleBarFunc()}
                            key={item.id}
                            setLoading={(flag) => setLoading(flag)}
                            onShowCalendar={() => {
                              toggleBarFunc()
                              props.setAgendaCal(item)
                            }}
                          />
                        ))}
                      </View> : null
                  ) : adminCalendars.length !== 0 ? (
                    toggleAdminTab && <ActivityIndicator color={colors.primary} />
                  ) : null}
                </View>
                <View
                  style={{
                    borderBottomColor: colors.ironGray,
                    borderBottomWidth: !toggleSubTab ? 1 : subCalendars.length > 0 ? 1 : 0,
                  }}
                >
                  <TouchableOpacity style={{ paddingHorizontal: getWidthPixel(15) }} onPress={() => setToggleSubTab(!toggleSubTab)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontFamily: "Segoe UI",
                          color: colors.mineShaft,
                          fontSize: getHeightPixel(16),
                          fontWeight: "700",
                          marginVertical: getHeightPixel(15),
                        }}
                      >
                        Subscribed
                      </Text>
                      <Image source={icons.DropDown} />
                    </View>
                  </TouchableOpacity>
                  {!loading && !followLoader ? (
                    toggleSubTab ?
                      <View style={{ ...styles.calendarItems, paddingHorizontal: getWidthPixel(15), borderBottomWidth: 0 }}>
                        {/* {myCalendars.map((item) => ( */}
                        {subCalendars.map((item) => (
                          <SingleCalendarItem
                            obj={item}
                            changeFlag={() => props.changeFlag()}
                            navigation={props.navigation}
                            toggleBar={() => toggleBarFunc()}
                            key={item.id}
                            setLoading={(flag) => setLoading(flag)}
                            onShowCalendar={() => {
                              toggleBarFunc()
                              props.setAgendaCal(item)
                            }}
                            onUnfollow={() => unfollowCal(item)}
                            type='subscriber'
                          />
                        ))}
                      </View> : null
                  ) : subCalendars.length !== 0 ? (
                    toggleSubTab ? <ActivityIndicator color={colors.primary} /> : null
                  ) : null}
                </View>
              </View>
            )
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 8,
  },
  mainBar: {
    display: "flex",
    backgroundColor: "white",
    height: "100%",
    width: width - getWidthPixel(100),
    zIndex: 10,
    paddingVertical: getHeightPixel(15),
    paddingTop: Platform.OS == "ios" ? getHeightPixel(20) : getHeightPixel(30),
  },
  roundButton: {
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(10),
    marginHorizontal: 0,
  },
  boldText: {
    marginTop: getHeightPixel(15),
    marginBottom: getHeightPixel(10),
    color: colors.mineShaft,
    fontSize: getHeightPixel(16),
    fontWeight: "600",
  },
  calendarItems: {
    paddingVertical: getHeightPixel(15),
    borderTopColor: colors.ironGray,
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
