import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, Button } from "react-native";
import Header from "../../../../common/Components/HeaderCommon";
import styles from "./styles";
import InputFields from "../../../../common/Components/InputFields/Index";
import updatePassword from "../Api/updatePasswordApi";
import { ValidatePassword } from "../../../../common/helper";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import colors from "../../../../common/colors";
import { loadPartialConfig } from "@babel/core";
import { tabDeselection } from "../../../../Reducers/CommonReducers/mainLandingReducer";
import { baseApi } from "../../../../Reducers/baseApi";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../../../store";

const UpdatePassword = ({ navigation }) => {
  const { data: userData, isFetching, refetch } = useGetUserQuery();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isPasswordOneValid, setPasswordOneValidity] = useState(true);
  const [isPasswordTwoValid, setPasswordTwoValidity] = useState(true);
  const [load, setLoading] = useState(false);
  const [firstOne, setFirstOne] = useState("");
  const [secondOne, setSecondOne] = useState("");
  const [ samePassword, setPasswordSame ] = useState(true)
  const dispatch = useDispatch();

  const validate = (input, type) => {
    if (type === "first") {
      if (ValidatePassword(input)) {
        setPasswordOneValidity(true);
        setFirstOne(input);
      } else {
        setPasswordOneValidity(false);
      }
    }
    if (type === "second") {
      if (ValidatePassword(input)) {
        setPasswordTwoValidity(true);
        setSecondOne(input);
      } else {
        setPasswordTwoValidity(false);
      }
    }
  };

  const updatePasswordCall = async () => {
    if (firstOne === secondOne && firstOne.length && secondOne.length) {
      setPasswordSame(true)
      setLoading(true);
      console.log("DUO", firstOne, secondOne);
      let response = await updatePassword(secondOne, userData.id);
      if (response.status === 200) {
        setLoading(false);
        console.log("UPR", response);
        // Logging out
        try {
          await AsyncStorage.removeItem("auth");
          store.dispatch(baseApi.util.resetApiState());
          dispatch(tabDeselection());
          navigation.reset({
            index: 0,
            routes: [{ name: "InitialScreen" }],
          });
        } catch (err) {
          console.log("error occured", err);
        }
      } else {
        console.log("UPR", response);
        setLoading(false);
      }
    } else {
      // setPasswordOneValidity(false);
      // setPasswordTwoValidity(false);
      setPasswordSame(false)
    }
  };

  return (
    <View>
      <SafeAreaView>
        <Header
          navigation={navigation}
          heading="Update Password"
          btnTitle="Submit"
          Submit={true}
          onPressSubmit={updatePasswordCall}
          loading={load}
        />
        <View style={styles.container}>
          <Text style={styles.text}>
            Login required after password is changed
          </Text>
          {!samePassword && <Text style={{...styles.errorMsg, fontSize: 14}}>Both passwords must be same</Text>}
          <View>
            <Text style={styles.text}>Enter Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isPasswordOneValid
                    ? colors.lightSilver
                    : colors.blockRed,
                },
              ]}
              secureTextEntry={showPassword}
              onChangeText={(e) => validate(e, "first")}
            />
            {!isPasswordOneValid && (
              <Text style={styles.errorMsg}>Password must have 8 letters</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isPasswordTwoValid || samePassword
                    ? colors.lightSilver
                    : colors.blockRed,
                },
              ]}
              secureTextEntry={showPassword}
              onChangeText={(e) => validate(e, "second")}
            />
            {!isPasswordTwoValid && (
              <Text style={styles.errorMsg}>Password must have 8 letters</Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Show Passwords"
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UpdatePassword;
