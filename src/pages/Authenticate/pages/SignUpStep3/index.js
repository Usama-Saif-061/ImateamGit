import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  Image,
  KeyboardAvoidingView,
  BackHandler,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import images from "../../../../common/icons";
import ButtonCommon from "../../../../common/Components/Buttons";
import colors from "../../../../common/colors";
import PhoneNumberInput from "../../../../common/Components/PhoneNumberInput";
import { SignUpStep3Styles } from "./styles";
import Toast from "react-native-toast-message";
import { moveToNextScreen } from "../../../../common/helper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { userSignupStep3 } from "../../../../Reducers/userReducer";
const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { SignUpVerifyPhone } from "../../API/SignUpVerifyPhone";

const SignUpStep3 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [Error, checkErr] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const userRedux = useSelector((state) => state.user);

  const goToNextScreen = async () => {
    if (number) {
      if (validatePhoneNumber(number)) {
        setLoading(true);
        console.log(
          "data before verify phone API",
          userRedux.userInfo.email,
          userRedux.userInfo.first_name,
          userRedux.userInfo.last_name
        );
        const res = await SignUpVerifyPhone(
          userRedux.userInfo.email,
          userRedux.userInfo.first_name,
          userRedux.userInfo.last_name,
          number
        );
        if (res) {
          dispatch(userSignupStep3({ number: number, id: res.id }));
          moveToNextScreen(navigation, "OtpVerfication");
          setLoading(false);
        } else {
          setLoading(false);
          showToast();
        }
      }
    } else {
      showToast();
      setLoading(false);
    }
  };
  const showToast = () => {
    Toast.show({
      type: "error",
      text1: `Ooops`,
      text2: `Phone Number is Invalid`,
      visibilityTime: 1500,
    });
  };

  const validatePhoneNumber = (phone) => {
    if (parsePhoneNumberFromString(phone.toString())?.isValid()) {
      return true;
    }

    return false;
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
      <View style={SignUpStep3Styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <SafeAreaView>
            <Pressable
              onPress={() => moveToNextScreen(navigation, "SignUpStep2")}
            >
              <View style={SignUpStep3Styles.backButtonWrapper}>
                <Icon
                  name="keyboard-arrow-left"
                  size={21}
                  color={colors.black}
                />
                <Text style={SignUpStep3Styles.backButtonText}>Back</Text>
              </View>
            </Pressable>
            <View style={SignUpStep3Styles.imgWrapper}>
              <Image
                source={images.SignUpStep3Image}
                style={SignUpStep3Styles.img}
              />
            </View>
            <View>
              <Text style={SignUpStep3Styles.Heading}>Welcome to IMA Team</Text>
            </View>

            <View>
              <Text style={SignUpStep3Styles.text}>
                For notification purposes only, will {"\n"} send a verification
                code. Standard SMS, {"\n"} call and data fees may apply.
              </Text>
            </View>

            <View style={SignUpStep3Styles.phoneNumberInput}>
              <PhoneNumberInput
                testID="phoneLineInput"
                value={number}
                autoCorrect={false}
                autoFocus={false}
                showFloatingLabel={true}
                maxLength={20}
                err={Error}
                onEndEditing={(num) => {
                  if (num && num.number) {
                    setNumber(num.number.toString());
                  }
                }}
                onPhoneNumberChanged={(val) => {
                  if (val && val.number) {
                    console.log(val.number);
                    checkErr(!validatePhoneNumber(val.number.toString()));
                    setNumber(val.number.toString());
                  }
                }}
                autoComplete="off"
                placeholder={"+XXXXXXXXXXXX"}
              />
              {Error && <Text style={{
                color: 'red',
                fontFamily: 'Segoe UI'
              }}>Phone number is not valid</Text>}
            </View>

            <View style={SignUpStep3Styles.Button}>
              <ButtonCommon
                title={"SEND"}
                color={colors.primary}
                method={goToNextScreen}
                loading={isLoading}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpStep3;
