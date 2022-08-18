import axios from "axios";
import { getToken } from "../../../../common/helper";

const AddTeamMember = async (id, ids) => {
  let token = await getToken();
  console.log(token)
  try {
    let url = `https://dev.imateam.us:8443/organizations/members/${id}/`;
    let headers = {
      Authorization: token,
    };
    let body = {
      userIds: ids,
    };
    let options = {
      method: "POST",
      headers: headers,
      data: body,
      url
    };
    let response = await axios(options);
    return response;
  } catch (err) {
    return err;
  }
};

export default AddTeamMember;
