import React from "react";
import { View } from "react-native";
import propTypes from "prop-types";
import { styles } from "./styles";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "../../colors";
import { getWidthPixel } from "../../helper";

const DataPicker = ({ data, label, getSelectedValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);

  getSelectedValue(value);
  console.log("value is ", value);

  var wid = 0;
  var margL = 0;

  switch (label) {
    case "Interests":
      wid = getWidthPixel(283);
      margL = 0;
      break;
    case "Business Type*":
      wid = getWidthPixel(283);
      margL = 0;
      break;

    default:
      break;
  }

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      key={items}
      closeAfterSelecting={true}
      setOpen={setOpen}
      zIndex={1000}
      selectedItemContainerStyle={{
        backgroundColor: "grey",
      }}
      setValue={setValue}
      setItems={setItems}
      translation={{
        PLACEHOLDER: label,
      }}
      listMode="SCROLLVIEW"
      style={{ ...styles.picker, width: wid, marginLeft: margL }}
      dropDownContainerStyle={{ ...styles.dropDown, width: wid }}
    />
  );
};

DataPicker.propTypes = {
  // placeHolder: propTypes.string,
  // icon: propTypes.string,
  // Label: propTypes.string,
};

DataPicker.defaultProps = {
  // PlaceHolder: "Type Here",
  // Icon: "account-outline",
  // Label: "Input",
};

export default DataPicker;
