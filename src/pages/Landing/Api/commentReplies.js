import axios from "axios";
import { getToken } from "../../../common/helper";

const commentsRepliesAPI = async (id) => {
  const token = await getToken();
  console.log("here is id for comments like list ", id, "token is ", token);
  const url = `https://dev.imateam.us:8443/comments/replies/${id}/`;

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const response = await axios.get(url, config);
    console.log("posts comments replies  list api rsponse", response.data);
    if (response.data) {
      //  console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("comments list error", error.message);
  }
};

export default commentsRepliesAPI;
