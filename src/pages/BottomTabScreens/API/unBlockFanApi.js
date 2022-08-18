import axios from "axios";
import { getToken } from "../../../common/helper";

const UnblockFan = async (body) => {
  let token = await getToken();
  try {
    let url = `https://dev.imateam.us:8443/posts/connections/${id}/`;
    let headers = {
      Authorization: token,
    };
    let options = {
      method: "PUT",
      headers: headers,
      data: body,
      url,
    };
    let response = await axios(options);
    return response;
  } catch (err) {
    return err;
  }
};

export default UnblockFan;
