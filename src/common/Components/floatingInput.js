import React, { useState } from "react";
import { View } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import SignUpForm from "../../pages/Authenticate/SignUpStep1/Components/SignUpForm";

const FloatingInput = () => {
  const [phone, setPhone] = useState("");

  return <SignUpForm />;
};
export default FloatingInput;
