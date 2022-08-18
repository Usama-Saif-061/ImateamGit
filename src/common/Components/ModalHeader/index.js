import React from "react";
import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../colors";

const ModalHeader = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>{props.heading}</Text>
      <TouchableOpacity
        onPress={() => {
          props.flushArr();
          props.closeModal(false);
        }}
        style={styles.closeIcon}
      >
        <Icon name="close" size={22} color={colors.mineShaft} />
      </TouchableOpacity>

      {props.btnTitle ? (
        props.loading ? (
          <ActivityIndicator
            color={colors.inputBlue}
            style={styles.buttonContainer}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.btnMethod();
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>{props.btnTitle}</Text>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default ModalHeader;
