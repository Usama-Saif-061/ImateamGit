import axios from "axios";
import { getToken } from "../../../common/helper";

export const SellerSignUpAPI = async (body) => {
  const token = await getToken();
  console.log("api chal re hai token", JSON.stringify(body));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const url = "https://dev.imateam.us:8443/stores/sellers/";

  try {
    console.log(body);
    const response = await axios.post(url, body, config);
    console.log("SellerSignUp response", response.data);

    if (response.data) {
      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    console.log("seller Sign Up  error", error.response.data.detail);
    return error;
  }
};
