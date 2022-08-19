import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  unstable_batchedUpdates,
} from "react-native";
import Header from "../../../../common/Components/HeaderCommon";
import styles from "./styles";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import SetAccountPin from "../Api/SetAccountPin";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import colors from "../../../../common/colors";
import { getWidthPixel } from "../../../../common/helper";

const AccountPin = ({ navigation }) => {
  const [pinCode, setPinCode] = useState("");
  const [pinCodeFilled, setPin] = useState(false);
  const [loading, setLoad] = useState(false)
  const { data: userData } = useGetUserQuery();

  const setUpPin = async () => {
    if (pinCode.length) {
      console.log("WOrking")
      setLoad(true)
      setPin(false);
      let response = await SetAccountPin(userData.id, pinCode);
      if (response) {
        setLoad(false)
        console.log("Account Pin", response);
        navigation.goBack();
      }
    }
    else {
      setPin(true);
    }
  };



  return (
    <View>
      <SafeAreaView>
        <Header
          navigation={navigation}
          heading="Set Up Pin"
          btnTitle="Submit"
          Submit={true}
          onPressSubmit={() => {
            setUpPin()
            console.log("Check You!!!", pinCode, pinCodeFilled)
          }}
          loading={loading}
        />

        <View style={styles.container}>
          <OTPInputView
            style={styles.OTPContainer}
            pinCount={6}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            secureTextEntry={true}
            onCodeFilled={(code) => {
              // unstable_batchedUpdates(() => {
              setPinCode(code);
              // });
            }}
          />
          {pinCodeFilled ? <Text style={styles.errMsg}>Enter full code.</Text> : null}
        </View>

      </SafeAreaView>
    </View>
  );
};

export default AccountPin;
