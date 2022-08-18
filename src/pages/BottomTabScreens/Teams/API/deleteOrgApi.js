import axios from "axios";
import { getToken } from "../../../../common/helper";

const deleteOrg = async (body) => {
  let token = await getToken();
  try {
    let url = "https://dev.imateam.us:8443/organizations/";
    let headers = {
      Authorization: token,
    };
    let options = {
      method: "DELETE",
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
export default deleteOrg;
