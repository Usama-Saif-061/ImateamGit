import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import AppStatusBar from "../../statusBarColor";
import ProfileHeader from "../../../common/Components/ProfileHeader";
import TopHeader from "../Components/TopHeader";
import MainCalendar from "./CalendarScreens/MainCalendar";
import SingleEventDetails from "./Components/SingleEventDetails";
import { getHeightPixel, getTranslatedTime, getWidthPixel } from "../../../common/helper";
import WeeklyCalendar from "./CalendarScreens/WeeklyCalendar";
import DailyCalendar from "./CalendarScreens/DailyCalendar";
import colors from "../../../common/colors";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../../Reducers/sidebarSlice";
import { getCallendars, getEventsApi } from "./API/calendarsApi";
import {
  allCalendarsList,
  allEventsList,
} from "../../../Reducers/CommonReducers/calendarSlice";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import useState from "react-usestateref";
import AgendaView from "./Components/AgendaView";

export default CalendarHome = ({ navigation, route }) => {
  const [format, setFormat] = useState("Month");
  const tempData = [{ name: "TempData" }];
  const [date, setDate] = useState(new Date());

  const sidebarState = useSelector((state) => state.sidebar.value);
  const eventsList = useSelector((state) => state.calendar.eventsList);
  const calendarList = useSelector((state) => state.calendar.list);
  const timezone = useSelector(state => state.calendar.timezone)
  const navFromLanding = useSelector(state => state.calendar.navFromLanding)
  const [newEvent, setNewEvents] = useState([]);
  const [updatedCal, setUpdatedCal, refCal] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isApiCalled, setIsApiCalled] = useState(false)
  const [agendaCal, setAgendaCal] = useState(null)
  const [isteam,setIsTeam] = useState(false)
  let eventsListFiltered = eventsList.filter((item) => {
    if (
      moment(item.start_time).format("YYYY-MM-DD") ==
      moment(date).format("YYYY-MM-DD")
    )
      return item;
  });
  // console.log('eventsListFiltered => ', eventsListFiltered);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  console.log('event listings -> ', eventsList.length);
  console.log('calendar listings -> ', calendarList.length);
  useEffect(()=>{
    if (route.params && route.params.isTeam) {
      setIsTeam(true)
    }
    else {
      setIsTeam(false)
    }
  },[])
  const FooterComponent = () => {
    return (
      <View style={{ zIndex: 0 }}>
        {eventsList.length > 0 || isApiCalled == true ? (
          <FlatList
            // data={eventsList}
            data={eventsListFiltered}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              let calObj = calendarList.filter((v) => v.id == item.calendar);
              return (
                <SingleEventDetails
                  startTime={moment(getTranslatedTime(item.start_time, timezone)).format("h:mm A")}
                  endTime={moment(getTranslatedTime(item.end_time, timezone)).format("h:mm A")}
                  title={item.title}
                  label={item.locations[0]?.address ? item.locations[0]?.address : 'Event Location'}
                  onPress={() =>
                    navigation.navigate("EventDetails", {
                      eventObj: item,
                      calObj: calObj[0],
                    })
                  }
                />
              );
            }}
          />
        ) : (
          <View style={{ marginTop: getHeightPixel(25) }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
      </View>
    );
  };
  const getAPIfun = async () => {
    await getCallendarsFunc();
    console.log("calendar api success")
    await getEventsFunc();
  };
  useEffect(() => {
    getAPIfun();
  }, [isFocused]);
  useEffect(() => {
    console.log("flag==checked=>", flag);
    if (flag) {
      console.log("flag==true=>", flag);
      getAPIfun();
      setFlag(false);
    }
  }, [flag]);
  const getCallendarsFunc = async () => {
    const response = await getCallendars();
    console.log("getallCalendars => ", JSON.stringify(response));

    if (response.resultCode == 200) {
      setUpdatedCal(response.data);
      // console.log("allCalendars===>", JSON.stringify(refCal.current));
      dispatch(allCalendarsList(response.data));
    } else {
      console.log('Calendar Func Error.')
      setIsApiCalled(true)
    }
  };
  const getEventsFunc = async () => {
    const response = await getEventsApi();
    if (response.resultCode == 200) {
      let activeCalList = refCal.current.filter((item) => item.active == true);
      let allEvents = response.data;

      let arr1 = [];
      for (let i = 0; i < allEvents.length; i++) {
        for (let j = 0; j < activeCalList.length; j++) {
          if (allEvents[i].calendar == activeCalList[j].id) {
            arr1.push(allEvents[i]);
          }
        }
      }
      setNewEvents(arr1);
      if (navFromLanding) {
        let list = refCal.current
        list = list.filter((e, i) => e.id == route.params?.calId)
        arr1 = arr1.filter((e, i) => e.calendar == list[0]?.id)
      } else {
      }
      dispatch(allEventsList(arr1));
      setIsApiCalled(true)
    } else {
      console.log('Get Events Error');
      setIsApiCalled(true)
    }
  };
  console.log('allEventsList.length -> ', eventsList.length);
  return (
    <View style={{ flex: 1, zIndex: 0, backgroundColor: 'white' }}>
      {sidebarState ? (
        <View style={styles.sidebarMainContainer}>
          <Sidebar
            changeFlag={() => setFlag(!flag)}
            navigation={navigation}
            setAgendaCal={(item) => {
              setAgendaCal(item);
              setFormat('Agenda')
            }}
          />
        </View>
      ) : null}
      <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ProfileHeader navigation={navigation} />
      <TopHeader
      onBackPress = {()=>{
        navigation.goBack()
      }}
      isTeam = {isteam}
        title="Calendar"
        onPress={() => dispatch(toggleSidebar(true))}
        onUpdate={() =>
          navigation.navigate("UpdateEventScreen", {
            isCreate: true,
            day: new Date(),
            // day: new Date().toISOString().slice(0, 10)
          })
        }
      />
      <View style={{ height: getHeightPixel(12), backgroundColor: '#EAECED' }} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          data={tempData}
          keyExtractor={(item, index) => index}
          ListFooterComponent={format !== "Agenda" ? FooterComponent : null}
          // ListHeaderComponent={HeaderComponent}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={{ zIndex: 0, flex: 1 }}>
                {format == "Month" ? (
                  <MainCalendar
                    format={format}
                    onFormatChange={(text) => {
                      setFormat(text)
                      setAgendaCal(null)
                    }}
                    navigation={navigation}
                    onChangeDate={(date) => setDate(date)}
                  />
                ) : format == "Week" ? (
                  <WeeklyCalendar
                    format={format}
                    onFormatChange={(text) => {
                      setFormat(text)
                      setAgendaCal(null)
                    }}
                    navigation={navigation}
                    onChangeDate={(date) => setDate(date)}
                    date={date}
                  />
                ) : format == "Day" ? (
                  <DailyCalendar
                    format={format}
                    onFormatChange={(text) => {
                      setFormat(text);
                      setAgendaCal(null)
                    }}
                    date={date}
                    onChangeDate={(date) => setDate(date)}
                    navigation={navigation}
                  />
                ) : format == "Agenda" ? (
                  <AgendaView
                    format={format}
                    onFormatChange={(text) => setFormat(text)}
                    navigation={navigation}
                    agendaCal={agendaCal}
                    flag={flag}
                  />
                ) : null}
              </View>
            );
          }}
        />
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
    marginRight: 15,
    marginTop: 5,
    width: getWidthPixel(100),
    paddingVertical: getHeightPixel(5),
    paddingHorizontal: 10,
    borderRadius: 5,
    height: getHeightPixel(40),
  },
  listContainer: {
    width: 100,
    backgroundColor: "#e6f7ff",
    position: "absolute",
    zIndex: 5,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: getWidthPixel(100),
    right: 15,
    marginTop: getHeightPixel(40),
    paddingHorizontal: 10,
    borderTopColor: colors.ironGray,
    borderTopWidth: 1,
  },
  sidebarMainContainer: {
    position: "absolute",
    zIndex: 5,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
