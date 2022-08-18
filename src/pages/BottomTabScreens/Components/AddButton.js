import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import colors from '../../../common/colors'
import Icon from "react-native-vector-icons/Feather";
import { getWidthPixel } from '../../../common/helper';

const AddButton = (props) => {
  return (
    <TouchableOpacity
      style={[{
        borderRadius: 60,
        backgroundColor: colors.inputBlue,
        alignSelf: "flex-end",
        marginRight: 20,
        zIndex: 999,
        position: "absolute",
        bottom: 20,
        right: 12,
        alignItems: "center",
      }, { ...props.style }]}
      onPress={props.onPress}
    >
      <Icon
        name="plus"
        size={getWidthPixel(26)}
        style={{ padding: 16, color: "#fff" }}
      />
    </TouchableOpacity>
  );
};

export default AddButton
