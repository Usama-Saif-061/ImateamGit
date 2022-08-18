import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const InterestsAPI = async () => {
  try {
    const url = "https://dev.imateam.us:8443/accounts/interest-map/";
    const body = {};
    const response = await axios.get(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Interests  error", error);
    return false;
  }
};
