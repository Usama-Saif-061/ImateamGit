import axios from "axios";

import { getToken } from "../../../common/helper";
const shareCommentAPI = async (id, body) => {
  const token = await getToken();
  console.log("this is ", id, "this is body", body);
  var url = `https://dev.imateam.us:8443/posts/comment-repost/${id}/`;
  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: token },
    });

    if (response.data.approved) {
      console.log("comment share response", response.data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("comment share errror", error.response.data);
  }
};

export default shareCommentAPI;
