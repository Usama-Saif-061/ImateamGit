import React, { useState } from "react";

import { View, Modal, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddInterestModalStyles from "./styles";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../../common/colors";
import ButtonCommon from "../../../../common/Components/Buttons";
import { WebView } from "react-native-webview";
import { getHeightPercentage, getHeightPixel } from "../../../../common/helper";

const TermsOfServiceModal = (props) => {
  const [mVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visibility}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={AddInterestModalStyles.ModalContainer}>
        <SafeAreaView>
          <View style={AddInterestModalStyles.header}>
            <View style={AddInterestModalStyles.closeButton}>
              <TouchableOpacity
                onPress={() => {
                  props.modal(false);
                }}
              >
                <Icon name="close" size={21} color={colors.accentGray} />
              </TouchableOpacity>
            </View>

            <View style={AddInterestModalStyles.title}>
              <Text style={AddInterestModalStyles.titleText}>
                Terms Of Service
              </Text>
            </View>
          </View>
        </SafeAreaView>

        <WebView
          source={{
            uri: "https://docs.google.com/gview?embedded=true&url=https://s3.us-west-2.amazonaws.com/media.imateam/web-assets/docs/UserAgreement.pdf",
          }}
          startInLoadingState={true}
        />

        <View style={AddInterestModalStyles.saveButton}>
          {props.buttonNotVisible ? (
            <ButtonCommon
              title={"I have read the terms above"}
              method={() => props.modal(false)}
              color={colors.primary}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default TermsOfServiceModal;
