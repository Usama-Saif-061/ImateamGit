import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from "../../colors";
import { font } from "../../helper";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from 'react-redux';
import { tabDeselection } from '../../../Reducers/CommonReducers/mainLandingReducer';



// import { Container } from './styles';

const MessageingHeader = (props) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.header}>
      {/* logo */}
      <TouchableOpacity onPress={() => {
        dispatch(tabDeselection());
        props.navigation.navigate("MainLanding");
      }}>
        <Image source={props.logo} style={styles.logo} />
      </TouchableOpacity>
      {/* cenetral Text */}
      <Text style={styles.centeralText}>{props.centeralText}</Text>

      {/* End Text */}
      <TouchableOpacity onPress={props.onPress}>
        <Icon size={20} name="plus" style={styles.icon} />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.ghostWhite,

  },
  logo: {
    height: 40,
    width: 40,
  },
  centeralText: {
    paddingVertical: 10,
    ...font(18, "bold"),
    color: colors.mineShaft,
  },
  icon: {
    color: colors.accentGray,
  }


})

export default MessageingHeader;