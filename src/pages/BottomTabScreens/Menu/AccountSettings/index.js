import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../../../../common/Components/HeaderCommon";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import colors from "../../../../common/colors";
import Icon from "react-native-vector-icons/Feather";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";

const AccountSettings = ({ navigation }) => {
  const [option, setOption] = useState("");
  const data = [
    {
      name: "Leslie Wilson",
      address: "638 Cambridge Court Monroe Township, NJ 08831",
    },
    {
      name: "IAM Brands",
      address: "IAM Brands 1313 Mockingbird Lane, Vania, PA 85555",
    },
  ];
  const [addressData, setAddress] = useState(data);
  const addressesView = (item, id) => {
    let temp = item.address.split(",");
    return (
      <View style={styles.addressContainer} key={id}>
        <View>
          <View style={styles.addressHead}>
            <Text style={{ ...styles.text, fontWeight: "600" }}>
              Address {++id}
            </Text>
            <TouchableOpacity>
              <Icon name="edit-3" color={colors.accentGray} size={16} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ ...styles.text, marginBottom: 6 }}>{item.name}</Text>
            <Text style={styles.lightText}>{temp[0]},</Text>
            <Text style={styles.lightText}>{temp[1]}</Text>
          </View>
        </View>
      </View>
    );
  };
  const CardView = () => {
    return (
      <View style={styles.cardContainer}>
        <Text style={[styles.text, { fontSize: 12 }]}>
          Master Card(**** 3467)
        </Text>
        <Text style={[styles.lightText, { fontSize: 10 }]}>
          Expiration Date 10/2022
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.buttonText,
              { fontSize: 10, marginTop: getHeightPixel(17) },
            ]}
          >
            Card Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <Header
            navigation={navigation}
            heading="Account"
            btnTitle="Done"
            Submit={true}
            onPressSubmit={()=>navigation.navigate("MainMenu")}
          />
          {/* Address start */}
          <View style={styles.addressView}>
            <Text style={styles.headingOne}>Addresses</Text>
            {/* Addresses */}
            {addressData.map((item, id) => addressesView(item, id))}
            <TouchableOpacity>
              <Text
                style={[
                  styles.buttonText,
                  {
                    marginBottom: getHeightPixel(17),
                    marginLeft: getWidthPixel(17),
                  },
                ]}
              >
                + Add New Address
              </Text>
            </TouchableOpacity>
            {/* Payment handle */}
            <View></View>
            <View>
              <Text style={styles.headingOne}>Payment</Text>
            </View>
          </View>

          {/* payment options */}
          <View style={styles.paymentView}>
            <Text
              style={[
                styles.lightText,
                {
                  marginTop: 16,
                  marginBottom: 9,
                  paddingHorizontal: getHeightPixel(17),
                },
              ]}
            >
              Choose payment method
            </Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                style={
                  option === "CreditCard"
                    ? styles.seletedOption
                    : styles.options
                }
                onPress={() => {
                  setOption("CreditCard");
                }}
              >
                <Checkbox
                  status={
                    option === "CreditCard"
                      ? "checked"
                      : Platform.OS === "ios"
                      ? "indeterminate"
                      : "unchecked"
                  }
                  onPress={() => {
                    setOption("CreditCard");
                  }}
                  color={colors.primary}
                  uncheckedColor={colors.lightSilver}
                />
                <Text
                  style={[
                    styles.text,
                    { fontWeight: option === "CreditCard" ? "600" : "400" },
                  ]}
                >
                  Credit Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  option === "Bank" ? styles.seletedOption : styles.options
                }
                onPress={() => {
                  setOption("Bank");
                }}
              >
                <Checkbox
                  status={
                    option === "Bank"
                      ? "checked"
                      : Platform.OS === "ios"
                      ? "indeterminate"
                      : "unchecked"
                  }
                  onPress={() => {
                    setOption("Bank");
                  }}
                  color={colors.primary}
                  uncheckedColor={colors.lightSilver}
                />
                <Text
                  style={[
                    styles.text,
                    { fontWeight: option === "Bank" ? "600" : "400" },
                  ]}
                >
                  Bank
                </Text>
              </TouchableOpacity>
            </View>
            {/* Card Detail box */}
            {CardView()}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddCreditCard");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  { marginHorizontal: getWidthPixel(17) },
                ]}
              >
                + Add New Card
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AccountSettings;
