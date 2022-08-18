import axios from "axios";

export const SignUpStep2API = async (
  email,
  first_name,
  last_name,
  dob,
  interests
) => {
  try {
    const url = "https://dev.imateam.us:8443/accounts/register-info/";
    const body = {
      user: {
        email: email,
        first_name: first_name,
        last_name: last_name,
      },
      payload: {
        birthday: dob,
        interests: interests,
      },
    };
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.email) {
      console.log("Signup Step 2 API response", JSON.stringify(response.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("signup step 2  error", error);
    return false;
  }
};
