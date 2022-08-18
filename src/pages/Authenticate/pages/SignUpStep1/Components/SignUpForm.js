import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userSignupStep1 } from "../../../../../Reducers/userReducer";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  getWidthPixel,
  getHeightPixel,
  ValidateFirstName,
  ValidateLastName,
  ValidateEmail,
  ValidatePassword,
  font,
  moveToNextScreen,
} from "../../../../../common/helper";
import colors from "../../../../../common/colors";
import Toast from "react-native-toast-message";
import InputFields from "../../../../../common/Components/InputFields/Index";
import { Logo } from "../../../../../common/Components/Logo";
import ButtonCommon from "../../../../../common/Components/Buttons";
import { SignUpStep1API } from "../../../API/SignUpStep1";

import TermsOfServiceModal from "../../TermsOfServiceModal";
import PrivacyPolicyModal from "../../PrivacyPolicyModal";

const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

const SignUpForm = (props) => {
  const dispatch = useDispatch();

  const userRedux = useSelector((state) => state.user);
  // const { isSuccess, userInfo } = user;
  //console.log(userRedux);

  const [checkBoxState, setCheckBoxState] = useState(false);
  const [TOSVisible, setTOSModalVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [firstAttempt, changeNextAttempt] = useState(false);

  const setLabelValue = (value, fieldName) => {
    setUser({
      ...user,
      [fieldName]: value,
    });
    let isValid = false;
    let errorMessage = "";
    if (fieldName === "first_name") {
      isValid = ValidateFirstName(value);
      errorMessage = "First name should have at least 3 characters";
    } else if (fieldName === "last_name") {
      isValid = ValidateLastName(value);
      errorMessage = "Last name should have at least 3 characters";
    } else if (fieldName === "email") {
      isValid = ValidateEmail(value);
      errorMessage = "Invalid or empty Email";
    } else if (fieldName === "password") {
      isValid = ValidatePassword(value);
      errorMessage = "Password must contain at least 8 characters";
    }
    if (isValid) {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: "",
      });
    } else {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: errorMessage,
      });
    }
  };

  const checkAllFields = async () => {
    console.log(user);
    changeNextAttempt(true);
    const flags = [
      { name: "First Name", value: ValidateFirstName(user.first_name) },
      { name: "Last Name", value: ValidateLastName(user.last_name) },
      { name: "Email", value: ValidateEmail(user.email) },
      { name: "Password", value: ValidatePassword(user.password) },
      //{ name: "Terms and Privcy Policy", value: checkBoxState },
    ];

    setFieldErrors({
      first_name: flags[0].value
        ? ""
        : "First name should have at least 3 characters",
      last_name: flags[1].value
        ? ""
        : "Last name should have at least 3 characters",
      email: flags[2].value ? "" : "Invalid or empty Email Field",
      password: flags[3].value
        ? ""
        : "Password must contain at least 8 characters",
    });

    if (
      //check all  data and checkbox is true
      flags[0].value &&
      flags[1].value &&
      flags[2].value &&
      flags[3].value &&
      checkBoxState
    ) {
      // if true send form data into redux store and move to step 2
      setLoading(true);
      const response = await SignUpStep1API(
        user.email,
        user.password,
        user.first_name,
        user.last_name
        //user
      );

      if (response.email) {
        console.log(" response", response);
        const updatedUser = {
          ...response,
          password: user.password,
        };
        dispatch(userSignupStep1(updatedUser));
        setLoading(false);
        moveToNextScreen(props.navigation, "SignUpStep2");
        console.log("Sign up step 1 sucessful");
      } else if (response.response.data.detail) {
        setLoading(false);
        console.log("error : ", response);
        alert(JSON.stringify(response.response.data.detail));
      } else {
        setLoading(false);
      }
    } else if (
      flags[0].value ||
      flags[1].value ||
      flags[2].value ||
      flags[3].value
    ) {
      const filteredFlags = flags.filter((item) => {
        if (!item.value) {
          return item.name;
        }
      });
      if (filteredFlags.length) {
        showToast(filteredFlags);
        if (filteredFlags[3].name == "Password") {
          showToastTOS();
        }

        setLoading(false);
      }
    }
  };

  const showToast = (flags) => {
    //const passwordError = "Password Must contain at least 8 Characters";

    Toast.show({
      type: "error",
      text1: `Ooops`,
      text2: `${flags.map((item) => item.name)} Fields are Invalid or Empty. `,

      visibilityTime: 1000,
    });
  };
  const showToastTOS = () => {
    Toast.show({
      type: "error",
      text1: `Ooops`,
      text2: ` Password must contain atleast  characters `,
      visibilityTime: 3000,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Logo />
          {/* //header  */}
          <View style={styles.HeadingContainer}>
            {/* //main heading */}

            <Text style={styles.mainHeading}>Welcome to IMA Team</Text>

            {/* //sub heading */}
            <Text style={styles.subHeading}>Connect with your Team/Groups</Text>
          </View>

          {/* //signup input InputFields */}
          <InputFields
            Label="First Name*"
            Icon="account-outline"
            error={fieldErrors.first_name}
            autoCapitalize={true}
            // PlaceHolder="John"
            method={ValidateFirstName}
            setValue={(value) => setLabelValue(value, "first_name")}
          />
          <InputFields
            Label="Last Name*"
            error={fieldErrors.last_name}
            Icon="account-outline"
            PlaceHolder="Doe"
            method={ValidateLastName}
            autoCapitalize={true}
            setValue={(value) => setLabelValue(value, "last_name")}
          />
          <InputFields
            Label="Email*"
            error={fieldErrors.email}
            Icon="email-open-outline"
            PlaceHolder="JohnDoe@gmail.com"
            keyboard={"email-address"}
            method={ValidateEmail}
            setValue={(value) => setLabelValue(value, "email")}
          />

          <InputFields
            Label="Password*"
            Icon="eye-outline"
            PlaceHolder="********"
            error={fieldErrors.password}
            method={ValidatePassword}
            secureTextEntry={true}
            setValue={(value) => setLabelValue(value, "password")}
          />
        </KeyboardAvoidingView>

        <View style={styles.checkboxAndText}>
          <BouncyCheckbox
            size={25}
            fillColor={colors.primary}
            unfillColor="#FFFFFF"
            style={styles.checkbox}
            isChecked={checkBoxState}
            iconStyle={{ borderColor: colors.primary }}
            onPress={() => {
              setCheckBoxState(!checkBoxState);
            }}
          />
          <Text style={styles.Text}>
            I agree with all{" "}
            <Text onPress={() => setTOSModalVisible(true)} style={styles.terms}>
              Terms
            </Text>{" "}
            of Use &
            <Text
              // onPress={console.log("privacy page will open")}
              style={styles.terms}
              onPress={() => setPrivacyPolicyModalVisible(true)}
            >
              {" "}
              Privacy Policy
            </Text>
          </Text>
        </View>
        {!checkBoxState && firstAttempt ? (
          <Text style={{ color: "red" }}>
            Please agree with terms and privacy policy to continue
          </Text>
        ) : null}

        <ButtonCommon
          // onPress={()}
          title={"CONTINUE"}
          color={colors.primary}
          // method={checkAllFields}
          method={checkAllFields}
          loading={isLoading}
        />
        {/* 
      //BOttom text */}
        <View style={styles.bottomText}>
          <Text style={styles.alreadyHaveAccount}>
            Already have an ccount?{" "}
            <Text
              onPress={() => moveToNextScreen(props.navigation, "SignIn")}
              // onPress={console.log("signIn page will open")}
              style={styles.signIn}
            >
              Sign In{" "}
            </Text>
            to IMA Team
          </Text>
        </View>
        <TermsOfServiceModal
          modal={setTOSModalVisible}
          visibility={TOSVisible}
        //buttonNotVisible={true}
        />
        <PrivacyPolicyModal
          modal={setPrivacyPolicyModalVisible}
          visibility={privacyPolicyVisible}
        //buttonNotVisible={true}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidthPixel(283),
    backgroundColor: colors.white,
    alignSelf: "center",
    flexDirection: "column",
    height: "100%",
  },
  HeadingContainer: {
    alignItems: "center",
    marginTop: getHeightPixel(4),
  },
  mainHeading: {
    // fontSize: 22,
    // fontWeight: "700",
    ...font(26, "700"),
    color: colors.mineShaft,
  },
  subHeading: {
    ...font(14, "400"),
    color: colors.accentGray,
    paddingBottom: getHeightPixel(44),
    marginBottom: getHeightPixel(1),
  },

  SignUpButton: {
    backgroundColor: colors.secondary,
    alignSelf: "center",
    width: "99%",
  },
  SignUpButtonText: {
    textAlign: "center",
    marginTop: getHeightPixel(9.5),
    marginBottom: getHeightPixel(9.5),
    ...font(14, "600"),
    // fontFamily: "Segoe UI",
    lineHeight: getHeightPixel(21),
    color: colors.white,
  },
  checkbox: {
    margin: 4,
    tintColor: colors.secondary,
    width: getWidthPixel(10),
    borderRadius: 0,
  },
  checkboxAndText: {
    paddingBottom: getHeightPixel(20),
    width: "90%",
    flexDirection: "row",

    alignItems: "center",
    marginTop: 0,
  },
  Text: {
    ...font(14, "400"),
    marginLeft: getWidthPixel(20),
    color: colors.mineShaft,
  },
  terms: {
    ...font(14, "700"),
    textDecorationLine: "underline",
    padding: 1,
  },
  alreadyHaveAccount: {
    ...font(13, "400"),
    // fontFamily: "Segoe UI",

    alignSelf: "center",
    color: colors.mineShaft,
  },
  bottomText: {
    width: "90%",
    alignSelf: "center",

    ...font(12, "700"),
    marginTop: getHeightPixel(23),
    textAlign: "center",
  },
  signIn: {
    textDecorationLine: "underline",
    ...font(14, "700"),
    color: colors.primary2,
  },
});

export default SignUpForm;
