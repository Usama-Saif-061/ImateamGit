import axios from "axios";
import { getToken } from "../../../../common/helper";

const DeleteMember = async (id ,memberId) => {
  let token = await getToken();
  try {
    let url = `https://dev.imateam.us:8443/organizations/members/${id}/`;
    let headers = {
      Authorization: token,
    };
    let body = {
      memberId: memberId,
    };
    let options = {
      method: "DELETE",
      headers: headers,
      data: body,
      url
    };
    let response = await axios(options);
    if (response) {
      return response;
    }
  } catch (err) {
    return err;
  }
};
export default DeleteMember