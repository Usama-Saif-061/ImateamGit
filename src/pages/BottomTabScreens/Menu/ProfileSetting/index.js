import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ButtonCommon from "../../../../common/Components/Buttons";
import colors from "../../../../common/colors";
import PhoneNumberInput from "../../../../common/Components/PhoneNumberInput";
import {
  getHeightPixel,
  getWidthPixel,
  ValidateFirstName,
  ValidateLastName,
  ValidateEmail,
} from "../../../../common/helper";
import styles from "./styles";
import { useGetUserQuery } from "./../../../../Reducers/usersApi";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import updateProfileApi from "../../../../Reducers/updateProfileApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import getPlaces from "../../Teams/API/placesApi";
import { updateUserInfo } from "../../../../Reducers/userReducer";
import updateProfleImage from "../Api/profileAvatarUpdateApi";
import Toast from "react-native-toast-message";

const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
function ProfileSetting({ imgData }) {
  const [lolz, setLol] = useState();
  console.log("IMGPAYLOAD", imgData);
  const { data: profileInfo, isFetching, refetch } = useGetUserQuery();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: `${profileInfo?.first_name}`,
    lastName: `${profileInfo?.last_name}`,
    email: `${profileInfo?.email}`,
    phoneNo: `${profileInfo?.payload?.phone}`,
    title: `${profileInfo?.title}`,
    personalInfo: `${profileInfo?.payload?.personalProfile}`,
    locale: {
      description: `${profileInfo?.locale?.address}`,
      reference: `${profileInfo?.locale?.address}`,
      place_id: "",
    },
  });
  const [locArr, setLocArr] = useState([]);
  const [load, setLoad] = useState(false);
  const [checkData, setCheckData] = useState({
    isEmailValid: true,
    isFirstNameValid: true,
    isLastNameValid: true,
    isPhoneNumValid: true,
  });
  const [cred, setCred] = useState(true);
  const [locationInput, setLocationInput] = useState(data?.locale?.description ? data?.locale?.description : '')

  let locationNotChanged = {
    id: profileInfo?.id,
    lat_lon: null,
    attachments: null,
    object_id: profileInfo?.locale?.object_id,
    name: profileInfo?.locale?.name,
    address: profileInfo?.locale?.address,
    lon_lat: profileInfo?.locale?.lon_lat,
    phone: profileInfo?.locale?.phone,
    tags: profileInfo?.locale?.tags,
    payload: null,
    active_until: profileInfo?.locale?.active_until,
    created_at: profileInfo?.created_at || null,
    updated_at: profileInfo?.updated_at || null,
    user: profileInfo?.locale?.user,
    content_type: profileInfo?.locale?.content_type,
  };

  let locationChanged = {
    description: data.locale.description,
    place_id: data.locale.place_id,
    reference: data.locale.reference,
  };

  const body = {
    location:
      data.locale.description !== profileInfo?.locale?.address
        ? locationChanged
        : locationNotChanged,
    payload: {
      title: profileInfo?.title || null,
      personalProfile: data?.personalInfo,
      phone: data?.phoneNo,
      nickName: profileInfo?.nickName || null,
    },
    userInfo: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
  };

  const setUpLocation = async (input) => {
    setLocationInput(input)
    let response = await getPlaces(input);
    if (response) {
      console.log("Places", response.data);
      setLocArr([...response.data]);
    }
  };

  console.log("LOC", data.locale);

  const updateProfile = async () => {
    if (cred) {
      if (locationInput == '') {
        alert('Please fill your location before updating profile.')
        return;
      }
      setLoad(true);

      console.log("JSONbody", body);
      let response = await updateProfileApi(body);

      if (response) {
        refetch();
        setLoad(false);
        console.log("RESPONSE", response);

        Toast.show({
          type: "success",
          text1: "Profile Updated",
          visibilityTime: 1500,
        });

        dispatch(updateUserInfo(data));

        let jsonData = JSON.stringify(data);
        AsyncStorage.setItem("UpdatadUser", jsonData);
      }
      let imgResponse = await updateProfleImage(imgData);

      if (imgResponse.status === 200) {
        refetch();
        setLoad(false);
        Toast.show({
          type: "success",
          text1: "Profile Image Updated",
          visibilityTime: 1500,
        });
        console.log("RESPONSE img", imgResponse);
      }
    }
  };

  const validator = (e, type) => {
    // If email
    if (type === "email") {
      if (ValidateEmail(e)) {
        setData({
          ...data,
          email: e,
        });
        setCheckData({
          ...checkData,
          isEmailValid: true,
        });
        setCred(true);
      } else {
        setCheckData({
          ...checkData,
          isEmailValid: false,
        });
        setCred(false);
      }
    }

    //if First Name
    if (type === "firstName") {
      if (ValidateFirstName(e)) {
        setData({
          ...data,
          firstName: e,
        });
        setCheckData({
          ...checkData,
          isFirstNameValid: true,
        });
        setCred(true);
      } else {
        setCheckData({
          ...checkData,
          isFirstNameValid: false,
        });
        setCred(false);
      }
    }

    // if Last name
    if (type === "lastName") {
      if (ValidateLastName(e)) {
        setData({
          ...data,
          lastName: e,
        });
        setCheckData({
          ...checkData,
          isLastNameValid: true,
        });
        setCred(true);
      } else {
        setCheckData({
          ...checkData,
          isLastNameValid: false,
        });
        setCred(false);
      }
    }
  };

  const validatePhoneNumber = (phone) => {
    if (parsePhoneNumberFromString(phone.toString())?.isValid()) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!isFetching) {
      setLol(profileInfo);
      // console.log("i am umars data", profileInfo);
    }
    console.log(lolz);
  }, [profileInfo, data]);

  return (
    <View style={styles.container}>
      <KeyboardAwareView animated={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={checkData.isEmailValid ? styles.label : styles.invalidInput}
          >
            Email*
          </Text>
          <TextInput
            style={{ ...styles.input, height: getHeightPixel(45) }}
            autoCapitalize="none"
            defaultValue={data.email}
            onChangeText={(e) => validator(e, "email")}
          />
          {!checkData.isEmailValid && (
            <Text style={styles.errorMsg}>Invalid Email</Text>
          )}

          <Text
            style={
              checkData.isFirstNameValid ? styles.label : styles.invalidInput
            }
          >
            First Name
          </Text>

          <TextInput
            style={{ ...styles.input, height: getHeightPixel(45) }}
            defaultValue={data.firstName}
            onChangeText={(e) => validator(e, "firstName")}
          />
          {!checkData.isFirstNameValid && (
            <Text style={styles.errorMsg}>Invalid First Name</Text>
          )}

          <Text
            style={
              checkData.isLastNameValid ? styles.label : styles.invalidInput
            }
          >
            Last Name
          </Text>
          <TextInput
            style={{ ...styles.input, height: getHeightPixel(45) }}
            defaultValue={data.lastName}
            onChangeText={(e) => validator(e, "lastName")}
          />
          {!checkData.isLastNameValid && (
            <Text style={styles.errorMsg}>Invalid Last Name</Text>
          )}

          <Text style={styles.label}>Phone</Text>
          <PhoneNumberInput
            testID="phoneLineInput"
            showFloatingLabel={false}
            //value={number}
            autoCorrect={false}
            value={data.phoneNo}
            err={checkData.isPhoneNumValid}
            label="red"
            autoFocus={false}
            onChangeText={(num) => {
              if (num) {
                // console.log("phone!",num)
              }
            }}
            onPhoneNumberChanged={(val) => {
              if (val && val.number) {
                setCheckData({
                  ...checkData,
                  isPhoneNumValid: !validatePhoneNumber(val.number.toString()),
                });
                setData({
                  ...data,
                  phoneNo: val.number.toString(),
                });
              }
            }}
            autoComplete="off"
            defaultValue={profileInfo?.payload?.phone}
          />
          <Text style={styles.label}>Personal Info</Text>
          <TextInput
            style={[
              { ...styles.input },
              {
                paddingVertical: 0,
                height: getHeightPixel(77),
                paddingLeft: getWidthPixel(13),
              },
            ]}
            numberOfLines={3}
            multiline={true}
            defaultValue={
              data?.personalInfo === undefined ? "" : data?.personalInfo
            }
            onChangeText={(text) =>
              setData({
                ...data,
                personalInfo: text,
              })
            }
          />
          <Text style={styles.label}>Locale*</Text>
          <TextInput
            style={{ ...styles.input, height: getHeightPixel(45) }}
            defaultValue={
              data?.locale?.description === undefined
                ? ""
                : data?.locale?.description
            }
            placeholder="Search"
            onChangeText={setUpLocation}
          />
          {!locArr.length ? null : (
            <View>
              {locArr.map((x, id) => (
                <TouchableOpacity
                  style={styles.dropDownItems}
                  key={id}
                  onPress={() => {
                    setLocArr([]);
                    setData({
                      ...data,
                      locale: {
                        description: x.description,
                        place_id: x.place_id,
                        reference: x.reference,
                      },
                    });
                    setLocationInput(x.description)
                  }}
                >
                  <Text style={{ color: colors.mineShaft }}>
                    {x.description}{" "}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View
            style={{
              marginTop: getHeightPixel(30),
              marginBottom: getHeightPixel(20),
            }}
          >
            <ButtonCommon
              title={cred ? "UPDATE" : "INVALID CREDENTIAL"}
              color={cred ? colors.primary : colors.blockRed}
              method={updateProfile}
              loading={load}
            />
          </View>
        </ScrollView>
      </KeyboardAwareView>
    </View>
  );
}

export default ProfileSetting;
