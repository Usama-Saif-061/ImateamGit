import axios from "axios";
import { getToken } from "../../../common/helper";

export const createPostAPI = async (body) => {
  const token = await getToken();
  console.log("api chal re hai token", token);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const url = "https://dev.imateam.us:8443/posts/";

    //  console.log("here is body of responsr", body);
    const response = await axios.post(url, body, config);
    console.log("here is posting  response");

    if (response.data) {
      console.log(response.data);

      //storeData(response.data);
      return response;
    }
  } catch (error) {
    console.log("create post error", error);
    return error;
  }
};
