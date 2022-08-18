import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import {
  font,
  getWidthPixel,
  getHeightPixel,
  getWidthPercentage,
  getHeightPercentage,
  moveToNextScreen,
} from "../../../../common/helper";
import images from "../../../../common/icons";
import colors from "../../../../common/colors";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setTimezone } from "../../../../Reducers/CommonReducers/calendarSlice";

const InitialScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("auth");
      console.log("App started token is ", value);
      if (value === null) {
        moveToNextScreen(navigation, "InitialScreen");
      } else {
        moveToNextScreen(navigation, "MainLanding");
      }
    } catch (e) {
      console.log("error reading from async");
    }
  };


  const setTimeZoneFunc = async () => {
    let timezone = await AsyncStorage.getItem('timezone')
    if (timezone) {
      dispatch(setTimezone(timezone))
    } else {
      await AsyncStorage.setItem('timezone', moment.tz.guess())
      dispatch(setTimezone(moment.tz.guess()))
    }
  }

  useEffect(() => {
    setTimeZoneFunc()
    console.log("Splash Screen Here")
    setTimeout(() => {
      getData();
    }, 0);
  }, []);

  return (
    <Image
      source={images.SplashScreen}
      resizeMode={"contain"}
      style={styles.container}
    ></Image>
  );
};

const styles = StyleSheet.create({
  img: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(100),
  },

  container: {
    width: "100%",
    //backgroundColor: colors,

    alignSelf: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: colors.white,

    height: "100%",
    // backgroundColor: "gray",
  },
  logoContainer: {
    marginTop: getHeightPixel(170),
    marginRight: getWidthPixel(105),
    marginLeft: getWidthPixel(105),
    alignItems: "center",
  },
  logo: {
    width: getWidthPixel(163),
    height: getHeightPixel(163),
    resizeMode: "contain",
  },
  HeadingContainer: {
    alignItems: "center",
    marginTop: getHeightPixel(19),
  },

  mainHeading: {
    ...font(26, "700"),
    color: colors.white,
  },
  barsContainer: {
    flexDirection: "row",
    marginTop: getHeightPixel(22),
    marginBottom: getHeightPixel(22),
  },
  bars: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondary,
    marginLeft: getWidthPixel(20),
    marginRight: getWidthPixel(20),
    alignSelf: "center",
  },
  barsText: {
    width: getWidthPixel(20),
    textAlign: "center",
    textAlignVertical: "center",

    ...font(14, "700"),
    color: colors.white,
  },
  SignupButton: {},
  subHeading: {
    ...font(14, "400"),
    color: colors.white,

    marginBottom: getHeightPixel(34),
  },
  forgetPassword: {},
  Text: {
    textAlign: "right",
    ...font(14, "400"),
    color: colors.primary,
    marginTop: getHeightPixel(11),
    marginBottom: getHeightPixel(33),
  },
});

export default InitialScreen;
