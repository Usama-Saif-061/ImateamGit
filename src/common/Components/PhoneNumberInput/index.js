import {
  format,
  formatIncompletePhoneNumber,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import React from "react";
import { getHeightPixel, getWidthPixel } from "../../helper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import CountryPicker from "react-native-country-picker-modal";
import colors from "../../colors";

export default class PhoneNumberInput extends React.PureComponent {
  textInputRef = null;
  constructor(props) {
    super(props);
    this.state = {
      country: "US",
      countryPickerVisible: false,
      phoneNumber: props.value || "+1",
      phoneNumberChanged: false,
    };
  }

  componentDidMount() {
    this.onChangeText(this.props.value || "+1");
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput
          placeholderTextColor={colors.accentGray}
          {...this.props}
          label={this.props.showFloatingLabel ? "Phone*" : ""}
          activeOutlineColor={colors.accentGray}
          activeUnderlineColor={colors.accentGray}
          error={this.props.err}
          style={styles.Input}
          keyboardType="phone-pad"
          mode="outlined"
          returnKeyType="done"
          editable={this.props.isEditable}
          value={
            this.state.phoneNumberChanged
              ? this.state.phoneNumber
              : this.props.value
          }
          onChangeText={this.onChangeText}
          textContentType="telephoneNumber"
          ref={(ref) => (this.textInputRef = ref)}
        />
        <View style={{ ...styles.PCountry }}>{this.renderCountryPicker()}</View>
      </View>
    );
  }

  renderCountryPicker = () => {
    let countryFlag;
    if (this.state.country || this.state.countryPickerVisible) {
      countryFlag = (
        <CountryPicker
          {...{
            countryCode: this.state.country,
            filterProps: { autoFocus: true },
            onClose: () => this.setState({ countryPickerVisible: false }),
            onSelect: this.onSelect,
            visible: this.state.countryPickerVisible,
            withFilter: true,
          }}
        />
      );
    } else {
      countryFlag = <View style={styles.noFlagPlaceholder} />;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({ countryPickerVisible: true })}
      >
        {countryFlag}
      </TouchableOpacity>
    );
  };

  onSelect = (country) => {
    const countryCallingCode = getCountryCallingCode(country.cca2);
    const newPhoneNumber = `+${formatIncompletePhoneNumber(
      countryCallingCode
    )} `;
    this.setState({
      country: country.cca2,
      countryPickerVisible: false,
      phoneNumber: newPhoneNumber,
      phoneNumberChanged: true,
    });
    this.setPhoneNumber(newPhoneNumber);
    this.textInputRef?.focus();
  };
  setPhoneNumber = (text) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(text);
    if (parsedPhoneNumber?.countryCallingCode) {
      this.setState({ country: parsedPhoneNumber?.country || "" });
    }
    this.props.onPhoneNumberChanged(parsedPhoneNumber);
  };
  onChangeText = (text) => {
    const completePhoneNumber = format(text, this.state.country, "E.164");
    const formattedNumber = formatIncompletePhoneNumber(
      completePhoneNumber || text
    );
    this.setState({
      phoneNumber: formattedNumber,
      phoneNumberChanged: true,
    });
    this.setPhoneNumber(text);
  };
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  default: {
    // color: xDark(defaultColors.PRIMARY),
  },
  noFlagPlaceholder: {
    // backgroundColor: xLight(defaultColors.SECONDARY),
    borderRadius: 4,
    height: 24,
    width: 32,
  },

  Input: {
    backgroundColor: colors.white,
    borderBottomColor: colors.accentGray,

    borderRadius: 5,
    width: "85%",

    height: getHeightPixel(46),
    borderRightWidth: 0,
  },
  PCountry: {
    width: "15%",
    marginTop: getHeightPixel(4),
    borderWidth: 1,
    borderRadius: 5,
    height: getHeightPixel(46),
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundWhite,
    borderColor: colors.accentGray,
  },
});
