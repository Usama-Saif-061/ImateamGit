import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUpVerifyPhone = async (
  email,
  first_name,
  last_name,
  phone
) => {
  try {
    const url = "https://dev.imateam.us:8443/accounts/register-send-verify/";
    const body = {
      user: {
        email: email,
        first_name: first_name,
        last_name: last_name,
      },

      phone: phone,
    };
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //    console.log("SignupStep2 api response", response.data);

    if (response.data) {
      console.log(
        "Signup Step 3 verify phone  API response",
        JSON.stringify(response.data)
      );
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("signup verify phone  error", error);
    return false;
  }
};
