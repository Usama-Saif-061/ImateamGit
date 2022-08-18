import axios from "axios";
import { getToken } from "../../../common/helper";

const postShareListAPI = async (id) => {
  const token = await getToken();
  console.log("here is id in api call post id is ", id, "token is ", token);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const url = `https://dev.imateam.us:8443/posts/repost/${id}/`;

    const response = await axios.get(url, config);
    console.log("posts share  list api rsponse", response.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("share list api error", error.response.data);
  }
};

export default postShareListAPI;
