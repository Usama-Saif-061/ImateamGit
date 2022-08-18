import axios from "axios";
import { getToken } from "../../../common/helper";
const editPostAPI = async (body) => {
  const token = await getToken();
  console.log("token: ", token);

  try {
    const url = "https://dev.imateam.us:8443/posts/";

    console.log("body: ", body);

    const response = await axios.put(url, body, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.data) {
      console.log("update response", response.data);

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in updating post", error);
  }
};

export default editPostAPI;
