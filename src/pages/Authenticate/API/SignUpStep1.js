import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUpStep1API = async (
  email,
  password,
  first_name,
  last_name
) => {
  try {
    const url = "https://dev.imateam.us:8443/auth/signup/";
    const body = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    };
    console.log(body);
    const response = await axios.post(url, body);
    console.log("SignupStep1 response", response.data);

    if (response.data) {
      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    console.log("login error", error.response.data.detail);
    return error;
  }
};
