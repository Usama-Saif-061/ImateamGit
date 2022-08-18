import axios from "axios";
import { getToken } from "../../../common/helper";

const addFollow = async (body) => {
  try {
    let token = await getToken();
    let url = "https://dev.imateam.us:8443/posts/connections/";
    let headers = {
      Authorization: token,
    };
    let options = {
      method: "POST",
      headers: headers,
      data: body,
      url,
    };
    let response = await axios(options);
    if (response) {
      return response;
    }
  } catch (err) {
    return err;
  }
};

export default addFollow;
