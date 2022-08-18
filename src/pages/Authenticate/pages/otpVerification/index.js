import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  unstable_batchedUpdates,
  BackHandler,
} from "react-native";

import images from "../../../../common/icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import LoginAPI from "../../API/login";
import ButtonCommon from "../../../../common/Components/Buttons";
import { OtpVerficationStyles } from "./styles";
import colors from "../../../../common/colors";
import { moveToNextScreen } from "../../../../common/helper";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignUpVerifyPin } from "../../API/SignUpVerifyPin";

const OtpVerfication = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [OTP, setOTP] = useState("");
  const [isLoading, setLoading] = useState(false);

  const userRedux = useSelector((state) => state.user);
  console.log(" previous data OTP VERfication page ", userRedux);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("auth", jsonValue);
    } catch (e) {
      // saving error
    }
    console.log(jsonValue, "inserted in async");
  };

  const goToNextScreen = async (filledOTP) => {
    setLoading(true);
    //setOTP(code);
    console.log(
      "sign in credentials before making api calls",
      userRedux.userInfo.email,
      userRedux.userInfo.password
    );
    const res = await SignUpVerifyPin(
      userRedux.userInfo.verificationId,
      filledOTP
    );
    console.log("here is otp response  message", res.verified);
    if (res.verified) {
      alert("Success");

      const loginResponse = await LoginAPI(
        userRedux.userInfo.email,
        userRedux.userInfo.password
      );
      console.log("i am token from login api call", loginResponse);

      moveToNextScreen(navigation, "MainLanding");
      setLoading(false);
    } else {
      setLoading(false);
      alert("Ooops! \n Please enter correct OTP");
    }
  };

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
    navigation.goBack();

    return true;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={OtpVerficationStyles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={OtpVerficationStyles.imgWrapper}>
            <Image
              source={images.SignUpStep3Image}
              style={OtpVerficationStyles.img}
            />
          </View>
          <View>
            <Text style={OtpVerficationStyles.Heading}>OTP verification</Text>
          </View>
          <View>
            <Text style={OtpVerficationStyles.text}>
              Enter the OTP sent to {userRedux.userInfo.phoneNo}
            </Text>
          </View>

          <OTPInputView
            style={OtpVerficationStyles.OTPContainer}
            pinCount={6}
            autoFocusOnLoad={false}
            codeInputFieldStyle={OtpVerficationStyles.underlineStyleBase}
            codeInputHighlightStyle={
              OtpVerficationStyles.underlineStyleHighLighted
            }
            onCodeFilled={(code) => {
              unstable_batchedUpdates(() => {
                goToNextScreen(code);
                console.log(`Code is ${code}, you are good to go!`);
              });
            }}
          />

          <View style={OtpVerficationStyles.Button}>
            <ButtonCommon
              onPress={console.log("move to next screen")}
              title={"VERIFY"}
              color={colors.primary}
              method={goToNextScreen}
              loading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtpVerfication;
