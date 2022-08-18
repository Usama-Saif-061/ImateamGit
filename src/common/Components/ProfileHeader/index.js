import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import icons from "../../icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconSend from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { tabDeselection } from "../../../Reducers/CommonReducers/mainLandingReducer";
import colors from "../../colors";
import { getWidthPixel } from "../../helper";
import Search from "../../../pages/Landing/pages/search";
const ProfileHeader = ({ navigation, openModal, currentPage, mainFunc }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const TouchableWrapper =
    Platform.OS === "ios" ? TouchableWithoutFeedback : TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(tabDeselection());
          navigation.navigate("MainLanding");
          if (mainFunc) {
            mainFunc()
          }
        }}
      >
        <Image style={styles.logo} source={icons.logoBlue} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            name: "Search",
            params: {
              modal: setModal,
              visibility: modal,
              navigation: navigation,
              currentPage: currentPage,
            },
          });
        }}
        style={styles.searchContainer}
      >
        <Icon name="search" size={22} style={{
          marginLeft: 10
        }} color={colors.accentGray} />
        <TextInput
          placeholderTextColor={"#C7C7CD"}
          onSubmitEditing={Keyboard.dismiss}
          style={styles.search}
          autoCorrect={false}
          placeholder="Search..."
          value={search}
          onChangeText={(search) => setSearch(search)}
          onFocus={() => {
            console.log("opening search modal");
            // setModal(true);
            navigation.navigate({
              name: "Search",
              params: {
                modal: setModal,
                visibility: modal,
                navigation: navigation,
                currentPage: currentPage,
              },
              merge: true,
            });
          }}
        />
      </TouchableOpacity>
      <View style={styles.notification}>
        <TouchableOpacity onPress={() => console.log("Notification Pressed")}>
          <Icon
            name="notifications-none"
            size={getWidthPixel(21)}
            color={colors.accentGray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => console.log("Profile Pressed")}>
          <IconSend
            name="send-o"
            size={getWidthPixel(14)}
            color={colors.accentGray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
