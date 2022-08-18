import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  FlatList,
  ScrollView
} from "react-native";
import TopHeader from "../Components/TopHeader";
import {
  getHeightPixel,
  getTranslatedTime,
  getWidthPixel,
  GOOGLE_API_KEY,
  validateUrl,
} from "../../../common/helper";
import colors from "../../../common/colors";
import InputComponent from "./Components/InputComponent";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DocumentPicker from "react-native-document-picker";
import { useSelector } from "react-redux";
import { createEventApi } from "./API/calendarsApi";
import { updateEventApi } from "./API/calendarsApi";
import useState from "react-usestateref";
import LongDropDown from "./Components/LongDropDown";
import RNFS from "react-native-fs";
import PlacesInput from "react-native-places-input";
import Geocoder from "react-native-geocoding";
import CustomDropDown from "./Components/CustomDropDown";
import WeeklyRepeat from "./Components/RepeatComponents/WeeklyRepeat";
import MonthlyRepeat from "./Components/RepeatComponents/MonthlyRepeat";
import DailyRepeat from "./Components/RepeatComponents/DailyRepeat";
import YearlyRepeat from "./Components/RepeatComponents/YearlyRepeat";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetModal from "../Messages/Components/BottomSheetModal";
import ImagePicker from "react-native-image-crop-picker";
import ImgToBase64 from "react-native-image-base64";
import { AttachmentListComp } from "../Messages/Components/AttachmentListComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default UpdateEventScreen = ({ navigation, route }) => {
  const [data, setData] = useState(); // rruleString
  const [rrTxt, setRrTxt] = useState(); // rruleText

  const [title, setTitle] = useState(
    route.params.eventObj ? route.params.eventObj.title : ""
  );
  const [location, setLocation] = useState(
    route.params.eventObj ? route.params.eventObj?.locations[0]?.address : ""
  );
  const [placeId, setPlaceId] = useState("");
  const [url, setUrl] = useState(
    route.params.eventObj ? route.params.eventObj.payload.url : ""
  );
  const [notes, setNotes] = useState(
    route.params.eventObj ? route.params.eventObj.payload.notes : ""
  );
  // const [toggleSwitch, setToggleSwitch] = useState(
  //   route.params.eventObj ? route.params.eventObj.all_day : false
  // );

  const fileBottomSheetRef = useRef(null);
  const [imageArray, setImageArray] = useState([]);
  const [flag, setFlag] = useState(false)

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showStartTimeModal, setshowStartTimeModal] = useState(false);
  const [showEndTimeModal, setshowEndTimeModal] = useState(false);
  const [showStartDateModal, setshowStartDateModal] = useState(false);
  const [showEndDateModal, setshowEndDateModal] = useState(false);

  const list = ["Never", "Weekly", "Daily", "Monthly", "Yearly"];
  const [repeatLabel, setRepeatLabel] = useState(route.params.eventObj?.payload?.freq ?
    route.params.eventObj?.payload?.freq == 2 ? "Weekly" :
      route.params.eventObj?.payload?.freq == 3 ? "Daily" :
        route.params.eventObj?.payload?.freq == 1 ? "Monthly" :
          route.params.eventObj?.payload?.freq == 0 ? "Yearly"
            : "Never" : "Never");

  // const [howOftenWeekly, setHowOftenWeekly] = useState(repeatLabel == 'Weekly' && route.params.eventObj?.payload?.interval ? route.params.eventObj?.payload?.interval : 'Every Week')
  const [howOftenWeekly, setHowOftenWeekly] = useState(
    repeatLabel == "Weekly" && route.params.eventObj?.payload?.interval
      ? route.params.eventObj?.payload?.interval == 1
        ? "Every Week"
        : route.params.eventObj?.payload?.interval == 2
          ? "Every 2 Weeks"
          : route.params.eventObj?.payload?.interval == 3
            ? "Every 3 Weeks"
            : "Every Week"
      : "Every Week"
  );
  // const [howOftenMonthly, setHowOftenMonthly] = useState(repeatLabel == 'Monthly' && route.params.eventObj?.payload?.interval ? route.params.eventObj?.payload?.interval : 'Every Month')
  const [howOftenMonthly, setHowOftenMonthly] = useState(
    repeatLabel == "Monthly" && route.params.eventObj?.payload?.interval
      ? route.params.eventObj.payload.interval == 1
        ? "Every Month"
        : route.params.eventObj.payload.interval == 2
          ? "Every 2 Month"
          : route.params.eventObj.payload.interval == 3
            ? "Every 3 Month"
            : route.params.eventObj.payload.interval == 4
              ? "Every 4 Month"
              : route.params.eventObj.payload.interval == 5
                ? "Every 5 Month"
                : route.params.eventObj.payload.interval == 6
                  ? "Every 6 Month"
                  : "Every Month"
      : "Every Month"
  );
  const [daysArray, setDaysArray] = useState([
    moment(new Date()).format("ddd").toUpperCase(),
  ])
  const [endItem, setEndItem] = useState(route.params.eventObj ? route.params.eventObj?.payload?.endOn : 'Never')
  const [until, setUntil] = useState(route.params.eventObj ? route.params.eventObj?.payload?.until : moment(new Date()).format('YYYY-MM-DD'))
  const [count, setCount] = useState(route.params.eventObj ? route.params.eventObj?.payload?.count : 0)
  const [monthBy, setMonthBy] = useState(route.params.eventObj ? route.params.eventObj?.payload?.monthBy : 'On Day')
  const [monthDay, setMonthDay] = useState(route.params.eventObj ? route.params.eventObj?.payload?.byMonthday : moment(new Date()).format("DD"))
  const [positionBy, setPositionBy] = useState(route.params.eventObj ? route.params.eventObj?.payload?.bySetPosition : 'First')
  const [daysInterval, setDaysInterval] = useState(route.params.eventObj ? route.params.eventObj?.payload?.interval : 0)

  const timezone = useSelector((state) => state.calendar.timezone);
  const [startDate, setStartDate] = useState(
    route.params.eventObj
      ? route.params.eventObj.start_time
      : route.params.day
        ? new Date(route.params.day)
        : new Date()
  );
  const [endDate, setEndDate] = useState(
    route.params.eventObj
      ? route.params.eventObj.end_time
      : route.params.day
        ? new Date(route.params.day)
        : new Date()
  );

  const [startTime, setStartTime] = useState(
    route.params.startDate
      ? route.params.startDate
      : route.params.eventObj
        ? route.params.eventObj.start_time
        : route.params.day
          ? new Date(route.params.day)
          : ""
  );

  const [endTime, setEndTime] = useState(
    route.params.startDate
      ? route.params.startDate
      : route.params.eventObj
        ? route.params.eventObj.end_time
        : route.params.day
          ? new Date(route.params.day)
          : ""
  );
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const calendarList = useSelector((state) => state.calendar.list);
  console.log('calendarList =. ', calendarList)
  const [selectedCalendar, setSelectedCalendar, calRef] = useState(
    route.params.obj ? route.params.obj.name : calendarList[0] ? calendarList[0]?.name :
      'Select a Calendar'
  );
  const [selectedCalId, setSelectedCalId] = useState(
    route.params.obj ? route.params.obj.id : calendarList[0] ? calendarList[0].id : 0
  );
  console.log('count -> ', count);
  console.log('interval -> ', daysInterval);

  const addEvent = async () => {
    if (title == "") {
      alert("Title cannot be empty!");
      return;
    }
    if (selectedCalendar == "") {
      alert("Please select a calendar!");
      return;
    }
    // if (!toggleSwitch && (startTime == "" || endTime == "")) {
    //   alert("Please pick start and end time for the event!");
    //   return;
    // }
    if (startTime == "" || endTime == "") {
      alert("Please pick start and end time for the event!");
      return;
    }
    const newDate = new Date().toISOString().slice(0, 10);
    if (
      moment(startDate, "YYYY-MM-DD").isBefore(moment(newDate, "YYYY-MM-DD")) &&
      moment(startDate).format("YYYY-MM-DD") !==
      moment(newDate).format("YYYY-MM-DD")
    ) {
      alert("Event cannot be added before current day!");
      return;
    }
    if (
      moment(endDate, "YYYY-MM-DD").isBefore(moment(startDate, "YYYY-MM-DD"))
    ) {
      alert("Event end date cannot be before start date!");
      return;
    }
    if (
      moment(endDate).format("YYYY-MM-DD") ==
      moment(startDate).format("YYYY-MM-DD")
    ) {
      if (moment(endTime).isBefore(moment(startTime))) {
        alert("Event end time cannot be before start time!");
        return;
      }
    }
    // validating url here
    if (url !== '' && !validateUrl(url)) {
      Alert.alert('Alert', 'URL is not valid!')
      return;
    }
    let values = {
      title: title,
      calendarId: selectedCalId,
      startDateTime: route.params?.weekly
        ? `${moment(startDate).format("YYYY-MM-DD")}T${moment(
          startTime
        ).format("HH:00")}`
        : `${moment(startDate).format("YYYY-MM-DD")}T${moment(
          startTime
        ).format("HH:mm")}`,
      endDateTime: route.params.weekly
        ? `${moment(endDate).format("YYYY-MM-DD")}T${moment(endTime).format(
          "HH:00"
        )}`
        : `${moment(endDate).format("YYYY-MM-DD")}T${moment(endTime).format(
          "HH:mm"
        )}`,
      allDay: false,
      limited: false,
      capacity: null,
    };
    // Coverting string days into number days
    let daysList = [];
    daysArray.map((item, index) => {
      if (item == "SUN") {
        daysList.push(0);
      } else if (item == "MON") {
        daysList.push(1);
      } else if (item == "TUE") {
        daysList.push(2);
      } else if (item == "WED") {
        daysList.push(3);
      } else if (item == "THU") {
        daysList.push(4);
      } else if (item == "FRI") {
        daysList.push(5);
      } else if (item == "SAT") {
        daysList.push(6);
      }
    });
    console.log('daysArray -> ', daysArray);
    console.log('daysList -> ', daysList);
    let payload = {
      assign: "",
      url: url,
      notes: notes,
      freq: repeatLabel == "Weekly" ? 2 : repeatLabel == "Daily" ? 3 : repeatLabel == "Monthly" ? 1 : repeatLabel == "Yearly" ? 0 : "Never",
      interval: repeatLabel == "Daily" ? daysInterval :
        repeatLabel == "Weekly" ? (
          howOftenWeekly == 'Every Week' ? 1 :
            howOftenWeekly == 'Every 2 Weeks' ? 2 : 3
        ) :
          repeatLabel == "Monthly" ? (
            howOftenMonthly == 'Every Month' ? 1 :
              howOftenMonthly == 'Every 2 Month' ? 2 :
                howOftenMonthly == 'Every 3 Month' ? 3 :
                  howOftenMonthly == 'Every 4 Month' ? 4 :
                    howOftenMonthly == 'Every 5 Month' ? 5 : 6
          ) : 1,
      // byWeekday: [moment(route.params.day).day()],
      byWeekday: daysList,
      monthBy: monthBy,
      // byMonthday: parseInt(moment(route.params.day).format("D")),
      byMonthday: monthDay,
      bySetPosition: positionBy == 'Last' ? -1 : positionBy,
      count: count,
      // until: moment(route.params.day).add(1, "day").format("YYYY-MM-DD"),
      until: until,
      endOn: endItem,
      rruleString: repeatLabel == "Never" ? "Never" : data,
      rruleText: repeatLabel == "Never" ? "Never" : rrTxt,
      googleAddress: "",
    };
    // var bodyFormData = new FormData()
    var bodyFormData = new Object();
    bodyFormData["values"] = values;
    bodyFormData["files"] = imageArray;
    bodyFormData["payload"] = payload;
    bodyFormData["timeZone"] = timezone;
    bodyFormData["location"] = {
      description: location,
      place_id: placeId,
      reference: placeId,
    };
    if (!route.params.isCreate) {
      bodyFormData["eventId"] = route.params.eventObj.id;
    }
    console.log('body -> ', bodyFormData);
    try {
      setLoading(true);
      const response = route.params.isCreate
        ? await createEventApi(bodyFormData)
        : await updateEventApi(bodyFormData);
      setLoading(false);
      if (response.resultCode == 200) {
        Alert.alert(
          "Alert",
          `Event ${route.params.isCreate ? "added" : "updated"} successfully!`,
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
            : "Error while updating event."
        );
        console.log("Event has not been added/updated");
      }
    } catch (e) {
      Alert.alert("Error", "Some error");
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    let list = []
    if (route.params.eventObj) {
      route.params.eventObj?.payload?.byWeekday.map((item, index) => {
        if (item == 0) {
          list.push('SUN')
        } else if (item == 1) {
          list.push('MON')
        } else if (item == 2) {
          list.push('TUE')
        } else if (item == 3) {
          list.push('WED')
        } else if (item == 4) {
          list.push('THU')
        } else if (item == 5) {
          list.push('FRI')
        } else if (item == 6) {
          list.push('SAT')
        }
      })
      setDaysArray(list)
    }
  }, [])

  const setAttachmentsFunc = async () => {
    await route?.params?.eventObj?.attachments.map((img) => {
      const imgobj = {
        path: img.upload,
        fileInfo: { ...img.payload, attachmentId: img?.id },
      };
      let temArray = imageArray;
      temArray.push(imgobj);
      setImageArray(temArray);
    });
  }

  useEffect(() => {
    if (route.params?.eventObj?.attachments?.length > 0) {
      setAttachmentsFunc()
    }
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Media Pickers here -> 
  const fileBottomClose = () => {
    console.log("closed");
    fileBottomSheetRef.current.close();
  };
  const fileBottomOpen = () => {
    console.log("open");
    fileBottomSheetRef.current.expand();
  };

  // Convert Image to Base64
  const convertImageToBase64 = async (img) => {
    console.log("img: ", img);
    if (img.fileInfo.fileType.substring(0, 2) == 'vi') {
      console.log('this is video')
      RNFS.readFile(img.path, "base64").then((RNFSresponse) => {
        // console.log("RNFSresponse: ", RNFSresponse);
        const obj = {
          data: RNFSresponse,
          fileInfo: {
            filename: img.fileInfo.filename,
            fileSize: img.fileInfo.fileSize,
            fileType: img.fileInfo.fileType,
          },
        };
        let temArray = imageArray;
        temArray.push(obj);
        setImageArray(temArray);
      });
    } else {
      if (img.path) {
        ImgToBase64.getBase64String(img.path)
          .then((base64String) => {
            //   console.log("base64String: ", base64String);
            const temp = base64String;
            const imgobj = {
              data: temp,
              fileInfo: img.fileInfo,
              path: img.path,
            };
            let temArray = imageArray;
            temArray.push(imgobj);
            console.log("temArray.length ->", temArray.length);
            console.log('imageArray.length -> ', imageArray.length)
            setImageArray(temArray);
            // getPickerData(imageArray);
            // setImageArray([]);

            console.log(" images array", imageArray.length);
            //return temp;
          })
          .catch((err) => "not converted");
      }
    }
    setTimeout(() => setFlag(!flag), 500)
  };

  // Gallery Image
  const chooseImage = async () => {
    fileBottomClose();
    await ImagePicker.openPicker({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      cropping: false,
      multiple: true,
      mediaType: "any",
      useFrontCamera: true,
      smartAlbums: [
        "UserLibrary",
        "PhotoStream",
        "Panoramas",
        "Videos",
        "Bursts",
      ],
    }).then((image) => {
      //setUri(image.path);
      console.log("ma image wala hn", image);
      image.map((item) => {
        let imageName = item.filename;
        if (Platform.OS === "android") {
          imageName = new Date();
          console.log(" time stamp", imageName);
        }

        const imgobj = {
          path: item.path,
          // data: convertImageToBase64(item.path),
          fileInfo: {
            filename: imageName,
            fileSize: item.size,
            fileType: item.mime,
          },
        };
        console.log('item -> ', item)
        convertImageToBase64(imgobj);
      });
    });
    // console.log("i am image converted in base 64", Uri);
    setTimeout(() => setFlag(!flag), 500)
  };

  // Document
  const chooseDocument = async () => {
    fileBottomClose();
    console.log("document picker called");
    try {
      const pickerResult = await DocumentPicker.pick({
        type: DocumentPicker.types.pdf,
        allowMultiSelection: true,
      });
      pickerResult.map(async (item) => {
        RNFS.readFile(item.uri, "base64").then((RNFSresponse) => {
          // console.log("RNFSresponse: ", RNFSresponse);

          const obj = {
            data: RNFSresponse,
            fileInfo: {
              filename: item.name,
              fileSize: item.size,
              fileType: item.type,
            },
          };

          let temArray = imageArray;
          temArray.push(obj);
          //console.log("temArray", temArray);
          setImageArray(temArray);
        });
      });
    } catch (error) {
      console.log("error in picking file", error);
    }
    setTimeout(() => setFlag(!flag), 500)
  };

  // Camera
  const chooseCamera = async () => {
    fileBottomClose();
    await ImagePicker.openCamera({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      //  cropping: true,
      multiple: true,
      mediaType: "photo",
      // useFrontCamera: true,
    }).then((image) => {
      //setUri(image.path);
      console.log("ma image wala hn", image);

      let imageName = new Date();

      console.log(" time stamp", imageName);
      // image.map((item) => {
      const imgobj = {
        path: image.path,
        // data: convertImageToBase64(item.path),
        fileInfo: {
          filename: imageName,
          fileSize: image.size,
          fileType: image.mime,
        },
      };

      convertImageToBase64(imgobj);
      //   );
    });
    setTimeout(() => setFlag(!flag), 500)
    // console.log("i am image converted in base 64", Uri.length);
  };

  console.log('route.params.eventObj -> ', route.params.eventObj);
  return (
    <View style={{ flex: 1, zIndex: 0, backgroundColor: 'white' }}>
      {/* <SafeAreaView /> */}
      <TopHeader
        title={route?.params?.isCreate ? "Create Event" : "Edit Event"}
        isCross
        onPress={() => navigation.goBack()}
        isSubmit
        onUpdate={addEvent}
        loading={loading}
      />
      <FlatList
        data={[1]}
        style={styles.mainContainer}
        keyboardShouldPersistTaps="always"
        listViewDisplayed={false}
        renderItem={({ item, index }) => {
          return (
            <KeyboardAwareScrollView
              style={{ marginBottom: isKeyboardVisible ? Platform.OS == 'android' ? getHeightPixel(150) : getHeightPixel(-50) : 0 }}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="always"
              listViewDisplayed={false}
            >
              <InputComponent
                value={title}
                title="Title *"
                onChangeText={(text) => setTitle(text)}
                style={{ height: 80 }}
              />
              <View style={{ zIndex: 2000 }}>
                <LongDropDown
                  item={calRef.current !== "" ? calRef.current : ""}
                  title="Calendar"
                  list={calendarList}
                  onSelect={(item) => {
                    setSelectedCalendar(item);
                    let obj = calendarList.filter(
                      (item) => item.name == calRef.current
                    );
                    setSelectedCalId(obj[0].id);
                  }}
                />
              </View>
              {/* {Switch Here} */}
              {/* <View style={styles.switchContainer}>
                <Text style={styles.allDay}>All Day</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#a1cff7" }}
                  thumbColor={toggleSwitch ? colors.primary : "#f4f3f4"}
                  ios_backgroundColor="#778899"
                  onValueChange={() => setToggleSwitch(!toggleSwitch)}
                  value={toggleSwitch}
                />
              </View> */}

              {/* {Time details container here} */}
              <View
                style={{
                  ...styles.centeredRow,
                  marginTop: getHeightPixel(15),
                }}
              >
                <Text style={styles.leftText}>Start *</Text>
                <View style={styles.insideCenteredRow}>
                  <TouchableOpacity onPress={() => setshowStartDateModal(true)}>
                    <Text style={styles.rightText}>
                      {moment(getTranslatedTime(startDate, timezone)).format(
                        "MM/DD/YYYY"
                      )}
                    </Text>
                  </TouchableOpacity>
                  {/* {!toggleSwitch ? ( */}
                  <TouchableOpacity
                    onPress={() => setshowStartTimeModal(true)}
                  >
                    <Text
                      style={{
                        ...styles.rightText,
                        marginLeft: getWidthPixel(15),
                      }}
                    >
                      {" "}
                      {route.params.weekly && !route.params.startDate
                        ? moment(
                          getTranslatedTime(startTime, timezone)
                        ).format("hh:00 a")
                        : startTime !== ""
                          ? moment(
                            getTranslatedTime(startTime, timezone)
                          ).format("hh:mm a")
                          : "12:00 AM"}
                    </Text>
                  </TouchableOpacity>
                  {/* ) : null */}
                </View>
              </View>
              <View style={styles.centeredRow}>
                <Text style={styles.leftText}>End *</Text>
                <View style={styles.insideCenteredRow}>
                  <TouchableOpacity onPress={() => setshowEndDateModal(true)}>
                    <Text style={styles.rightText}>
                      {moment(getTranslatedTime(endDate, timezone)).format(
                        "MM/DD/YYYY"
                      )}
                    </Text>
                  </TouchableOpacity>
                  {/* {!toggleSwitch ? ( */}
                  <TouchableOpacity onPress={() => setshowEndTimeModal(true)}>
                    <Text
                      style={{
                        ...styles.rightText,
                        marginLeft: getWidthPixel(15),
                      }}
                    >
                      {route.params.weekly && !route.params.startDate
                        ? moment(getTranslatedTime(endDate, timezone)).format(
                          "hh:00 a"
                        )
                        : route.params.weekly && route.params.startDate
                          ? moment(
                            getTranslatedTime(
                              route.params.startDate,
                              timezone
                            )
                          ).format("hh:00 a")
                          : endTime !== ""
                            ? moment(getTranslatedTime(endTime, timezone)).format(
                              "hh:mm a"
                            )
                            : "12:00 AM"}
                    </Text>
                  </TouchableOpacity>
                  {/* ) : null*/}
                </View>
              </View>

              {/* {Repeat View here} */}
              <View style={{ zIndex: 1999 }}>
                <CustomDropDown
                  title={"Repeat"}
                  item={repeatLabel}
                  list={list}
                  onSelect={(item) => {
                    setRepeatLabel(item);
                  }}
                />
              </View>
              <View
                style={{ zIndex: 1998, paddingHorizontal: getWidthPixel(15) }}
              >
                {repeatLabel == "Weekly" ? (
                  <WeeklyRepeat
                    freqItem={howOftenWeekly}
                    setFreqItem={(text) => setHowOftenWeekly(text)}
                    daysList={route.params.eventObj?.payload?.byWeekday}
                    daysArray={daysArray}
                    setDaysList={(arr) => setDaysArray(arr)}
                    // daysList={daysArray}
                    // setDaysList={(arr) => {
                    //   console.log("arrr===>", arr);
                    //   setDaysArray(arr);
                    // }}
                    endItem={endItem}
                    setEndItem={(text) => setEndItem(text)}
                    until={until}
                    setUntil={(text) => setUntil(text)}
                    count={count}
                    setCount={(text) => setCount(text)}
                    setData={(item) => {
                      setData(item);
                    }}
                    setRr={(item) => {
                      setRrTxt(item);
                    }}
                  />
                ) : repeatLabel == "Daily" ? (
                  <DailyRepeat
                    daysInterval={daysInterval}
                    setDaysInterval={(text) => setDaysInterval(text)}
                    endItem={endItem}
                    setEndItem={(text) => setEndItem(text)}
                    until={until}
                    setUntil={(text) => setUntil(text)}
                    count={count}
                    setCount={(text) => setCount(text)}
                    setData={(item) => {
                      setData(item);
                    }}
                    setRr={(item) => {
                      setRrTxt(item);
                    }}
                  />
                ) : repeatLabel == "Monthly" ? (
                  <MonthlyRepeat
                    freqItem={howOftenMonthly}
                    setFreqItem={(text) => setHowOftenMonthly(text)}
                    monthBy={monthBy}
                    setMonthBy={(text) => setMonthBy(text)}
                    monthDay={monthDay}
                    setMonthDay={(text) => setMonthDay(text)}
                    positionBy={positionBy}
                    setPositionBy={(text) => setPositionBy(text)}
                    endItem={endItem}
                    setEndItem={(text) => setEndItem(text)}
                    until={until}
                    setUntil={(text) => setUntil(text)}
                    count={count}
                    setCount={(text) => setCount(text)}
                    setData={(item) => {
                      setData(item);
                    }}
                    setRr={(item) => {
                      setRrTxt(item);
                    }}
                  />
                ) : repeatLabel == "Yearly" ? (
                  <YearlyRepeat
                    endItem={endItem}
                    setEndItem={(text) => setEndItem(text)}
                    until={until}
                    setUntil={(text) => setUntil(text)}
                    count={count}
                    setCount={(text) => setCount(text)}
                    setData={(item) => {
                      setData(item);
                    }}
                    setRr={(item) => {
                      setRrTxt(item);
                    }}
                  />
                ) : null}
              </View>

              {/* {Location starts here} */}
              <View style={styles.locContainer}>
                <Text style={styles.locTitle}>Location</Text>
                <PlacesInput
                  googleApiKey={GOOGLE_API_KEY}
                  placeHolder="Enter location"
                  // clearQueryOnSelect={true}
                  stylesContainer={styles.placesContainer}
                  textInputProps={
                    location !== ""
                      ? route.params.eventObj
                        ? {
                          value: location,
                          onChangeText: (text) => setLocation(text),
                        }
                        : null
                      : null
                  }
                  stylesList={styles.placesListContainer}
                  stylesInput={styles.placesInputContainer}
                  onSelect={(place) => {
                    setLocation(place.result.formatted_address);
                    Geocoder.from({
                      lat: place.result.geometry.location.lat,
                      lng: place.result.geometry.location.lng,
                    }).then((data) => {
                      setPlaceId(data.results[0].place_id);
                    });
                  }}
                />
              </View>
              <InputComponent
                value={url.replace(/\s/g, '')}
                title="Url"
                onChangeText={(text) => setUrl(text.toLowerCase())}
                keyboardType='url'
                style={{ marginTop: getHeightPixel(10), height: 80 }}
              />
              <InputComponent
                value={notes}
                title="Notes"
                onChangeText={(text) => setNotes(text)}
                multiline
                large
                height={getHeightPixel(100)}
                style={{ marginVertical: getHeightPixel(15), height: 150 }}
              />

              <View>
                <TouchableOpacity onPress={() => fileBottomOpen()}>
                  <Text style={styles.attachmentTitle}>+ Attachment</Text>
                </TouchableOpacity>
                {
                  imageArray.length > 0 &&
                  <View style={{
                    height: 100,
                    borderTopColor: colors.grayLight,
                    borderTopWidth: 1,
                    borderBottomColor: colors.grayLight,
                    borderBottomWidth: 1,
                    paddingBottom: Platform.OS == 'ios' ? getHeightPixel(20) : 0
                  }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <AttachmentListComp
                        Uri={imageArray}
                        updateArray={(item) => setImageArray((pre) => {
                          return pre.filter((temp) => temp != item);
                        })}
                      />
                    </ScrollView>
                  </View>
                }
              </View>

              {/* Date Modals here */}
              <DateTimePickerModal
                isVisible={showStartDateModal}
                mode="date"
                onConfirm={(date) => {
                  setStartDate(date);
                  setshowStartDateModal(false);
                  console.log("start Date => ", date);
                }}
                onCancel={() => setshowStartDateModal(false)}
              />
              <DateTimePickerModal
                isVisible={showEndDateModal}
                mode="date"
                onConfirm={(date) => {
                  setEndDate(date);
                  setshowEndDateModal(false);
                  console.log("end date => ", date);
                }}
                onCancel={() => setshowEndDateModal(false)}
              />

              {/* Time Modals here */}
              <DateTimePickerModal
                isVisible={showStartTimeModal}
                mode="time"
                // date={new Date(startTime)}
                onConfirm={(time) => {
                  // setStartTime(moment(getTranslatedTime(time, timezone)));
                  setStartTime(time);
                  setshowStartTimeModal(false);
                }}
                onCancel={() => setshowStartTimeModal(false)}
              />
              <DateTimePickerModal
                isVisible={showEndTimeModal}
                mode="time"
                // date={new Date(endTime)}
                onConfirm={(time) => {
                  setEndTime(moment(time));
                  setshowEndTimeModal(false);
                }}
                onCancel={() => setshowEndTimeModal(false)}
              />
              {/* BOTTOMSHEET FOR SELECTING DOCS, IMAGES AND CAMERA  */}
              <BottomSheet
                index={-1}
                snapPoints={[200, 190]}
                initialSnapIndex={-1}
                enablePanDownToClose={true}
                ref={fileBottomSheetRef}
              >
                <BottomSheetModal
                  fileBottomSheetRef={fileBottomSheetRef}
                  chooseDocument={chooseDocument}
                  chooseCamera={chooseCamera}
                  chooseImage={chooseImage}
                />
              </BottomSheet>
            </KeyboardAwareScrollView >
          );
        }}
      />
    </View >
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginTop: getHeightPixel(12),
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.ironGray,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getWidthPixel(15),
    marginTop: getHeightPixel(15),
    paddingBottom: getHeightPixel(15),
    borderBottomColor: colors.ironGray,
    borderBottomWidth: 1,
  },
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getHeightPixel(12),
    paddingHorizontal: getWidthPixel(15),
  },
  leftText: {
    color: colors.mineShaft,
    fontFamily: "Segoe UI",
  },
  rightText: {
    color: colors.gray,
    fontFamily: "Segoe UI",
  },
  insideCenteredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: '50%'
  },
  allDay: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(18),
    fontWeight: "700",
    color: colors.mineShaft,
  },
  locContainer: {
    paddingHorizontal: getWidthPixel(15),
    marginTop: getHeightPixel(10),
  },
  locTitle: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "700",
    color: colors.mineShaft,
    marginBottom: getHeightPixel(5),
  },
  placesContainer: {
    position: "relative",
    alignSelf: "stretch",
    margin: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderColor: colors.accentGray,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    shadowOpacity: 0,
    overflow: "hidden",
  },
  placesListContainer: {
    borderColor: colors.accentGray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  placesInputContainer: {
    fontSize: getHeightPixel(16),
    fontFamily: "Segoe UI",
    backgroundColor: "transparent",
  },
  attachmentTitle: {
    color: colors.accentGray,
    fontSize: getHeightPixel(16),
    fontWeight: "600",
    marginHorizontal: getWidthPixel(15),
    marginBottom: getHeightPixel(15),
    fontFamily: "Segoe UI",
  },
  attachmentFileName: {
    color: colors.accentGray,
    fontSize: getHeightPixel(16),
    fontWeight: "600",
    marginBottom: getHeightPixel(15),
    fontFamily: "Segoe UI",
    width: "60%",
  },
});
