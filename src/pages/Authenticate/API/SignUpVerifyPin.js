import axios from "axios";

export const SignUpVerifyPin = async (otpId, pin) => {
  try {
    const url = "https://dev.imateam.us:8443/accounts/register-verify/";
    const body = {
      otpId: otpId,
      pin: pin,
    };
    console.log(otpId, pin);
    const response = await axios.post(url, body);

    if (response?.data) {
      console.log(JSON.stringify(response.data));
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("OTP verify   error", error);
    return false;
  }
};
