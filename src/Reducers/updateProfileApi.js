import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../common/helper";
const updateProfileApi = async (body) => {
  const token = await getToken();
  console.log("token: ", token);
  //   const value = await AsyncStorage.getItem("auth");
  try {
    const url = "https://dev.imateam.us:8443/accounts/user-info/";

    console.log("body: ", body);

    const response = await axios.put(url, body, {
      headers: {
        Authorization: token,
      },
    });

    console.log("response: ", response);

    if (response) {
      console.log("update response", response.data);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in updating profile", error.response.data);
    return false;
  }
  return true;
};

export default updateProfileApi;
