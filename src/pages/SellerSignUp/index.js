import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import images from "././../../common/icons";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import colors from "../../common/colors";
import { Logo } from "../../common/Components/Logo";
import InputFields from "././../../common/Components/InputFields/Index";
import { TextInput } from "react-native-paper";
import { styles } from "./styles";
import PhoneNumberInput from "../../common/Components/PhoneNumberInput";
import DataPicker from "./../../common/Components/Picker/index";
import DropDownPicker from "react-native-dropdown-picker";
import getPlaces from "./../BottomTabScreens/Teams/API/placesApi";

import {
  getHeightPercentage,
  getHeightPixel,
  getWidthPercentage,
  getWidthPixel,
  ValidateEmail,
  ValidateLastName,
  ValidatePassword,
} from "./../../common/helper";
import ButtonCommon from "../../common/Components/Buttons";
import { SellerSignUpAPI } from "./sellerAPIs/sellerSignUpAPI";
import { set } from "immer/dist/internal";
import Loading from "../../common/Components/MainFrame";

const SellerSignUp = ({ navigation }) => {
  const navigationOptions = {
    header: null,
  };

  //business type drop down props
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Partnership", value: "Partnership" },
    { label: "Corporation", value: "Corporation" },
    { label: "Non-Profit", value: "Non-Profit" },
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
  ]);
  //sales type drop down props
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "online Only", value: "online Only" },
    { label: "Retail & Online", value: "Retail & Online" },
  ]);

  //payout type dropdown props
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: "ACH / Direct Deposit", value: "ACH / Direct Deposit" },
  ]);

  // item sold type

  const [itemSoldType, setItemSoldType] = useState([
    "Services",
    "Events",
    "Donations",
    "Gifts",
  ]);

  const [formData, setFormData] = useState({
    businessName: "",
    BusinessType: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    mailingAddress: {
      description: "",
      place_id: "",
      reference: "",
    },
    salesType: "",
    soldType: "",
    description: "",
    SSN: "",
    salesTaxId: "",
    payoutType: "",
    routingNumber: "",
    accountNumber: "",
  });
  const [formData2, setFormData2] = useState(null);
  const [locationValue, setLocationValue] = useState({
    description: "",
    place_id: "",
    reference: "",
  });

  const [formDataError, setFormDataError] = useState({
    businessName: false,
    BusinessType: false,
    contactName: false,
    title: false,
    email: false,
    phone: false,
    mailingAddress: false,
    salesType: false,
    soldType: false,
    description: false,
    SSN: false,
    sakesTaxId: false,
    payoutType: false,
    routingNumber: false,
    accountNumber: false,
  });

  const [Business_type, getBusinessType] = useState("");

  const [locArr, setLocArr] = useState([]);

  console.log("businessTYpe is ", value);

  const validatePhoneNumber = (phone) => {
    if (parsePhoneNumberFromString(phone.toString())?.isValid()) {
      return true;
    }

    return false;
  };

  const setUpLocation = async (input) => {
    setLocationValue(input);
    let response = await getPlaces(input);
    if (response) {
      console.log("Places", response.data);
      setLocArr([...response.data]);
    }
  };
  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: "handled",
    contentContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  };

  const onNextStep = () => {
    console.log("called next step");
  };

  const onPaymentStepComplete = () => {
    alert("Payment step completed!");
  };

  const onPrevStep = () => {
    console.log("called previous step");
  };

  const onSubmitSteps = () => {
    console.log("called on submit step.");
    signUpAPI();
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const signUpAPI = async () => {
    setLoading(true);
    console.log("api api api");
    const body = {
      name: formData?.businessName,
      location: {
        description: locationValue.description,
        place_id: locationValue.place_id,
      },
      payload: {
        bizType: value,
        contactPhone: formData?.phone,
        contactName: formData?.contactName,
        title: formData?.title,
        email: formData?.email,
        salesType: value2,
        productTypes: [formData?.soldType],
        description: formData?.description,
        einSsn: formData?.SSN,
        taxId: formData?.salesTaxId,
        payoutType: value3,
        routingNumber: formData?.routingNumber,
        accountNumber: formData?.accountNumber,
      },
    };

    var response;
    if (
      body.name &&
      body.location.place_id &&
      body.payload.contactPhone &&
      body.payload.email &&
      body.payload.salesType &&
      body.payload.accountNumber
    ) {
      response = await SellerSignUpAPI(body);
    }

    console.log("response of seller", response);
    if (response) {
      setLoading(false);
      navigation.navigate({
        name: "SellerSignUpThankYouPage",

        merge: true,
      });
    } else {
      setLoading(false);
      alert("SignUp Unsucessful Check Input values");
    }

    console.log("body is ", body);
    console.log("form data is ", formData);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <SafeAreaView onPress={() => Keyboard.dismiss()}>
        <Loading isLoading={loading} backgroundColor={colors.white} />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("MainLanding")}
        >
          <Image source={images.logoBlue} style={styles.logoImage} />
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <ProgressSteps
        activeStepIconBorderColor={colors.white}
        progressBarColor={colors.white}
        completedProgressBarColor={colors.primary2}
        completedStepIconColor={colors.primary2}
        completedLabelColor={colors.primary2}
        activeLabelColor={colors.white}
        borderWidth={2}
        activeStepNumColor={colors.white}
      >
        <ProgressStep
          label="Contact"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          progressBarColor={colors.primary2}
          scrollable={true}
        >
          <View
            onPress={Keyboard.dismiss}
            style={{
              width: getWidthPercentage(100),
              backgroundColor: colors.white,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              alignSelf: "center",
              flexDirection: "column",
              height: "100%",
              flex: 1,
            }}
          >
            {/* //signup input InputFields */}
            <View
              style={{
                marginTop: getHeightPixel(34),
                width: getWidthPixel(300),
                alignSelf: "center",
              }}
            >
              <View>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({ ...prev, businessName: val }));
                      setFormDataError((prev) => ({
                        ...prev,
                        businessName: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        businessName: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.businessName}
                  mode="outlined"
                  label={"Business Name *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                  right={
                    <TextInput.Icon
                      onPress={() => console.log("")}
                      name={"contact"}
                      color={colors.accentGray}
                    />
                  }
                />
              </View>
              <View style={{ marginTop: getHeightPixel(20), zIndex: 999 }}>
                <TouchableOpacity onPress={() => console.log("hello")}>
                  <View style={styles.BusinessType}>
                    {/* <Text style={{ color: colors.black }}>
                      {"Business Type *"}
                    </Text>
                    <Icon
                      name="arrow-drop-down"
                      size={21}
                      color={colors.black}
                    /> */}

                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      key={items}
                      closeAfterSelecting={true}
                      setOpen={setOpen}
                      zIndex={1000}
                      selectedItemContainerStyle={{
                        backgroundColor: "grey",
                      }}
                      setValue={setValue}
                      setItems={setItems}
                      translation={{
                        PLACEHOLDER: "Business Type*",
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        ...styles.picker,
                        width: getWidthPixel(283),
                        marginLeft: 0,
                      }}
                      dropDownContainerStyle={{
                        ...styles.dropDown,
                        width: getWidthPixel(283),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: getHeightPixel(20) }}>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({ ...prev, contactName: val }));
                      setFormDataError((prev) => ({
                        ...prev,
                        contactName: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        contactName: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.contactName}
                  mode="outlined"
                  label={"Contact Name *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                />
              </View>
              <View style={{ marginTop: getHeightPixel(20) }}>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({ ...prev, title: val }));
                      setFormDataError((prev) => ({
                        ...prev,
                        title: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        title: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.title}
                  mode="outlined"
                  label={"Title*"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                  right={
                    <TextInput.Icon
                      onPress={() => console.log("")}
                      name={"account-outline"}
                      color={colors.accentGray}
                    />
                  }
                />
              </View>
              <View style={{ marginTop: getHeightPixel(20) }}>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1 && ValidateEmail(val)) {
                      setFormData((prev) => ({ ...prev, email: val }));
                      setFormDataError((prev) => ({
                        ...prev,
                        email: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        email: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.email}
                  mode="outlined"
                  label={"Email *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                  right={
                    <TextInput.Icon
                      onPress={() => console.log("")}
                      name={"email-outline"}
                      color={colors.accentGray}
                    />
                  }
                />
              </View>

              <View style={{ marginTop: getHeightPixel(20) }}>
                <PhoneNumberInput
                  testID="phoneLineInput"
                  value={formData.phone}
                  autoCorrect={false}
                  keyboardType="numbers"
                  autoFocus={false}
                  showFloatingLabel={true}
                  err={formDataError.phone}
                  onEndEditing={(num) => {
                    if (num && num.number) {
                      console.log(num.number.toString());
                    }
                  }}
                  onPhoneNumberChanged={(val) => {
                    if (
                      val &&
                      val.number &&
                      validatePhoneNumber(val.number.toString())
                    ) {
                      setFormData((prev) => ({
                        ...prev,
                        phone: val.number.toString(),
                      }));
                      setFormDataError((prev) => ({
                        ...prev,
                        phone: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        phone: true,
                      }));
                    }
                    console.log(formData);
                    console.log(formDataError);
                  }}
                  autoComplete="off"
                  placeholder={"+XXXXXXXXXXXX"}
                />
              </View>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Business"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: colors.white,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <View
              style={{
                marginTop: getHeightPixel(20),
                width: getWidthPixel(300),
              }}
            >
              <View
                style={{
                  marginTop: getHeightPixel(20),
                  zIndex: 9999,
                }}
              >
                <TextInput
                  onChangeText={setUpLocation}
                  error={formDataError.mailingAddress}
                  mode="outlined"
                  label={"Mailing Address *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  value={locationValue.description}
                  autoCapitalize={"words"}
                  autoFocus={false}
                  right={
                    <TextInput.Icon
                      onPress={() => console.log("")}
                      name={"email-outline"}
                      color={colors.accentGray}
                      size={20}
                    />
                  }
                />

                <Text style={styles.mailingAddress}>
                  Street, city, state, zip
                </Text>
                {!locArr.length ? null : (
                  <View
                    style={{
                      position: "absolute",
                      width: getWidthPixel(300),
                      top: getHeightPercentage(10),
                      backgroundColor: "white",
                    }}
                  >
                    {locArr.map((x, id) => (
                      <TouchableOpacity
                        style={styles.dropDownItems}
                        key={id}
                        onPress={() => {
                          setLocationValue(x);
                          console.log("x.location", x?.description);
                          setFormData((prev) => ({
                            ...prev,
                            mailingAddress: {
                              description: x.description,
                              place_id: x.place_id,
                              reference: x.reference,
                            },
                          }));

                          setLocArr([]);
                        }}
                      >
                        <Text style={{ color: colors.mineShaft }}>
                          {x.description}{" "}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={{ marginTop: getHeightPixel(20), zIndex: 999 }}>
                <TouchableOpacity onPress={() => console.log("hello")}>
                  <View style={styles.BusinessType}>
                    <DropDownPicker
                      open={open2}
                      value={value2}
                      items={items2}
                      key={items2}
                      closeAfterSelecting={true}
                      setOpen={setOpen2}
                      zIndex={1000}
                      selectedItemContainerStyle={{
                        backgroundColor: "grey",
                      }}
                      setValue={setValue2}
                      setItems={setItems2}
                      translation={{
                        PLACEHOLDER: "Sales Type*",
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        ...styles.picker,
                        width: getWidthPixel(283),
                        marginLeft: 0,
                      }}
                      dropDownContainerStyle={{
                        ...styles.dropDown,
                        width: getWidthPixel(283),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.SoldItemsType}>What is Sold?*</Text>
              <View style={styles.soldItemCatagories}>
                {itemSoldType.map((item) => (
                  <TouchableOpacity
                    style={{
                      ...styles.serviceItemWrapper,

                      backgroundColor:
                        formData.soldType === item
                          ? colors.primary
                          : colors.accentGray,
                    }}
                    onPress={() => {
                      if (formData.soldType !== item) {
                        setFormData((prev) => ({ ...prev, soldType: item }));
                        setFormDataError((prev) => ({
                          ...prev,
                          soldType: false,
                        }));
                      } else {
                        setFormData((prev) => ({ ...prev, soldType: "" }));
                        setFormDataError((prev) => ({
                          ...prev,
                          soldType: false,
                        }));
                      }
                    }}
                  >
                    <Text style={styles.serviceItem}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                onChangeText={(val) => {
                  if (val && val.length > 30) {
                    setFormData((prev) => ({ ...prev, description: val }));
                    setFormDataError((prev) => ({
                      ...prev,
                      description: false,
                    }));
                  } else {
                    setFormDataError((prev) => ({
                      ...prev,
                      description: true,
                    }));
                  }

                  console.log(formData);
                  console.log(formDataError);
                }}
                error={formDataError.description}
                mode="outlined"
                label={"Description *"}
                secureTextEntry={false}
                activeOutlineColor={colors.accentGray}
                activeUnderlineColor={colors.accentGray}
                keyboardType={keyboard ? keyboard : "default"}
                placeholder={
                  "Tell us about your Services / Events \n (include #tags)"
                }
                placeholderTextColor={colors.lightSilver}
                style={styles.InputDescription}
                color={colors.mineShaft}
                autoCapitalize={"words"}
                autoFocus={false}
                numberOfLines={4}
              />
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Account"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollViewProps={defaultScrollViewProps}
        >
          <View
            style={{
              alignItems: "center",
              display: "flex",
              backgroundColor: colors.white,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              paddingTop: getHeightPixel(34),

              flex: 1,
            }}
          >
            <View
              style={{
                width: getWidthPixel(300),
              }}
            >
              <View>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({ ...prev, SSN: val }));

                      setFormDataError((prev) => ({
                        ...prev,
                        SSN: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        SSN: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.SSN}
                  mode="outlined"
                  label={"EIN / SSN *"}
                  value={formData?.SSN}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({ ...prev, salesTaxId: val }));
                      setFormDataError((prev) => ({
                        ...prev,
                        sakesTaxId: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        sakesTaxId: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.sakesTaxId}
                  mode="outlined"
                  label={"Sales Tax Id *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                />
              </View>
              <View style={{ marginTop: getHeightPixel(20), zIndex: 999 }}>
                <TouchableOpacity onPress={() => console.log("hello")}>
                  <View style={styles.BusinessType}>
                    <DropDownPicker
                      open={open3}
                      value={value3}
                      items={items3}
                      key={items3}
                      closeAfterSelecting={true}
                      setOpen={setOpen3}
                      zIndex={1000}
                      selectedItemContainerStyle={{
                        backgroundColor: "grey",
                      }}
                      setValue={setValue3}
                      setItems={setItems3}
                      translation={{
                        PLACEHOLDER: "Sales Type*",
                      }}
                      listMode="SCROLLVIEW"
                      style={{
                        ...styles.picker,
                        width: getWidthPixel(283),
                        marginLeft: 0,
                      }}
                      dropDownContainerStyle={{
                        ...styles.dropDown,
                        width: getWidthPixel(283),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: getHeightPixel(20) }}>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({
                        ...prev,
                        routingNumber: val,
                      }));
                      setFormDataError((prev) => ({
                        ...prev,
                        routingNumber: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        routingNumber: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.routingNumber}
                  mode="outlined"
                  label={"Routing Number *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                />
              </View>
              <View style={{ marginTop: getHeightPixel(20) }}>
                <TextInput
                  onChangeText={(val) => {
                    if (val && val.length > 1) {
                      setFormData((prev) => ({
                        ...prev,
                        accountNumber: val,
                      }));
                      setFormDataError((prev) => ({
                        ...prev,
                        accountNumber: false,
                      }));
                    } else {
                      setFormDataError((prev) => ({
                        ...prev,
                        accountNumber: true,
                      }));
                    }

                    console.log(formData);
                    console.log(formDataError);
                  }}
                  error={formDataError.accountNumber}
                  mode="outlined"
                  label={"Account Number *"}
                  secureTextEntry={false}
                  activeOutlineColor={colors.accentGray}
                  activeUnderlineColor={colors.accentGray}
                  keyboardType={keyboard ? keyboard : "default"}
                  placeholder={"Type..."}
                  placeholderTextColor={colors.lightSilver}
                  style={styles.Input}
                  color={colors.mineShaft}
                  autoCapitalize={"words"}
                  autoFocus={false}
                />
              </View>

              {/* <View style={{ marginTop: 30 }}>
                <ButtonCommon
                  method={() => {
                    signUpAPI();
                  }}
                  title={"COMPLETE SIGNUP"}
                  color={colors.secondary}
                />
              </View> */}
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default SellerSignUp;
