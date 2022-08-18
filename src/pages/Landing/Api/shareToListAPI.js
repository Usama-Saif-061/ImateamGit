import axios from "axios";
import { getToken } from "../../../common/helper";
const shareToListAPI = async (id) => {
  console.log("here is id in api call");
  const token = await getToken();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    console.log("i am id", id);
    const url = `https://dev.imateam.us:8443/posts/connections/${id}/`;

    const response = await axios.get(url, config);
    console.log("share to list api rsponse", response.data);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("login error", error.message);
  }
};

export default shareToListAPI;
