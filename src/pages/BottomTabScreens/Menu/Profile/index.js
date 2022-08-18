import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
} from "react-native";
import BottomNavigation from "../../../../common/Components/BottomNavigation";
import AppStatusBar from "../../../statusBarColor";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import EditIcon from "react-native-vector-icons/SimpleLineIcons";
import Header from "./../../../../common/Components/ProfileHeader";
import styles from "./styles";
import images from "../../../../common/images";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../../../../common/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  getHeightPercentage,
  getWidthPixel,
  moveToNextScreen,
} from "../../../../common/helper";
import ProfileSetting from "../ProfileSetting";
import AlertSetting from "../AlertsSetting";
import SecuritySetting from "../SecuritySetting";
import { useGetUserQuery } from "./../../../../Reducers/usersApi";
import { ShowInitialsOfName } from "../../../../common/Components/ShowInitialsOfName";
import ImagePicker from "react-native-image-crop-picker";

export default function Profile({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  const { data: userData, isFetching, refetch } = useGetUserQuery();

  const [selectedImage, selectImage] = useState();

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 90,
      height: 90,
      cropping: false,
      includeBase64: true,
      mediaType: "photo",
    }).then((image) => {
      selectImage(image);
    });
  };

  let body = {
    data: selectedImage?.data,
    fileInfo: {
      fileSize: selectedImage?.size,
      fileType: selectedImage?.mime,
      filename: selectedImage?.filename
        ? selectedImage?.filename
        : new Date().toString(),
    },
  };

  console.log("IMG", selectedImage, body);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        {/* Header component */}
        <Header navigation={navigation} currentPage={"Profile"} />
      </SafeAreaView>

      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => moveToNextScreen(navigation, "MainMenu")}
        >
          <Icon name={"left"} size={21} color={colors.accentGray} />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Settings</Text>
        {/* PARENT FUNCTION.. CHANGES THE STATE TO TRUE TO COMPLETE THE ACTION IN USESTATE */}

        <TouchableOpacity onPress={() => console.log("hello")}>
          <Icon2
            name={"account-plus-outline"}
            size={21}
            color={colors.accentGray}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <ShowInitialsOfName
          name={userData?.display_name}
          size={50}
          radius={25}
          fontSize={16}
          imgUrl={selectedImage ? selectedImage?.path : userData?.avatar?.url}
          userId={userData?.id}
        />
        <TouchableOpacity style={styles.EditIcon} onPress={chooseImage}>
          <EditIcon name={"pencil"} size={18} color={colors.primary2} />
        </TouchableOpacity>
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileLink}>Hello!</Text>
          <Text style={styles.name}>{userData?.display_name}</Text>
        </View>
      </View>
      {/* tabs for differnt  catagories of settings */}
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: { ...styles.TabMenuItem, width: getWidthPixel(100), },
          tabBarActiveTintColor: colors.inputBlue,
          tabBarInactiveTintColor: "gray",
          tabBarContentContainerStyle: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 5,
          },
          tabBarIndicatorStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        >
          {() => <ProfileSetting imgData={body} />}
        </Tab.Screen>
        <Tab.Screen
          name="Security"
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        >
          {() => <SecuritySetting navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Alert"
          component={AlertSetting}
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
