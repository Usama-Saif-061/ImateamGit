import axios from "axios";

import { getToken } from "../../../common/helper";

export const resharePostApi = async (body, id) => {
  const token = await getToken();
  console.log("data in reshare api", token, body, id);
  var url = `https://dev.imateam.us:8443/posts/repost/${id}/`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const res = await axios.post(url, body, config);
    console.log("i am response", res.data);
    if (res.data.approved) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("i am error", error);
  }
};
