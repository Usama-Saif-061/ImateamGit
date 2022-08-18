import React, { useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  BackHandler,
  ScrollView,
  Keyboard,
} from "react-native";
import SignUpForm from "./Components/SignUpForm";
import { SignUpStep1Styles } from "./styles";

const SignUpStep1 = ({ navigation }) => {
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
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      onPress={Keyboard.dismiss}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={SignUpStep1Styles.container}>
          <SignUpForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUpStep1;
