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
import images from "../../../common/images";
import ButtonCommon from "../../../common/Components/Buttons";
import { OtpVerficationStyles } from "./styles";
import colors from "./../../../common/colors";
import moveToNextScreen, {
  getHeightPixel,
  getWidthPixel,
} from "./../../../common/helper";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logo } from "../../../common/Components/Logo";

const SellerSignUpThankYouPage = ({ navigation }) => {
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
    navigation.navigate("MainLanding");
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
        <View style={OtpVerficationStyles.imgWrapper}>
          <Image
            source={images.logoBlue}
            style={{
              width: getWidthPixel(114),
              height: getHeightPixel(114),
              resizeMode: "contain",
            }}
          />
          <Image
            source={images.ThankYouImage}
            style={OtpVerficationStyles.img}
          />
        </View>
        <View>
          <Text style={OtpVerficationStyles.Heading}>Thank You!</Text>
        </View>
        <View>
          <Text style={OtpVerficationStyles.text}>
            Your seller application will be processed and you will receive an
            email notification of your account status within 2 business days. If
            approved, you can charge for services, events, and donations on the
            IMA platform. Good Luck!
          </Text>
        </View>

        <View style={OtpVerficationStyles.Button}>
          <ButtonCommon
            onPress={console.log("move to next screen")}
            title={"BACK"}
            color={colors.primary}
            method={goToNextScreen}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SellerSignUpThankYouPage;
