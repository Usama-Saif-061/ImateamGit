import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";
import Header from "../../../../common/Components/HeaderCommon";
import { AgeList, GroupList, TagList } from "../../../../common/StaticData";
import DropDownPicker from "react-native-dropdown-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ImagePicker from "react-native-image-crop-picker";
import { font, getHeightPixel, getWidthPixel } from "../../../../common/helper";
import colors from "../../../../common/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonCommon from "../../../../common/Components/Buttons";
import ConfirmDelete from "../ConfirmDelete";
import createOrg from "../API/createOrgApi";
import getPlaces from "../API/placesApi";
import TagsComponent from "../../../../common/Components/TagsComponent";
const image = require("../../../../common/assets/img/sample-camera.jpeg");

const NewOrg = ({ navigation, route }) => {
  const teamData = route?.params?.teamData;
  const updateOrg = route?.params?.updateOrg;
  const actionType = route?.params?.actionType;

  console.log("TeamData", teamData);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value, setValue] = useState(updateOrg && teamData.payload.orgType);
  const [ageValue, setAgeValue] = useState(
    updateOrg ? teamData.payload.ageGroup : AgeList[0].value
  );
  const [tagValue, setTagValue] = useState(teamData && teamData.payload.tags.length > 0 ? teamData.payload.tags : []);
  const [groupItems, setGroupItems] = useState(GroupList);
  const [ageItems, setAgeItems] = useState(AgeList);
  const [tagItems, setTagItems] = useState(TagList);
  const [name, setName] = useState(updateOrg && `${teamData.name}`);
  const [places, setPlaces] = useState([]);
  const [description, setDescription] = useState(
    updateOrg && teamData.payload.description
  );
  const [location, setLocation] = useState(
    updateOrg && teamData?.location?.address
  );
  const [check, setCheck] = useState(
    updateOrg ? teamData.posts_moderated : false
  );
  const [imageUri, setImageUri] = useState(
    updateOrg && `${teamData.organization_info.avatar.url}`
  );
  const [selectedImage, selectImage] = useState();
  const [height, setHeight] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const TouchableWrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;

  const checkList = (item) => {
    setTagValue((pre) => {
      return pre.filter((temp) => temp != item);
    });
  };
  const checkBoxFunc = () => {
    setCheck(!check);
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 90,
      height: 90,
      cropping: false,
      includeBase64: true,
      mediaType: "photo",
    }).then((image) => {
      setImageUri((pre) => (pre = image.path));
      selectImage(image);
    });
  };
  const showToast = () => {
    Toast.show({
      type: "error",
      text2: `Please Fill All The Fields`,
      visibilityTime: 1500,
    });
  };

  let jsonBody = {
    files: [
      {
        data: selectedImage?.data,
        fileInfo: {
          fileSize: selectedImage?.size,
          fileType: selectedImage?.mime,
          filename: selectedImage?.filename ? selectedImage?.filename : new Date().toString(),
          scope: "avatar",
        },
      },
    ],
    location: {
      description: location?.description,
      place_id: location?.place_id,
    },
    name: name,
    payload: {
      ageGroup: ageValue,
      description: description,
      orgType: value,
      tags: tagValue,
    },
    postsModerated: check,
  };

  let updateProfileJSON = {
    files: [
      {
        data: selectedImage?.data,
        fileInfo: {
          filename: selectedImage?.filename,
          fileSize: selectedImage?.size,
          fileType: selectedImage?.mime,
          scope: "avatar",
        },
      },
    ],
    location: {
      ...teamData?.location,
      description: location?.description,
    },
    name: name,
    organizationId: teamData?.id,
    payload: {
      ageGroup: ageValue,
      description: description,
      orgType: value,
      tags: tagValue,
    },
    postsModerated: check,
  };

  //Org Api call

  const createOrganization = async () => {
    let body = updateOrg ? updateProfileJSON : jsonBody;
    setLoading(true);
    let response = await createOrg(body);
    if (response) {
      console.log("NewOrgApiResponse: ", response);
      setLoading(false);
      updateOrg
        ? navigation.navigate("TeamsLanding", {
          type: actionType("updateOrg"),
        })
        : navigation.navigate("TeamsLanding", {
          type: actionType("createOrg"),
        });
    }
  };

  //Places api call
  const locale = async (input) => {
    let response = await getPlaces(input);
    if (response) {
      console.log("Places", response.data);
      setPlaces([...response.data]);
    }
  };
  console.log("Places in state", places);

  // useEffect(() => {
  //   console.log(tagValue);
  //   if (done) {
  //     if (
  //       value &&
  //       name &&
  //       description &&
  //       location &&
  //       ageValue &&
  //       check &&
  //       tagValue
  //     ) {
  //       const dataObject = {
  //         name: name,
  //         description: description,
  //         location: location,
  //         groupImage: imageUri,
  //         groupType: value,
  //         ageGroup: ageValue,
  //         tags: [...tagValue],
  //         members: [],
  //       };
  //     } else {
  //       showToast();
  //       setDone(false);
  //     }
  //   }
  // }, [
  //   done,
  //   value,
  //   imageUri,
  //   name,
  //   location,
  //   description,
  //   check,
  //   ageValue,
  //   [tagValue],
  // ]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          navigation={navigation}
          heading={updateOrg ? "Update Organization" : "New Organization"}
          btnTitle="Submit"
          onDone={setDone}
          isNewOrg={true}
          onPressSubmit={createOrganization}
          loading={loading}
          teams={true}
        />
      </SafeAreaView>

      <KeyboardAwareScrollView
        style={styles.contentWrapper}
        nestedScrollEnabled={true}
      >
        {/* <TouchableWrapper   style={{ flex: 1, }}
          keyboardVerticalOffset={100}
          behavior={"position"}> */}
        {/* CONTENT 1 GROUP TYPE */}
        <View style={[styles.content, { zIndex: 1000, elevation: 5 }]}>
          <Text style={styles.text}>This is a?</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={groupItems}
            setOpen={() => {
              setOpen3(false);
              setOpen2(false);
              setOpen(!open);
            }}
            setValue={setValue}
            setItems={setGroupItems}
            dropDownDirection="BOTTOM"
            placeholder="Select an input"
            style={{
              backgroundColor: colors.searchBlue,
              height: getHeightPixel(36),
              paddingVertical: 0,
              borderWidth: 0,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
            }}
            listMode="SCROLLVIEW"
          />
        </View>

        {/* CONTENT 2 NAME*/}
        <View style={styles.content}>
          <Text style={styles.text}>Name*</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor={colors.accentGray}
            value={name}
            onChangeText={(val) => {
              console.log("val: ", val);
              setName(val);
            }}
          />
        </View>

        {/* CONTENT 3 TAGS */}
        {/* <View>
          <Text style={styles.text}>Tags</Text>
          <View style={styles.content1}>
            {tagValue.length != 0 ? (
              <View style={styles.tagWrapper}>
                {tagValue.map((item, index) => (
                  <View style={styles.tag} key={index}>
                    <View
                      style={{
                        height: getHeightPixel(20),
                        width: getWidthPixel(20),
                        borderRadius: 40,
                        marginVertical: 2,
                        backgroundColor:
                          "#" +
                          Math.floor(Math.random() * 16777215).toString(16),
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",

                          ...font(14, "bold"),
                          color: "#fff",
                        }}
                      >
                        {item.charAt(0)}
                      </Text>
                    </View>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableWithoutFeedback
                      onPress={
                        () => checkList(item) //REMOVE ITEM FROM NAMELIST....
                      }
                    >
                      <Icon name="close" size={12} color="#fff" />
                    </TouchableWithoutFeedback>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View> */}
        <View style={[styles.content, { zIndex: 2, elevation: 5 }]}>
          {/* TAGS DROPDOWN */}
          {/* <DropDownPicker
            open={open3}
            multiple={true}
            min={0}
            max={5}
            searchable={true}
            value={tagValue}
            items={tagItems}
            setOpen={setOpen3}
            setValue={setTagValue}
            setItems={setTagItems}
            dropDownDirection="BOTTOM"
            placeholder="Search"
            style={{
              backgroundColor: colors.searchBlue,
              height: getHeightPixel(36),
              paddingVertical: 0,
              borderWidth: 0,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
              color: colors.inputBlue,
              placeholder: "hello",
            }}
            listMode="SCROLLVIEW"
          /> */}
          <Text style={styles.text}>Tags</Text>
          <TagsComponent
            selectedTags={tagValue}
            setSelectedTags={(arr) => setTagValue(arr)}
          />
        </View>
        {/* CONTENT 4  DESCRIPTION*/}
        <View style={styles.content}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholderTextColor={colors.accentGray}
            minHeight={getHeightPixel(64)}
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>

        {/* CONTENT 5 AGE GROUP DROPDOWN */}
        <View
          style={[
            styles.content,
            { zIndex: 1, elevation: 5, marginTop: getHeightPixel(23) },
          ]}
        >
          <Text style={styles.text}>Age Group</Text>
          <DropDownPicker
            open={open2}
            value={ageValue}
            items={ageItems}
            setOpen={() => {
              setOpen3(false);
              setOpen(false);
              setOpen2(!open2);
            }}
            setValue={setAgeValue}
            setItems={setAgeItems}
            dropDownDirection="BOTTOM"
            placeholder="All Ages"
            style={{
              backgroundColor: colors.searchBlue,
              height: getHeightPixel(36),
              paddingVertical: 0,
              borderWidth: 0,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
            }}
            listMode="SCROLLVIEW"
          />
        </View>

        {/* CONTENT 6 LOCATION */}
        <View style={styles.content}>
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor={colors.accentGray}
            defaultValue={location?.description}
            onChangeText={(location) => locale(location)}
          // onFocus = {()=> setHeight(true)}
          />
          <Text style={styles.secondaryText}>City, State, Country</Text>
          {places.length ? (
            <View>
              {places.map((item, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.localeWrap}
                    onPress={() => {
                      setLocation({
                        description: item.description,
                        place_id: item.place_id,
                      });
                      setPlaces([]);
                    }}
                  >
                    <Text style={styles.text}>{item.description}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* CONTENT 7  CHECKBOX */}
        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <BouncyCheckbox
              size={18}
              fillColor={colors.primary}
              unfillColor="#FFFFFF"
              style={styles.checkbox}
              isChecked={check}
              iconStyle={{ borderColor: colors.primary }}
              onPress={() => {
                checkBoxFunc();
              }}
            />
            <Text style={styles.text}>Moderated Posts</Text>
          </View>
          <Text style={styles.secondaryText}>
            Posts must be approved before being displyed
          </Text>
        </View>

        {/* CONTENT 8 AVATAR */}
        <View
          style={
            ([styles.content], { flexDirection: "row", alignItems: "center" })
          }
        >
          <TouchableOpacity onPress={chooseImage}>
            <Image
              style={styles.avatar}
              source={imageUri ? { uri: imageUri } : image}
            />
          </TouchableOpacity>
          <View>
            <Text style={[styles.text, { marginLeft: 4 }]}>Avatar</Text>
            <TouchableOpacity style={styles.tag} onPress={chooseImage}>
              <Text style={styles.tagText}>Add Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style = {{height: height ? 300 : 0}}></View> */}
        {/* </TouchableWrapper> */}
        {updateOrg && (
          <View style={styles.DeleteBtn}>
            <ButtonCommon
              title="Delete"
              color={colors.primary}
              method={() => setConfirmModal(true)}
            />
          </View>
        )}
      </KeyboardAwareScrollView>

      <ConfirmDelete
        open={confirmModal}
        teamId={teamData?.id}
        handleModal={setConfirmModal}
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: getWidthPixel(17),
    paddingVertical: getHeightPixel(11),
  },
  content: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 3,
    ...font(16, "bold"),
  },
  textInput: {
    height: getHeightPixel(36),
    borderWidth: 0.6,
    borderRadius: 6,
    paddingHorizontal: getWidthPixel(12),
    borderColor: colors.accentGray,
    paddingVertical: 0,
    color: colors.accentGray,
  },
  content1: {
    backgroundColor: colors.silverWhite,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: colors.accentGray,
    flexDirection: "row",
    paddingHorizontal: 4,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: getWidthPixel(4),
    marginVertical: getHeightPixel(4),
  },
  tagText: {
    ...font(14, "bold"),
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#fff",
  },
  checkbox: {
    tintColor: colors.secondary,
    borderRadius: 0,
    marginRight: -5,
  },
  secondaryText: {
    ...font(14, "400"),
    color: colors.accentGray,
    paddingVertical: getWidthPixel(8),
  },
  avatar: {
    width: getHeightPixel(90),
    height: getWidthPixel(90),
    resizeMode: "cover",
    borderRadius: 60,
    marginRight: getWidthPixel(14),
  },
  DeleteBtn: {
    paddingTop: getHeightPixel(30),
    paddingBottom: getHeightPixel(30),
  },
  text: {
    ...font(16),
    color: colors.black,
  },
  localeWrap: {
    paddingHorizontal: getWidthPixel(10),
    paddingVertical: getHeightPixel(10),
    borderBottomWidth: 0.4,
    borderBottomColor: colors.accentGray,
  },
});
export default NewOrg;