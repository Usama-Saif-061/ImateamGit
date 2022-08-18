import { getToken } from "../../../common/helper";
import axios from "axios";
import { retry } from "@reduxjs/toolkit/dist/query";

const updateProfileIntresetsAPI = async (body, id) => {
  const token = await getToken();
  var url = `https://dev.imateam.us:8443/accounts/user-setting/${id}/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  try {
    console.log("Token ", token, "body ", body, " id", id);
    const response = await axios.put(url, body, config);

    if (response?.data) {
      console.log("interest response", response.data);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("login error", error.response);
    return false;
  }

  //   console.log("reposne is ", response.data);
};
export default updateProfileIntresetsAPI;
