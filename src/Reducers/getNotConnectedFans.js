import axios from "axios";
import { getToken } from "../common/helper";

const notConnectedFans = async (body) => {
  let Token = await getToken()
  try {
    let url = "https://dev.imateam.us:8443/accounts/users/";
    let headers = {
      Authorization: Token
    }
    let options = {
      method: "POST",
      headers: headers,
      data: body,
      url
    }
    let response = await axios(options)

    return response

  } catch (err) {

    return err
    
  }
};

export default notConnectedFans;
