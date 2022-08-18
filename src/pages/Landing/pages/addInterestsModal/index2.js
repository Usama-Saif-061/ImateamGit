import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  BackHandler,
  ScrollView,
  unstable_batchedUpdates,
  Keyboard,
} from "react-native";
import images from "../../../../common/images";

import { SignUpStep2Styles } from "./styles";
import ButtonCommon from "../../../../common/Components/Buttons";
import colors from "../../../../common/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import { Appearance } from "react-native";

import {
  getHeightPixel,
  getWidthPixel,
  moveToNextScreen,
  font,
} from "../../../../common/helper";
import Icon2 from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";

import { useSelector, useDispatch } from "react-redux";
import { userSignupStep2 } from "../../../../Reducers/userReducer";
import SearchableDropdown from "react-native-searchable-dropdown";
import { InterestsAPI } from "../../API/interestsAPI";
import { SignUpStep2API } from "../../API/SignUpStep2";
import { color } from "react-native-reanimated";

const SignUpStep2 = ({ navigation }) => {
  //const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;
  const colorScheme = Appearance.getColorScheme();
  const [isLoading, setLoading] = useState(false);
  const [isDateDefault, changeDateDefault] = useState(true);

  //retreve previous form data from redux
  const userRedux = useSelector((state) => state.user);
  console.log(" step 2", userRedux.userInfo);

  //console.log(" step 2 from redux", userRedux);

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  console.log(date);

  const [tags, setTags] = useState([]);

  const [InterestsList, setInterestsList] = useState([]);

  const [selectedItems, selectItems] = useState([]);

  const [selectedTags, selectTags] = useState([]);

  console.log("Initial Tagger", selectedTags);

  const getAPIdata = async () => {
    const data = await InterestsAPI();
    //console.log("API", data);
    const newdata = data.map((item) => {
      return {
        ...item,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      };
    });
    //console.log(newdata);

    setInterestsList(newdata);
    _getButtonItems(newdata);
  };
  const _getButtonItems = (newdata) => {
    const items = [];
    newdata.forEach((i) => {
      console.log("interest item: ", i);
      const g = i.interest_map_groups ? i.interest_map_groups[0] : "";
      const name = g?.substring(g.indexOf("-") + 1).replaceAll("-", " ");
      if (name && !items.some((j) => j === g)) {
        items.push(g);
      }
    });
    console.log(InterestsList.length);
    console.log("tags", items);
    setTags(items);

    console.log("new tags", tags);

    return items;
  };
  //and here is the code to filter the list in the multi-select.
  const _filterGroup = (group) => {
    setInterestsList(
      InterestsList.filter(
        (c) => c.interest_map_groups && c.interest_map_groups[0] !== group
      )
    );
    //setIsOpen(true);
    //console.log(InterestsList.length, InterestsList);
  };
  console.log(InterestsList.length);

  function handleBackButtonClick() {
    navigation.goBack();

    return true;
  }

  const checkDate = async () => {
    setLoading(true);
    const dob =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

    const currentYear = new Date().getFullYear();

    if (date.getFullYear() < currentYear) {
      console.log("i am current year ", currentYear);
      dispatch(userSignupStep2({ dob: dob, selectedItems }));
      console.log(
        "data  ready for  api call",
        userRedux.userInfo.email,
        userRedux.userInfo.first_name,
        userRedux.userInfo.last_name,
        dob,
        selectedItems
      );
      const res = await SignUpStep2API(
        userRedux.userInfo.email,
        userRedux.userInfo.first_name,
        userRedux.userInfo.last_name,
        dob,
        selectedItems
      );

      if (res) {
        moveToNextScreen(navigation, "SignUpStep3");
        setLoading(false);
      }
      console.log(res);
      setLoading(false);
    } else {
      setLoading(false);
      alert(JSON.stringify("Date of Birth is invalid"));
    }
    //setModalVisible(true);
  };
  const updated = () => {
    const userReduxafter = useSelector((state) => state.user);
    console.log(userReduxafter);
  };

  const day = () => {
    let temp = date ? true : false;
    console.log(temp);
    return temp;
  };
  const month = () => {
    let temp = new Date();
    temp = temp.getMonth();
    console.log(temp);
    return temp;
  };
  const year = () => {
    let temp = new Date();
    temp = temp.getFullYear();
    console.log(temp);
    return temp;
  };
  useEffect(() => {
    getAPIdata();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={SignUpStep2Styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"position"}
          // keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <SafeAreaView>
            <Pressable
              onPress={() => moveToNextScreen(navigation, "SignUpStep1")}
            >
              <View style={SignUpStep2Styles.backButtonWrapper}>
                <Icon
                  name="keyboard-arrow-left"
                  size={21}
                  color={colors.black}
                />
                <Text style={SignUpStep2Styles.backButtonText}>Back</Text>
              </View>
            </Pressable>
          </SafeAreaView>

          <View style={SignUpStep2Styles.imgWrapper}>
            <Image
              source={images.SignUpStep2Image}
              style={SignUpStep2Styles.img}
            />
          </View>

          <View>
            <Text style={SignUpStep2Styles.Heading}>
              A little more info to {"\n"} get started.
            </Text>
          </View>

          <View>
            <Text style={SignUpStep2Styles.dob}>Date of Birth</Text>
          </View>
          <View style={SignUpStep2Styles.picker}>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <View style={SignUpStep2Styles.day}>
                <Text style={{ color: colors.black }}>
                  {isDateDefault ? "Day" : date.getDate()}
                </Text>

                <Icon name="arrow-drop-down" size={21} color={colors.black} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <View style={SignUpStep2Styles.month}>
                <Text style={{ color: colors.black }}>
                  {isDateDefault ? "Month" : date.getMonth() + 1}
                </Text>
                <Icon name="arrow-drop-down" size={21} color={colors.black} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <View style={SignUpStep2Styles.year}>
                <Text style={{ color: colors.black }}>
                  {isDateDefault ? "Year" : date.getFullYear()}
                </Text>
                <Icon name="arrow-drop-down" size={21} color={colors.black} />
              </View>
            </TouchableOpacity>
          </View>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={{ zIndex: 1 }}
          >
            {/* <View style={SignUpStep2Styles.interests}>
          <DataPicker data={Interests} label={"Interests"} />
        </View> */}
          </Pressable>
          <View>
            <Text style={SignUpStep2Styles.sports}>Sports</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: colors.accentGray,
              backgroundColor: colors.white,
              borderRadius: 6,
              zIndex: 1,
              marginBottom: 10,
            }}
          >
            <View style={{ flex: 2 }}>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                //On text change listner on the searchable input
                onItemSelect={(item) => {
                  selectItems((prevTags) => [...prevTags, item]);
                  //addTags((prev) => [...prev, item.name]);
                  //alert(JSON.stringify(item));
                }}
                //onItemSelect called after the selection from the dropdown
                containerStyle={{ padding: 0 }}
                //suggestion container style
                textInputStyle={{
                  //inserted text style
                  padding: 12,
                  height: getHeightPixel(46),
                  color: colors.mineShaft,
                }}
                focus={true}
                itemStyle={{
                  //single dropdown item style
                  //padding: 10,
                  //marginTop: 2,
                  backgroundColor: colors.white,
                  borderColor: colors.accentGray,
                  padding: 10,
                  //borderWidth: 1,
                }}
                itemTextStyle={{
                  //text style of a sing  A23S473  le dropdown item
                  color: "#222",
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  height: "40%",
                }}
                items={InterestsList.filter(
                  (c) =>
                    c.interest_map_groups &&
                    (selectedTags.includes(c.interest_map_groups[0]) ||
                      selectedTags.length === 0)
                )}
                listProps={{ showsVerticalScrollIndicator: false }}
                //mapping of item array
                //defaultIndex={2}
                //default selected item index
                placeholder="Search"
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
              />
            </View>
            <View>
              <Icon
                name="arrow-drop-down"
                size={21}
                color={colors.black}
                style={{
                  alignSelf: "center",
                  backgroundColor: colors.searchBlue,
                  paddingHorizontal: getWidthPixel(14),
                  paddingVertical: getHeightPixel(14),
                  borderLeftWidth: 1,
                  borderRightWidth: 0,
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: getHeightPixel(150),
              marginBottom: getHeightPixel(10),
            }}
          >
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                {
                  // paddingBottom: 100,
                }
              }
            >
              <View style={SignUpStep2Styles.content1}>
                {
                  <View style={SignUpStep2Styles.tagWrapper}>
                    {selectedItems.map((item, index) => (
                      <View style={SignUpStep2Styles.tagList} key={index}>
                        <View
                          style={{
                            height: getHeightPixel(20),
                            width: getWidthPixel(20),
                            borderRadius: 40,
                            marginVertical: 2,
                            backgroundColor: item.color,
                          }}
                        >
                          <Text style={SignUpStep2Styles.tagIconText}>
                            {item.name.charAt(0)}
                          </Text>
                        </View>
                        <Text style={SignUpStep2Styles.tagListText}>
                          {item.name}
                        </Text>
                        <TouchableWithoutFeedback
                          onPress={
                            () =>
                              selectItems(
                                selectedItems.filter((i) => i !== item)
                              )

                            //REMOVE ITEM FROM NAMELIST....
                          }
                        >
                          <Icon3 name="close" size={16} color={colors.white} />
                        </TouchableWithoutFeedback>
                      </View>
                    ))}
                  </View>
                }
              </View>

              <View>
                <View style={SignUpStep2Styles.tagsContainer}>
                  {tags.map((tag, key) => (
                    <TouchableOpacity
                      key={key.toString()}
                      onPress={() => {
                        //_filterGroup(tag);
                        console.log("Tagger", selectedTags);
                        if (selectedTags.find((item) => item === tag)) {
                          selectTags(
                            selectedTags.filter((item) => item !== tag)
                          );
                          console.log("Tagger1", selectedTags);
                        } else {
                          selectTags((prevTags) => [...prevTags, tag]);
                        }

                        // selectTags(
                        //   selectedTags.filter((item) => item !== tag)
                        // );
                        console.log(tag, "pressed");
                        //selectTags(tag);
                      }}
                    >
                      <View
                        style={{
                          ...SignUpStep2Styles.tag,
                          backgroundColor: selectedTags.find(
                            (item) => item === tag
                          )
                            ? colors.accentGray
                            : "white",
                        }}
                      >
                        <Text
                          key={key}
                          style={[
                            SignUpStep2Styles.TagsText,
                            {
                              color: selectedTags.find((item) => item === tag)
                                ? "white"
                                : "black",
                            },
                          ]}
                        >
                          {tag
                            .substring(tag.indexOf("-") + 1)
                            .replaceAll("-", " ")}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            // selectTags(
                            // selectedTags.filter((item) => item !== tag)
                            // );
                            console.log("remove tag pressed");
                            //addTags(tags.filter((item) => item !== tag));
                          }}
                        >
                          <Icon2
                            name={
                              selectedTags.find((item) => item === tag)
                                ? "minus"
                                : "plus"
                            }
                            size={18}
                            color={colors.black}
                            style={
                              selectedTags.find((item) => item === tag)
                                ? { color: colors.white }
                                : { color: colors.black }
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>

          {/* <AddInterestsModal modal={setModalVisible} visibility={mVisible} /> */}
          <View style={SignUpStep2Styles.Button}>
            <ButtonCommon
              title={"CONTINUE"}
              method={checkDate}
              color={colors.primary}
              loading={isLoading}
            />
          </View>
          {!open ? null : (
            <DatePicker
              modal
              open={open}
              date={date}
              // fadeToColor="white"
              maximumDate={new Date("2008-01-01")}
              minimumDate={new Date("1950-01-01")}
              textColor={colorScheme == "dark" ? colors.white : colors.black}
              androidVariant="nativeAndroid"
              mode="date"
              onConfirm={(date) => {
                unstable_batchedUpdates(() => {
                  setDate(date);
                  setOpen(false);
                  changeDateDefault(false);
                });
              }}
              onCancel={() => {
                setOpen(!open);
              }}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpStep2;
