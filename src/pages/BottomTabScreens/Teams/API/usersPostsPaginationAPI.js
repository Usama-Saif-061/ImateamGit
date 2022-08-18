import axios from "axios";
import { getToken } from "../../../../common/helper";

const userPostsPaginationAPI = async (id, page) => {
  let token = await getToken();
  try {
    let url = `https://dev.imateam.us:8443/posts/vanity/${id}/?pageNumber=${page}`;
    let headers = {
      Authorization: token,
    };
    let options = {
      method: "GET",
      headers: headers,
      url,
    };
    let response = await axios(options);
    return response.data;
  } catch (err) {
    return err;
  }
};
export default userPostsPaginationAPI;
