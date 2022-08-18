import React, { useEffect } from "react";

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  BackHandler,
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

import ButtonCommon from "../../../../common/Components/Buttons";

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    //navigation.goBack();
    BackHandler.exitApp();
    return true;
  }

  return (
    <ImageBackground
      source={images.SplashScreenBgImage}
      resizeMode="cover"
      style={styles.img}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.logoBlue} style={styles.logo} />
        </View>
        {/* //header  */}
        <View style={styles.HeadingContainer}>
          {/* //main heading */}

          <Text style={styles.mainHeading}>Welcome to IMA Team</Text>

          {/* //sub heading */}
          <Text style={styles.subHeading}>Connect with your Team/Groups</Text>

          {/* horizental bars and text */}
        </View>
        {/* //signup input InputFields */}
        <View style={styles.SignupButton}>
          <ButtonCommon
            method={() => moveToNextScreen(navigation, "SignUpStep1")}
            title={"Sign up for free"}
            color={colors.secondary}
          />
        </View>
        <View style={styles.barsContainer}>
          <View style={styles.bars} />
          <View>
            <Text style={styles.barsText}>Or</Text>
          </View>
          <View style={styles.bars} />
        </View>
        {/* 
      //Button */}
        <ButtonCommon
          method={() => moveToNextScreen(navigation, "SignIn")}
          title={"Sign In"}
          color={colors.accentYellow}
          textColor="#0C4B81"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(100),
  },

  container: {
    width: getWidthPixel(283),

    alignSelf: "center",
    flexDirection: "column",
    height: "100%",
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
