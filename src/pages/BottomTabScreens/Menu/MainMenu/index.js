import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavigation from "../../../../common/Components/BottomNavigation";
import LogoMini from "../../../../common/Components/LogoMini";
import images from "../../../../common/images";
import { styles } from "./styles";
import colors from "../../../../common/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { tabDeselection } from "../../../../Reducers/CommonReducers/mainLandingReducer";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import { baseApi } from "../../../../Reducers/baseApi";
import { store } from "../../../../store";
import TermsOfServiceModal from "./../../../Authenticate/pages/TermsOfServiceModal";
import PrivacyPolicyModal from "./../../../Authenticate/pages/PrivacyPolicyModal";
import { ShowInitialsOfName } from "../../../../common/Components/ShowInitialsOfName";
import CopyRightModal from "../../../../common/Components/CopyRightModal";

const Menu = ({ navigation }) => {
  const [TOSVisible, setTOSModalVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyModalVisible] = useState(false);
  const [showCopyrightModal, setShowCopyrightModal] = useState(false)
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();
  const dispatch = useDispatch();
  const sampleProfile =
    "https://alchinlong.com/wp-content/uploads/2015/09/sample-profile-320x320.png";
  const Container = userInfo ? TouchableOpacity : View;
  console.log("User420", userInfo);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* top Header */}
        <TouchableOpacity
          onPress={() => {
            dispatch(tabDeselection());
            navigation.navigate("MainLanding");
          }}
          style={styles.header}
        >
          <LogoMini />
          <Text style={styles.Menu}>Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Container
        onPress={() => {
          navigation.navigate("UserProfile");
        }}
        style={styles.profileSection}
      >
        <ShowInitialsOfName
          name={userInfo?.display_name}
          userId={userInfo?.id}
          size={50}
          radius={25}
          fontSize={16}
          imgUrl={userInfo?.avatar?.url}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.name}>{userInfo?.display_name}</Text>
          <Text style={styles.profileLink}>See your profile</Text>
        </View>
      </Container>

      {/* static pages eg terms, privacy policy, contact and about */}
      <View style={styles.accountsAndSellerPanel}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountSettings")}
        >
          <View style={styles.ItemWrapper}>
            <Image source={images.Account} style={styles.menuImg} />
            <Text style={styles.ItemText}>Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={userInfo ? false : true}
          onPress={() => {
            if (!userInfo?.is_seller) {
              navigation.navigate("SellerSignUp", {
                navigation,
              })
            } else {
              navigation.navigate("StoreScreen")
            }
          }}
        >
          <View style={styles.ItemWrapper}>
            <Image source={images.Seller} style={styles.menuImg} />
            <Text style={styles.ItemText}>Seller</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Gallery clicked")}>
          <View style={styles.ItemWrapper}>
            <Image source={images.Gallery} style={styles.menuImg} />
            <Text style={styles.ItemText}>Gallery</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.infoPagesMenu}>
        <Pressable onPress={() => setTOSModalVisible(true)}>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>Terms of Service</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setPrivacyPolicyModalVisible(true)}>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>Privacy Policy</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setShowCopyrightModal(true)}>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>Copyright Policy</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>Contact</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>About</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>FAQ</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </Pressable>
        <TouchableOpacity
          onPress={async () => {
            try {
              console.log(await AsyncStorage.getItem("auth"));
              await AsyncStorage.removeItem("auth");
              store.dispatch(baseApi.util.resetApiState());
              dispatch(tabDeselection());
              console.log("ALL THE DATA HAS BEEN WIPED FROM ASYSNCE");
              console.log(await AsyncStorage.getItem("auth"));
              navigation.reset({
                index: 0,
                routes: [{ name: "InitialScreen" }],
              });
            } catch (err) {
              console.log("error occured");
            }
          }}
        >
          <View style={styles.infoItem}>
            <Text style={styles.pageLinkText}>Log out</Text>
            <Icon
              name="keyboard-arrow-right"
              size={21}
              color={colors.accentGray}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TermsOfServiceModal
        modal={setTOSModalVisible}
        visibility={TOSVisible}
        buttonNotVisible={false}
      />
      <PrivacyPolicyModal
        modal={setPrivacyPolicyModalVisible}
        visibility={privacyPolicyVisible}
        buttonNotVisible={false}
      />
      <CopyRightModal
        modal={setShowCopyrightModal}
        visibility={showCopyrightModal}
        buttonNotVisible={false}
      />
    </View>
  );
};

export default Menu;
