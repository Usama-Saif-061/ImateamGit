import { View, TextInput, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Header from "../../../../common/Components/HeaderCommon";
import colors from "../../../../common/colors";
import styles from "./styles";
import { getHeightPercentage, getHeightPixel } from "../../../../common/helper";

const AddCreditCard = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaView>
        <Header
          navigation={navigation}
          heading="Account"
          btnTitle="Done"
          Submit={true}
          onPressSubmit={() => navigation.navigate("MainMenu")}
        />
        <View style={styles.Container}>
          <View style={[styles.inputView, { marginTop: getHeightPixel(20) }]}>
            <Text style={styles.text}>Card Holder</Text>
            <TextInput
              placeholder="John Smith"
              placeholderTextColor={colors.lightSilver}
              style={styles.input}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.text}>Card Number</Text>
            <TextInput
              placeholder="3211 3472 3463 5736"
              placeholderTextColor={colors.lightSilver}
              style={styles.input}
            />
          </View>
          <View style={styles.codeContainer}>
            <View style={styles.inputView_}>
              <Text style={styles.text}>Expiry</Text>
              <TextInput
                placeholder="09/21"
                placeholderTextColor={colors.lightSilver}
                style={styles.input}
              />
            </View>
            <View style={styles.inputView_}>
              <Text style={styles.text}>CVV</Text>
              <TextInput
                placeholder="456"
                placeholderTextColor={colors.lightSilver}
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddCreditCard;
