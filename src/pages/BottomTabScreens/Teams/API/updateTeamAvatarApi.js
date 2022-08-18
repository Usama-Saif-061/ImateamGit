import axios from "axios";
import { getToken } from "../../../../common/helper";

const updateTeamAvatar = async (body) => {
  let token = await getToken();
  try {
    let url = "https://dev.imateam.us:8443/organizations/";
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
  } catch (e) {
    return e;
  }
};

export default updateTeamAvatar;