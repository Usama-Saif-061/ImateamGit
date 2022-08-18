import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import CommonHeader from "../../../../common/Components/CommonHeader";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";

const AboutUs = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: getHeightPixel(10) }} />
      <CommonHeader centerText="About us" navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={require("../../../../common/assets/img/logoBlue.png")}
          style={styles.mainPic}
        />
        <View style={{ marginVertical: getHeightPixel(20) }} />
        <View style={styles.singleView}>
          <Image
            source={require("../../../../common/assets/img/logo.png")}
            style={styles.childPic}
          />
          <Text style={styles.simpleTxt}>
            is designed to support teams and groups with a free connectivity
            platform.
          </Text>
        </View>
        <View style={styles.singleView}>
          <Image
            source={require("../../../../common/assets/img/logo.png")}
            style={styles.childPic}
          />
          <Text style={styles.simpleTxt}>
            Community is dedicated to be an inclusive safe environment and one
            to benefit all IMA members.
          </Text>
        </View>
        <View style={styles.singleView}>
          <Image
            source={require("../../../../common/assets/img/logo.png")}
            style={styles.childPic}
          />
          <Text style={styles.simpleTxt}>
            has taken special interest in non-profit organizations and will look
            to enhance their fundraising efforts.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainPic: {
    height: getWidthPixel(100),
    width: getWidthPixel(100),
    alignSelf: "center",
    marginTop: getHeightPixel(40),
  },
  singleView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginVertical: getHeightPixel(10),
    marginHorizontal: getWidthPixel(15),
  },
  childPic: {
    height: getWidthPixel(35),
    width: getWidthPixel(35),
  },
  simpleTxt: {
    width: "80%",
    fontSize: 18,
    color: "black",
    marginStart: getWidthPixel(10),
  },
});
export default AboutUs;
