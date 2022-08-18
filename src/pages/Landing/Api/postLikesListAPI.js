import axios from "axios";
import { getToken } from "../../../common/helper";

const postLikesListAPI = async (id) => {
  const token = await getToken();
  console.log("here is id in api call post id is ", id, "token is ", token);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const url = `https://dev.imateam.us:8443/posts/likes/${id}/`;

    const response = await axios.get(url, config);
    console.log("posts like  list api rsponse", response.data);
    if (response.data) {
      //  console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("login error", error.response.data);
  }
};

export default postLikesListAPI;
