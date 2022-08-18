import React from "react";
import { View, Text, Image } from "react-native";
import propTypes from "prop-types";
import { styles } from "./styles";
import { useState } from "react";

import { TextInput } from "react-native-paper";
import colors from "../../colors";

const InputFields = ({
  PlaceHolder,
  error,
  Icon,
  Label,
  method,
  setValue,
  attribute,
  keyboard,
  secureTextEntry,
  autoCapitalize,
}) => {
  const [hidePass, setHidePass] = useState(true);
  const checkForPassword = Label;
  return (
    <View style={!error ? styles.inputMainWrapper : styles.inputMainWrapperAlt}>
      <View style={styles.InputWrapper}>
        <TextInput
          onChangeText={(val) => setValue(val)}
          error={error}
          mode="outlined"
          label={Label}
          secureTextEntry={hidePass ? secureTextEntry : false}
          activeOutlineColor={colors.accentGray}
          activeUnderlineColor={colors.accentGray}
          keyboardType={keyboard ? keyboard : "default"}
          placeholder={PlaceHolder}
          placeholderTextColor={colors.lightSilver}
          style={styles.Input}
          color={colors.mineShaft}
          autoCapitalize={autoCapitalize ? "words" : "none"}
          autoFocus={false}
          right={
            Icon ? (
              <TextInput.Icon
                onPress={() => setHidePass(!hidePass)}
                name={
                  secureTextEntry ? (hidePass ? "eye-off-outline" : Icon) : Icon
                }
                color={colors.accentGray}
              />
            ) : null
          }
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      </View>
    </View>
  );
};

InputFields.propTypes = {
  placeHolder: propTypes.string,
  icon: propTypes.string,
  Label: propTypes.string,
};

InputFields.defaultProps = {
  PlaceHolder: "Type Here",
  Icon: "account-outline",
  Label: "Input",
};

export default InputFields;
